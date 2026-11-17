#!/usr/bin/env node
/**
 * 按模块浏览页生成：从全站 frontmatter 的 module 字段聚合，
 * 写入 docs/module-index.md 的 AUTO-GEN 区段（与 tcode-index 同一模式）。
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { relative } from 'node:path'
import { walkMd } from './lib/validate.mjs'
import { parseFrontmatter } from './lib/frontmatter.mjs'

const START = '<!-- AUTO-GEN:START (do not edit; run: npm run module-index) -->'
const END = '<!-- AUTO-GEN:END -->'
const FILE = 'docs/module-index.md'

const GROUP_ORDER = [
  { match: /^FI-GL$/, label: '总账（FI-GL）' },
  { match: /^FI-AP/, label: '应付（FI-AP）' },
  { match: /^FI-AR/, label: '应收（FI-AR）' },
  { match: /^FI-AA$/, label: '资产（FI-AA）' },
  { match: /^FI-/, label: '财务其他（FI）' },
  { match: /^CO-PC/, label: '生产成本（CO-PC）' },
  { match: /^CO-/, label: '成本控制（CO）' },
  { match: /^EC-/, label: '利润中心（EC-PCA）' },
  { match: /MM|SD/, label: 'MM / SD 集成' },
  { match: /TR/, label: '资金（TR）' },
  { match: /跨模块|FI\/CO|FI-CN|基础|数据迁移|FI-BL|FI-TAX/, label: '跨模块与基础' },
]

const pages = []
for (const file of walkMd('docs')) {
  const parsed = parseFrontmatter(readFileSync(file, 'utf8'))
  if (!parsed?.data.module || parsed.data.feedback === false) continue
  const url = relative('.', file).replace(/^docs\//, '/').replace(/\.md$/, '')
  if (url === 'module-index' || url === 'tcode-index' || url === 'diagnose') continue
  const zone = url.startsWith('/03-config-notes/')
    ? '配置笔记'
    : url.startsWith('/04-troubleshooting/')
      ? '排查实战'
      : url.startsWith('/01-daily-ops/errors/')
        ? '报错速查'
        : url.startsWith('/01-daily-ops/')
          ? '日常运维'
          : url.startsWith('/02-project/')
            ? '项目阶段'
            : '参考'
  pages.push({ module: String(parsed.data.module), title: parsed.data.title || url, url, zone })
}

const groups = new Map()
for (const p of pages) {
  const g = GROUP_ORDER.find((x) => x.match.test(p.module))
  const key = g ? g.label : '其他'
  if (!groups.has(key)) groups.set(key, [])
  groups.get(key).push(p)
}

// 按 GROUP_ORDER 排序组；组内按 zone 再按标题
const orderIdx = (label) => GROUP_ORDER.findIndex((g) => g.label === label)
const sorted = [...groups.entries()].sort(
  (a, b) => (orderIdx(a[0]) + 100 || 900) - (orderIdx(b[0]) + 100 || 900),
)

const zoneRank = { 排查实战: 0, 报错速查: 1, 配置笔记: 2, 日常运维: 3, 项目阶段: 4, 参考: 5 }
const lines = [`共 ${pages.length} 个内容页，按模块分组（数据来自 frontmatter 的 module 字段自动生成）。`]
for (const [label, list] of sorted) {
  lines.push('', `### ${label}`, '', '| 页面 | 区域 |', '|---|---|')
  list.sort((a, b) => zoneRank[a.zone] - zoneRank[b.zone] || a.title.localeCompare(b.title, 'zh'))
  for (const p of list) lines.push(`| [${p.title}](${p.url}) | ${p.zone} |`)
}

const raw = readFileSync(FILE, 'utf8')
const re = new RegExp(`${START.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s\\S]*?${END.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`)
if (!re.test(raw)) throw new Error(`${FILE} 缺少 AUTO-GEN 区段`)
writeFileSync(FILE, raw.replace(re, `${START}\n\n${lines.join('\n')}\n\n${END}`))
console.log(`模块浏览页已生成：${sorted.length} 个模块组，${pages.length} 个页面。`)
