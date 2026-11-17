<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()

const CONF_LABEL: Record<string, string> = {
  A: '实测验证（真实系统操作确认）',
  B: '官方文档口径（按 SAP 标准行为撰写，未实测）',
  C: '方法论推演（按标准流程推演，未实测）',
  D: '待验证（社区贡献，未经核实）',
}

const info = computed(() => {
  const fm: any = frontmatter.value
  const verifiedOn: string | undefined = fm.verifiedOn
  if (!verifiedOn) return null
  const env: string = fm.verifiedEnv || '环境未标注'
  const level: string = fm.staleLevel || 'fresh'
  const days: number = fm.staleDays ?? 0
  const conf: string = String(fm.confidence || '')
  const monthsAgo = Math.floor(days / 30)
  const ym = verifiedOn.slice(0, 7)
  return { verifiedOn, env, level, days, monthsAgo, ym, conf }
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
    <span v-if="info.conf && CONF_LABEL[info.conf]" class="vfg-conf">
      <span class="vfg-conf__grade">可信度 {{ info.conf }}</span>
      <span class="vfg-conf__label">{{ CONF_LABEL[info.conf] }}</span>
    </span>
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
  display: flex;
  flex-wrap: wrap;
  gap: 4px 10px;
  align-items: baseline;
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
.vfg-conf {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-left: auto;
}
.vfg-conf__grade {
  font-weight: 600;
  font-size: 12px;
  padding: 1px 8px;
  border-radius: 999px;
  color: #fff;
  background: var(--vp-c-brand-2, #2563eb);
  white-space: nowrap;
}
.vfg-conf__label {
  font-size: 12px;
  color: var(--vp-c-text-2);
}
</style>
