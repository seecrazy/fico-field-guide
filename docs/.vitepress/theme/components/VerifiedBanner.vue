<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()

const info = computed(() => {
  const fm: any = frontmatter.value
  const verifiedOn: string | undefined = fm.verifiedOn
  if (!verifiedOn) return null
  const env: string = fm.verifiedEnv || '环境未标注'
  const level: string = fm.staleLevel || 'fresh'
  const days: number = fm.staleDays ?? 0
  // 构建时已注入 staleDays，这里只做展示格式化
  const monthsAgo = Math.floor(days / 30)
  const ym = verifiedOn.slice(0, 7)
  return { verifiedOn, env, level, days, monthsAgo, ym }
})

const klass = computed(() => `vfg-banner vfg-banner--${info.value?.level ?? 'fresh'}`)
</script>

<template>
  <div v-if="info" :class="klass">
    <template v-if="info.level === 'fresh'">
      <span class="vfg-banner__icon" aria-hidden="true">✅</span>
      <span>
        本页验证于 <strong>{{ info.verifiedOn }}</strong>（{{ info.env }}）。若与你的系统行为不符，请以上方报错与验证动作实测为准。
      </span>
    </template>
    <template v-else-if="info.level === 'warn'">
      <span class="vfg-banner__icon" aria-hidden="true">⚠️</span>
      <span>
        本页验证于 <strong>{{ info.ym }}</strong>，已约 {{ info.monthsAgo }} 个月未复核，可能已过时，请自行验证后再采用。
      </span>
    </template>
    <template v-else>
      <span class="vfg-banner__icon" aria-hidden="true">🚨</span>
      <span>
        本页验证于 <strong>{{ info.ym }}</strong>，已超过 24 个月未复核，内容大概率已偏离当前版本，务必自行验证。
      </span>
    </template>
  </div>
</template>

<style scoped>
.vfg-banner {
  margin: 0 0 16px;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.7;
  border: 1px solid transparent;
}
.vfg-banner__icon {
  margin-right: 6px;
}
.vfg-banner--fresh {
  background: var(--vp-c-default-soft);
  border-color: var(--vp-c-border);
}
.vfg-banner--warn {
  background: rgba(234, 179, 8, 0.12);
  border-color: rgba(234, 179, 8, 0.45);
}
.vfg-banner--stale {
  background: rgba(239, 68, 68, 0.10);
  border-color: rgba(239, 68, 68, 0.45);
}
</style>
