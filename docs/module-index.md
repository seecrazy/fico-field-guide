---
title: 按模块浏览
feedback: false
---

# 按模块浏览

> 三条查的路径各管一类需求：**[问题诊断中心](/diagnose)** 按现象查 · 本页按模块查 · [T-Code 总索引](/tcode-index) 按事务码反查。顶部直达条（按 `/`）可输 T-Code / 消息号直达。

<!-- AUTO-GEN:START (do not edit; run: npm run module-index) -->

共 97 个内容页，按模块分组（数据来自 frontmatter 的 module 字段自动生成）。

### 其他

| 页面 | 区域 |
|---|---|
| [成本对象缺失 — FI 过账要求成本中心但未填或无效](/01-daily-ops/errors/cost-center-missing) | 报错速查 |
| [KSB1 — 成本中心实际行项目（逐字段详解）](/01-daily-ops/tcode-cards/ksb1) | 日常运维 |
| [KSU5 — 实际分摊执行（逐字段详解）](/01-daily-ops/tcode-cards/ksu5) | 日常运维 |
| [集成测试脚本模板](/02-project/integration-test) | 项目阶段 |
| [蓝图关键问题清单](/02-project/blueprint-questions) | 项目阶段 |
| [上线后 Hypercare 清单 — 前 30 天稳定性检查](/02-project/hypercare) | 项目阶段 |
| [上线切换 Runbook](/02-project/go-live-runbook) | 项目阶段 |

### 总账（FI-GL）

| 页面 | 区域 |
|---|---|
| [排查实战 01 — F5 100：从科目不存在到 FS00 科目层缺失](/04-troubleshooting/case-f5-100) | 排查实战 |
| [排查实战 03 — 月初第一笔过不了账：期间问题三层排查](/04-troubleshooting/case-period) | 排查实战 |
| [过账期间未开 — Posting period 011 2026 not open（OB52）](/01-daily-ops/errors/posting-period-not-open) | 报错速查 |
| [凭证号跳号或缺号 — 号码段缓冲与审计核对](/01-daily-ops/errors/doc-number-gap) | 报错速查 |
| [外币过账汇率缺失 — No exchange rate maintained（OB08）](/01-daily-ops/errors/exchange-rate-missing) | 报错速查 |
| [字段状态冲突 — 必输字段被抑制或字段不可见](/01-daily-ops/errors/field-status-conflict) | 报错速查 |
| [F5 100 — 总账科目在公司代码中不存在](/01-daily-ops/errors/f5-100) | 报错速查 |
| [F5 702 — 凭证借贷不平衡（事务货币余额不为零）](/01-daily-ops/errors/f5-702) | 报错速查 |
| [FB08 凭证冲销失败 — 已清账或跨期间](/01-daily-ops/errors/reversal-not-possible) | 报错速查 |
| [并行账簿 — 本地准则与国际准则并行记账](/03-config-notes/parallel-ledger) | 配置笔记 |
| [财务报表版本（FSV）— 从科目到资产负债表](/03-config-notes/fsv-financial-statement) | 配置笔记 |
| [多币种与汇率 — 从录入到期末评估](/03-config-notes/multi-currency) | 配置笔记 |
| [跨公司代码交易 — 集团内部往来与对账](/03-config-notes/intercompany) | 配置笔记 |
| [凭证拆分（Document Splitting）— S/4 分部报表的引擎](/03-config-notes/document-splitting) | 配置笔记 |
| [凭证类型与号码段 — 过账可追溯的骨架](/03-config-notes/doc-type-number-range) | 配置笔记 |
| [验证与替代 — 凭证的自动校验和自动补值](/03-config-notes/validation-substitution) | 配置笔记 |
| [字段状态组 — 科目字段输入控制与冲突排查](/03-config-notes/gl-field-status) | 配置笔记 |
| [F.13 — 自动清账（逐字段详解）](/01-daily-ops/tcode-cards/f13) | 日常运维 |
| [F.19 — GR/IR 重分类清单（逐字段详解）](/01-daily-ops/tcode-cards/f19) | 日常运维 |
| [FAGLL03 — 总账科目行项目显示（逐字段详解）](/01-daily-ops/tcode-cards/fagll03) | 日常运维 |
| [FB03 — 凭证显示（逐字段详解）](/01-daily-ops/tcode-cards/fb03) | 日常运维 |
| [FB08 — 凭证冲销（逐字段详解）](/01-daily-ops/tcode-cards/fb08) | 日常运维 |
| [FB50 — 总账凭证录入（逐字段详解）](/01-daily-ops/tcode-cards/fb50) | 日常运维 |
| [FBL3N — 总账科目行项目清单（逐字段详解）](/01-daily-ops/tcode-cards/fbl3n) | 日常运维 |
| [FS00 — 科目主数据集中维护（逐字段详解）](/01-daily-ops/tcode-cards/fs00) | 日常运维 |
| [OB52 — 开闭账期间维护（逐字段详解）](/01-daily-ops/tcode-cards/ob52) | 日常运维 |

