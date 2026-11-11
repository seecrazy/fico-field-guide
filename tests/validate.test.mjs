import { test } from 'node:test'
import assert from 'node:assert/strict'
import { validateContent, ruleFor } from '../scripts/lib/validate.mjs'

const GOOD = `---
title: OBYC 配置
version: [ECC, S/4HANA]
module: MM-FI
verifiedOn: 2026-11-11
verifiedEnv: "SAP 标准行为"
tcodes: [OBYC, MIGO]
---

## 根因（按概率）
| 根因（按概率） | 验证动作 | 修复动作 |
|---|---|---|
| 1. WRX 未配 | FB03 查凭证 | OBYC 补配 |

**验证 T-Code**：\`FB03\`
**验证判据**：收货后应生成 FI 凭证
**失败对照**：无凭证 → 检查 OBYC
`

test('规则归属：配置笔记与报错页走硬校验', () => {
  assert.equal(ruleFor('docs/03-config-notes/mm-fi-obyc.md'), 'hard')
  assert.equal(ruleFor('docs/01-daily-ops/errors/f5-100.md'), 'hard')
  assert.equal(ruleFor('docs/01-daily-ops/errors/index.md'), null)
  assert.equal(ruleFor('docs/01-daily-ops/error-cookbook.md'), 'hard')
  assert.equal(ruleFor('docs/01-daily-ops/tcode-cards.md'), null)
})

test('合规配置笔记通过校验', () => {
  const res = validateContent('docs/03-config-notes/a.md', GOOD)
  assert.deepEqual(res.errors, [])
})

test('缺三元组 / 缺根因表 / 缺日期 → 逐项报错', () => {
  const bad = `---
title: 缺东西
verifiedOn: 2026-02-30
---

正文什么都没有
`
  const res = validateContent('docs/03-config-notes/b.md', bad)
  const msgs = res.errors.join('\n')
  assert.match(msgs, /verifiedOn 不是合法日期/)
  assert.match(msgs, /verifiedEnv/)
  assert.match(msgs, /验证 T-Code/)
  assert.match(msgs, /验证判据/)
  assert.match(msgs, /失败对照/)
  assert.match(msgs, /\| 根因/)
})

test('完全无 frontmatter → 直接报缺 frontmatter', () => {
  const res = validateContent('docs/01-daily-ops/errors/x.md', '裸正文')
  assert.equal(res.errors.length, 1)
  assert.match(res.errors[0], /frontmatter/)
})
