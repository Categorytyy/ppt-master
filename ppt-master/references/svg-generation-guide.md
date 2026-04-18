# SVG 图形生成实战指南

> 简化版 SVG 生成方案 —— 专为 ppt-master 设计，直接生成图形插入 PptxGenJS 页面。

---

## 一、核心差异：ai-pptx vs ppt-master

| 维度 | ai-pptx | ppt-master |
|------|---------|------------|
| **生成目标** | 整页 SVG 幻灯片 | 局部 SVG 图形 |
| **工作流程** | 多角色协作（Strategist→Executor） | 单步骤直接生成 |
| **后处理** | finalize_svg.py + svg_to_pptx.py | 直接导出 PNG |
| **演讲备注** | 独立系统 | 不涉及 |
| **复杂度** | 高 | **简化** |

**我们的简化原则**：
- 不需要整页 SVG
- 不需要复杂工作流
- 不需要后处理脚本
- **只需要：生成图形 → 导出 PNG → 插入 PPT**

---

## 二、SVG 生成流程（3步法）

```
┌─────────────────────────────────────────────────────────┐
│ Step 1: 判断需要 SVG 还是 PptxGenJS                      │
│ Step 2: 选择合适的 SVG 模板参考                          │
│ Step 3: 生成 SVG → 导出 PNG → 插入 PptxGenJS             │
└─────────────────────────────────────────────────────────┘
```

### Step 1: 技术选择

**用 PptxGenJS**：
- 文本框、基础形状（矩形/圆形/线条）
- 简单图表（柱状图、折线图、饼图）
- 标准内容布局

**用 SVG**：
- 甘特图、桑基图、热力图
- 金字塔、鱼骨图、思维导图
- SWOT、波特五力
- 复杂渐变、阴影效果

### Step 2: 选择模板参考

```bash
# 查看可用模板列表
read_file templates/svg-charts/charts_index.json

# 参考具体模板结构
read_file templates/svg-charts/swot_analysis.svg
```

**参考原则**：
- 理解模板的布局逻辑
- 学习视觉效果（渐变、阴影）
- **不要复制颜色和具体数值**

### Step 3: 生成与插入

```javascript
// 1. PptxGenJS 创建页面框架
let slide = pres.addSlide();
slide.addText("SWOT分析", { x: 0.5, y: 0.5, fontSize: 32, color: theme.primary });

// 2. 生成 SVG 代码（手动或AI生成）
// [SVG 代码生成...]

// 3. 导出 PNG（使用 sharp 库）
const sharp = require('sharp');
await sharp(Buffer.from(svgString))
  .png()
  .toFile('swot_graphic.png');

// 4. 插入 PPT
slide.addImage({
  path: 'swot_graphic.png',
  x: 0.5, y: 1.5, w: 9, h: 4.5
});
```

---

## 三、SVG 技术规范（核心要点）

### 3.1 画布尺寸

| 用途 | viewBox | 建议导出尺寸 |
|------|---------|-------------|
| 全宽图表 | `0 0 1280 400` | 1280×400 |
| 半页图表 | `0 0 600 400` | 600×400 |
| 正方形卡片 | `0 0 400 400` | 400×400 |

### 3.2 禁用特性（PPT兼容性）

| 禁用 | 说明 | 替代方案 |
|------|------|----------|
| `mask` | 蒙版 | `clipPath`（仅限图片） |
| `<style>` | 嵌入式样式表 | 行内样式 `fill="..."` |
| `class` | CSS类 | 行内样式 |
| `<foreignObject>` | 外部内容 | 使用 `<text>` |
| `<animate*>` | 动画 | 静态图形 |
| `@font-face` | 自定义字体 | 系统字体 |

### 3.3 推荐使用的效果

#### 渐变背景
```xml
<defs>
  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#2196F3"/>
    <stop offset="100%" stop-color="#21CBF3"/>
  </linearGradient>
</defs>
<rect fill="url(#grad1)" x="0" y="0" width="400" height="300"/>
```

#### 阴影效果
```xml
<defs>
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
</defs>
<rect fill="#FFFFFF" filter="url(#shadow)" x="10" y="10" width="200" height="100" rx="8"/>
```

