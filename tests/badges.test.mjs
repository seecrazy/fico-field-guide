import { test } from 'node:test'
import assert from 'node:assert/strict'
import { extractPagePath, aggregate, demoData } from '../scripts/lib/badges.mjs'

test('extractPagePath 从 Issue 标题提取页面路径', () => {
  assert.equal(
    extractPagePath('[有用] OBYC — MM-FI 自动记账 — docs/03-config-notes/mm-fi-obyc.md'),
    'docs/03-config-notes/mm-fi-obyc.md',
  )
  assert.equal(extractPagePath('[勘误] 没有路径的标题'), null)
  assert.equal(extractPagePath(undefined), null)
})

test('aggregate：useful 全计数、error 仅计未关闭', () => {
  const issues = [
    { title: '[有用] A — docs/a.md', state: 'closed', labels: ['useful'] },
    { title: '[有用] A — docs/a.md', state: 'open', labels: ['useful'] },
    { title: '[勘误] A — docs/a.md', state: 'open', labels: ['error'] },
    { title: '[勘误] A — docs/a.md', state: 'closed', labels: ['error'] }, // 已处理，不计
  ]
  const { pages, totals } = aggregate(issues)
  assert.equal(pages['docs/a.md'].useful, 2)
  assert.equal(pages['docs/a.md'].error, 1)
  assert.equal(totals.useful, 2)
  assert.equal(totals.errorOpen, 1)
})

test('无路径的反馈计入未识别桶，不丢数据', () => {
  const { pages } = aggregate([{ title: '[有用] 无路径', state: 'open', labels: [] }])
  assert.equal(pages['(未识别页面)'].useful, 1)
})

test('demoData 可直接供本地预览', () => {
  const d = demoData()
  assert.equal(d.source, 'demo')
  assert.equal(d.pages['docs/03-config-notes/mm-fi-obyc.md'].useful, 2)
})
