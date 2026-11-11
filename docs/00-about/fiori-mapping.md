---
title: 经典 T-Code 与 Fiori 应用对照
module: 跨模块
verifiedOn: 2026-11-11
verifiedEnv: "SAP 标准行为（ECC 6.0 / S/4HANA 2023），示例公司代码 1000"
tcodes: [FAGLL03, FBL1N, FBL3N, FBL5N, F110, MIGO, MIRO, FB50, FB03, AFAB, AS01, AW01N, KSU5, KSB1, CKMLCP]
---

# 经典 T-Code 与 Fiori 应用对照

> 事务码在 S/4 里大多照样能用；Fiori 是 SAP 主推的新入口——本表帮你的肌肉记忆平移，而不是推翻重来。

先说结论：从 ECC 挪到 S/4，**事务码习惯基本可以原样带走**——下表列出的码在 S/4HANA 2023 仍可执行。变化在于 SAP 把新功能投入放在 Fiori App 上，事务码逐渐变成「兼容入口」。本表按领域给出每个经典码在 S/4 的现状与对应的 Fiori 方向；App 的准确名称与可用性随版本和授权变化，**以你的系统 Fiori 内容库为准**，查证方向是 SAP Fiori Content Library（按角色/事务码反查 App）与 S/4HANA Simplification List。版本行为差异详见 [ECC 与 S/4HANA 差异总表](/00-about/version-matrix)。

## 对照表

| 领域 | 经典 T-Code | S/4 现状 | Fiori 方向 |
|---|---|---|---|
| 总账 | `FAGLL03` | 仍可用，已是 S/4 主力行项目查询 | 「总账科目余额 / 余额清单」类 App |
| 总账 | `FBL3N` | 仍可用，SAP 主推迁移到 `FAGLL03` | 总账行项目显示类 App（Manage/Display G/L Line Items 系） |
| 应付 | `FBL1N` | 仍可用 | 供应商行项目类 App（Manage/Display Supplier Line Items 系） |
| 应收 | `FBL5N` | 仍可用 | 客户行项目类 App（Manage Customer Line Items 系） |
| 总账 | `FB50` | 仍可用 | 「过账总账凭证」类 App（Post G/L Journal Entries 系） |
| 总账 | `FB03` | 仍可用 | 「显示凭证」类 App（Display Journal Entries 系） |
| 总账 | `FB08` | 仍可用 | 「冲销凭证」类 App（Reverse Journal Entries 系） |
| 应付 | `F110` | 仍可用 | 「管理自动付款运行」类 App（Manage Automatic Payments 系） |
| MM 集成 | `MIGO` | 仍可用 | 「管理货物收据」类 App（Manage Goods Receipts 系） |
| MM 集成 | `MIRO` | 仍可用 | 「供应商发票管理」类 App（Manage Supplier Invoices 系） |
| 资产 | `AS01` / `AS02` / `AS03` | 仍可用 | 资产主数据创建/维护/显示类 App（Manage Fixed Assets 系） |
| 资产 | `AW01N` | 仍可用（在 S/4 中本身已是浏览器风格界面） | 「资产浏览器」类 App |
| 资产 | `AFAB` | 仍可用，S/4 支持折旧运行重启 | 「折旧运行管理」类 App（Manage Depreciation Runs 系） |
| CO | `KSU5` | 仍可用 | 成本分摊/分配类 App（Cost Allocations 系） |
| CO | `KSB1` | 仍可用 | 成本中心行项目类 App（Cost Center Line Items 系） |
| 物料账 | `CKMLCP` | 仍可用 | 物料账结算的 Fiori 化程度低，月结多沿用既有界面或后台作业——以你的系统为准 |

> 结论：**事务码习惯可以平移，Fiori 是加分项，不是门槛。**先把业务跑通，再按角色逐个换 App。

## 迁移建议

1. **先用原 T-Code 保证业务连续**。上线/接手初期一切照旧：S/4 对事务码的兼容性极强，别为了「用新界面」在月结周引入变量。用户问「我那个码还能用吗」，答「能用，且答案在 [T-Code 总索引](/tcode-index) 能反查」。
2. **Fiori 按角色逐步开放**。不要全员一次性推 App：先把高频角色（应付会计、总账会计、成本会计）各自的两三个核心 App 配进角色授权，用户登录后看到的入口就是自己的活，再逐步扩展。
3. **把本表贴进培训材料**。用户最大的焦虑是「原来的操作还算不算数」——一张对照表回答完，剩下的培训时间用来讲 App 里真正的新能力（如行项目 App 的嵌入式分析），而不是重教已经会的东西。

## 查证入口

- 按事务码反查 Fiori App：SAP 官方 Fiori Content Library（搜索栏直接输事务码）。
- 确认某事务码在目标版本是否被替代：SAP Support Portal 检索「S/4HANA Simplification List」，按模块过滤 simplification item。
- 两者结果与你的系统不符时，以你的系统为准。
