#!/usr/bin/env node
/**
 * 徽章数据生成 CLI。
 *   gen-badges.mjs                从 GitHub（gh api，需 GH_TOKEN）统计并写入 badges.data.json
 *   gen-badges.mjs --demo         写入演示数据（本地预览徽章效果）
 *   gen-badges.mjs --if-missing   仅当当前为占位数据时生成（用于 docs:build，避免无凭证构建失败）
 */
import { writeFileSync, readFileSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { PLACEHOLDER, aggregate, fetchIssues, demoData } from './lib/badges.mjs'

const OUT = 'docs/.vitepress/theme/badges.data.json'
const args = process.argv.slice(2)

const current = readFileSync(OUT, 'utf8')
if (args.includes('--if-missing') && !current.includes('"placeholder"')) {
  console.log('badges.data.json 已有真实数据，跳过生成。')
  process.exit(0)
}

let data
if (args.includes('--demo')) {
  const d = demoData()
  data = { generatedAt: new Date().toISOString(), source: d.source, pages: d.pages }
} else {
  // 仓库 slug 从 git remote 推导；失败则退回占位数据（不阻断构建）
  let slug = null
  try {
    const url = execSync('git remote get-url origin', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim()
    slug = url.replace(/^git@github\.com:/, 'https://github.com/').replace(/^https?:\/\/github\.com\//, '').replace(/\.git$/, '')
  } catch {}
  try {
    if (!slug) throw new Error('无法解析 git remote origin')
    const issues = fetchIssues(slug)
    const agg = aggregate(issues)
    data = { generatedAt: new Date().toISOString(), source: `github:${slug}`, pages: agg.pages }
    console.log(`徽章数据已生成（useful=${agg.totals.useful}, error 未关闭=${agg.totals.errorOpen}）。`)
  } catch (e) {
    console.warn(`WARN 无法从 GitHub 获取 Issue（${e.message}），保留占位数据。`)
    process.exit(0)
  }
}

writeFileSync(OUT, JSON.stringify(data, null, 2) + '\n')
