# ppt-master

专业PPT设计制作技能，基于PptxGenJS，融合设计原理与实战方法论。

## 起源

本技能脱胎于 MiniMax 提供的 `pptx-generator`，经由大量设计书籍（如《通用设计法则》《写给大家看的设计书》）的理论注入与实战优化，形成了一套完整的PPT制作方法论。

## 核心特性

- **CRAP设计原则**：Contrast / Repetition / Alignment / Proximity
- **三维体系**：难忘感 · 设计感 · 仪式感
- **Q1-Q9决策框架**：9个关键设计决策引导
- **认知科学支撑**：10+条通用设计原则的直接应用
- **场景化方案**：学术汇报 / 商业路演 / 培训课件 / 工作汇报

## 效果展示

使用本技能生成的《LLM优化算法演进史》第一章课件：

| 封面 | 目录 | 内容页 | 结尾页 |
|:---:|:---:|:---:|:---:|
| ![封面](效果展示/1.png) | ![目录](效果展示/2.png) | ![内容](效果展示/3.png) | ![结尾](效果展示/4.png) |

## 目录结构

```
ppt-master/
├── SKILL.md                    # 技能定义（主入口）
├── assets/                     # PptxGenJS 代码模板
│   ├── compile*.js             # 编译脚本
│   ├── slide-*.js             # 各类幻灯片模板
│   └── chart-*.js             # 图表模板
├── components/                 # 组件库
│   ├── blocks/
│   ├── layouts/
│   └── theme/
└── references/                # 参考文档
    ├── README.md              # 文档索引
    ├── design-principles.md   # 设计原则（CRAP）
    ├── color-system.md        # 配色系统
    ├── three-dimensions.md    # 三维体系
    ├── typography-guide.md    # 字体指南
    ├── universal-principles-of-design.md  # 通用设计法则
    ├── thinking.md            # 认知偏差与设计
    ├── cases/                 # 案例库
    └── scenarios/            # 场景指南
```

## 使用方法

在 Trae IDE 中调用本技能，遵循 SKILL.md 定义的强制流程：

1. **Step 1: 需求分析** — 确认受众、场景、页数、风格
2. **Step 2: 场景判定** — 确定PPT类型
3. **Step 3前: 设计决策** — Q1-Q9 + CRAP框架自问
4. **Step 3: 设计执行** — 按场景读取references
5. **Step 4前: 设计验证** — 单页+全局检查清单
6. **Step 4: 代码生成** — PptxGenJS 实现

## 理论支撑

本技能基于以下 14 本经典设计文献深度学习提炼，吸收了各书的精髓：

| # | 书名 | 作者 |
|---|------|------|
| 1 | 《PPT演示之道》 | 孙小小 |
| 2 | 《PPT要你好看》 | 杨臻 |
| 3 | 《写给大家看的PPT设计书》 | Robin Williams |
| 4 | 《成为PPT高手》 | 马馺 |
| 5 | 《改变思维：菜鸟也能做出震撼PPT》 | 创锐设计 |
| 6 | 《PPT设计从入门到精通》 | 张晓景 |
| 7 | 《PPT之光》 | 冯注龙 |
| 8 | 《PPT设计原理》 | 罗欣 |
| 9 | 《演说之禅》 | Garr Reynolds |
| 10 | 《演说之禅设计篇》 | Garr Reynolds |
| 11 | 《The Non-Designer's Design Book》 | Robin Williams |
| 12 | 《Design Book for Non-Designers》 | Anita Nipane |
| 13 | 《The Graphic Design Idea Book》 | Steven Heller, Gail Anderson |
| 14 | 《Thinking with Type》 | Ellen Lupton |

### 核心思想来源

- **CRAP 四原则** — 源自 Robin Williams《写给大家看的设计书》
- **配色系统** — 融合《演说之禅》与《Thinking with Type》色彩理论
- **字体指南** — 深度借鉴《Thinking with Type》字体选择逻辑
- **设计灵感** — 提炼自《The Graphic Design Idea Book》50位大师策略
- **三维体系** — 融合孙小小、杨臻等国内PPT专家实战经验


## 致谢

- 原始技能：[MiniMax pptx-generator](https://github.com/MiniMax-AI/skills/tree/main/skills/pptx-generator)
- 设计理论：《通用设计法则》《写给大家看的设计书》《About Face》等

## License

MIT
