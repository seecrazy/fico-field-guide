#!/usr/bin/env node
/**
 * AI 修 Issue（fix-issue.yml 调用；也可本地跑）。
 *
 * 流程：从 Issue 标题提取页面路径 → 读取页面 → 调 GLM API 按写作规范修订
 * → 结构校验（check-structure）→ 通过则建分支开 PR；不通过则回评论请人工处理。
 *
 * 配置（仓库 Secrets / 环境变量）：
 *   GLM_API_KEY   必填（未配置时安全退出，不报错）
 *   AI_FIX_MODEL  可选，默认 glm-4.6
 *   ISSUE_NUMBER / ISSUE_TITLE / ISSUE_BODY  由 workflow 注入
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { execSync } from 'node:child_process'

const API = 'https://open.bigmodel.cn/api/paas/v4/chat/completions'
const MODEL = process.env.AI_FIX_MODEL || 'glm-4.6'

const sh = (cmd) => execSync(cmd, { encoding: 'utf8' }).trim()

function extractPagePath(title) {
  const m = /—\s*(docs\/[A-Za-z0-9_\-/]+\.md)/.exec(title || '')
  return m ? m[1] : null
}

function comment(msg) {
  const n = process.env.ISSUE_NUMBER
  if (!n || !process.env.GH_TOKEN) {
    console.log(`[dry] 评论 #${n || '?'}: ${msg}`)
    return
  }
  execSync(`gh issue comment ${n} --body-file -`, { input: msg, stdio: ['pipe', 'inherit', 'inherit'] })
}

async function main() {
  const title = process.env.ISSUE_TITLE || ''
  const body = process.env.ISSUE_BODY || ''

  // 1. 提取页面路径（Issue 模板预填 `— docs/xxx.md`）
  const path = extractPagePath(title)
  if (!path || !existsSync(path)) {
    await comment(
      `🤖 AI 修复未启动：无法从 Issue 标题解析出有效的页面路径（期望形如 \`— docs/xx.md\`）。请按页面底部「🐞 这页有误」按钮发起 Issue 以自动预填。`,
    )
    return
  }

  // 2. 密钥检查（未配置则安全退出，不阻塞 workflow 绿标）
  if (!process.env.GLM_API_KEY) {
    console.log('GLM_API_KEY 未配置，跳过 AI 修复。配置路径：仓库 Settings → Secrets → Actions → GLM_API_KEY。')
    return
  }

  const today = new Date().toISOString().slice(0, 10)
  const original = readFileSync(path, 'utf8')

  // 3. 调模型修订（系统提示与贡献指南硬规则一致）
  const system = [
    '你是《SAP FICO 顾问实战手册》的维护者，按读者勘误 Issue 修订一个 Markdown 页面。',
    '硬规则：',
    '1. 保留 YAML frontmatter 结构，仅把 verifiedOn 更新为今天，其余字段不动。',
    '2. 正文必须保留三行粗体标记（逐字）：**验证 T-Code**：、**验证判据**：、**失败对照**：，并保留表头含「| 根因」的表格。',
    '3. 把读者报告的现象/正确做法合并进根因表（按概率重新排序）或相应小节；不相关内容不要改。',
    '4. 公司代码一律 1000，不引入真实客户数据；不确定的表述写「以你的系统为准」。',
    '5. 只输出修订后的完整 Markdown 全文，不要任何解释、不要代码围栏。',
  ].join('\n')

  console.log(`调用 ${MODEL} 修订 ${path} …`)
  const resp = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.GLM_API_KEY}` },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: `## 勘误 Issue\n标题：${title}\n正文：${body}\n\n## 当前页面全文\n${original}\n\n今天日期：${today}` },
      ],
      temperature: 0.2,
      max_tokens: 8000,
    }),
  })
  if (!resp.ok) {
    await comment(`🤖 AI 修复失败：模型接口返回 ${resp.status}，请人工处理或稍后重跑（重打 ai-fix 标签）。`)
    return
  }
  const data = await resp.json()
  let revised = (data.choices?.[0]?.message?.content || '').trim()
  // 剥掉模型偶尔加的代码围栏
  revised = revised.replace(/^```(?:markdown|md)?\n/, '').replace(/\n```$/, '')
  if (!revised.includes('**验证 T-Code**：') || !revised.includes('| 根因')) {
    await comment('🤖 AI 修订稿缺少验证三元组或根因表（模型输出不符合模板），已放弃，请人工处理。')
    return
  }

  // 4. 结构校验闸门：不过就回滚并请人工
  writeFileSync(path, revised + '\n')
  try {
    sh('node scripts/check-structure.mjs')
  } catch {
    sh(`git checkout -- ${path}`)
    await comment('🤖 AI 修订稿未通过结构校验（check-structure），已回滚，请人工处理。')
    return
  }

  // 5. 校验通过：建分支、提交、开 PR
  const n = process.env.ISSUE_NUMBER
  const branch = `fix/issue-${n || 'local'}`
  sh(`git config user.name "github-actions[bot]"`)
  sh(`git config user.email "41898282+github-actions[bot]@users.noreply.github.com"`)
  sh(`git checkout -b ${branch}`)
  sh(`git add ${path}`)
  sh(`git commit -m "fix(ai): 根据勘误 Issue #${n || '-'} 修订 ${path}"`)
  if (process.env.GH_TOKEN && n) {
    sh(`git push origin ${branch}`)
    const prBody = `本 PR 由 AI 根据 #${n} 自动生成（fix-issue.yml），已通过结构校验。请人工 review 内容后合并。\n\nCloses #${n}`
    execSync(`gh pr create --title "fix(ai): ${title.replace(/^\[[^\]]+\]\s*/, '').slice(0, 60)}" --body "${prBody.replace(/\n/g, ' ')}" --base main --head ${branch}`, { stdio: 'inherit' })
    console.log(`PR 已创建，指向 #${n}。`)
  } else {
    console.log(`本地模式：修订已提交到分支 ${branch}，未创建 PR。`)
  }
}

main().catch((e) => {
  console.error('AI 修复流程异常：', e.message)
  process.exit(0) // 不让 workflow 红标，问题走 Issue 评论沟通
})
