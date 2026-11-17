import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { h } from 'vue'
import VerifiedBanner from './components/VerifiedBanner.vue'
import FeedbackButtons from './components/FeedbackButtons.vue'
import QuickJump from '../../components/QuickJump.vue'
import './styles.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // 快速直达条：所有页面顶部（含 404 页——打错路径时它是救援入口）
      'layout-top': () => h('div', { class: 'qj-wrap' }, h(QuickJump)),
      // 验证状态条：显示在正文标题之前
      'doc-before': () => h(VerifiedBanner),
      // 读者反哺按钮：显示在正文之后
      'doc-after': () => h(FeedbackButtons),
    })
  },
} satisfies Theme
