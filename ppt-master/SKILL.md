---
name: ppt-master
description: 专业PPT设计制作技能。⚠️【强制】必须先完成需求分析（Step 1），不允许直接开始制作。无论用户提供什么材料，都必须通过提问收集完整需求后才能继续。触发条件：用户需要制作PPT、设计幻灯片、汇报演讲、课件制作、PPT模板设计、PPT美化、PPT排版、幻灯片设计、slides、.pptx文件生成等任何与PPT相关的任务。融合了专业设计原理（CRAP原则、配色心理学、版式设计）和PptxGenJS代码生成能力，包含22个预建模板和Q1-Q9设计决策框架。
---

# PPT Master - 专业PPT设计制作技能

## ⚠️ 执行警示（必读）

> **10%核心原则**：PPT设计的80%价值来自20%的核心知识。不要为了查"图片处理12法"而忽略了核心原则的应用。

### 每次必查的20%

| 原则 | 文件 | 为什么重要 |
|------|------|------------|
| **CRAP四原则** | [design-principles.md](references/design-principles.md) | 对比/重复/对齐/接近贯穿始终 |
| **配色7:2:1法则** | [references/color-system.md](references/color-system.md) | 控制颜色不超过3种+黑白灰 |
| **场景信息密度** | [references/scenarios/*.md](references/scenarios) | 决定一页放几个要点 |

---

## 🚨 强制执行警告

> 🚨 **违规警告**：如果在没有完成 Step 1 需求分析的情况下直接开始生成内容，所产生的内容不被认为是正确的技能执行。正确的流程永远是：**提问 → 确认 → 执行**。
>
> ⚠️ **【强制规则 - 绝对禁止跳过】**
> - 即使用户给了完整文档，也要提问确认
> - 即使用户说"直接做"，也要先完成需求收集
> - 需求分析是**第一步也是唯一的第一步**，在完成之前禁止：
>   - ❌ 阅读用户材料
>   - ❌ 分析内容
>   - ❌ 生成任何内容
> - 违反此规则将导致生成内容不符合用户需求

---

## 核心决策流程

```
⚠️ 【强制入口】必须从这里开始，不允许跳过
    ↓
[Step 1: 需求分析] → ★★★ 必须先完成 Step 1 ★★★
    ↓
[Step 2: 场景判定] → ★ 必须等 Step 1 完成 ★
    ↓
[Step 3前: 设计决策] → ★ Q1-Q9 + CRAP框架自问 ★
    ↓
[Step 3: 设计执行] → 按must-read + scenario读取references
    ↓
[Step 4前: 设计验证] → ★ 单页+全局检查清单 ★
    ↓
[Step 4: 代码生成] → PptxGenJS实现
```

---

## Step 1: 需求分析（强制执行）

> ⚠️ **【强制规则 - 绝对禁止跳过】**
> 在完成需求分析之前，你 **绝对不能** 做以下任何事情：
> - ❌ 阅读用户的材料文件
> - ❌ 分析材料内容
> - ❌ 规划PPT结构
> - ❌ 生成任何代码
>
> **必须使用 AskUserQuestion 工具提问**

### 必要信息检查

| 必要信息 | 说明 |
|----------|------|
| 主题 | 汇报什么/演讲什么 |
| **受众** | **谁来听（影响风格和内容深度）** |
| **页数** | **预计多少页（影响信息密度）** |
| **风格** | **正式/轻松/技术深度（影响用词和视觉）** |
| **场景** | 什么场合 |

> ⚠️！！！ **即使提供了材料，也要向用户确认以上信息**。材料 ≠ 完整需求。

### 提问清单

| # | 问题 | 选项示例 |
|---|------|---------|
| 1 | 听众是谁？ | 内部同事/领导/客户/投资人/学术/其他 |
| 2 | 什么场景？ | 工作汇报/商业提案/产品发布/培训/个人展示 |
| 3 | 几分钟/几页？ | 5-10页/10-20页/20-30页/40页+ |
| 4 | 有材料吗？ | 完整文档/部分素材/大纲/无材料 |
| 5 | 什么风格？ | 正式商务/科技简约/轻松活泼/高端大气 |

**进阶分析**：观众分层和KANO需求分析见 [references/thinking.md](references/thinking.md)

### 需求确认模板

```
## 需求摘要（待确认）

| 项目 | 您提供 |
|------|--------|
| 主题 | [提炼的主题] |
| 受众 | [用户选择 - 决定风格和内容深度] |
| 场景 | [用户选择 - 决定信息密度] |
| 时长/页数 | [用户选择 - 决定篇幅] |
| 风格 | [用户选择 - 决定视觉和用词] |

请确认以上信息是否准确？

```



---

## Step 2: 场景判定（核心决策点）

根据受众+场景组合判定PPT等级和设计策略。

### 听众 → 内容深度

| 听众 | 技术深度 | 术语处理 |
|------|----------|----------|
| 学生/学术 | 低 | 通俗解释 |
| 技术人员 | 高 | 可用专业术语 |
| 管理层 | 中 | 侧重价值/成本 |
| 客户/投资人 | 低~中 | 侧重商业价值 |
| 普通大众 | 极低 | 避免术语 |

### PPT三等判定

| 等级 | 特征 | 适用场景 |
|------|------|---------|
| **一等** | 极简、故事、打动人 | 产品发布/路演/TED |
| **二等** | 结构清晰、信息分层 | 学术汇报/培训/工作汇报 |
| **三等** | 功能完整、操作熟练 | 日常汇报/入门演示 |

### 场景 → 等级映射

| 场景 | 等级 | 信息密度 | 核心原则 |
|------|------|----------|----------|
| 产品发布/路演 | 一等 | 极低（一页一信息） | 乔布斯极简法 |
| 学术汇报/培训 | 二等 | 中~高 | 专业严谨、逻辑清晰 |
| 工作汇报/述职 | 二等 | 中 | 结论先行、数据支撑 |
| 商业提案/BP | 一等~二等 | 低~中 | 结论先行、说服力 |
| 内部分享 | 二等~三等 | 中~高 | 技术清晰、适度详细 |

### 三维体系快速自检

| 维度 | 问题 | 检查点 |
|------|------|--------|
| **难忘感** | 观众离开后能记住什么？ | 金句/画面/数据 |
| **设计感** | PPT是否专业好看？ | 配色/字体/排版 |
| **仪式感** | 演讲是否有感染力？ | 开场/结尾 |

完整说明见 [references/three-dimensions.md](references/three-dimensions.md)

---

## ★ Step 3前: 设计决策（强制节点）

> ⚠️ **必须执行**：在选择配色/字体/版式之前，先用 Q1-Q9 + CRAP框架自问。

### Q1-Q9 设计决策清单

> 每页必须完成 Q1-Q9，**Q4 记忆点不能答"无"**。

**快速清单**：
| # | 问题 | 关键检查 |
|---|------|---------|
| Q1 | 观众是谁？关注什么？ | 核心观众+关注点 |
| Q2 | 演示后观众会做什么？ | 具体行动 |
| Q3 | 需求层级？ | 基本型/期望型/兴奋型 |
| Q4 | 记忆点？（不能"无"） | 金句/画面/数据 |
| Q5 | PPT等级？目标？ | 一等打动人/二等说明白/三等做出来 |
| Q6 | 3秒能说清核心吗？ | 一句话核心信息 |
| Q7 | 有念稿内容吗？ | 念稿→删除 |
| Q8 | 删减检查？ | 每句回答保留/删除 |
| Q9 | 字体选择？ | 参考typography-guide.md |

完整模板：
```
页面 {N}：
- Q1观众：{核心观众}
- Q2行动：{演示后观众会}
- Q3需求：{层级}
- Q4记忆点：{金句/画面/数据}
- Q5等级：{一等/二等/三等}
- Q6核心：{一句话}
- Q7念稿：{有/无}→{处理}
- Q8删减：{保留/删除}
- Q9字体：{字体名}
- 版式：{选择}
- 配色：{确定值}
```

**CRAP自问**：
| 原则 | 自问 | 检查 |
|------|------|------|
| 对比 | 标题vs正文≥2倍？颜色有区分？ | 是/否 |
| 重复 | 整体风格一致？ | 是/否 |
| 对齐 | 元素有参考线？ | 是/否 |
| 接近 | 相关内容靠近？间距一致？ | 是/否 |

### 版式判定树

**内容页（6种）：** 标题+正文 | 左右分栏 | 上下分割 | 三栏并列 | 卡片式 | 时间轴
**封面（3种）：** 居中式(学术/正式) | 左右分栏(企业/产品) | 全图型(创意/活动)
**目录（2种）：** 垂直列表(3-5章) | 双栏网格(4-6章)

---

## Step 3: 设计执行

按场景读取必要文件，选择设计要素。

### 必读文件（每次）

| 文件 | 内容 |
|------|------|
| [design-principles.md](references/design-principles.md) | CRAP四原则 |
| [color-system.md](references/color-system.md) | 配色7:2:1 |

### 场景文件（必须读）

| 场景 | 文件 |
|------|------|
| 学术汇报 | [scenarios/academic.md](references/scenarios/academic.md) |
| 产品发布/路演 | [scenarios/commercial.md](references/scenarios/commercial.md) |
| 培训课件 | [scenarios/training.md](references/scenarios/training.md) |
| 工作汇报 | [scenarios/workplace.md](references/scenarios/workplace.md) |

### 按需读取

| 场景 | 文件 |
|------|------|
| 字体决策 | [typography-guide.md](references/typography-guide.md) |
| 数据图表 | [charts.md](references/charts.md) |
| 创意灵感 | [master-inspiration.md](references/master-inspiration.md) |

---

## 🚫 【强制禁止规则】

> ⚠️ 禁止不读场景文件就直接跳过

| 场景 | 必须读 |
|------|--------|
| 学术汇报 | academic.md |
| 商业/产品发布 | commercial.md |
| 培训/教育 | training.md |
| 工作汇报 | workplace.md |
| 涉及数据表格 | charts.md |
| 涉及配色 | color-system.md |
| 涉及字体 | typography-guide.md |

### 3.5 设计要素选择

**配色**：见 [color-system.md](references/color-system.md) 行业配色18套
**字体**：见 [typography-guide.md](references/typography-guide.md)

### 动画设计（可选）

> ⚠️ PptxGenJS不支持动画，需在PowerPoint中手动添加

**三大作用**：指南针（引导逻辑）| 魔术师（制造悬念）| 放大镜（强调重点）

**规划**：每页最多1个动画，时长≤3秒，风格统一

---

## ★ Step 4前: 设计验证（强制节点）

### 单页检查

```
□ 核心信息突出？  □ 对比足够？（标题vs正文≥2倍）
□ 风格统一？      □ 元素对齐？
□ 适当留白？      □ 记忆点视觉化？
□ 3秒测试通过？
```

### 全局检查

```
□ 配色统一？  □ 字体统一？  □ 标题位置一致？
□ 页码位置一致？  □ 信息密度符合场景？
```

详细清单见 [references/quality-checklist.md](references/quality-checklist.md)

---

## Step 4: 代码生成

### 4.1 项目结构

```bash
slides/
├── slide-01-cover.js
├── slide-02-toc.js
├── ...（每页一个文件）
├── compile.js
└── output/
```

### 4.2 Theme 定义（必须 - 5键结构）

```javascript
const theme = {
  primary: "1A237E",   // 深色，用于标题/深背景
  secondary: "3949AB", // 次深色，用于正文
  accent: "F57C00",     // 强调色
  light: "E8EAF6",      // 浅色
  bg: "FFFFFF"          // 背景
};
```

### 4.3 Slide 模块格式

```javascript
const pptxgen = require("pptxgenjs");

function createSlide(pres, theme, options = {}) {
  const slide = pres.addSlide();
  // ... 幻灯片内容
}

module.exports = { createSlide, slideConfig: { type, index, title } };
```

### 4.4 Compile 脚本（完整示例）

```javascript
const pptxgen = require("pptxgenjs");
const fs = require("fs");
const path = require("path");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";

const theme = {
  primary: "1A237E", secondary: "3949AB", accent: "F57C00", light: "E8EAF6", bg: "FFFFFF"
};

// 自动创建 output 目录
const outputDir = path.join(__dirname, "output");
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

const slides = ["slide-01-cover.js", "slide-02-toc.js", /* ... */];
slides.forEach(file => {
  try {
    const mod = require(path.join(__dirname, file));
    mod.createSlide(pres, theme);
  } catch (err) {
    console.error(`✗ ${file}: ${err.message}`); // 单页失败不中断
  }
});

