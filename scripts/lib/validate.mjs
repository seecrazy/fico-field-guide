/**
 * 结构校验（设计规则 1-3 的机器执行者）。
 *
 * 硬性（error，CI 阻断）：
 *   - docs/03-config-notes/ 下所有 .md          配置笔记
 *   - docs/01-daily-ops/errors/ 下所有 .md      报错速查（index.md 除外）
 *   - docs/01-daily-ops/error-cookbook.md   单文件形态的报错速查（若存在）
 *   以上页面必须：title / verifiedOn(合法日期) / verifiedEnv 齐备；
 *   正文含「验证 T-Code / 验证判据 / 失败对照」三元组；含「| 根因」排序表。
 *
 * 软性（warn，--strict 时阻断）：
 *   - 其余 docs/ 内容页缺 verifiedOn 时提醒（00-about、99-contribute、tcode-index、index 豁免）。
 */
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { parseFrontmatter, isValidDate } from './frontmatter.mjs'

const DOCS = 'docs'
const TRIPLE = ['验证 T-Code', '验证判据', '失败对照']

export function walkMd(dir) {
  const out = []
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) {
      if (name === '.vitepress' || name === 'node_modules') continue
      out.push(...walkMd(p))
    } else if (name.endsWith('.md')) {
      out.push(p)
    }
  }
  return out
}

/** 判定文件归属的规则集；返回 null 表示不校验 */
export function ruleFor(relPath) {
  if (relPath.startsWith('docs/03-config-notes/') && relPath.endsWith('.md')) return 'hard'
  if (relPath.startsWith('docs/01-daily-ops/errors/')) {
    return relPath === 'docs/01-daily-ops/errors/index.md' ? null : 'hard'
  }
  if (relPath === 'docs/01-daily-ops/error-cookbook.md') return 'hard'
  return null
}

const WARN_EXEMPT = (rel) =>
  rel === 'docs/index.md' ||
  rel.startsWith('docs/00-about/') ||
  rel.startsWith('docs/99-contribute/') ||
  rel.startsWith('docs/public/') ||
  rel === 'docs/tcode-index.md'

export function validateContent(relPath, raw) {
  const errors = []
  const warnings = []

  const parsed = parseFrontmatter(raw)
  if (!parsed) {
    errors.push('缺少 frontmatter（必须以 `---` 块开头）')
    return { relPath, errors, warnings }
  }
  const { data, body } = parsed

  if (!data.title) errors.push('frontmatter 缺少 title')
  if (!data.verifiedOn) {
    errors.push('frontmatter 缺少 verifiedOn（设计规则 2）')
  } else if (!isValidDate(data.verifiedOn)) {
    errors.push(`verifiedOn 不是合法日期(YYYY-MM-DD)：${data.verifiedOn}`)
  }
  if (!data.verifiedEnv) errors.push('frontmatter 缺少 verifiedEnv')

  for (const mark of TRIPLE) {
    if (!body.includes(mark)) errors.push(`正文缺少「${mark}」（验证三元组，设计规则 1）`)
  }
  if (!body.includes('| 根因')) {
    errors.push('正文缺少「| 根因」排序表（设计规则 3）')
  }
  return { relPath, errors, warnings }
}

export function validateAll({ docsDir = DOCS } = {}) {
  const problems = []
  const warnings = []
  const checked = []

  if (!existsSync(docsDir)) return { ok: false, problems: [{ relPath: docsDir, errors: ['docs 目录不存在'], warnings: [] }], warnings, checked }

  for (const file of walkMd(docsDir)) {
    const relPath = relative('.', file)
    const raw = readFileSync(file, 'utf8')
    const rule = ruleFor(relPath)
    if (rule === 'hard') {
      const res = validateContent(relPath, raw)
      checked.push(relPath)
      if (res.errors.length) problems.push(res)
    } else if (!WARN_EXEMPT(relPath) && !parseFrontmatter(raw)?.data.verifiedOn) {
      warnings.push(`${relPath}：建议补充 verifiedOn（非阻断）`)
    }
  }
  return { ok: problems.length === 0, problems, warnings, checked }
}
