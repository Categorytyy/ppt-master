// slide-04e-content-compare.js - 内容-对比式 (符合安全边距规范)
// PptxGenJS兼容性：✅ 对比布局 | ⚠️ 渐变用色块替代 | ❌ 动画不支持
const pptxgen = require("pptxgenjs");

// 安全边距与网格系统
const MARGIN = { left: 0.5, right: 0.5, top: 0.4, bottom: 0.4 };
const GRID = {
  x: [0.5, 1.25, 2.0, 2.75, 3.5, 4.25, 5.0, 5.75, 6.5, 7.25, 8.0, 8.75],
  y: [0.4, 1.3, 2.2, 3.1, 4.0, 4.9]
};

const slideConfig = {
  type: 'content',
  index: 4,
  title: '对比式内容页'
};

function createSlide(pres, theme, options = {}) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // 页面标题 - 使用安全边距
  const title = options.title || "方案对比";
  slide.addText(title, {
    x: MARGIN.left, y: MARGIN.top, w: 9, h: 0.7,
    fontSize: 32,
    fontFace: "Microsoft YaHei",
    color: theme.primary,
    bold: true
  });

  // 标题下装饰线
  slide.addShape(pres.shapes.RECTANGLE, {
    x: MARGIN.left, y: 1.0, w: 1.2, h: 0.04,
    fill: { color: theme.accent }
  });

  // 左侧方案 - 使用安全边距
  const leftX = MARGIN.left;
  const rightX = 5.15;
  const cardY = GRID.y[1];
  const cardW = 4.35;
  const cardH = 3.6;

  // 左侧卡片背景
  slide.addShape(pres.shapes.RECTANGLE, {
    x: leftX, y: cardY, w: cardW, h: cardH,
    fill: { color: theme.light, transparency: 50 }
  });

  // 左侧顶部强调
  slide.addShape(pres.shapes.RECTANGLE, {
    x: leftX, y: cardY, w: cardW, h: 0.6,
    fill: { color: theme.secondary }
  });

  // 左侧方案名
  const leftTitle = options.leftTitle || "方案A";
  slide.addText(leftTitle, {
    x: leftX, y: cardY, w: cardW, h: 0.6,
    fontSize: 20,
    fontFace: "Microsoft YaHei",
    color: "FFFFFF",
    bold: true,
    align: "center",
    valign: "middle"
  });

  // 左侧特点列表
  const leftFeatures = options.leftFeatures || [
    "成本较低",
    "部署周期短",
    "维护简单",
    "功能基础"
  ];

  leftFeatures.forEach((feat, i) => {
    slide.addShape(pres.shapes.RECTANGLE, {
      x: leftX + 0.3, y: cardY + 0.9 + i * 0.6, w: 0.12, h: 0.12,
      fill: { color: theme.secondary }
    });
    slide.addText(feat, {
      x: leftX + 0.6, y: cardY + 0.8 + i * 0.6, w: cardW - 0.8, h: 0.5,
      fontSize: 14,
      fontFace: "Microsoft YaHei",
      color: theme.primary,
      valign: "middle"
    });
  });

  // VS 中间标记 - 在安全区域内
  slide.addShape(pres.shapes.OVAL, {
    x: 4.6, y: 2.8, w: 0.8, h: 0.8,
    fill: { color: theme.accent }
  });
  slide.addText("VS", {
    x: 4.6, y: 2.8, w: 0.8, h: 0.8,
    fontSize: 16,
    fontFace: "Arial",
    color: "FFFFFF",
    bold: true,
    align: "center",
    valign: "middle"
  });

  // 右侧卡片背景
  slide.addShape(pres.shapes.RECTANGLE, {
    x: rightX, y: cardY, w: cardW, h: cardH,
    fill: { color: theme.primary, transparency: 10 }
  });

  // 右侧顶部强调
  slide.addShape(pres.shapes.RECTANGLE, {
    x: rightX, y: cardY, w: cardW, h: 0.6,
    fill: { color: theme.primary }
  });

  // 右侧方案名
  const rightTitle = options.rightTitle || "方案B";
  slide.addText(rightTitle, {
    x: rightX, y: cardY, w: cardW, h: 0.6,
    fontSize: 20,
    fontFace: "Microsoft YaHei",
    color: "FFFFFF",
    bold: true,
    align: "center",
    valign: "middle"
  });

  // 右侧特点列表
  const rightFeatures = options.rightFeatures || [
    "功能全面",
    "扩展性强",
    "性能优越",
    "支持定制"
  ];

  rightFeatures.forEach((feat, i) => {
    slide.addShape(pres.shapes.RECTANGLE, {
      x: rightX + 0.3, y: cardY + 0.9 + i * 0.6, w: 0.12, h: 0.12,
      fill: { color: theme.accent }
    });
    slide.addText(feat, {
      x: rightX + 0.6, y: cardY + 0.8 + i * 0.6, w: cardW - 0.8, h: 0.5,
      fontSize: 14,
      fontFace: "Microsoft YaHei",
      color: theme.primary,
      valign: "middle"
    });
  });

  // Q4记忆点：推荐结论 - 在安全区域内
  if (options.conclusion) {
    slide.addShape(pres.shapes.RECTANGLE, {
      x: MARGIN.left, y: 5.1, w: 9, h: 0.4,
      fill: { color: theme.accent, transparency: 15 }
    });
    slide.addText(options.conclusion, {
      x: MARGIN.left, y: 5.1, w: 9, h: 0.4,
      fontSize: 13,
      fontFace: "Microsoft YaHei",
      color: theme.accent,
      bold: true,
      align: "center",
      valign: "middle"
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
    title: "技术方案选型",
    leftTitle: "传统方案",
    leftFeatures: [
      "基于开源框架",
      "部署周期约2周",
      "运维成本低",
      "满足基本需求"
    ],
    rightTitle: "推荐方案",
    rightFeatures: [
      "自主研发核心",
      "部署周期约1月",
      "按需扩展",
      "支持深度定制"
    ],
    conclusion: "💡 推荐：选择方案B，为未来3年业务增长预留扩展空间"
  });
  pres.writeFile({ fileName: "slide-04e-preview.pptx" });
}

module.exports = { createSlide, slideConfig };
