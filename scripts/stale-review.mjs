#!/usr/bin/env node
/**
 * 过期复核扫描 CLI（stale-review.yml 每月调用）。
 *   stale-review.mjs            人读输出（控制台）
 *   stale-review.mjs --markdown 输出 Issue 正文 markdown（空清单输出空串）
 */
import { readFileSync } from 'node:fs'
import { walkMd } from './lib/validate.mjs'
import { reviewAll, renderMarkdown } from './lib/stale.mjs'

const files = walkMd('docs').map((path) => ({ path, raw: readFileSync(path, 'utf8') }))
const hits = reviewAll(files)

if (process.argv.includes('--markdown')) {
  process.stdout.write(renderMarkdown(hits) + '\n')
} else if (!hits.length) {
  console.log('没有超期页面，全部在 12 个月复核期内。')
} else {
  console.log(renderMarkdown(hits))
  console.log(`\n共 ${hits.length} 个页面待复核。用 --markdown 输出 Issue 正文格式。`)
}
