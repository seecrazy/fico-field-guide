import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { h } from 'vue'
import VerifiedBanner from './components/VerifiedBanner.vue'
import FeedbackButtons from './components/FeedbackButtons.vue'
import './styles.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // 验证状态条：显示在正文标题之前
      'doc-before': () => h(VerifiedBanner),
      // 读者反哺按钮：显示在正文之后
      'doc-after': () => h(FeedbackButtons),
    })
  },
} satisfies Theme
