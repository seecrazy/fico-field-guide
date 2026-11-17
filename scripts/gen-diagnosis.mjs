#!/usr/bin/env node
/**
 * 问题诊断中心数据生成（外部评审建议 #1 落地）。
 * 扫描报错条目与排查案例 frontmatter 的 symptoms/title/module/confidence，
 * 聚合为 theme/diagnosis.data.json，由 DiagnoseHub.vue 构建时静态 import。
 * 用法：node scripts/gen-diagnosis.mjs（已并入 docs:build 前置）
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { relative } from 'node:path'
import { walkMd } from './lib/validate.mjs'
import { parseFrontmatter } from './lib/frontmatter.mjs'

const DIRS = ['docs/01-daily-ops/errors', 'docs/04-troubleshooting']
const OUT = 'docs/.vitepress/theme/diagnosis.data.json'

const entries = []
for (const dir of DIRS) {
  for (const file of walkMd(dir)) {
    const parsed = parseFrontmatter(readFileSync(file, 'utf8'))
    if (!parsed?.data.symptoms) continue
    if (parsed.data.feedback === false) continue // 索引页等
    const url = relative('.', file).replace(/^docs\//, '/').replace(/\.md$/, '')
    entries.push({
      url,
      title: parsed.data.title || url,
      module: parsed.data.module || 'FI/CO',
      type: url.includes('troubleshooting') ? '排查实战' : '报错速查',
      confidence: String(parsed.data.confidence || ''),
      symptoms: Array.isArray(parsed.data.symptoms) ? parsed.data.symptoms : [String(parsed.data.symptoms)],
    })
  }
}

// 全部症状标签（去重、按出现次数排序）
const freq = new Map()
for (const e of entries) for (const s of e.symptoms) freq.set(s, (freq.get(s) || 0) + 1)
const tags = [...freq.keys()]

writeFileSync(OUT, JSON.stringify({ generatedAt: new Date().toISOString(), entries, tags }, null, 2) + '\n')
console.log(`诊断中心数据已生成：${entries.length} 个条目，${tags.length} 个症状标签。`)
