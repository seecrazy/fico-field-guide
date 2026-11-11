---
layout: home
feedback: false

hero:
  name: SAP FICO 顾问实战手册
  text: 卡住时，30 秒找到下一步动作
  tagline: 高频 T-Code 速查 · 报错按概率排根因 · 每篇配置笔记可自验
  actions:
    - theme: brand
      text: 报错速查 →
      link: /01-daily-ops/errors/
    - theme: alt
      text: T-Code 卡片
      link: /01-daily-ops/tcode-cards
    - theme: alt
      text: 怎么用这本手册
      link: /00-about/how-to-use

features:
  - icon: ⚡
    title: 查得快
    details: 高频 T-Code / 报错，3 次点击或 1 次搜索到达；T-Code 总索引反查任意事务码出现的页面。
    link: /tcode-index
    linkText: 打开 T-Code 总索引
  - icon: ✅
    title: 能自验
    details: 每篇配置笔记附「验证 T-Code + 验证判据 + 失败对照」三元组——你不需要相信作者，跑一遍就知道真假。
    link: /03-config-notes/mm-fi-obyc
    linkText: 看一篇样例
  - icon: ⏱️
    title: 不过时
    details: 每页标注验证日期与环境，超 12 个月自动降级为黄色警告、超 24 个月红色警示——机器按日期管，不靠人工盘点。
  - icon: 🔄
    title: 读者反哺
    details: 页面底部一键反馈「有用 / 有误」，徽章自动汇总；搜索无结果的词就是下个月要写的内容。
    link: /99-contribute/how-to-contribute
    linkText: 贡献与反馈机制
---

## 三类读者，三条路径

```mermaid
flowchart LR
  A[深夜月结卡住] -->|按报错文本/消息号搜| B[报错速查<br/>根因按概率排序]
  C[白天项目例会] -->|按阶段找| D[项目阶段<br/>蓝图·测试·上线]
  E[配置前想确认] -->|按主题找| F[配置笔记<br/>带验证三元组]
  B --> G[按表格逐条试<br/>验证动作 → 修复]
  D --> G
  F --> G
```

- **运维型读者**（卡在报错上）：进 [报错速查](/01-daily-ops/errors/)，按消息号或现象找条目，从根因表第一行开始试。
- **项目型读者**（在蓝图/测试/切换阶段）：进 [项目阶段](/02-project/blueprint-questions)，直接取清单与模板。
- **配置型读者**（动手前先确认）：进 [配置笔记](/03-config-notes/mm-fi-obyc)，先读「一句话结论」和「配错会怎样」，再决定要不要继续。

## 这本手册不承诺什么

它不承诺「内容绝对正确」——它承诺**每篇都给验证方法**，你跑一遍就能知道对错；写错了，30 秒内会被你发现（[三条硬规则](/00-about/conventions)）。SAP 版本差异客观存在，所有内容请以你自己的系统实测为准。
