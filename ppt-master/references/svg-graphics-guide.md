# SVG 高级图形制作指南

> 本指南说明如何在 ppt-master 中使用 SVG 绘制 PptxGenJS 无法实现的复杂图形和视觉效果。

---

## 一、为什么需要 SVG

### PptxGenJS 的局限

| 功能 | PptxGenJS | SVG |
|------|-----------|-----|
| 复杂渐变 | ⚠️ 有限支持 | ✅ 线性/径向/多色渐变 |
| 阴影/发光效果 | ❌ 不支持 | ✅ filter 滤镜 |
| 自定义形状 | ❌ 仅基础形状 | ✅ path 任意路径 |
| 复杂图表 | ❌ 基础图表 | ✅ 52种专业图表 |
| 信息图 | ❌ 不支持 | ✅ 金字塔/鱼骨/思维导图等 |

### 使用场景

```
制作PPT时遇到：
├── 简单图形（矩形/圆形/线条）→ 用 PptxGenJS
├── 基础图表（柱状/折线/饼图）→ 用 PptxGenJS
└── 复杂图形？→ 用 SVG
    ├── 甘特图、桑基图、热力图
    ├── 金字塔、鱼骨图、思维导图
    ├── 仪表盘、KPI卡片、漏斗图
    └── 渐变背景、阴影卡片、特效
```

---

## 二、SVG 模板库（52种）

### 2.1 数据可视化类（25种）

#### 对比分析
| 模板 | 用途 | 场景 |
|------|------|------|
| `bar_chart` | 垂直条形图 | 类别排名、数值对比 |
| `horizontal_bar_chart` | 水平条形图 | 长标签类别对比 |
| `grouped_bar_chart` | 分组条形图 | 多系列年度对比 |
| `stacked_bar_chart` | 堆叠条形图 | 构成与总量对比 |
| `butterfly_chart` | 蝴蝶图 | 双向对比（男女/前后） |
| `bullet_chart` | 子弹图 | 目标vs实际值 |
| `dumbbell_chart` | 哑铃图 | 前后变化对比 |
| `waterfall_chart` | 瀑布图 | 增量变化分解 |

#### 趋势分析
| 模板 | 用途 | 场景 |
|------|------|------|
| `line_chart` | 折线图 | 时间趋势（1-3系列） |
| `area_chart` | 面积图 | 累积量趋势 |
| `stacked_area_chart` | 堆叠面积图 | 多系列累积变化 |
| `dual_axis_line_chart` | 双轴图 | 不同量纲对比 |

#### 构成分析
| 模板 | 用途 | 场景 |
|------|------|------|
| `pie_chart` | 饼图 | 简单占比（3-6项） |
| `donut_chart` | 环形图 | 中心可放KPI的占比 |
| `treemap_chart` | 树状图 | 层级占比展示 |

#### 指标仪表
| 模板 | 用途 | 场景 |
|------|------|------|
| `kpi_cards` | KPI卡片 | 2×2指标看板 |
| `gauge_chart` | 仪表盘 | 目标完成度 |
| `progress_bar_chart` | 进度条 | 多项目进度对比 |

#### 高级分析
| 模板 | 用途 | 场景 |
|------|------|------|
| `radar_chart` | 雷达图 | 多维度能力评估 |
| `scatter_chart` | 散点图 | 相关性分析 |
| `bubble_chart` | 气泡图 | 三维数据展示 |
| `heatmap_chart` | 热力图 | 矩阵强度分析 |
| `pareto_chart` | 帕累托图 | 80/20贡献分析 |
| `box_plot_chart` | 箱线图 | 分布与异常值 |
| `funnel_chart` | 漏斗图 | 转化漏斗分析 |

### 2.2 流程与项目管理（5种）

