# dsh-icon

DeepSeek Harness (DSH) 插件，提供以下两个功能：

1. **新会话空白页右上角展开侧边栏按钮**：在新会话尚未输入任何内容（空白/hero 状态）时，在右上角显示展开侧边栏按钮，样式与交互与已开始对话后的原生按钮完全一致，点击即可展开右侧栏，展开后自动隐藏。
2. **会话运行中浏览器标签页动态图标**：当有会话正在运行处理（生成回复或执行工具调用）时，实时将浏览器标签页的 Favicon 替换为带旋转动态环和脉动指示点的 DeepSeek 鲸鱼运行动画；运行结束后自动恢复原始图标。

## 安装

在当前插件目录执行：

```bash
dsh plugin --profile web link .
```

（或指定绝对路径：`dsh plugin --profile web link /path/to/dsh-icon`）

## 构建与测试

```bash
pnpm run build
pnpm run typecheck
pnpm run test
```

## 兼容性与验证状态

- **目标宿主版本**：DeepSeek Harness `0.2.0-rc.2`（`peerDependencies`: `^0.2.0-rc.2`）
- **验证状态**：
  - **静态验证 (Static Verified)**：`pnpm run build`、`pnpm run typecheck`、`pnpm run test`（涵盖 cohort/peer 声明、主会话多源解析契约、SidebarRight 真实方法与 fallback 容错、打包工厂 runtime 烟测）均已通过。
  - **浏览器环境 (Browser)**：未在活跃 Web 浏览器 GUI 环境实机渲染验证（subagent 隔离环境无 GUI 挂载授权）。

## 回滚操作（任务所属文件安全恢复）

修改尚未提交，直接切换分支会携带这些改动。以下仅为人工确认后的回滚指引，并未执行：先确认每个文件没有后续用户改动，保存差异补丁及两个新增文件的备份；如存在后续改动，应停止整体恢复，改为人工撤销本次变更。

```bash
# 1. 恢复受本任务修改的跟踪文件
git restore --source=57a1e2d931039cdafabf51f97b2ae2f58e0667ad -- README.md client.js client.js.map package.json pnpm-lock.yaml src/ambient.d.ts src/client/BlankSessionExpandButton.tsx src/client/favicon-running.ts

# 2. 移除本任务新增的未跟踪文件
rm -f src/client/helpers.ts tests/regression.test.mjs

# 3. 恢复基线依赖及构建产物
pnpm install --ignore-scripts
pnpm run build

# 4. 确认只剩预期差异后再切换回 main 分支
git switch main
```
