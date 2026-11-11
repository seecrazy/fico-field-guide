import { test } from 'node:test'
import assert from 'node:assert/strict'
import { normalizeTcodes, collectTcodes, renderIndex, START, END } from '../scripts/lib/tcode-index.mjs'
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

test('normalizeTcodes 兼容数组与逗号串', () => {
  assert.deepEqual(normalizeTcodes(['FB50', 'FB03']), ['FB50', 'FB03'])
  assert.deepEqual(normalizeTcodes('FB50, FB03'), ['FB50', 'FB03'])
  assert.deepEqual(normalizeTcodes(null), [])
  assert.deepEqual(normalizeTcodes(''), [])
})

test('collectTcodes 汇总并按页面去重', () => {
  const dir = mkdtempSync(join(tmpdir(), 'vfg-test-'))
  try {
    writeFileSync(join(dir, 'a.md'), `---\ntitle: A\ntcodes: [FB50, FB03]\n---\n正文`)
    writeFileSync(join(dir, 'b.md'), `---\ntitle: B\ntcodes: "FB50"\n---\n正文`)
    const { map, titles } = collectTcodes(dir, [join(dir, 'a.md'), join(dir, 'b.md')])
    assert.deepEqual([...map.get('FB50')].sort(), ['a', 'b'])
    assert.deepEqual([...map.get('FB03')], ['a'])
    assert.equal(titles.get('a'), 'A')
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test('renderIndex 输出按 T-Code 排序的表格', () => {
  const map = new Map([
    ['FB03', new Set(['01-daily-ops/tcode-cards'])],
    ['FB50', new Set(['01-daily-ops/tcode-cards', '03-config-notes/x'])],
  ])
  const titles = new Map([
    ['01-daily-ops/tcode-cards', '高频 T-Code 卡片'],
    ['03-config-notes/x', 'X 笔记'],
  ])
  const md = renderIndex({ map, titles })
  assert.match(md, /\| T-Code \| 出现页面 \|/)
  assert.ok(md.indexOf('`FB03`') < md.indexOf('`FB50`'), '应按字母排序')
  assert.match(md, /\[`tcode-cards`\]\(\/01-daily-ops\/tcode-cards\)（高频 T-Code 卡片）/)
})

test('AUTO-GEN 标记可被正则定位', () => {
  assert.equal(START.startsWith('<!-- AUTO-GEN:START'), true)
  assert.equal(END, '<!-- AUTO-GEN:END -->')
})
