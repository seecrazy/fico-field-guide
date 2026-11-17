<script setup lang="ts">
import { ref, computed } from 'vue'
import { withBase } from 'vitepress'
import data from '../.vitepress/theme/diagnosis.data.json'

const entries = (data as any).entries as Array<{
  url: string
  title: string
  module: string
  type: string
  confidence: string
  symptoms: string[]
}>
const tags = (data as any).tags as string[]

const query = ref('')
const activeTags = ref<string[]>([])

const toggle = (t: string) => {
  activeTags.value = activeTags.value.includes(t)
    ? activeTags.value.filter((x) => x !== t)
    : [...activeTags.value, t]
}

// 中文无分词，用 2-gram 重叠率做模糊匹配：查询「收货没有凭证」可命中「收货没有 FI 凭证」
const bigrams = (s: string) => {
  const t = s.replace(/\s+/g, '').toLowerCase()
  const out = new Set<string>()
  for (let i = 0; i < t.length - 1; i++) out.add(t.slice(i, i + 2))
  return out
}
const fuzzyHit = (target: string, qSet: Set<string>) => {
  if (target.toLowerCase().includes([...qSet].join(''))) return true
  const tb = bigrams(target)
  let hit = 0
  for (const b of qSet) if (tb.has(b)) hit++
  return qSet.size > 0 && hit / qSet.size >= 0.4
}

const results = computed(() => {
  const q = query.value.trim()
  const qSet = bigrams(q)
  return entries.filter((e) => {
    const hitTag = activeTags.value.length === 0 || activeTags.value.every((t) => e.symptoms.includes(t))
    const hitQuery =
      !q ||
      fuzzyHit(e.title, qSet) ||
      e.symptoms.some((s) => fuzzyHit(s, qSet)) ||
      fuzzyHit(e.module, qSet)
    return hitTag && hitQuery
  })
})

const reset = () => {
  query.value = ''
  activeTags.value = []
}
</script>

<template>
  <div class="diag">
    <div class="diag__search">
      <input
        v-model="query"
        class="diag__input"
        type="search"
        placeholder="描述你遇到的现象，例如：收货没有凭证 / 借贷不平 / 折旧跑不动…"
        aria-label="按现象搜索"
      />
      <span class="diag__count" v-if="results.length">{{ results.length }} 条排查路径</span>
      <button v-if="query || activeTags.length" class="diag__reset" @click="reset">重置</button>
    </div>

    <div class="diag__tags">
      <button
        v-for="t in tags"
        :key="t"
        class="diag__tag"
        :class="{ 'diag__tag--active': activeTags.includes(t) }"
        @click="toggle(t)"
      >
        {{ t }}
      </button>
    </div>

    <div v-if="results.length" class="diag__results">
      <a v-for="e in results" :key="e.url" :href="withBase(e.url)" class="diag__card">
        <div class="diag__card-head">
          <span class="diag__type" :class="`diag__type--${e.type === '排查实战' ? 'case' : 'error'}`">{{ e.type }}</span>
          <span class="diag__module">{{ e.module }}</span>
          <span v-if="e.confidence" class="diag__conf">可信度 {{ e.confidence }}</span>
        </div>
        <div class="diag__title">{{ e.title }}</div>
        <div class="diag__symptoms">
          <span v-for="s in e.symptoms" :key="s" class="diag__sym">{{ s }}</span>
        </div>
      </a>
    </div>
    <div v-else class="diag__empty">
      没有匹配的排查路径。换个说法试试（如科目、期间、折旧、付款、清账），或去
      <a :href="withBase('/99-contribute/how-to-contribute')">提一个内容请求</a>。
    </div>
  </div>
</template>

<style scoped>
.diag {
  margin: 8px 0 24px;
}
.diag__search {
  display: flex;
  gap: 10px;
  align-items: center;
}
.diag__input {
  flex: 1;
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}
.diag__input:focus {
  border-color: var(--vp-c-brand-2);
}
.diag__count {
  font-size: 13px;
  color: var(--vp-c-text-2);
  white-space: nowrap;
}
.diag__reset {
  border: 1px solid var(--vp-c-border);
  background: transparent;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 13px;
  color: var(--vp-c-text-2);
  cursor: pointer;
}
.diag__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 12px 0 16px;
}
.diag__tag {
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg);
  border-radius: 999px;
  padding: 3px 12px;
  font-size: 13px;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.15s;
}
.diag__tag:hover {
  border-color: var(--vp-c-brand-2);
  color: var(--vp-c-brand-1);
}
.diag__tag--active {
  background: var(--vp-c-brand-2);
  border-color: var(--vp-c-brand-2);
  color: #fff;
}
.diag__results {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 12px;
}
.diag__card {
  display: block;
  border: 1px solid var(--vp-c-border);
  border-radius: 10px;
  padding: 12px 14px;
  text-decoration: none;
  background: var(--vp-c-bg);
  transition: border-color 0.2s, box-shadow 0.2s;
}
.diag__card:hover {
  border-color: var(--vp-c-brand-2);
  box-shadow: 0 6px 18px rgba(37, 99, 235, 0.10);
}
.diag__card-head {
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 6px;
  font-size: 12px;
}
.diag__type {
  padding: 1px 8px;
  border-radius: 999px;
  font-weight: 600;
}
.diag__type--error {
  background: rgba(239, 68, 68, 0.12);
  color: var(--vp-c-danger-1);
}
.diag__type--case {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}
.diag__module {
  color: var(--vp-c-text-3);
}
.diag__conf {
  margin-left: auto;
  color: var(--vp-c-text-3);
}
.diag__title {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 8px;
}
.diag__symptoms {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.diag__sym {
  font-size: 12px;
  color: var(--vp-c-text-2);
  background: var(--vp-c-default-soft);
  border-radius: 4px;
  padding: 1px 6px;
}
.diag__empty {
  padding: 24px;
  text-align: center;
  color: var(--vp-c-text-2);
  border: 1px dashed var(--vp-c-border);
  border-radius: 10px;
}
</style>
