<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { withBase } from 'vitepress'
import data from '../.vitepress/theme/quickjump.data.json'

const items = (data as any).items as Array<{ k: string; label: string; url: string; type: string }>

const q = ref('')
const open = ref(false)
const active = ref(0)
const inputEl = ref<HTMLInputElement | null>(null)

const norm = (s: string) => s.replace(/\s+/g, '').toUpperCase()

const results = computed(() => {
  const query = q.value.trim()
  if (!query) return []
  const nq = norm(query)
  const scored: Array<{ item: typeof items[0]; score: number }> = []
  for (const it of items) {
    const nk = norm(it.k)
    let score = -1
    if (nk === nq) score = 100
    else if (nk.startsWith(nq)) score = 80 - Math.min(nk.length, 40)
    else if (nk.includes(nq)) score = 50
    else if (norm(it.label).includes(nq)) score = 30
    if (score > 0) scored.push({ item: it, score })
  }
  scored.sort((a, b) => b.score - a.score)
  return scored.slice(0, 8).map((s) => s.item)
})

const jump = (url: string) => {
  window.location.href = withBase(url)
}

// Enter 走原生 form submit（浏览器默认行为，不依赖 keydown 冒泡链）
const onSubmit = () => {
  // 水合竞态兜底：以 DOM 实际输入为准（水合前键入的字符不会进 v-model）
  if (inputEl.value && inputEl.value.value !== q.value) q.value = inputEl.value.value
  const r = results.value[active.value] || results.value[0]
  if (r) jump(r.url)
}

const onKey = (e: KeyboardEvent) => {
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    open.value = true
    active.value = Math.min(active.value + 1, results.value.length - 1)
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    active.value = Math.max(active.value - 1, 0)
  } else if (e.key === 'Escape') {
    open.value = false
  }
}

// 全局 ⌘K / Ctrl+K：非输入态聚焦直达条（'/' 已被 VitePress 内置搜索占用）
const globalKey = (e: KeyboardEvent) => {
  const t = e.target as HTMLElement
  const typing = t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k' && !typing) {
    e.preventDefault()
    open.value = true
    nextTick(() => inputEl.value?.focus())
  }
}
onMounted(() => {
  window.addEventListener('keydown', globalKey)
  window.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', globalKey)
  window.removeEventListener('keydown', onKey)
})

const typeClass = (t: string) => (t === 'T-Code' ? 'qj-t' : t === '消息号' ? 'qj-m' : 'qj-p')
</script>

<template>
  <div class="qj">
    <span class="qj__hint">
      <kbd>⌘K</kbd> 直达
    </span>
    <form class="qj__form" @submit.prevent="onSubmit">
      <input
        ref="inputEl"
        v-model="q"
        class="qj__input"
        type="search"
        placeholder="FB50 · F5 702 · 月结 … 输入后回车直达"
        aria-label="快速直达：T-Code / 消息号 / 页面关键词"
        @focus="open = true"
        @keydown="onKey"
      />
    </form>
    <div v-if="open && results.length" class="qj__panel">
      <a
        v-for="(r, i) in results"
        :key="r.url + r.k"
        :href="withBase(r.url)"
        class="qj__item"
        :class="{ 'qj__item--active': i === active }"
        @mouseenter="active = i"
      >
        <span class="qj__type" :class="typeClass(r.type)">{{ r.type }}</span>
        <span class="qj__label">{{ r.label }}</span>
      </a>
    </div>
    <div v-else-if="open && q.trim() && !results.length" class="qj__panel qj__panel--empty">
      没有直达项。试 <a :href="withBase('/search')">全文搜索</a> 或 <a :href="withBase('/diagnose')">问题诊断中心</a>
    </div>
  </div>
</template>

<style scoped>
.qj {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  max-width: 860px;
  margin: 0 auto;
  padding: 8px 0;
}
.qj__hint {
  font-size: 12px;
  color: var(--vp-c-text-3);
  white-space: nowrap;
}
kbd {
  border: 1px solid var(--vp-c-border);
  border-radius: 4px;
  padding: 0 5px;
  font-size: 11px;
  background: var(--vp-c-default-soft);
}
.qj__form {
  flex: 1;
  display: flex;
}
.qj__input {
  flex: 1;
  padding: 7px 12px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 13px;
  outline: none;
}
.qj__input:focus {
  border-color: var(--vp-c-brand-2);
}
.qj__panel {
  position: absolute;
  top: 100%;
  left: 44px;
  right: 0;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 10px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
  z-index: 60;
  padding: 6px;
}
.qj__item {
  display: flex;
  gap: 8px;
  align-items: center;
  width: 100%;
  border: 0;
  background: transparent;
  padding: 8px 10px;
  border-radius: 6px;
  cursor: pointer;
  text-align: left;
  color: var(--vp-c-text-1);
}
.qj__item--active {
  background: var(--vp-c-brand-soft);
}
.qj__type {
  font-size: 11px;
  padding: 1px 7px;
  border-radius: 999px;
  white-space: nowrap;
}
.qj-t {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}
.qj-m {
  background: rgba(239, 68, 68, 0.12);
  color: var(--vp-c-danger-1);
}
.qj-p {
  background: var(--vp-c-default-soft);
  color: var(--vp-c-text-2);
}
.qj__label {
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.qj__panel--empty {
  padding: 12px;
  font-size: 13px;
  color: var(--vp-c-text-2);
}
</style>
