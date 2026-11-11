import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parseFrontmatter, isValidDate } from '../scripts/lib/frontmatter.mjs'

test('parseFrontmatter 提取标量、数组与引号值', () => {
  const raw = `---
title: OBYC — 自动记账
version: [ECC, S/4HANA]
verifiedEnv: "IDES S/4HANA 2023, CC 1000"
empty:
---

正文开始
`
  const parsed = parseFrontmatter(raw)
  assert.ok(parsed)
  assert.equal(parsed.data.title, 'OBYC — 自动记账')
  assert.deepEqual(parsed.data.version, ['ECC', 'S/4HANA'])
  assert.equal(parsed.data.verifiedEnv, 'IDES S/4HANA 2023, CC 1000')
  assert.equal(parsed.data.empty, null)
  assert.ok(parsed.body.trim().startsWith('正文开始'))
})

test('parseFrontmatter 无 frontmatter 返回 null', () => {
  assert.equal(parseFrontmatter('# 只有标题\n\n正文'), null)
})

test('parseFrontmatter 兼容 CRLF', () => {
  const parsed = parseFrontmatter('---\r\ntitle: X\r\n---\r\n正文')
  assert.equal(parsed.data.title, 'X')
})

test('isValidDate 校验真实日历日期', () => {
  assert.equal(isValidDate('2026-11-11'), true)
  assert.equal(isValidDate('2026-02-30'), false) // 2 月没有 30 日
  assert.equal(isValidDate('2026-13-01'), false)
  assert.equal(isValidDate('2026/11/11'), false)
  assert.equal(isValidDate(20261111), false)
})