pres.writeFile({ fileName: path.join(outputDir, "presentation.pptx") })
  .then(() => console.log("✓ 生成成功"))
  .catch(err => console.error("✗ 失败:", err));
```

详细完整版参考：`assets/compile-enhanced.js`

### ⚠️ 动画声明

**PptxGenJS 不支持动画**。动画需在 PowerPoint 中手动添加。

---

## 预建模板库（22个）

位于 `assets/` 目录，可直接使用或按需修改：

| 类型 | 文件名 | 说明 |
|------|--------|------|
| 封面 | slide-01-cover.js | 居中标准封面 |
| 封面 | slide-01a-cover-split.js | 左右分栏 |
| 封面 | slide-01b-cover-fullimage.js | 全图型 |
| 目录 | slide-02-toc.js | 垂直列表 |
| 目录 | slide-02a-toc-grid.js | 双栏网格 |
| 章节 | slide-03-section.js | 标准章节页 |
| 章节 | slide-03-section-enhanced.js | 增强章节页 |
| 内容 | slide-04-content.js | 标准内容页 |
| 内容 | slide-04a-content-card.js | 卡片式 |
| 内容 | slide-04b-content-image-text.js | 图文左右 |
| 内容 | slide-04c-content-chart.js | 图表页 |
| 内容 | slide-04d-content-timeline.js | 时间轴 |
| 内容 | slide-04e-content-compare.js | 对比式 |
| 内容 | slide-04f-content-table.js | 表格页 |
| 总结 | slide-05-summary.js | 标准总结页 |
| 总结 | slide-05-summary-enhanced.js | 增强总结页 |
| 结束 | slide-06-end.js | 标准结束页 |
| 结束 | slide-06-end-enhanced.js | 增强结束页 |
| 图表 | chart-bar.js | 柱状图 |
| 图表 | chart-line.js | 折线图 |
| 图表 | chart-pie.js | 饼图 |

**每个模板特性**：
- 独立预览脚本（`node slide-04a-preview.js` 直接生成单页）
- Q4 记忆点设计
- PptxGenJS 兼容性标注

### 快速预览命令

```bash
# 单页预览（进入 assets 目录）
cd assets
node slide-04a-content-card.js        # 生成单页 preview.pptx
node slide-04d-content-timeline.js
node chart-bar.js

