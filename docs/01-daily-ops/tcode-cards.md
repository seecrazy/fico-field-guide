---
title: 高频 T-Code 速查与详解
module: FI/CO/MM
verifiedOn: 2026-11-12
verifiedEnv: "SAP 标准行为（ECC 6.0 / S/4HANA 2023），示例公司代码 1000"
tcodes: [FB50, FB03, FB08, FS00, FAGLL03, FBL1N, FBL3N, FBL5N, F-47, F-48, F-44, F-32, F.13, F.19, OB52, MIGO, MIRO, MB51, MMPV, AS01, AFAB, KSB1, KSU5]
---

# 高频 T-Code 速查与详解

> 一句话：**速查用下表（每行 10 秒），上手用详解页（逐字段讲作用、填错会怎样、排查去哪）**。S/4 用户先对照[版本差异总表](/00-about/version-matrix)确认事务码现状。

## 总账（FI-GL）

| T-Code | 用途 | 最常见坑 | 详解 |
|---|---|---|---|
| `FB50` | 总账凭证录入 | 凭证日期与过账日期跨期 | [逐字段详解 →](/01-daily-ops/tcode-cards/fb50) |
| `FB03` | 凭证显示 | 只输凭证号查不到——年度/公司代码缺一不可 | [逐字段详解 →](/01-daily-ops/tcode-cards/fb03) |
| `FB08` | 凭证冲销 | 已清账凭证冲不掉，先 `FBRA` 重置 | [逐字段详解 →](/01-daily-ops/tcode-cards/fb08) |
| `FS00` | 科目主数据集中维护 | 只建了科目表层、公司代码层缺失（F5 100） | [逐字段详解 →](/01-daily-ops/tcode-cards/fs00) |
| `FAGLL03` | 总账余额行项目（S/4 主力） | 没选分类账，多账簿公司查串 | [逐字段详解 →](/01-daily-ops/tcode-cards/fagll03) |

## 应收应付（FI-AP/AR）

| T-Code | 用途 | 最常见坑 | 详解 |
|---|---|---|---|
| `FBL1N` | 供应商行项目 | 没勾「特别总账事务」以为预付没入账 | [逐字段详解 →](/01-daily-ops/tcode-cards/fbl1n) |
| `FBL3N` | 总账行项目（GR/IR 排查第一入口） | 未清项/已清项口径没选对 | [逐字段详解 →](/01-daily-ops/tcode-cards/fbl3n) |
| `FBL5N` | 客户行项目 | 信贷占用口径与普通余额混淆 | [逐字段详解 →](/01-daily-ops/tcode-cards/fbl5n) |
| `F-47` | 预付请求登记 | 以为登记完钱就付了——只是统计性请求 | [逐字段详解 →](/01-daily-ops/tcode-cards/f-47) |
| `F-48` | 预付款过账 | 特别总账标识错用 A（那是汇票），应为 F | [逐字段详解 →](/01-daily-ops/tcode-cards/f-48) |

## 清账与月结

| T-Code | 用途 | 最常见坑 | 详解 |
|---|---|---|---|
| `F-44` | 供应商清账 | 想全额清却选了部分支付留尾巴 | [逐字段详解 →](/01-daily-ops/tcode-cards/f-44) |
| `F-32` | 客户清账 | 跨币种/普通与特别总账混在一笔清不了 | [逐字段详解 →](/01-daily-ops/tcode-cards/f-32) |
| `F.13` | 自动清账 | 没先跑测试运行；清账标准漏勾匹配字段 | [逐字段详解 →](/01-daily-ops/tcode-cards/f13) |
| `F.19` | GR/IR 重分类 | 当清账工具用——它只做期末列报重分类 | [逐字段详解 →](/01-daily-ops/tcode-cards/f19) |
| `OB52` | 开闭账期间 | 只开了 + 类没开 A/D/K，某类凭证照样报错 | [逐字段详解 →](/01-daily-ops/tcode-cards/ob52) |

## MM 集成

| T-Code | 用途 | 最常见坑 | 详解 |
|---|---|---|---|
| `MIGO` | 收发货过账 | 收货成功但 FI 无凭证（OBYC 链断） | [逐字段详解 →](/01-daily-ops/tcode-cards/migo) |
| `MIRO` | 发票校验 | 差异进了错误科目（PRD/UPF 配置） | [逐字段详解 →](/01-daily-ops/tcode-cards/miro) |
| `MB51` | 物料凭证清单 | 不知道能从物料凭证环境互跳 FI 凭证 | [逐字段详解 →](/01-daily-ops/tcode-cards/mb51) |
| `MMPV` | 关闭 MM 期间 | 想跳月关账——只能顺序逐月 | [逐字段详解 →](/01-daily-ops/tcode-cards/mmpv) |

## 资产会计（FI-AA）

| T-Code | 用途 | 最常见坑 | 详解 |
|---|---|---|---|
| `AS01` | 创建资产主数据 | 资产类别选错，科目确定全错 | [逐字段详解 →](/01-daily-ops/tcode-cards/as01) |
| `AFAB` | 折旧过账 | 没先跑测试运行；主数据变更后没 `AFAR` 重建 | [逐字段详解 →](/01-daily-ops/tcode-cards/afab) |

## 成本中心（CO）

| T-Code | 用途 | 最常见坑 | 详解 |
|---|---|---|---|
| `KSB1` | 成本中心行项目 | 只看行不钻取凭证，差异原因找不着 | [逐字段详解 →](/01-daily-ops/tcode-cards/ksb1) |
| `KSU5` | 实际分摊执行 | 没先测试运行；接收方统计指标无值 | [逐字段详解 →](/01-daily-ops/tcode-cards/ksu5) |

## 用法建议

- **新手第一周**：配合[接手摸底清单](/01-daily-ops/takeover-checklist)，把总账 5 个详解页过一遍。
- **卡在报错上**：详解页底部有「高频错误与排查路径」表，直通[报错速查](/01-daily-ops/errors/)与[排查实战](/04-troubleshooting/playbook-intro)。
- 想反查某个 T-Code 出现在哪些页面：[T-Code 总索引](/tcode-index)。
