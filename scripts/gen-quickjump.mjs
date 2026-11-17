#!/usr/bin/env node
/**
 * QuickJump 快速直达数据生成（"查得快"的核心抓手）。
 * FICO 顾问 90% 的查询是 T-Code / 消息号 —— 聚合三张直达表：
 *   1. T-Code → 最相关页面（详解页 > 配置笔记 > 其他）
 *   2. 消息号（从报错页标题提取，如 F5 702）→ 报错页
 *   3. 页面标题 → 页面
 * 输出 theme/quickjump.data.json，QuickJump.vue 构建时静态 import。
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { relative } from 'node:path'
import { walkMd } from './lib/validate.mjs'
import { parseFrontmatter } from './lib/frontmatter.mjs'

const OUT = 'docs/.vitepress/theme/quickjump.data.json'

// 页面优先级：数字越小越优先（同一 T-Code 多页出现时取最相关）
const priority = (url) =>
  url.includes('/tcode-cards/') ? 0 : url.includes('/03-config-notes/') ? 1 : url.includes('/04-troubleshooting/') ? 2 : 3

const tcodeMap = new Map() // normKey -> {k, label, url, type, pri}
const items = []

const push = (map, key, label, url, type) => {
  const pri = priority(url)
  const norm = key.replace(/\s+/g, '').toUpperCase()
  if (map.has(norm)) {
    if (map.get(norm).pri > pri) map.set(norm, { k: key, label, url, type, pri })
  } else {
    map.set(norm, { k: key, label, url, type, pri })
  }
}

for (const file of walkMd('docs')) {
  const parsed = parseFrontmatter(readFileSync(file, 'utf8'))
  if (!parsed) continue
  const url = relative('.', file).replace(/^docs\//, '/').replace(/\.md$/, '')
  const title = parsed.data.title || url
  if (parsed.data.feedback === false && !parsed.data.tcodes) {
    // 纯导航页也进标题索引
  }
  // T-Code
  const tcodes = Array.isArray(parsed.data.tcodes) ? parsed.data.tcodes : parsed.data.tcodes ? [parsed.data.tcodes] : []
  for (const tc of tcodes) {
    if (/^[A-Z_\-][A-Z0-9_/\-.]{1,9}$/i.test(String(tc))) push(tcodeMap, String(tc).toUpperCase(), title, url, 'T-Code')
  }
  // 消息号（标题形如 "F5 702 —"）
  const msg = /^([A-Z]{1,3} ?\d{2,4})\s*[—-]/.exec(String(title))
  if (msg) push(tcodeMap, msg[1].replace(/\s+/, ' ').toUpperCase(), title, url, '消息号')
  // 标题索引
  items.push({ k: title, label: title, url, type: '页面', norm: '' })
}

const finalItems = [
  ...[...tcodeMap.values()].map(({ k, label, url, type }) => ({ k, label: `${k} · ${label}`, url, type })),
  ...items.map(({ k, label, url, type }) => ({ k, label: `${label}`, url, type })),
]

writeFileSync(OUT, JSON.stringify({ generatedAt: new Date().toISOString(), items: finalItems }, null, 2) + '\n')
console.log(`QuickJump 数据已生成：${finalItems.length} 条直达项（含 ${tcodeMap.size} 个 T-Code/消息号）。`)