### 应付（FI-AP）

| 页面 | 区域 |
|---|---|
| [排查实战 05 — F110 零提案：从排除码反推主数据与 FBZP](/04-troubleshooting/case-f110) | 排查实战 |
| [付款到期日不对 — 付款条件与基准日计算](/01-daily-ops/errors/due-date-wrong) | 报错速查 |
| [F110 付款运行无提案 — 供应商全被排除](/01-daily-ops/errors/f110-no-proposal) | 报错速查 |
| [付款条件与现金折扣 — 到期日与清账金额的地基](/03-config-notes/payment-terms) | 配置笔记 |
| [特别总账标识 — 预付款、汇票与备选统驭科目](/03-config-notes/ap-special-gl) | 配置笔记 |
| [F110 自动付款 — FBZP 配置树与运行排错](/03-config-notes/ap-auto-payment) | 配置笔记 |
| [F-44 — 供应商清账（逐字段详解）](/01-daily-ops/tcode-cards/f-44) | 日常运维 |
| [F-47 — 预付款请求登记（逐字段详解）](/01-daily-ops/tcode-cards/f-47) | 日常运维 |
| [F-48 — 预付款过账（逐字段详解）](/01-daily-ops/tcode-cards/f-48) | 日常运维 |
| [FBL1N — 供应商行项目清单（逐字段详解）](/01-daily-ops/tcode-cards/fbl1n) | 日常运维 |

### 应收（FI-AR）

| 页面 | 区域 |
|---|---|
| [销售单据被信贷冻结 — Credit check blocked](/01-daily-ops/errors/credit-block) | 报错速查 |
| [信贷管理 — 从简单信贷到 FSCM](/03-config-notes/ar-credit-management) | 配置笔记 |
| [F-32 — 客户清账（逐字段详解）](/01-daily-ops/tcode-cards/f-32) | 日常运维 |
| [FBL5N — 客户行项目清单（逐字段详解）](/01-daily-ops/tcode-cards/fbl5n) | 日常运维 |
| [O2C 走账全解 — 从销售订单到收款的每一笔分录](/01-daily-ops/flow-o2c) | 日常运维 |

### 资产（FI-AA）

| 页面 | 区域 |
|---|---|
| [排查实战 06 — AFAB 折旧跑不动：从错误清单到技术清账](/04-troubleshooting/case-afab) | 排查实战 |
| [AFAB 折旧过账报错或事后余额不平](/01-daily-ops/errors/afab-depreciation-error) | 报错速查 |
| [在建工程（AuC）— 从投资归集到资产转固](/03-config-notes/auc-settlement) | 配置笔记 |
| [资产转移与报废 — 生命周期末端处理](/03-config-notes/asset-transfer-retirement) | 配置笔记 |
| [S/4HANA 新资产会计 — 与 ECC 的关键差异](/03-config-notes/asset-s4-diff) | 配置笔记 |
| [AFAB — 折旧过账运行（逐字段详解）](/01-daily-ops/tcode-cards/afab) | 日常运维 |
| [AS01 — 创建资产主数据（逐字段详解）](/01-daily-ops/tcode-cards/as01) | 日常运维 |

### 财务其他（FI）

| 页面 | 区域 |
|---|---|
| [税码无效或不存在 — 过账被税配置拦下](/01-daily-ops/errors/tax-code-invalid) | 报错速查 |
| [税务配置全解 — 从税码到申报数据](/03-config-notes/tax-configuration) | 配置笔记 |
| [银行对账 — 电子对账单导入与调节](/03-config-notes/bank-reconciliation) | 配置笔记 |
| [中国本地化 — 金税、增值税与应付暂估实践](/03-config-notes/cn-localization) | 配置笔记 |

### 生产成本（CO-PC）

| 页面 | 区域 |
|---|---|
| [CO88 批量结算报错 — 订单结算卡住月结](/01-daily-ops/errors/co88-settlement-error) | 报错速查 |
| [标准成本估算 — CK11N/CK24 从估价到发布](/03-config-notes/co-pc-standard-cost) | 配置笔记 |
| [生产订单成本归集与结算 — KO88/CO88](/03-config-notes/co-pc-order-settlement) | 配置笔记 |
| [物料分类账结算 — S/4 月结的第一道关](/03-config-notes/ml-closing-s4) | 配置笔记 |
| [WIP 计算与差异分析 — KKAX/KKAO](/03-config-notes/co-pc-wip-variance) | 配置笔记 |