| 模板 | 用途 | 场景 |
|------|------|------|
| `gantt_chart` | 甘特图 | 项目进度、任务依赖 |
| `timeline` | 时间轴 | 里程碑、历史演进 |
| `process_flow` | 流程图 | 步骤流程、方法说明 |
| `org_chart` | 组织架构图 | 层级关系、汇报线 |
| `sankey_chart` | 桑基图 | 流量分配、转化路径 |

### 2.3 战略框架（2种）

| 模板 | 用途 | 场景 |
|------|------|------|
| `swot_analysis` | SWOT分析 | 战略四象限分析 |
| `porter_five_forces` | 波特五力 | 行业竞争结构 |

### 2.4 信息图类（20种）

#### 层级与结构
| 模板 | 用途 | 场景 |
|------|------|------|
| `pyramid_chart` | 金字塔图 | 马斯洛需求、能力层级 |
| `isometric_stairs` | 3D阶梯 | 成熟度模型、成长阶段 |
| `concentric_circles` | 同心圆 | 优先级层次、核心外围 |

#### 关系与对比
| 模板 | 用途 | 场景 |
|------|------|------|
| `venn_diagram` | 维恩图 | 集合关系、交集分析 |
| `pros_cons_chart` | 利弊对比 | 优劣势双边对比 |
| `comparison_table` | 对比表格 | 多维度方案对比 |
| `comparison_columns` | 对比列 | 定价/方案并列对比 |
| `matrix_2x2` | 2×2矩阵 | 四象限定位分析 |
| `hub_spoke` | 中心辐射 | 生态系统、核心关联 |

#### 流程与路径
| 模板 | 用途 | 场景 |
|------|------|------|
| `cycle_diagram` | 循环图 | PDCA、闭环流程 |
| `numbered_steps` | 编号步骤 | 顺序步骤说明 |
| `chevron_process` | 箭头流程 | 阶段推进、方向流程 |
| `snake_flow` | S形流程 | 用户旅程、生命周期 |
| `roadmap_vertical` | 垂直路线图 | 年度规划、里程碑 |

#### 展示与布局
| 模板 | 用途 | 场景 |
|------|------|------|
| `icon_grid` | 图标网格 | 功能特性展示 |
| `sector_diagram` | 扇形图 | 服务架构、生态布局 |
| `vertical_list` | 垂直列表 | 条目列表展示 |
| `word_cloud` | 词云 | 关键词频率展示 |
| `fishbone_diagram` | 鱼骨图 | 因果分析、问题根因 |
| `mind_map` | 思维导图 | 知识分解、头脑风暴 |

---

## 三、使用决策树

```
这页需要可视化吗？
│
├── 不需要 → 用 PptxGenJS 基础布局
│
└── 需要 → 什么类型？
    │
    ├── 数据图表 → 基础图表？
    │   ├── 是（柱状/折线/饼图）→ PptxGenJS charts
    │   └── 否（复杂图表）→ SVG
    │       ├── 对比/排名 → bar/horizontal_bar/butterfly
    │       ├── 趋势 → line/area/dual_axis
    │       ├── 构成 → pie/donut/treemap
    │       ├── KPI仪表 → kpi_cards/gauge/progress
    │       ├── 分析 → radar/scatter/heatmap/funnel
    │       └── 流程 → gantt/timeline/sankey
    │
    ├── 战略分析 → SVG
    │   ├── SWOT → swot_analysis
    │   ├── 五力 → porter_five_forces
    │   └── 矩阵 → matrix_2x2
    │
    ├── 信息图 → SVG
    │   ├── 层级 → pyramid/isometric_stairs
    │   ├── 关系 → venn/hub_spoke
    │   ├── 流程 → cycle/numbered_steps/chevron
    │   ├── 对比 → pros_cons/comparison_table
    │   └── 结构 → mind_map/fishbone
    │
    └── 视觉效果 → SVG
        ├── 渐变背景 → linearGradient/radialGradient
        ├── 阴影卡片 → filter阴影
        └── 特殊形状 → path自定义
```

---

## 四、实施步骤

### Step 1: 判断是否需要 SVG

