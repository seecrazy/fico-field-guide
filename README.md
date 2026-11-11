# SAP FICO 顾问实战手册（fico-field-guide）

> FICO 顾问在项目里卡住时，打开站点，**30 秒内找到下一步动作**。
> 高频 T-Code 速查 · 报错按概率排根因 · 每篇配置笔记可自验。

纯静态 VitePress 电子书，托管于 GitHub Pages。设计与决策见 [DESIGN.md](./DESIGN.md)，进度与验证状态见 [PROGRESS.md](./PROGRESS.md)。

## 这本手册有什么不一样

1. **查得快**：高频 T-Code / 报错 3 次点击或 1 次搜索到达；[T-Code 总索引](docs/tcode-index.md)自动聚合全站事务码。
2. **能自验**：每篇配置笔记与报错页附「验证 T-Code + 验证判据 + 失败对照」三元组——你不需要相信作者，跑一遍就知道真假。缺三元组的页面会被 CI 自动拒绝。
3. **不过时**：每页标注验证日期与环境；超 12 个月自动黄色警告、超 24 个月红色警示，机器按日期管。
4. **读者反哺**：每页底部一键反馈「有用 / 有误」，徽章每周自动汇总；搜索无结果的词就是下个月要写的内容。

## 快速开始

```bash
npm install        # 安装依赖（Node ≥ 20）
npm run dev        # 本地预览 http://localhost:5173
```

常用命令：

| 命令 | 作用 |
|---|---|
| `npm run check` | 结构检查：三元组 / 验证日期 / 根因排序表（CI 同款闸门） |
| `npm test` | 机制脚本单元测试（node:test） |
| `npm run docs:build` | 生成 T-Code 索引 + 徽章数据 + 完整构建 |
| `npm run tcode-index` | 仅重新生成 T-Code 总索引 |

## 内容地图

| 区域 | 内容 |
|---|---|
| `docs/00-about/` | 使用路径 · ECC vs S/4 差异总表 · 写作约定 |
| `docs/01-daily-ops/` | 月结清单 · 23 张 T-Code 卡片 · 报错速查库（每报错一页） |
| `docs/02-project/` | 蓝图关键问题 · 集成测试模板 · 上线 Runbook |
| `docs/03-config-notes/` | OBYC · 字段状态组 · S/4 资产差异 · 特别总账 · 成本分摊 |
| `docs/99-contribute/` | 贡献指南（含全部写作模板） |

## 贡献

三种方式（详见[贡献指南](docs/99-contribute/how-to-contribute.md)）：

- **30 秒**：页面底部点「👍 有用」——纯计数，每周自动汇成徽章。
- **2 分钟**：点「🐞 有误/过时」报勘误——填上系统版本与实际现象即可。
- **30 分钟**：按模板写一页 → 本地 `npm run check && npm test && npm run docs:build` → PR（CI 自动校验）。

## 部署

仓库地址（`seecrazy`）、统计代码（GoatCounter `seecrazy`）与 sitemap 域名已注入完成。推送前只差一步：

1. 建仓 `seecrazy/fico-field-guide` 并 push main（deploy.yml 自动构建部署，已含质量闸门）。
2. 仓库 Settings → Pages → Source 选 **GitHub Actions**。
3. （可选）确认 [GoatCounter 后台](https://seecrazy.goatcounter.com) 已开通该站点代码，搜索词统计生效；不想要统计可删除 `config.mts` head 中那段 script。

## 许可证

- 代码（脚本 / CI / 主题 / 配置）：[MIT](./LICENSE)
- 内容（docs/ 全部文档与资产）：[CC BY-NC-SA 4.0](./LICENSE-CONTENT)

## 免责声明

手册内容按 SAP 标准行为撰写并逐页标注验证口径（`verifiedEnv`），不承诺与任何特定客户系统一致。SAP 版本差异客观存在，所有配置与结论请以你的系统实测为准——这正是每页附验证三元组的原因。
