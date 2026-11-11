/**
 * T-Code 总索引生成器：扫描全站 frontmatter 的 tcodes 字段，
 * 汇总为「T-Code → 出现页面」反查表，写入 docs/tcode-index.md 的 AUTO-GEN 区段。
 * 「3 次点击到达」的导航保障由本脚本 + 侧边栏共同兜底。
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { relative } from 'node:path'
import { walkMd } from './validate.mjs'
import { parseFrontmatter } from './frontmatter.mjs'

export const START = '<!-- AUTO-GEN:START (do not edit; run: npm run tcode-index) -->'
export const END = '<!-- AUTO-GEN:END -->'

export function normalizeTcodes(val) {
  if (val == null) return []
  const arr = Array.isArray(val) ? val : String(val).split(',')
  return arr.map((s) => stripQ(String(s).trim())).filter(Boolean)
}

function stripQ(s) {
  return (s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))
    ? s.slice(1, -1)
    : s
}

export function collectTcodes(docsDir, files) {
  const map = new Map() // tcode -> Set(relPath)
  const titles = new Map() // relPath -> title
  for (const file of files) {
    const parsed = parseFrontmatter(readFileSync(file, 'utf8'))
    if (!parsed) continue
    // 以 docsDir 为基准取相对路径（显式基准，避免 cwd / 符号链接差异）
    const relPath = relative(docsDir, file).replace(/\.md$/, '')
    if (relPath === 'tcode-index') continue
    titles.set(relPath, parsed.data.title || relPath)
    for (const tc of normalizeTcodes(parsed.data.tcodes)) {
      if (!map.has(tc)) map.set(tc, new Set())
      map.get(tc).add(relPath)
    }
  }
  return { map, titles }
}

export function renderIndex({ map, titles }) {
  const lines = [
    '> 本表由 `npm run tcode-index` 自动生成，请勿手改；为页面补充 frontmatter 的 `tcodes` 字段即可收录。',
    '',
    '| T-Code | 出现页面 |',
    '|---|---|',
  ]
  const sorted = [...map.keys()].sort((a, b) => a.localeCompare(b))
  for (const tc of sorted) {
    const pages = [...map.get(tc)].sort().map((p) => {
      const title = titles.get(p) || p
      return `[\`${p.split('/').pop()}\`](/${p})（${title}）`
    })
    lines.push(`| \`${tc}\` | ${pages.join('、')} |`)
  }
  return lines.join('\n')
}

export function updateIndexFile(indexPath, docsDir) {
  if (!existsSync(indexPath)) {
    throw new Error(`缺少模板文件 ${indexPath}，请先创建（含 AUTO-GEN 区段标记）`)
  }
  const files = walkMd(docsDir)
  const { map, titles } = collectTcodes(docsDir, files)
  const raw = readFileSync(indexPath, 'utf8')
  const re = new RegExp(`${START.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s\\S]*?${END.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`)
  if (!re.test(raw)) throw new Error(`${indexPath} 缺少 AUTO-GEN 区段标记`)
  const count = map.size
  const updated = raw.replace(re, `${START}\n\n共收录 ${count} 个 T-Code。\n\n${renderIndex({ map, titles })}\n\n${END}`)
  writeFileSync(indexPath, updated)
  return { count, pages: titles.size }
}
