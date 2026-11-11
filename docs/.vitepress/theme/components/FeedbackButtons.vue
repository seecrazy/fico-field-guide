<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { NEW_ISSUE_URLS } from '../config'
import badges from '../badges.data.json'

const { frontmatter, page } = useData()

// frontmatter.feedback: false 可关闭（首页、关于页等）
const enabled = computed(() => frontmatter.value.feedback !== false)

const relativePath = computed(() => page.value.relativePath || '')

const pageBadge = computed(() => {
  const pages: Record<string, { useful?: number; error?: number }> = (badges as any).pages || {}
  return pages[relativePath.value] || { useful: 0, error: 0 }
})

const issueTitle = (kind: '有用' | '勘误') => {
  const title: string = (frontmatter.value.title as string) || relativePath.value
  return encodeURIComponent(`[${kind}] ${title} — ${relativePath.value}`)
}

const usefulUrl = computed(() => `${NEW_ISSUE_URLS.useful}&title=${issueTitle('有用')}`)
const errorUrl = computed(() => `${NEW_ISSUE_URLS.error}&title=${issueTitle('勘误')}`)
</script>

<template>
  <div v-if="enabled" class="vfg-feedback">
    <div class="vfg-feedback__badges">
      <span v-if="pageBadge.useful > 0" class="vfg-badge vfg-badge--useful">
        ✅ {{ pageBadge.useful }} 人标记有用
      </span>
      <span v-if="pageBadge.error > 0" class="vfg-badge vfg-badge--error">
        ⚠️ 有 {{ pageBadge.error }} 条未处理勘误
      </span>
    </div>
    <p class="vfg-feedback__hint">这页内容帮你解决问题了吗？你的反馈决定内容去留（见贡献指南）。</p>
    <div class="vfg-feedback__actions">
      <a class="vfg-btn vfg-btn--useful" :href="usefulUrl" target="_blank" rel="noopener">
        👍 这页解决了我的问题
      </a>
      <a class="vfg-btn vfg-btn--error" :href="errorUrl" target="_blank" rel="noopener">
        🐞 这页有误 / 过时
      </a>
    </div>
  </div>
</template>

<style scoped>
.vfg-feedback {
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid var(--vp-c-border);
}
.vfg-feedback__badges {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 8px;
}
.vfg-badge {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 500;
}
.vfg-badge--useful {
  background: rgba(34, 197, 94, 0.12);
  color: var(--vp-button-brand-text);
  border: 1px solid rgba(34, 197, 94, 0.45);
}
.vfg-badge--error {
  background: rgba(239, 68, 68, 0.10);
  color: var(--vp-c-danger-1);
  border: 1px solid rgba(239, 68, 68, 0.45);
}
.vfg-feedback__hint {
  margin: 0 0 12px;
  font-size: 14px;
  color: var(--vp-c-text-2);
}
.vfg-feedback__actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.vfg-btn {
  display: inline-block;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  border: 1px solid transparent;
  transition: opacity 0.2s;
}
.vfg-btn:hover {
  opacity: 0.85;
}
.vfg-btn--useful {
  background: var(--vp-button-brand-bg);
  color: var(--vp-button-brand-text);
}
.vfg-btn--error {
  background: transparent;
  color: var(--vp-c-danger-1);
  border-color: var(--vp-c-danger-1);
}
</style>
