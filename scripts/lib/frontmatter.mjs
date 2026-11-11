/**
 * 轻量 YAML frontmatter 解析（零依赖）。
 * 只覆盖本站用到的子集：`key: value`、`key: [a, b]`、带引号标量。
 * 复杂结构请勿写入 frontmatter —— 结构化数据规范见 docs/00-about/conventions.md。
 */

const FM_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/

function stripQuotes(s) {
  if (
    (s.startsWith('"') && s.endsWith('"') && s.length >= 2) ||
    (s.startsWith("'") && s.endsWith("'") && s.length >= 2)
  ) {
    return s.slice(1, -1)
  }
  return s
}

export function parseFrontmatter(raw) {
  const m = FM_RE.exec(raw)
  if (!m) return null
  const data = {}
  for (const line of m[1].split(/\r?\n/)) {
    const kv = /^([A-Za-z0-9_][A-Za-z0-9_\- ]*):\s*(.*)$/.exec(line)
    if (!kv) continue
    const key = kv[1].trim()
    let val = kv[2].trim()
    if (val === '') {
      data[key] = null
      continue
    }
    if (val.startsWith('[') && val.endsWith(']')) {
      data[key] = val
        .slice(1, -1)
        .split(',')
        .map((s) => stripQuotes(s.trim()))
        .filter(Boolean)
    } else {
      data[key] = stripQuotes(val)
    }
  }
  return { data, body: raw.slice(m[0].length) }
}

export function isValidDate(s) {
  if (typeof s !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return false
  const [y, mo, d] = s.split('-').map(Number)
  const dt = new Date(Date.UTC(y, mo - 1, d))
  return dt.getUTCFullYear() === y && dt.getUTCMonth() === mo - 1 && dt.getUTCDate() === d
}
