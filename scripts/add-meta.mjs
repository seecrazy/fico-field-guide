#!/usr/bin/env node
/**
 * 一次性元数据注入工具（外部评审落地）：
 *   1. confidence 可信度分级（A 实测 / B 官方文档口径 / C 项目经验推演 / D 待验证）
 *   2. symptoms 现象关键词（供问题诊断中心聚合）
 * 全部为「在现有 frontmatter 追加字段」，不动正文；可重复执行（幂等，字段存在则更新）。
 */
import { readFileSync, writeFileSync } from 'node:fs'

// —— 置信度映射：现有内容全部为「按 SAP 标准行为撰写」= B；排查案例为方法论推演 = C ——
const CONFIDENCE = {
  'docs/01-daily-ops/errors/': 'B',
  'docs/03-config-notes/': 'B',
  'docs/04-troubleshooting/case-': 'C',
}

// —— 现象关键词映射（诊断中心数据源）：报错条目 + 排查案例 ——
const SYMPTOMS = {
  'f5-100': ['科目不存在', '录凭证报科目错'],
  'f5-702': ['借贷不平', '凭证保存报余额不为零'],
  'posting-period-not-open': ['过不了账', '期间未开', '月初第一笔被拦'],
  'cost-center-missing': ['要求成本中心', 'CO 对象缺失', '损益科目过不了账'],
  'gr-ir-not-cleared': ['GR/IR 清不掉', 'GR/IR 余额不为零', '月结清账失败'],
  'migo-no-fi-doc': ['收货没有 FI 凭证', 'MIGO 收货无凭证', '收货成功但财务没账'],
  'field-status-conflict': ['字段看不见', '字段填不了', '必输字段被抑制'],
  'miro-prd-wrong-account': ['差异进错科目', '发票校验差异串户'],
  'afab-depreciation-error': ['折旧跑不动', 'AFAB 报错', '折旧余额不平'],
  'exchange-rate-missing': ['汇率缺失', '外币过账报错'],
  'f110-no-proposal': ['付款没有提案', 'F110 空跑', '付款运行选不中发票'],
  'reversal-not-possible': ['冲销不了', 'FB08 失败', '已清账冲不掉'],
  'mmpv-cannot-close': ['关不了月', 'MMPV 失败', 'MM 期间关不掉'],
  'tax-code-invalid': ['税码无效', '税码不存在', '发票被税配置拦下'],
  'doc-number-gap': ['凭证号跳号', '凭证缺号', '审计问号段'],
  'due-date-wrong': ['到期日不对', '付款到期日算错'],
  'co88-settlement-error': ['订单结算报错', 'CO88 失败', '批量结算卡住月结'],
  'credit-block': ['订单被冻结', '信贷拦截', '下单/交货/开票被信贷卡住'],
  'authorization-failed': ['没权限', '无权限执行事务', 'SU53 排查'],
  'case-f5-100': ['完整排查演示：科目不存在'],
  'case-gr-ir': ['完整排查演示：GR/IR 清不掉'],
  'case-period': ['完整排查演示：月初过不了账'],
  'case-migo-no-fi': ['完整排查演示：收货没有 FI 凭证'],
  'case-f110': ['完整排查演示：F110 零提案'],
  'case-afab': ['完整排查演示：折旧跑不动'],
}

const files = [
  ...Object.keys(SYMPTOMS).map((k) =>
    k.startsWith('case-') ? `docs/04-troubleshooting/${k}.md` : `docs/01-daily-ops/errors/${k}.md`,
  ),
]

// 硬校验范围 = errors + config-notes + case（与 validate.mjs ruleFor 一致）
import { readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
function walk(dir) {
  const out = []
  for (const n of readdirSync(dir)) {
    const p = join(dir, n)
    if (statSync(p).isDirectory()) out.push(...walk(p))
    else if (n.endsWith('.md')) out.push(p)
  }
  return out
}
for (const dir of ['docs/03-config-notes', 'docs/01-daily-ops/errors', 'docs/04-troubleshooting']) {
  for (const f of walk(dir)) {
    if (!f.endsWith('index.md') && !f.endsWith('playbook-intro.md')) files.push(f)
  }
}

let touched = 0
const seen = new Set()
for (const file of [...new Set(files)]) {
  if (seen.has(file)) continue
  seen.add(file)
  let raw = readFileSync(file, 'utf8')
  const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw)
  if (!m) continue
  let fm = m[1]

  // confidence：按目录规则
  const confKey = Object.keys(CONFIDENCE).find((k) => file.includes(k))
  const conf = confKey ? CONFIDENCE[confKey] : null
  if (conf) {
    fm = fm.includes('confidence:')
      ? fm.replace(/^confidence:.*$/m, `confidence: ${conf}`)
      : `${fm}\nconfidence: ${conf}`
  }

  // symptoms：按文件名（去目录与扩展名）
  const base = file.split('/').pop().replace('.md', '')
  const symp = SYMPTOMS[base]
  if (symp) {
    const line = `symptoms: [${symp.map((s) => `"${s}"`).join(', ')}]`
    fm = fm.includes('symptoms:')
      ? fm.replace(/^symptoms:.*$/m, line)
      : `${fm}\n${line}`
  }

  const next = raw.replace(/^---\r?\n[\s\S]*?\r?\n---/, `---\n${fm}\n---`)
  if (next !== raw) {
    writeFileSync(file, next)
    touched++
  }
}
console.log(`元数据注入完成：${touched} 个文件更新（confidence/symptoms）。`)
