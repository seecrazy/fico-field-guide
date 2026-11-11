# PROGRESS — 进度事实源

> 本文件是进度与验证状态唯一事实源。每个工作阶段更新；最终状态以此处记录为准。

## 状态总览（2026-11-11 收官）

| # | 阶段 | 状态 | 验证方式与结果 |
|---|---|---|---|
| 1 | 环境与初始化（git init / 依赖） | ✅ 完成 | Node 24.14 / npm 11.9 / vitepress 1.6.4 / mermaid 11 / plugin 2.0.17 |
| 2 | VitePress 骨架（config / 主题组件 / 首页） | ✅ 完成 | 构建通过，中文导航/侧边栏/本地搜索/sitemap 生效 |
| 3 | 机制脚本 + 单元测试 | ✅ 完成 | `npm test` **16/16 全绿**；`npm run check` **15 个硬校验文件 0 违规** |
| 4 | CI 工作流 + Issue 模板 | ✅ 完成 | deploy / quality / link-check / badges 四工作流 + 3 个 Issue 模板（线上生效待 push） |
| 5 | 站点核心页 | ✅ 完成 | 首页 / 使用路径 / 写作约定 / T-Code 索引模板 |
| 6 | 内容页全量（5 组并行 subagent，全部人工验收） | ✅ 完成 | 详见下表 |
| 7 | 校验-构建-修复循环 | ✅ 完成 | `docs:build` 成功：29 页 / 61 T-Code 入索引 / 死链清零 / sitemap 生成；浏览器实测 Mermaid 渲染与组件（见「浏览器验证」） |
| 8 | 三件套文档（DESIGN v2.0 / PROGRESS / README） | ✅ 完成 | 随阶段持续更新 |
| 9 | 本地分阶段 git 提交 | ✅ 完成 | 13 个语义化提交（未推送，按指示本地保留） |

## 内容页交付明细（验收人：主会话）

| 组 | 文件 | 验收要点 |
|---|---|---|
| A 配置笔记 5 | `03-config-notes/{mm-fi-obyc, gl-field-status, asset-s4-diff, ap-special-gl, co-assessment}.md` | OBYC 事务键/评估类/前置链事实核对无误；分摊 42 类要素与分摊 vs 分配辨析准确 |
| B 报错速查 11 | `01-daily-ops/errors/index.md + 10 条目` | F5 702 消息文本格式与真实系统一致；F.13 真清账 vs F.19 重分类口径正确；每条 4 根因按概率排序 |
| C 速查卡片 2 | `01-daily-ops/{tcode-cards(23 卡), month-end-checklist}.md` | 23 卡确认；**人工修正**：F-48 预付款特别总账标识误写 A，已改为 F（A 是汇票） |
| D 项目阶段 3 | `02-project/{blueprint-questions, integration-test, go-live-runbook}.md` | 23 问/三脚本 29 行/18 任务；F-28 收款、F-32 清账、AS91/ABLDT 口径正确 |
| E 支撑页 2 | `00-about/version-matrix.md + 99-contribute/how-to-contribute.md` | 15 行差异全为公认事实（ACDOCA/新资产会计/ML 强制/FSCM/账目基 CO-PA），未编造 Note 号；三模板与 CI 字符串逐字一致 |

## 浏览器验证（Playwright Chromium + preview 4173，9/9 通过）

- Mermaid 客户端渲染为 SVG（首页 / 月结页）
- 验证状态条（VerifiedBanner）与反馈按钮（FeedbackButtons）在内容页就位
- 三元组标记 / 根因表 / T-Code 索引 61 行 / 顶部搜索按钮，DOM 断言全过
- **修复一处实证 bug**：VitePress 将 YAML 日期解析为 Date 对象，状态条曾显示 ISO 时间串——已在 `transformPageData` 归一化为 `YYYY-MM-DD` 后重验通过
- 截图留档：`/tmp/vfg_home.png`、`/tmp/vfg_obyc.png`、`/tmp/vfg_tcode.png`

## 量化交付

- 站点页面 **29** 个（HTML）；内容 Markdown **27** 篇（含索引页）
- T-Code 总索引收录 **61** 个事务码
- 单元测试 **16** 个（frontmatter 解析 4 / 校验规则 4 / 索引生成 4 / 徽章聚合 4）
- 结构硬校验文件 **15** 个（配置笔记 5 + 报错 10），CI 双闸门（quality + deploy）
- 下载资产 2 个 CSV（UTF-8 BOM）+ 模板说明页

## 环境坑位记录（复用避坑）

1. **macOS `/var` → `/private/var` 符号链接**：`process.cwd()` 会被 realpath 化，与 `mkdtempSync` 返回路径前缀不一致，`path.relative()` 异常。修复：路径转换一律显式基准目录参数。
2. **Node 24 的 `node --test tests/`** 报 Cannot find module；正确写法 `node --test "tests/*.test.mjs"`（glob 加引号）。
3. **JS 块注释中的 `**/*.md`**：`*/` 提前终止注释 → SyntaxError。注释里写 glob 要拆开。
4. **vitepress-plugin-mermaid**：当前线 2.x，peer 要求 mermaid 10/11 + vitepress 1.x；mermaid 12 不兼容。
5. **VitePress dead link 默认严格**：裸 `http://localhost:5173` 也会被查——行内代码化即可；这是特性（构建期死链零容忍）。
6. **npm 版本号**：vitepress-plugin-mermaid 1.x 已不在最新线，`^1.10.0` 会 notarget，用 `^2.0.17`。
7. **`node --test` 的 glob 参数是 Node 21+ 特性**：CI 用 node 20 时 `node --test "tests/*.test.mjs"` 被当字面文件名直接失败（本地 Node 24 全绿掩盖了差异）。已改为显式文件列表，并在 Node 20/24 双版本验证。教训：本地与 CI 的 Node 大版本要矩阵对齐。

## 遗留事项（非阻塞）

- ~~GoatCounter 与 REPO_URL/sitemap 占位~~：已注入真实信息（GitHub 用户名 `seecrazy`、GoatCounter 站点代码 `seecrazy`），link-check 排除规则同步更新。推送后仅需 Settings → Pages 选 GitHub Actions。
- badges.data.json 当前为占位数据（`--if-missing` 策略），接入真实仓库后每周一 badges.yml 自动刷新。
- link-check / badges 两个定时工作流需 push 后在 GitHub 上生效。

## 变更日志

- 2026-11-11（晚）：推送后 deploy CI 失败——根因为坑位 7（node --test glob 为 Node 21+ 特性），改显式文件列表并 Node 20/24 双验证；deploy.yml 顺手补 `issues: read` + `GH_TOKEN` 使部署时徽章数据实时生成。
- 2026-11-11：v1 设计评审稿 → v2 优化定稿（10 项优化见 DESIGN.md §2）→ 全量开发完成：骨架 / 机制脚本 / 16 测试 / CI 四工作流 / 27 篇内容 / 浏览器渲染验证 / 13 本地提交。**未推送（按指示）。**