**使用 PptxGenJS 的场景**（无需 SVG）：
- 文本内容页
- 简单几何图形（矩形、圆形、箭头）
- 基础图表（简单柱状图、折线图、饼图）
- 标准布局页面

**使用 SVG 的场景**：
- 复杂数据可视化
- 信息图表
- 战略框架图
- 需要渐变/阴影/特效

### Step 2: 选择合适的 SVG 模板

```javascript
// 查阅模板索引
const chartIndex = require('./templates/svg-charts/charts_index.json');

// 快速查找示例
// "需要展示项目进度" → chartIndex.categories.process → gantt_chart
// "需要SWOT分析" → chartIndex.categories.strategy → swot_analysis
// "需要展示能力评估" → chartIndex.categories.analysis → radar_chart
```

### Step 3: 参考模板结构

1. **阅读模板文件**：`read_file templates/svg-charts/{chart_name}.svg`
2. **理解布局**：坐标、间距、配色方案
3. **提取设计逻辑**：不要复制，要理解后重新设计

### Step 4: 生成 SVG 代码

**基本原则**：
- 遵循项目配色方案（不要直接复制模板颜色）
- 使用项目字体设置
- 适配实际数据内容
- 保持专业视觉效果（渐变、阴影）

### Step 5: 导出并插入 PPT

```javascript
// SVG 转 PNG（推荐）
const sharp = require('sharp');
await sharp('chart.svg')
  .png()
  .toFile('chart.png');

// PptxGenJS 插入图片
slide.addImage({
  path: 'chart.png',
  x: 1, y: 1.5, w: 8, h: 4.5
});
```

---

## 五、SVG 技术规范

### 5.1 画布尺寸

| 用途 | viewBox | 尺寸 |
|------|---------|------|
| PPT 16:9 全页 | `0 0 1280 720` | 1280×720 |
| PPT 16:9 半页 | `0 0 1280 360` | 1280×360 |
| PPT 4:3 | `0 0 1024 768` | 1024×768 |

### 5.2 禁用特性（PPT兼容性）

| 禁用 | 替代方案 |
|------|----------|
| `mask` | 使用 `clipPath`（仅限图片） |
| `<style>` | 行内样式 `fill="..."` |
| `class` | 行内样式 |
| `<foreignObject>` | 使用 `<text>`、`<tspan>` |
| `<animate*>` | 静态图形 |
| `@font-face` | 系统字体 |

### 5.3 推荐使用的视觉效果

```xml
<!-- 线性渐变 -->
<linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
  <stop offset="0%" style="stop-color:#2196F3;stop-opacity:1" />
  <stop offset="100%" style="stop-color:#21CBF3;stop-opacity:1" />
</linearGradient>

<!-- 阴影滤镜 -->
<filter id="shadow">
  <feGaussianBlur in="SourceAlpha" stdDeviation="4"/>
  <feOffset dx="0" dy="2"/>
  <feComponentTransfer>
    <feFuncA type="linear" slope="0.2"/>
  </feComponentTransfer>
  <feMerge>
    <feMergeNode/>
    <feMergeNode in="SourceGraphic"/>
  </feMerge>
</filter>

<!-- 使用 -->
<rect fill="url(#grad1)" filter="url(#shadow)" />
```

---

## 六、场景化应用示例

### 6.1 工作汇报场景

| 内容 | 推荐 SVG | 效果 |
|------|----------|------|
| 项目进度 | gantt_chart | 可视化时间线 |
| 业绩指标 | kpi_cards | 专业仪表板 |
| 问题分析 | fishbone_diagram | 结构化根因 |
| 下步计划 | roadmap_vertical | 清晰路线图 |

### 6.2 商业提案场景

| 内容 | 推荐 SVG | 效果 |
|------|----------|------|
| 市场分析 | matrix_2x2 | 竞争定位 |
| 商业模式 | hub_spoke | 生态关系 |
| 增长策略 | pyramid_chart | 层级递进 |
| 财务预测 | waterfall_chart | 变化分解 |

