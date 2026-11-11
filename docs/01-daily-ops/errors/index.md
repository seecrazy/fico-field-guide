---
title: 报错速查索引
feedback: false
---

# 报错速查索引

卡在一条报错上时，先按**消息号**（如 `F5 702`）或**现象文本关键词**（如「期间未开」「成本中心」）用顶栏搜索；命中条目后**从根因表第一行开始**，逐条执行「验证动作」，对上哪条就执行哪条的「修复动作」，最后跑条目底部的「验证 T-Code」确认收工。消息号在不同客户系统可能被增强替换，搜消息号没命中时改搜现象文本。

## 条目总表

| 条目 | 模块 | 典型场景 |
|---|---|---|
| [F5 100 — 总账科目在公司代码中不存在](/01-daily-ops/errors/f5-100) | FI-GL | 录凭证时报科目不存在 |
| [F5 702 — 凭证借贷不平衡](/01-daily-ops/errors/f5-702) | FI-GL | 保存凭证时借贷合计不为零 |
| [过账期间未开（OB52）](/01-daily-ops/errors/posting-period-not-open) | FI-GL | 月初/年结后第一笔被拦 |
| [成本对象缺失](/01-daily-ops/errors/cost-center-missing) | CO | 损益科目过账要求成本中心 |
| [GR/IR 科目清账失败](/01-daily-ops/errors/gr-ir-not-cleared) | MM-FI | 月结 F.13 清不掉 GR/IR |
| [MIGO 收货但 FI 无凭证](/01-daily-ops/errors/migo-no-fi-doc) | MM-FI | 收货成功但没有会计凭证 |
| [字段状态冲突](/01-daily-ops/errors/field-status-conflict) | FI-GL | 必输字段看不见或填不了 |
| [MIRO 差异进错科目](/01-daily-ops/errors/miro-prd-wrong-account) | MM-FI | 发票价格差异落错科目 |
| [AFAB 折旧过账报错](/01-daily-ops/errors/afab-depreciation-error) | FI-AA | 折旧跑不下去或事后不平 |
| [外币汇率缺失（OB08）](/01-daily-ops/errors/exchange-rate-missing) | FI-GL | 外币凭证取不到汇率 |
| [F110 付款运行无提案](/01-daily-ops/errors/f110-no-proposal) | FI-AP | 付款提案一条都没有 |
| [FB08 凭证冲销失败](/01-daily-ops/errors/reversal-not-possible) | FI-GL | 已清账或冲销期间未开冲不回 |
| [MMPV 无法关闭 MM 期间](/01-daily-ops/errors/mmpv-cannot-close) | MM | 存在未结事务关不了期 |
| [税码无效或不存在](/01-daily-ops/errors/tax-code-invalid) | FI-TAX | 发票过账被税配置拦下 |
| [凭证号跳号或缺号](/01-daily-ops/errors/doc-number-gap) | FI-GL | 号码段缓冲跳号的审计核对 |
| [付款到期日不对](/01-daily-ops/errors/due-date-wrong) | FI-AP | 付款条件与基准日算错到期日 |
| [CO88 批量结算报错](/01-daily-ops/errors/co88-settlement-error) | CO-PC | 月结订单批量结算报错或中断 |
| [销售单据被信贷冻结](/01-daily-ops/errors/credit-block) | FI-AR | 信贷检查拦截下单/交货/开票 |
| [无权限执行事务](/01-daily-ops/errors/authorization-failed) | 基础 | SU53 定位权限到底缺什么 |

搜不到？去页面底部提「希望增加内容」——搜索无结果的高频词会被优先写成新条目（详见[怎么用这本手册](/00-about/how-to-use)）。
