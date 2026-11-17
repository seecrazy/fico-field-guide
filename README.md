<div align="center">

<img src="docs/public/logo.svg" width="92" alt="logo" />

# SAP FICO 顾问实战手册

**卡住时，30 秒找到下一步动作。**

面向 SAP FI/CO 顾问的实战工作手册：**从业务问题出发**，快速定位报错根因、错误配置与验证方法——不做按模块堆知识的百科全书，做解决问题的工作工具。

高频 T-Code 逐字段详解 · 报错按概率排根因 · 排查实战从报错反查配置 · 每篇可自验

[![Deploy](https://github.com/seecrazy/fico-field-guide/actions/workflows/deploy.yml/badge.svg)](https://github.com/seecrazy/fico-field-guide/actions/workflows/deploy.yml)
[![Quality](https://github.com/seecrazy/fico-field-guide/actions/workflows/quality.yml/badge.svg)](https://github.com/seecrazy/fico-field-guide/actions/workflows/quality.yml)
[![License: Content](https://img.shields.io/badge/内容-CC%20BY--NC--SA%204.0-blue)](./LICENSE-CONTENT)
[![License: Code](https://img.shields.io/badge/代码-MIT-green)](./LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D20-339933)](./package.json)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-ff69b4)](./docs/99-contribute/how-to-contribute.md)

**[📖 在线阅读](https://seecrazy.github.io/fico-field-guide) · [排查实战](https://seecrazy.github.io/fico-field-guide/04-troubleshooting/playbook-intro) · [T-Code 索引](https://seecrazy.github.io/fico-field-guide/tcode-index) · [贡献指南](./docs/99-contribute/how-to-contribute.md)**

</div>

---

![首页](docs/public/images/home-preview.png)

![内容页](docs/public/images/content-preview.png)

<details>
<summary>🌙 暗色模式</summary>

![暗色模式](docs/public/images/dark-preview.png)

</details>

## 👥 适用人群

| 人群 | 可以获得什么 |
|---|---|
| FICO 初级顾问 | 业务流程走账（P2P/O2C 每笔分录）、23 个 T-Code 逐字段上手 |
| 中级顾问 | 报错根因排序速查、从报错反查配置的排查方法论、月结/年结对账 |
| 高级顾问 | 跨模块集成场景（OBYC/物料账/并行账簿/CO-PC）、蓝图与切换清单复用 |
| 项目经理 | 蓝图 23 问、集成测试三脚本、上线 Runbook、Hypercare 清单 |
| 企业运维 | 月结/年结/摸底清单、标准报表导航、可下载工作模板 |

## ✨ 这本手册有什么不一样

| | 常见 SAP 资料 | 本手册 |
|---|---|---|
| **能自验** | 「照这样做」——信不信由你 | 每篇附「验证 T-Code + 判据 + 失败对照」三元组，跑一遍就知道真假；缺三元组的页面 **CI 直接拒绝合并** |
| **不过时** | 写完即陈旧 | 每页标注验证日期，超 12 个月自动黄色警告、超 24 个月红色警示，机器按日期管 |
| **查得快** | 翻书/翻论坛 | 111 个 T-Code 反查索引、19 条报错按**概率**排根因、3 次点击或 1 次搜索到达 |
| **教排查** | 只给答案 | 6 个实战案例演示「报错现场 → 三层排查 → 定位错误配置」的完整破案过程 |

## 🗺️ 内容地图

| 区域 | 内容 |
|---|---|
| [日常运维](./docs/01-daily-ops/tcode-cards.md) | 月结/年结清单 · **23 个 T-Code 逐字段详解** · 报错速查 19 条 · **P2P/O2C 走账全解** · 对账专题 · 标准报表指南 · 接手摸底/首次月结 |
| [问题诊断](./docs/diagnose.md) | **诊断中心**：按现象输入/点选，直达排查路径（25 个条目 × 58 个现象标签） |
| [排查实战](./docs/04-troubleshooting/playbook-intro.md) | 三层排查方法论 · 6 个从报错反查配置的实战案例 |
| [配置笔记](./docs/03-config-notes/mm-fi-obyc.md) | 20 篇：OBYC · 字段状态 · 付款条件 · F110 · 特别总账 · 银行对账 · 资产 · 并行账簿 · CO-PC 主线（标准成本/结算/WIP）· 物料账 · 信贷 · 迁移工具 · 权限 · 中国本地化（金税/增值税/暂估） |
| [项目阶段](./docs/02-project/blueprint-questions.md) | 蓝图 23 问 · 集成测试三脚本 · 上线 Runbook 18 任务 · Hypercare 30 天 |
| [参考](./docs/00-about/version-matrix.md) | ECC vs S/4 差异总表 15 行 · 术语表 70 条 · T-Code/Fiori 对照 |

## 🚀 本地运行

```bash
npm install    # Node ≥ 20
npm run dev    # http://localhost:5173
```

常用命令：`npm run check`（结构校验，CI 同款）· `npm test` · `npm run docs:build`

## 🤝 贡献

| 时间 | 你能做什么 |
|---|---|
| 30 秒 | 页面底部点「👍 有用」——纯计数，自动汇成徽章 |
| 2 分钟 | 点「🐞 有误」报勘误——填系统版本与现象即可 |
| 30 分钟 | 按模板写一页 → 本地三道校验 → PR（[贡献指南](./docs/99-contribute/how-to-contribute.md) 含全部模板） |

维护者：error Issue 打 `ai-fix` 标签即可自动生成修复 PR（[AI 修勘误](./docs/99-contribute/how-to-contribute.md)）。

## 📊 内容规模

107 个页面 · **33 篇配置笔记**（深度版+实操走查）· 19 条报错速查 · 23 个 T-Code 详解 · 7 篇排查实战 · **140 个 T-Code 索引** · P2P/O2C 走账全解 · 对账/FSV/报表指南 · 术语表 70 条 · 5 份可下载工作模板。检索三件套：⌘K 快速直达（T-Code/消息号 241 项）· [Pagefind 中文全文搜索](./docs/search.md) · [问题诊断中心](./docs/diagnose.md)。全部内容标注**可信度分级**（定义见[写作约定](./docs/00-about/conventions.md)）。

## 🗺️ Roadmap

| 阶段 | 目标 | 状态 |
|---|---|---|
| V1.0 | FICO 核心知识库、T-Code 索引、验证三元组与 CI | ✅ 已交付 |
| V1.3 | T-Code 逐字段详解、排查实战系列、笔记深度化 | ✅ 已交付 |
| V1.5 | 问题诊断中心、可信度分级、走账与对账主线 | ✅ 已交付 |
| V1.8 | 配置关联图谱（配置项↔T-Code↔科目反查）、真实项目案例库 | 规划中 |
| V2.0 | RAG 知识检索、AI 根因分析与排查报告生成 | 规划中 |
| V2.5 | 安全的 SAP 系统只读集成、智能运维 | 探索中 |

## 📄 License

- 内容（`docs/`）：[CC BY-NC-SA 4.0](./LICENSE-CONTENT)
- 代码（脚本/CI/主题）：[MIT](./LICENSE)

> 手册内容按 SAP 标准行为撰写并逐页标注验证口径，不承诺与任何特定客户系统一致——所有配置与结论请以你的系统实测为准，这正是每页附验证三元组的原因。