#### 发光效果
```xml
<defs>
  <filter id="glow">
    <feGaussianBlur in="SourceAlpha" stdDeviation="6"/>
    <feFlood flood-color="#2196F3" flood-opacity="0.4"/>
    <feComposite in2="blur" operator="in"/>
    <feMerge>
      <feMergeNode/>
      <feMergeNode in="SourceGraphic"/>
    </feMerge>
  </filter>
</defs>
<text fill="#2196F3" filter="url(#glow)" x="100" y="100">Key Insight</text>
```

---

## 四、常见图形生成示例

### 4.1 SWOT 四象限图

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <linearGradient id="sGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E8F5E9"/>
      <stop offset="100%" stop-color="#C8E6C9"/>
    </linearGradient>
    <filter id="cardShadow">
      <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
      <feOffset dx="0" dy="2"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.15"/></feComponentTransfer>
      <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  
  <!-- S - Strengths -->
  <rect x="20" y="20" width="370" height="270" rx="8" fill="url(#sGrad)" filter="url(#cardShadow)"/>
  <rect x="20" y="20" width="370" height="40" rx="8" fill="#4CAF50"/>
  <text x="40" y="48" font-size="20" font-weight="bold" fill="#FFFFFF">优势 Strengths</text>
  <text x="40" y="90" font-size="14" fill="#2C3E50">• 技术研发能力强</text>
  <text x="40" y="120" font-size="14" fill="#2C3E50">• 品牌认知度高</text>
  
  <!-- W - Weaknesses -->
  <rect x="410" y="20" width="370" height="270" rx="8" fill="#FFEBEE" filter="url(#cardShadow)"/>
  <rect x="410" y="20" width="370" height="40" rx="8" fill="#E74C3C"/>
  <text x="430" y="48" font-size="20" font-weight="bold" fill="#FFFFFF">劣势 Weaknesses</text>
  
  <!-- O - Opportunities -->
  <rect x="20" y="310" width="370" height="270" rx="8" fill="#E3F2FD" filter="url(#cardShadow)"/>
  <rect x="20" y="310" width="370" height="40" rx="8" fill="#2196F3"/>
  <text x="40" y="338" font-size="20" font-weight="bold" fill="#FFFFFF">机会 Opportunities</text>
  
  <!-- T - Threats -->
  <rect x="410" y="310" width="370" height="270" rx="8" fill="#FFF3E0" filter="url(#cardShadow)"/>
  <rect x="410" y="310" width="370" height="40" rx="8" fill="#FF9800"/>
  <text x="430" y="338" font-size="20" font-weight="bold" fill="#FFFFFF">威胁 Threats</text>
</svg>
```

### 4.2 仪表盘

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" width="400" height="250">
  <!-- 背景弧线 -->
  <path d="M 50 200 A 150 150 0 0 1 350 200" fill="none" stroke="#E0E0E0" stroke-width="20" stroke-linecap="round"/>
  
  <!-- 进度弧线 (75%) -->
  <path d="M 50 200 A 150 150 0 0 1 312.5 96.7" fill="none" stroke="#4CAF50" stroke-width="20" stroke-linecap="round"/>
  
  <!-- 中心文字 -->
  <text x="200" y="180" font-size="48" font-weight="bold" fill="#2C3E50" text-anchor="middle">75%</text>
  <text x="200" y="210" font-size="14" fill="#7F8C8D" text-anchor="middle">完成度</text>
</svg>
```

### 4.3 KPI 卡片

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 200" width="800" height="200">
  <defs>
    <filter id="shadow">
      <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
      <feOffset dx="0" dy="2"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.1"/></feComponentTransfer>
      <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  
  <!-- Card 1 -->
  <rect x="20" y="20" width="170" height="160" rx="8" fill="#FFFFFF" filter="url(#shadow)"/>
  <text x="105" y="60" font-size="14" fill="#666" text-anchor="middle">营收</text>
  <text x="105" y="100" font-size="32" font-weight="bold" fill="#1A73E8" text-anchor="middle">¥2.5M</text>
  <text x="105" y="140" font-size="14" fill="#4CAF50" text-anchor="middle">↑ 15%</text>
  
  <!-- Card 2 -->
  <rect x="215" y="20" width="170" height="160" rx="8" fill="#FFFFFF" filter="url(#shadow)"/>
  <text x="300" y="60" font-size="14" fill="#666" text-anchor="middle">用户</text>
  <text x="300" y="100" font-size="32" font-weight="bold" fill="#1A73E8" text-anchor="middle">12.5K</text>
  <text x="300" y="140" font-size="14" fill="#4CAF50" text-anchor="middle">↑ 8%</text>
  
  <!-- Card 3 -->
  <rect x="410" y="20" width="170" height="160" rx="8" fill="#FFFFFF" filter="url(#shadow)"/>
  <text x="495" y="60" font-size="14" fill="#666" text-anchor="middle">转化率</text>
  <text x="495" y="100" font-size="32" font-weight="bold" fill="#1A73E8" text-anchor="middle">3.2%</text>
  <text x="495" y="140" font-size="14" fill="#E74C3C" text-anchor="middle">↓ 0.5%</text>
  
  <!-- Card 4 -->
  <rect x="605" y="20" width="170" height="160" rx="8" fill="#FFFFFF" filter="url(#shadow)"/>
  <text x="690" y="60" font-size="14" fill="#666" text-anchor="middle">满意度</text>
  <text x="690" y="100" font-size="32" font-weight="bold" fill="#1A73E8" text-anchor="middle">4.8</text>
  <text x="690" y="140" font-size="14" fill="#4CAF50" text-anchor="middle">↑ 0.2</text>
