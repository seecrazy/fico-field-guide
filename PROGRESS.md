# PROGRESS — 进度事实源

> 本文件是进度与验证状态唯一事实源。每个工作阶段更新；最终状态以此处记录为准。

## 状态总览（更新于 2026-11-11）

| # | 阶段 | 状态 | 验证方式 |
|---|---|---|---|
| 1 | 环境与初始化（git init / 依赖） | ✅ 完成 | Node 24.14 / npm 11.9 / vitepress 1.6.4 / mermaid 11 / plugin 2.0.17 |
| 2 | VitePress 骨架（config / 主题组件 / 首页） | ✅ 完成 | 首次 `docs:build` 编译通过（死链报错为预期，内容页未建） |
| 3 | 机制脚本 + 单元测试 | ✅ 完成 | `npm test` 16/16 全绿；`npm run check` 通过 |
| 4 | CI 工作流 + Issue 模板 | ✅ 完成 | 4 workflow + 3 模板 YAML 成文（线上生效待 push 后验证） |
| 5 | 站点核心页（index / how-to-use / conventions / tcode-index 模板） | ✅ 完成 | 构建冒烟 |
| 6 | 内容页全量生成（5 组并行 subagent） | 🔄 进行中 | agent A-E 后台运行中 |
| 7 | 校验-构建-修复循环 | ⏳ 待开始 | `npm run check` 0 违规 + `npm test` 全绿 + `docs:build` 无死链 |
| 8 | DESIGN / PROGRESS / README 定稿 | 🔄 进行中 | DESIGN v2.0 已成文 |
| 9 | 本地分阶段 git 提交 | ⏳ 待开始 | `git log` 不少于 10 个有语义的提交 |

## 内容页交付清单

| 组 | 文件 | 状态 |
|---|---|---|
| A 配置笔记 | 03-config-notes/{mm-fi-obyc, gl-field-status, asset-s4-diff, ap-special-gl, co-assessment}.md | 🔄 agent 生成中 |
| B 报错速查 | 01-daily-ops/errors/index.md + 10 条目 | 🔄 agent 生成中 |
| C 速查卡片 | 01-daily-ops/{tcode-cards(23 卡), month-end-checklist}.md | 🔄 agent 生成中 |
| D 项目阶段 | 02-project/{blueprint-questions, integration-test, go-live-runbook}.md | 🔄 agent 生成中 |
| E 支撑页 | 00-about/version-matrix.md + 99-contribute/how-to-contribute.md | 🔄 agent 生成中 |

## 环境坑位记录（复用避坑）

1. **macOS `/var` → `/private/var` 符号链接**：`process.cwd()` 会被 realpath 化，与 `mkdtempSync` 返回的 `/var/...` 前缀不一致，`path.relative()` 结果异常。修复：路径转换一律用显式基准目录参数（`relative(baseDir, file)`），不依赖 cwd。
2. **Node 24 的 `node --test tests/` 目录参数**报 `Cannot find module`；正确写法是 `node --test "tests/*.test.mjs"`（glob 加引号）。
3. **JS 块注释中的 `**/*.md`**：`*/` 会提前终止注释导致 SyntaxError（本次 `validate.mjs` 实际踩中）。注释里写 glob 要拆开。
4. **vitepress-plugin-mermaid**：当前线是 2.x（不是 1.x），peer 要求 mermaid 10/11 + vitepress 1.x；mermaid 12 不兼容。
5. **VitePress dead link 检查默认开启**：构建期引用不存在页面即失败——这是特性不是 bug，等全部内容页就位后自动消解；确需占位时在 config 配 `ignoreDeadlinks`。

## 变更日志

- 2026-11-11：v1 设计评审稿 → v2 优化定稿（10 项优化记录见 DESIGN.md §2）；骨架、机制脚本、CI、测试全部落地。
