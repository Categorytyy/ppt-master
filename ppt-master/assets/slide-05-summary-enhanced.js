// slide-05-summary-enhanced.js - 总结-增强 (符合安全边距规范)
// PptxGenJS兼容性：✅ addNotes | ⚠️ 渐变用色块替代 | ❌ 动画不支持
const pptxgen = require("pptxgenjs");

// 安全边距与网格系统
const MARGIN = { left: 0.5, right: 0.5, top: 0.4, bottom: 0.4 };
const GRID = {
  x: [0.5, 1.25, 2.0, 2.75, 3.5, 4.25, 5.0, 5.75, 6.5, 7.25, 8.0, 8.75],
  y: [0.4, 1.3, 2.2, 3.1, 4.0, 4.9]
};

const slideConfig = {
  type: 'summary',
  index: 5,
  title: '总结页-增强'
};

function createSlide(pres, theme, options = {}) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // 页面标题 - 使用安全边距
  slide.addText("总结", {
    x: MARGIN.left, y: MARGIN.top, w: 9, h: 0.7,
    fontSize: 32,
    fontFace: "Microsoft YaHei",
    color: theme.primary,
    bold: true
  });

  // 标题下装饰线 - 使用安全边距
  slide.addShape(pres.shapes.RECTANGLE, {
    x: MARGIN.left, y: 1.0, w: 1.2, h: 0.04,
    fill: { color: theme.accent }
  });

  // 总结要点 - 在安全区域内
  const summaryPoints = options.points || [
    { icon: "✅", text: "明确的目标：3年内实现市场份额翻倍" },
    { icon: "✅", text: "清晰的路径：产品+渠道+服务三轮驱动" },
    { icon: "✅", text: "可靠的保障：组织能力与资本支撑" }
  ];

  summaryPoints.forEach((point, i) => {
    const y = GRID.y[1] + i * 0.9;

    // 图标背景
    slide.addShape(pres.shapes.RECTANGLE, {
      x: MARGIN.left, y: y, w: 0.6, h: 0.6,
      fill: { color: theme.light }
    });

    // 图标
    slide.addText(point.icon, {
      x: MARGIN.left, y: y, w: 0.6, h: 0.6,
      fontSize: 20,
      align: "center",
      valign: "middle"
    });

    // 文字
    slide.addText(point.text, {
      x: GRID.x[1], y: y, w: 8, h: 0.6,
      fontSize: 16,
      fontFace: "Microsoft YaHei",
      color: theme.primary,
      valign: "middle"
    });
  });

  // 核心数据展示区 - 在安全区域内
  const keyData = options.keyData || {
    value: "200%",
    label: "3年目标增长率"
  };

  slide.addShape(pres.shapes.RECTANGLE, {
    x: MARGIN.left, y: GRID.y[4], w: 9, h: 1.2,
    fill: { color: theme.primary, transparency: 8 }
  });

  slide.addText(keyData.value, {
    x: MARGIN.left, y: GRID.y[4], w: 9, h: 0.8,
    fontSize: 48,
    fontFace: "Arial",
    color: theme.accent,
    bold: true,
    align: "center",
    valign: "bottom"
  });

  slide.addText(keyData.label, {
    x: MARGIN.left, y: GRID.y[4] + 0.75, w: 9, h: 0.4,
    fontSize: 14,
    fontFace: "Microsoft YaHei",
    color: theme.secondary,
    align: "center",
    valign: "top"
  });

  // 演讲者备注（addNotes API）
  if (options.notes) {
    slide.addNotes(options.notes);
  }

  return slide;
}

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
  createSlide(pres, theme);
  pres.writeFile({ fileName: "slide-05-enhanced-preview.pptx" });
}

module.exports = { createSlide, slideConfig };