# 全量编译
node compile-enhanced.js               # 生成 output/presentation.pptx
```

### 模板索引速查

| 场景需求 | 推荐模板 | 命令 |
|----------|----------|------|
| 需要一页数据对比 | slide-04f-content-table.js | `node slide-04f-content-table.js` |
| 需要时间轴/流程 | slide-04d-content-timeline.js | `node slide-04d-content-timeline.js` |
| 需要三栏对比 | slide-04a-content-card.js | `node slide-04a-content-card.js` |
| 需要图文混排 | slide-04b-content-image-text.js | `node slide-04b-content-image-text.js` |
| 需要柱状图 | chart-bar.js | `node chart-bar.js` |
- PptxGenJS 兼容性标注
- 可配置参数说明

---

## References 文件索引（按使用时机重组）

### must-read（每次必读）

| 文件 | 核心内容 |
|------|----------|
| [design-principles.md](references/design-principles.md) | CRAP四原则、字号对比、对齐方式 |
| [color-system.md](references/color-system.md) | 配色7:2:1法则、行业配色18套 |
| [three-dimensions.md](references/three-dimensions.md) | 三维体系：难忘感·设计感·仪式感 |

### scenario-specific（按场景必须读）

| 文件 | 适用场景 |
|------|----------|
| [scenarios/academic.md](references/scenarios/academic.md) | 学术汇报、论文答辩 |
| [scenarios/commercial.md](references/scenarios/commercial.md) | 产品发布、路演 |
| [scenarios/training.md](references/scenarios/training.md) | 培训课件、教学 |
| [scenarios/workplace.md](references/scenarios/workplace.md) | 工作汇报、述职 |

### on-demand（按需查阅）

| 文件 | 主要内容 |
|------|----------|
| [philosophy.md](references/philosophy.md) | 字体性格论、10%理论、简约大道 |
| [techniques.md](references/techniques.md) | 36计、图片处理12法、动画三大作用 |
| [case-studies.md](references/case-studies.md) | 案例分析（带场景标注） |
| [thinking.md](references/thinking.md) | 五种思维、KANO模型、观众分级 |
| [pptxgenjs.md](references/pptxgenjs.md) | PptxGenJS API详解 |
| [charts.md](references/charts.md) | 图表制作指南 |
| [layout-system.md](references/layout-system.md) | 版式系统详解 |
| [slide-types.md](references/slide-types.md) | 幻灯片类型指南 |
| [common-errors.md](references/common-errors.md) | 常见错误与修复 |
| [editing.md](references/editing.md) | PPT编辑技巧 |
| [quality-checklist.md](references/quality-checklist.md) | 完整质量检查清单 |
| [speech-preparation.md](references/speech-preparation.md) | 演讲准备完整指南 |

---

## 📚 完整文档索引

> ⚠️ **重要**：详细文档请查看 [references/README.md](references/README.md)

**快速分类**：
| 类别 | 位置 | 说明 |
|------|------|------|
| 案例库 | [references/cases/](references/cases/) | 华为/苹果/TED/失败案例/好vs差对比 |
| 核心方法论 | [references/](references/) | design-principles, color-system, layout-system等 |
| 场景指南 | [references/scenarios/](references/scenarios/) | academic/commercial/training/workplace |

---

## QA 验证建议

```bash
# 1. 提取文本
python -m markitdown output/presentation.pptx
# 2. 检查placeholder残留
python -m markitdown output/presentation.pptx | grep -iE "xxxx|lorem|ipsum|placeholder"
# 3. 章节结构（PowerPoint大纲视图）
# 4. ⚠️ 动画需手动添加
```