</svg>
```

### 4.4 金字塔图

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 500" width="600" height="500">
  <!-- Level 1 (Top) -->
  <polygon points="300,50 400,150 200,150" fill="#FF6B6B"/>
  <text x="300" y="115" font-size="16" font-weight="bold" fill="#FFFFFF" text-anchor="middle">自我实现</text>
  
  <!-- Level 2 -->
  <polygon points="200,150 400,150 450,250 150,250" fill="#4ECDC4"/>
  <text x="300" y="210" font-size="16" font-weight="bold" fill="#FFFFFF" text-anchor="middle">尊重需求</text>
  
  <!-- Level 3 -->
  <polygon points="150,250 450,250 500,350 100,350" fill="#45B7D1"/>
  <text x="300" y="310" font-size="16" font-weight="bold" fill="#FFFFFF" text-anchor="middle">社交需求</text>
  
  <!-- Level 4 -->
  <polygon points="100,350 500,350 550,450 50,450" fill="#96CEB4"/>
  <text x="300" y="410" font-size="16" font-weight="bold" fill="#FFFFFF" text-anchor="middle">安全需求</text>
  
  <!-- Level 5 (Bottom) -->
  <polygon points="50,450 550,450 600,500 0,500" fill="#FFEAA7"/>
  <text x="300" y="485" font-size="16" font-weight="bold" fill="#2C3E50" text-anchor="middle">生理需求</text>
</svg>
```

---

## 五、导出与插入实战

### 5.1 Node.js 方案

```javascript
const pptxgen = require("pptxgenjs");
const sharp = require("sharp");

// 1. 生成 SVG 字符串
function createSWOTSVG(data) {
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <!-- 简化版 SWOT -->
  <rect x="20" y="20" width="370" height="270" rx="8" fill="#E8F5E9"/>
  <rect x="20" y="20" width="370" height="40" rx="8" fill="#4CAF50"/>
  <text x="40" y="48" font-size="20" font-weight="bold" fill="#FFFFFF">优势 S</text>
  ${data.strengths.map((s, i) => `<text x="40" y="${90+i*30}" font-size="14" fill="#2C3E50">• ${s}</text>`).join('')}
  
  <rect x="410" y="20" width="370" height="270" rx="8" fill="#FFEBEE"/>
  <rect x="410" y="20" width="370" height="40" rx="8" fill="#E74C3C"/>
  <text x="430" y="48" font-size="20" font-weight="bold" fill="#FFFFFF">劣势 W</text>
  
  <rect x="20" y="310" width="370" height="270" rx="8" fill="#E3F2FD"/>
  <rect x="20" y="310" width="370" height="40" rx="8" fill="#2196F3"/>
  <text x="40" y="338" font-size="20" font-weight="bold" fill="#FFFFFF">机会 O</text>
  
  <rect x="410" y="310" width="370" height="270" rx="8" fill="#FFF3E0"/>
  <rect x="410" y="310" width="370" height="40" rx="8" fill="#FF9800"/>
  <text x="430" y="338" font-size="20" font-weight="bold" fill="#FFFFFF">威胁 T</text>
</svg>`;
}

// 2. 导出 PNG
async function svgToPng(svgString, outputPath) {
  await sharp(Buffer.from(svgString))
    .png()
    .toFile(outputPath);
  return outputPath;
}

