import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

/**
 * 过期降级阈值（设计规则 2）：
 *   >12 个月未复核 → 黄色警告
 *   >24 个月未复核 → 红色强警告
 * 构建时由 transformPageData 注入 staleDays，组件只读注入值，
 * 避免 SSG 预渲染与客户端水合时间不一致导致的 hydration mismatch。
 */
const STALE_WARN_DAYS = 365
const STALE_STALE_DAYS = 730

// 部署时替换为真实仓库地址（README「部署」一节有说明）
export const REPO_URL = 'https://github.com/YOURNAME/fico-field-guide'

export default withMermaid(
  defineConfig({
    lang: 'zh-CN',
    title: 'SAP FICO 顾问实战手册',
    description:
      'FICO 顾问在项目里卡住时，30 秒内找到下一步动作：高频 T-Code 速查、报错根因排序、可自验的配置笔记。',
    head: [
      // GoatCounter：无 cookie、隐私友好统计。部署时将 YOURCODE 替换为实际站点代码。
      [
        'script',
        {
          'data-goatcounter': 'https://YOURCODE.goatcounter.com/count',
          async: '',
          src: 'https://gc.zgo.at/count.js',
        },
      ],
    ],
    cleanUrls: true,
    lastUpdated: true,
    sitemap: { hostname: 'https://YOURNAME.github.io/fico-field-guide' },

    themeConfig: {
      nav: [
        { text: '日常运维', link: '/01-daily-ops/tcode-cards' },
        { text: '报错速查', link: '/01-daily-ops/errors/' },
        { text: '项目阶段', link: '/02-project/blueprint-questions' },
        { text: '配置笔记', link: '/03-config-notes/mm-fi-obyc' },
        { text: 'T-Code 索引', link: '/tcode-index' },
        { text: '版本差异', link: '/00-about/version-matrix' },
      ],
      sidebar: [
        {
          text: '关于本手册',
          items: [
            { text: '怎么用这本手册', link: '/00-about/how-to-use' },
            { text: 'ECC 与 S/4 差异总表', link: '/00-about/version-matrix' },
            { text: '写作约定与占位符', link: '/00-about/conventions' },
          ],
        },
        {
          text: '日常运维',
          items: [
            { text: '月结检查清单', link: '/01-daily-ops/month-end-checklist' },
            { text: '高频 T-Code 卡片', link: '/01-daily-ops/tcode-cards' },
            { text: '报错速查', link: '/01-daily-ops/errors/' },
          ],
        },
        {
          text: '项目阶段',
          items: [
            { text: '蓝图关键问题', link: '/02-project/blueprint-questions' },
            { text: '集成测试脚本模板', link: '/02-project/integration-test' },
            { text: '上线切换 Runbook', link: '/02-project/go-live-runbook' },
          ],
        },
        {
          text: '配置笔记',
          items: [
            { text: 'OBYC — MM-FI 自动记账', link: '/03-config-notes/mm-fi-obyc' },
            { text: '字段状态组', link: '/03-config-notes/gl-field-status' },
            { text: 'S/4 新资产记账差异', link: '/03-config-notes/asset-s4-diff' },
            { text: '特别总账标识', link: '/03-config-notes/ap-special-gl' },
            { text: '成本中心分摊', link: '/03-config-notes/co-assessment' },
          ],
        },
        {
          text: '速查与贡献',
          items: [
            { text: 'T-Code 总索引', link: '/tcode-index' },
            { text: '如何贡献内容', link: '/99-contribute/how-to-contribute' },
          ],
        },
      ],

      search: {
        provider: 'local',
        options: {
          translations: {
            button: { buttonText: '搜索', buttonAriaLabel: '搜索文档' },
            modal: {
              noResultsText: '没有找到结果',
              resetButtonTitle: '清除查询',
              footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' },
            },
          },
        },
      },

      outline: { level: [2, 3], label: '本页目录' },
      docFooter: { prev: '上一页', next: '下一页' },
      lastUpdated: { text: '最后更新' },
      returnToTopLabel: '回到顶部',
      sidebarMenuLabel: '菜单',
      darkModeSwitchLabel: '外观',
      lightModeSwitchTitle: '切换到浅色模式',
      darkModeSwitchTitle: '切换到深色模式',

      socialLinks: [{ icon: 'github', link: REPO_URL }],

      footer: {
        message: '内容按 CC BY-NC-SA 4.0 授权，代码按 MIT 授权。',
        copyright: '每页标注验证日期，过期页面自动降级提示 — 请以你的系统为准自行验证',
      },
    },

    markdown: {
      lineNumbers: false,
    },

    mermaid: {
      // 亮色主题基准（暗色由插件自动切换 dark 变量）
      startOnLoad: false,
      theme: 'base',
      themeVariables: {
        primaryColor: '#e8f1fb',
        primaryTextColor: '#213547',
        primaryBorderColor: '#3c8dff',
        lineColor: '#7a8ba0',
        fontSize: '14px',
      },
      flowchart: { curve: 'basis' },
    },

    transformPageData(pageData) {
      const verifiedOn: unknown = pageData.frontmatter.verifiedOn
      if (typeof verifiedOn !== 'string') return
      const t = Date.parse(verifiedOn)
      if (Number.isNaN(t)) return
      const staleDays = Math.floor((Date.now() - t) / 86_400_000)
      pageData.frontmatter.staleDays = staleDays
      pageData.frontmatter.staleLevel =
        staleDays > STALE_STALE_DAYS ? 'stale' : staleDays > STALE_WARN_DAYS ? 'warn' : 'fresh'
    },
  }) as any,
)