### 6.3 培训课件场景

| 内容 | 推荐 SVG | 效果 |
|------|----------|------|
| 流程讲解 | process_flow | 清晰步骤 |
| 知识框架 | mind_map | 结构化解构 |
| 对比说明 | comparison_table | 直观对比 |
| 阶段目标 | isometric_stairs | 成长路径 |

### 6.4 学术汇报场景

| 内容 | 推荐 SVG | 效果 |
|------|----------|------|
| 研究方法 | cycle_diagram | 流程闭环 |
| 数据分析 | box_plot_chart | 统计分布 |
| 实验设计 | numbered_steps | 步骤清晰 |
| 结果讨论 | scatter_chart | 相关关系 |

---

## 七、与 PptxGenJS 的配合

### 混合页面示例

```javascript
// 1. PptxGenJS 创建页面框架
let slide = pres.addSlide();

// 添加标题（PptxGenJS）
slide.addText("项目进度概览", {
  x: 0.5, y: 0.5, w: 9, h: 0.8,
  fontSize: 32, bold: true, color: "1A237E"
});

// 2. SVG 生成甘特图（复杂图形）
// [生成甘特图 SVG 代码...]
// [导出为 gantt.png...]

// 3. 插入 SVG 图片（预留区域）
slide.addImage({
  path: 'gantt.png',
  x: 0.5, y: 1.5, w: 9, h: 4
});

// 4. PptxGenJS 添加页脚
slide.addText("Q3项目进度", {
  x: 0.5, y: 5.5, w: 9, h: 0.3,
  fontSize: 12, color: "666666"
});
```

### 布局建议

```
┌─────────────────────────────────────────┐
│  标题（PptxGenJS 文本）                  │
├─────────────────────────────────────────┤
│                                         │
│         SVG 图形区域                     │
│      （复杂图表/信息图）                  │
│                                         │
├─────────────────────────────────────────┤
│  说明文字（PptxGenJS 文本）              │
└─────────────────────────────────────────┘
```

---

## 八、最佳实践

### DO（推荐）

- ✅ 先用 PptxGenJS 创建页面框架
- ✅ SVG 只负责复杂图形区域
- ✅ 参考模板但不要复制，适配项目配色
- ✅ 使用渐变和阴影提升视觉层次
- ✅ 导出 PNG 插入 PPT（兼容性最好）
- ✅ 保持图形清晰可读

### DON'T（避免）

- ❌ 全页都用 SVG（失去可编辑性）
- ❌ 直接复制模板颜色（不符合项目配色）
- ❌ 使用 PPT 不兼容的 SVG 特性
- ❌ SVG 过于复杂导致文件过大
- ❌ 忽视文字可读性

---

## 九、快速参考卡

```markdown
需要画什么？          用什么？
─────────────────────────────────────────
简单形状              PptxGenJS shapes
基础图表              PptxGenJS charts
文本布局              PptxGenJS text

甘特图                SVG gantt_chart
SWOT                  SVG swot_analysis
金字塔                SVG pyramid_chart
漏斗图                SVG funnel_chart
仪表盘                SVG gauge_chart
思维导图              SVG mind_map
鱼骨图                SVG fishbone_diagram
对比表格              SVG comparison_table
流程图                SVG process_flow
热力图                SVG heatmap_chart
桑基图                SVG sankey_chart
雷达图                SVG radar_chart

渐变背景              SVG gradient
阴影效果              SVG filter
复杂形状              SVG path
```

---

## 附录：模板索引文件

模板完整列表和说明见：`templates/svg-charts/charts_index.json`

按场景快速查找：
- `quickLookup.ranking` - 排名对比
- `quickLookup.strategy` - 战略分析
- `quickLookup.roadmap` - 路线图
- `quickLookup.infographic` - 信息图
- `quickLookup.flow` - 流程图
- `quickLookup.kpi` - 指标仪表
