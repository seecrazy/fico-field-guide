/**
 * 过期复核扫描（维护者侧的「不过时」机制补全）。
 *
 * 站点侧降级（VerifiedBanner 三级提示）作用于读者；本模块作用于维护者：
 * stale-review.yml 每月跑一次，把超期页面清单开成 Issue 提醒复核，
 * 复核完成的页面更新 verifiedOn 后自动退出清单。
 *
 * 阈值与 docs/.vitepress/config.mts 的 STALE_*_DAYS 保持同步（12/24 个月）。
 */
import { readFileSync } from 'node:fs'
import { relative } from 'node:path'
import { parseFrontmatter } from './frontmatter.mjs'

export const STALE_WARN_DAYS = 365
export const STALE_STALE_DAYS = 730

/** 单页判定：返回 null（未过期/无日期）或 { path, title, verifiedOn, days, level } */
export function reviewPage(file, raw, now = Date.now()) {
  const parsed = parseFrontmatter(raw)
  if (!parsed?.data.verifiedOn) return null
  const t = Date.parse(parsed.data.verifiedOn)
  if (Number.isNaN(t)) return null
  const days = Math.floor((now - t) / 86_400_000)
  const level = days > STALE_STALE_DAYS ? 'stale' : days > STALE_WARN_DAYS ? 'warn' : 'fresh'
  if (level === 'fresh') return null
  return {
    path: relative('.', file),
    title: parsed.data.title || parsed.data.verifiedOn,
    verifiedOn: parsed.data.verifiedOn,
    days,
    level,
  }
}

/** 全站扫描：超期页面按天数降序（最旧的排最前，先复核最旧的） */
export function reviewAll(files, now = Date.now()) {
  const hits = []
  for (const f of files) {
    const hit = reviewPage(f.path, f.raw, now)
    if (hit) hits.push(hit)
  }
  return hits.sort((a, b) => b.days - a.days)
}

/** Issue 正文渲染：空清单返回空字符串（调用方据此跳过开 Issue） */
export function renderMarkdown(hits) {
  if (!hits.length) return ''
  const stale = hits.filter((h) => h.level === 'stale').length
  const warn = hits.length - stale
  const lines = [
    `共 **${hits.length}** 个页面超期未复核（🚨 超 24 个月 ${stale} 个，⚠️ 12-24 个月 ${warn} 个）。`,
    '',
    '处理方式：复核内容 → 更新 frontmatter `verifiedOn` → 提交并关闭本 Issue。',
    '站点侧的读者降级提示在每次部署时自动计算，无需手工标记。',
    '',
    '| 页面 | 验证于 | 已超（天） | 级别 |',
    '|---|---|---|---|',
  ]
  for (const h of hits) {
    const badge = h.level === 'stale' ? '🚨 严重' : '⚠️ 警告'
    lines.push(`| [${h.title}](../blob/main/${h.path}) | ${h.verifiedOn} | ${h.days} | ${badge} |`)
  }
  return lines.join('\n')
}
