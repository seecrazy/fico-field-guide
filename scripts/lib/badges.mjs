/**
 * 读者反哺徽章数据生成（设计 §6）。
 * 从 GitHub Issue 标题中提取页面路径（Issue 模板预填 `[有用] 标题 — docs/xxx.md`），
 * 统计 useful（全部）与 error（仅未关闭）计数，写入 theme/badges.data.json，
 * 由 FeedbackButtons.vue 构建时静态 import —— 站点运行时零 API 调用。
 */
import { execSync } from 'node:child_process'

export const PLACEHOLDER = { generatedAt: null, source: 'placeholder', pages: {} }

export function extractPagePath(title) {
  if (typeof title !== 'string') return null
  const m = /—\s*(docs\/[A-Za-z0-9_\-/]+\.md)/.exec(title)
  return m ? m[1] : null
}

/** issues: [{title, state, labels?}] → {pages, totals} */
export function aggregate(issues) {
  const pages = {}
  let usefulTotal = 0
  let errorOpen = 0
  for (const it of issues) {
    const labels = (it.labels || []).map(String)
    const path = extractPagePath(it.title)
    const key = path || '(未识别页面)'
    if (labels.includes('useful') || it.title.startsWith('[有用]')) {
      usefulTotal++
      pages[key] = pages[key] || { useful: 0, error: 0 }
      pages[key].useful++
    }
    if ((labels.includes('error') || it.title.startsWith('[勘误]')) && it.state !== 'closed') {
      errorOpen++
      pages[key] = pages[key] || { useful: 0, error: 0 }
      pages[key].error++
    }
  }
  return { pages, totals: { useful: usefulTotal, errorOpen } }
}

export function fetchIssues(repoSlug) {
  const cmd = `gh api "repos/${repoSlug}/issues?state=all&per_page=100" --jq '[.[] | select(.pull_request == null) | {title: .title, state: .state, labels: [.labels[].name]}]'`
  return JSON.parse(execSync(cmd, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }))
}

export function demoData() {
  const issues = [
    { title: '[有用] OBYC — MM-FI 自动记账科目确定 — docs/03-config-notes/mm-fi-obyc.md', state: 'closed', labels: ['useful'] },
    { title: '[有用] OBYC — MM-FI 自动记账科目确定 — docs/03-config-notes/mm-fi-obyc.md', state: 'closed', labels: ['useful'] },
    { title: '[有用] 高频 T-Code 卡片 — docs/01-daily-ops/tcode-cards.md', state: 'closed', labels: ['useful'] },
    { title: '[勘误] 月结检查清单 — docs/01-daily-ops/month-end-checklist.md', state: 'open', labels: ['error'] },
  ]
  return { ...aggregate(issues), source: 'demo' }
}
