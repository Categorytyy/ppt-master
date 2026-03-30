// slide-02a-toc-grid.js - 目录-双栏网格
// PptxGenJS兼容性：✅ 双栏布局 | ⚠️ 渐变有限支持 | ❌ 动画不支持
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'toc',
  index: 2,
  title: '双栏网格目录'
};

function createSlide(pres, theme, options = {}) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // 页面标题
  slide.addText("目录", {
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

  // 章节数据
  const chapters = options.chapters || [
    { num: "01", title: "背景与目标" },
    { num: "02", title: "市场分析" },
    { num: "03", title: "产品策略" },
    { num: "04", title: "执行计划" }
  ];

  // 双栏网格布局
  const startY = 1.5;
  const cardW = 4.2;
  const cardH = 1.6;
  const gapX = 0.6;
  const gapY = 0.4;

  chapters.forEach((ch, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.5 + col * (cardW + gapX);
    const y = startY + row * (cardH + gapY);

    // 卡片背景
    slide.addShape(pres.shapes.RECTANGLE, {
      x: x, y: y, w: cardW, h: cardH,
      fill: { color: theme.light, transparency: 50 }
    });

    // 左侧编号区块
    slide.addShape(pres.shapes.RECTANGLE, {
      x: x, y: y, w: 0.9, h: cardH,
      fill: { color: theme.primary }
    });

    // 编号
    slide.addText(ch.num, {
      x: x, y: y, w: 0.9, h: cardH,
      fontSize: 28,
      fontFace: "Arial",
      color: "FFFFFF",
      bold: true,
      align: "center",
      valign: "middle"
    });

    // 标题
    slide.addText(ch.title, {
      x: x + 1.1, y: y, w: cardW - 1.2, h: cardH,
      fontSize: 18,
      fontFace: "Microsoft YaHei",
      color: theme.primary,
      bold: true,
      valign: "middle"
    });
  });

  // Q4记忆点：章节数量
  slide.addText(`共 ${chapters.length} 个章节`, {
    x: 0.5, y: 5.1, w: 3, h: 0.3,
    fontSize: 11,
    fontFace: "Microsoft YaHei",
    color: theme.secondary
  });

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
    chapters: [
      { num: "01", title: "背景与目标" },
      { num: "02", title: "市场分析" },
      { num: "03", title: "产品策略" },
      { num: "04", title: "执行计划" },
      { num: "05", title: "风险评估" },
      { num: "06", title: "总结展望" }
    ]
  });
  pres.writeFile({ fileName: "slide-02a-preview.pptx" });
}

module.exports = { createSlide, slideConfig };