### 成本控制（CO）

| 页面 | 区域 |
|---|---|
| [成本中心分摊（Assessment）— 共用费用下摊到业务部门](/03-config-notes/co-assessment) | 配置笔记 |
| [内部订单 — 临时成本归集的多面手](/03-config-notes/internal-order) | 配置笔记 |
| [作业类型与作业价格 — CO 服务计价的引擎](/03-config-notes/activity-type-price) | 配置笔记 |
| [CO-PA 获利能力分析 — 特征、值字段与两代架构](/03-config-notes/co-pa) | 配置笔记 |

### 利润中心（EC-PCA）

| 页面 | 区域 |
|---|---|
| [利润中心会计 — 分部报表的维度骨架](/03-config-notes/profit-center) | 配置笔记 |

### MM / SD 集成

| 页面 | 区域 |
|---|---|
| [排查实战 02 — 月结 GR/IR 清不掉：从余额倒推清账链](/04-troubleshooting/case-gr-ir) | 排查实战 |
| [排查实战 04 — MIGO 收货无 FI 凭证：MM-FI 集成链反查](/04-troubleshooting/case-migo-no-fi) | 排查实战 |
| [GR/IR 科目余额不为零 — 月结 F.13 清账失败](/01-daily-ops/errors/gr-ir-not-cleared) | 报错速查 |
| [MIGO 收货正常但 FI 无凭证 — OBYC 自动记账缺失](/01-daily-ops/errors/migo-no-fi-doc) | 报错速查 |
| [MIRO 发票校验差异进错科目 — PRD/UPF 配置偏差](/01-daily-ops/errors/miro-prd-wrong-account) | 报错速查 |
| [MMPV 无法关闭 MM 期间 — 存在未结事务](/01-daily-ops/errors/mmpv-cannot-close) | 报错速查 |
| [OBYC — MM-FI 自动记账科目确定](/03-config-notes/mm-fi-obyc) | 配置笔记 |
| [SD 定价过程 — 一张发票金额怎么算出来的](/03-config-notes/sd-pricing) | 配置笔记 |
| [SD 收入科目确定 — 从定价条件到收入科目](/03-config-notes/sd-revenue-account) | 配置笔记 |
| [对账专题 — 月结勾稽的三张对账表](/01-daily-ops/reconciliation) | 日常运维 |
| [高频 T-Code 速查与详解](/01-daily-ops/tcode-cards) | 日常运维 |
| [年结检查清单](/01-daily-ops/year-end-checklist) | 日常运维 |
| [月结检查清单](/01-daily-ops/month-end-checklist) | 日常运维 |
| [MB51 — 物料凭证清单（逐字段详解）](/01-daily-ops/tcode-cards/mb51) | 日常运维 |
| [MIGO — 收发货过账（逐字段详解）](/01-daily-ops/tcode-cards/migo) | 日常运维 |
| [MIRO — 发票校验过账（逐字段详解）](/01-daily-ops/tcode-cards/miro) | 日常运维 |
| [MMPV — 关闭 MM 期间（逐字段详解）](/01-daily-ops/tcode-cards/mmpv) | 日常运维 |
| [P2P 走账全解 — 从采购订单到付款的每一笔分录](/01-daily-ops/flow-p2p) | 日常运维 |

### 资金（TR）

| 页面 | 区域 |
|---|---|
| [现金头寸与流动性监控 — 资金日管理入门](/03-config-notes/tr-cash-position) | 配置笔记 |

### 跨模块与基础

| 页面 | 区域 |
|---|---|
| [排查方法论 — 从报错到错误配置](/04-troubleshooting/playbook-intro) | 排查实战 |
| [无权限执行事务 — Authorization check failed（SU53）](/01-daily-ops/errors/authorization-failed) | 报错速查 |
| [数据迁移工具 — Migration Cockpit 与 LSMW 怎么选](/03-config-notes/migration-tools) | 配置笔记 |
| [FICO 权限基础 — PFCG 角色与公司代码级控制](/03-config-notes/authorization-basics) | 配置笔记 |
| [标准报表指南 — 拉数不迷路](/01-daily-ops/standard-reports) | 日常运维 |
| [第一次月结怎么准备](/01-daily-ops/first-month-end) | 日常运维 |
| [新接手公司代码的摸底清单](/01-daily-ops/takeover-checklist) | 日常运维 |
| [经典 T-Code 与 Fiori 应用对照](/00-about/fiori-mapping) | 参考 |
| [ECC 与 S/4HANA 差异总表](/00-about/version-matrix) | 参考 |

<!-- AUTO-GEN:END -->
