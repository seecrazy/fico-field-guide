import { test } from 'node:test'
import assert from 'node:assert/strict'
import { reviewPage, reviewAll, renderMarkdown, STALE_WARN_DAYS, STALE_STALE_DAYS } from '../scripts/lib/stale.mjs'

const DAY = 86_400_000
const page = (verifiedOn) => `---\ntitle: 测试页\nverifiedOn: ${verifiedOn}\n---\n正文`

test('阈值常量与站点配置一致（12/24 个月）', () => {
  assert.equal(STALE_WARN_DAYS, 365)
  assert.equal(STALE_STALE_DAYS, 730)
})

test('reviewPage：fresh 不列入，warn/stale 正确分级', () => {
  const now = Date.parse('2026-11-11')
  assert.equal(reviewPage('a.md', page('2026-10-11'), now), null) // 31 天，fresh
  assert.equal(reviewPage('a.md', page('2025-10-01'), now)?.level, 'warn') // ~406 天
  assert.equal(reviewPage('a.md', page('2024-10-01'), now)?.level, 'stale') // ~772 天
})

test('reviewPage：无日期/坏日期/无 frontmatter 一律返回 null', () => {
  assert.equal(reviewPage('a.md', page('2026-02-30'), Date.now()), null)
  assert.equal(reviewPage('a.md', '---\ntitle: x\n---\n正文', Date.now()), null)
  assert.equal(reviewPage('a.md', '裸正文', Date.now()), null)
})

test('reviewAll：按天数降序（最旧排最前）', () => {
  const now = Date.parse('2026-11-11')
  const files = [
    { path: 'docs/a.md', raw: page(new Date(now - 400 * DAY).toISOString().slice(0, 10)) },
    { path: 'docs/b.md', raw: page(new Date(now - 800 * DAY).toISOString().slice(0, 10)) },
    { path: 'docs/c.md', raw: page('2026-11-01') }, // fresh，应被过滤
  ]
  const hits = reviewAll(files, now)
  assert.equal(hits.length, 2)
  assert.equal(hits[0].path, 'docs/b.md') // 最旧在最前
  assert.equal(hits[1].path, 'docs/a.md')
})

test('renderMarkdown：空清单输出空串；非空含表头与相对链接', () => {
  assert.equal(renderMarkdown([]), '')
  const md = renderMarkdown([
    { path: 'docs/03-config-notes/x.md', title: 'X 笔记', verifiedOn: '2024-01-01', days: 680, level: 'stale' },
  ])
  assert.match(md, /\| 页面 \| 验证于 \| 已超（天） \| 级别 \|/)
  assert.match(md, /\[X 笔记\]\(\.\.\/blob\/main\/docs\/03-config-notes\/x\.md\)/)
  assert.match(md, /超 24 个月 1 个/)
})
