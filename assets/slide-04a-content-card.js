// slide-04a-content-card.js - 内容-三栏卡片
// PptxGenJS兼容性：✅ 三栏卡片布局 | ⚠️ 渐变用色块替代 | ❌ 动画不支持
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 4,
  title: '三栏卡片内容页'
};

function createSlide(pres, theme, options = {}) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // 页面标题
  const title = options.title || "核心要点";
  slide.addText(title, {
    x: 0.5, y: 0.4, w: 9, h: 0.7,
    fontSize: 32,
    fontFace: "Microsoft YaHei",
    color: theme.primary,
    bold: true
  });

  // 标题下装饰线
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.0, w: 1.2, h: 0.04,
    fill: { color: theme.accent }
  });

  // 卡片数据
  const cards = options.cards || [
    { icon: "💡", title: "创新思维", desc: "突破传统框架\n采用差异化策略" },
    { icon: "📊", title: "数据驱动", desc: "基于市场数据分析\n精准决策支持" },
    { icon: "🚀", title: "快速执行", desc: "敏捷开发模式\n快速响应市场" }
  ];

  // 三栏卡片布局
  const cardW = 2.8;
  const cardH = 3.2;
  const startX = 0.6;
  const startY = 1.4;
  const gap = 0.3;

  cards.forEach((card, i) => {
    const x = startX + i * (cardW + gap);

    // 卡片背景
    slide.addShape(pres.shapes.RECTANGLE, {
      x: x, y: startY, w: cardW, h: cardH,
      fill: { color: theme.light, transparency: 40 },
      shadow: { type: "outer", blur: 4, offset: 2, angle: 45, color: "000000", opacity: 0.1 }
    });

    // 卡片顶部强调色块
    slide.addShape(pres.shapes.RECTANGLE, {
      x: x, y: startY, w: cardW, h: 0.08,
      fill: { color: theme.accent }
    });

    // 图标
    slide.addText(card.icon, {
      x: x, y: startY + 0.3, w: cardW, h: 0.8,
      fontSize: 36,
      align: "center"
    });

    // 卡片标题
    slide.addText(card.title, {
      x: x + 0.2, y: startY + 1.2, w: cardW - 0.4, h: 0.5,
      fontSize: 18,
      fontFace: "Microsoft YaHei",
      color: theme.primary,
      bold: true,
      align: "center"
    });

    // 卡片描述
    slide.addText(card.desc, {
      x: x + 0.2, y: startY + 1.8, w: cardW - 0.4, h: 1.2,
      fontSize: 13,
      fontFace: "Microsoft YaHei",
      color: theme.secondary,
      align: "center",
      valign: "top"
    });
  });

  // Q4记忆点：数据支撑
  if (options.memorableData) {
    slide.addText(options.memorableData, {
      x: 0.5, y: 4.9, w: 9, h: 0.4,
      fontSize: 14,
      fontFace: "Arial",
      color: theme.accent,
      align: "center",
      bold: true
    });
  }

  return slide;
}

// 独立预览
if (require.main === module) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = {
    primary: "1A237E",
    secondary: "3949AB",
    accent: "F57C00",
    light: "E8EAF6",
    bg: "FFFFFF"
  };
  createSlide(pres, theme, {
    title: "三大核心竞争力",
    cards: [
      { icon: "💡", title: "创新思维", desc: "突破传统框架\n采用差异化策略\n领跑行业变革" },
      { icon: "📊", title: "数据驱动", desc: "基于市场数据分析\n精准决策支持\n提升运营效率" },
      { icon: "🚀", title: "快速执行", desc: "敏捷开发模式\n快速响应市场\n缩短交付周期" }
    ],
    memorableData: "数据：客户满意度提升 47% | 交付效率提高 35%"
  });
  pres.writeFile({ fileName: "slide-04a-preview.pptx" });
}

module.exports = { createSlide, slideConfig };
