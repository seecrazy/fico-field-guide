---
title: 全文搜索
feedback: false
---

<script setup>
import { onMounted } from 'vue'
import { withBase } from 'vitepress'

onMounted(() => {
  // pagefind-ui.js 是 UMD 全局脚本，须用 script 标签注入（import() 加载 UMD 不生效）
  const css = document.createElement('link')
  css.rel = 'stylesheet'
  css.href = withBase('/pagefind/pagefind-ui.css')
  document.head.appendChild(css)
  const js = document.createElement('script')
  js.src = withBase('/pagefind/pagefind-ui.js')
  js.onload = () => {
    new window.PagefindUI({
      element: '#pf-search',
      baseUrl: withBase('/'),
      showImages: false,
      translations: {
        placeholder: '搜索全站：报错文本、T-Code、配置关键词…（中文支持良好）',
        clear_search: '清除',
        load_more: '加载更多',
        search_label: '全站搜索',
        zero_results: '没有找到「[SEARCH_TERM]」，换个说法或去问题诊断中心',
        many_results: '共 [COUNT] 条结果',
        one_result: '[COUNT] 条结果',
        searching: '搜索中…',
      },
    })
  }
  document.head.appendChild(js)
})
</script>

# 全文搜索

> 本页由 [Pagefind](https://pagefind.app/) 提供中文友好的静态全文索引（覆盖全站 100+ 页面）。
> 快捷路径：**T-Code / 消息号**用顶部直达条（⌘K）更快；**按现象排查**去[问题诊断中心](/diagnose)；**按事务码反查**用 [T-Code 总索引](/tcode-index)。

<div id="pf-search"></div>