// 3. 插入 PPT
async function createSlideWithSVG() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  
  let slide = pres.addSlide();
  slide.addText("SWOT分析", { x: 0.5, y: 0.5, fontSize: 32, color: "1A237E" });
  
  // 生成并插入 SVG
  const svg = createSWOTSVG({
    strengths: ["技术专利200+", "品牌知名度高", "供应链完整"]
  });
  
  await svgToPng(svg, 'swot.png');
  
  slide.addImage({
    path: 'swot.png',
    x: 0.5, y: 1.5, w: 9, h: 5.5
  });
  
  await pres.writeFile({ fileName: "output.pptx" });
}

createSlideWithSVG();
```

### 5.2 Python 方案

```python
from pptx import Presentation
from pptx.util import Inches, Pt
from cairosvg import svg2png
import io

def create_gauge_svg(percentage):
    """生成仪表盘 SVG"""
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250">
  <path d="M 50 200 A 150 150 0 0 1 350 200" fill="none" stroke="#E0E0E0" stroke-width="20" stroke-linecap="round"/>
  <path d="M 50 200 A 150 150 0 0 1 {50 + 300 * percentage / 100} {200 - 150 * (1 - (2 * percentage / 100 - 1) ** 2) ** 0.5}" 
        fill="none" stroke="#4CAF50" stroke-width="20" stroke-linecap="round"/>
  <text x="200" y="180" font-size="48" font-weight="bold" fill="#2C3E50" text-anchor="middle">{percentage}%</text>
</svg>'''

def add_svg_to_slide(prs, svg_string, left, top, width, height):
    """将 SVG 插入幻灯片"""
    # SVG 转 PNG
    png_data = svg2png(bytestring=svg_string.encode('utf-8'))
    
    # 保存临时文件
    temp_path = "temp_graphic.png"
    with open(temp_path, "wb") as f:
        f.write(png_data)
    
    # 插入 PPT
    slide = prs.slides.add_slide(prs.slide_layouts[5])
    slide.shapes.add_picture(temp_path, left, top, width, height)
    
    return slide

# 使用
prs = Presentation()
slide = prs.slides.add_slide(prs.slide_layouts[5])

# 添加标题
from pptx.util import Inches
title = slide.shapes.add_textbox(Inches(0.5), Inches(0.5), Inches(9), Inches(0.8))
title.text_frame.text = "完成度指标"

# 添加 SVG 仪表盘
svg = create_gauge_svg(75)
png_data = svg2png(bytestring=svg.encode('utf-8'))
with open("gauge.png", "wb") as f:
    f.write(png_data)

slide.shapes.add_picture("gauge.png", Inches(3), Inches(2), Inches(4), Inches(2.5))

prs.save("output.pptx")
```

---

## 六、快速决策表

| 需求 | 推荐方案 | 模板参考 |
|------|----------|----------|
| 项目进度 | SVG 甘特图 | gantt_chart.svg |
| KPI 展示 | SVG 仪表盘/卡片 | kpi_cards.svg |
| 战略分析 | SVG SWOT | swot_analysis.svg |
| 转化漏斗 | SVG 漏斗图 | funnel_chart.svg |
| 能力评估 | SVG 雷达图 | radar_chart.svg |
| 层级结构 | SVG 金字塔 | pyramid_chart.svg |
| 流程步骤 | SVG 流程图 | process_flow.svg |
| 对比分析 | SVG 对比表格 | comparison_table.svg |
| 简单柱状图 | PptxGenJS | chart-bar.js |
| 简单饼图 | PptxGenJS | chart-pie.js |

---

## 七、最佳实践

### DO
- ✅ 先 PptxGenJS 框架，后 SVG 图形
- ✅ 使用项目配色（不要复制模板颜色）
- ✅ 添加阴影提升层次感
- ✅ 导出 PNG 再插入（兼容性最好）
- ✅ 保持图形尺寸适中（800-1200px 宽度）

### DON'T
- ❌ 全页 SVG（失去可编辑性）
- ❌ 直接使用模板颜色
- ❌ SVG 过于复杂（性能问题）
- ❌ 使用 PPT 不兼容的 SVG 特性
- ❌ 文字过小（PPT 中看不清）

---

## 附录：依赖安装

```bash
# Node.js
npm install pptxgenjs sharp

# Python
pip install python-pptx cairosvg
```
