#!/usr/bin/env node
/**
 * 结构检查 CLI（quality.yml 调用；缺失任一硬规则 → exit 1）。
 * 用法：node scripts/check-structure.mjs [--strict]
 */
import { validateAll } from './lib/validate.mjs'

const strict = process.argv.includes('--strict')
const { ok, problems, warnings, checked } = validateAll()

for (const w of warnings) console.warn(`WARN  ${w}`)

if (problems.length) {
  for (const p of problems) {
    for (const e of p.errors) console.error(`FAIL  ${p.relPath}: ${e}`)
  }
  console.error(`\n结构检查未通过：${problems.length} 个文件存在硬性违规（见上）。修复模板见 docs/99-contribute/how-to-contribute.md`)
  process.exit(1)
}

if (strict && warnings.length) {
  console.error(`\n--strict 模式：${warnings.length} 条软性警告视为失败`)
  process.exit(1)
}

console.log(`结构检查通过：${checked.length} 个硬性校验文件，0 违规；${warnings.length} 条软性提醒。`)
