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
6. **Step 4: 代码生成** — PptxGenJS实现

## 致谢

- 原始技能：[MiniMax pptx-generator](https://github.com/your-org/pptx-generator)
- 设计理论：《通用设计法则》《写给大家看的设计书》《About Face》等

## License

MIT
