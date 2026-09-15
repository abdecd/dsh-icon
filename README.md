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

## 构建

```bash
pnpm run build
```
