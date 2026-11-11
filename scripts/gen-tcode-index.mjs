#!/usr/bin/env node
/**
 * T-Code 总索引生成 CLI：npm run tcode-index（已并入 docs:build 前置步骤）
 */
import { updateIndexFile } from './lib/tcode-index.mjs'

const { count, pages } = updateIndexFile('docs/tcode-index.md', 'docs')
console.log(`T-Code 索引已生成：${count} 个 T-Code，来源 ${pages} 个页面。`)
