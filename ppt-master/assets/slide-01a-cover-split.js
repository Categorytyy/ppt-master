// slide-01a-cover-split.js - 封面-左右分栏 (符合安全边距规范)
// PptxGenJS兼容性：✅ 背景图片 | ⚠️ 渐变有限支持用纯色+阴影替代 | ❌ 动画不支持
const pptxgen = require("pptxgenjs");

// 安全边距与网格系统
const MARGIN = { left: 0.5, right: 0.5, top: 0.4, bottom: 0.4 };
const GRID = {
  x: [0.5, 1.25, 2.0, 2.75, 3.5, 4.25, 5.0, 5.75, 6.5, 7.25, 8.0, 8.75],
  y: [0.4, 1.3, 2.2, 3.1, 4.0, 4.9]
};

const slideConfig = {
  type: 'cover',
  index: 1,
  title: '左右分栏封面'
};

function createSlide(pres, theme, options = {}) {
  const slide = pres.addSlide();

  // 左侧色块背景 - 从安全边距开始
  slide.background = { color: theme.bg };
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 4, h: 5.625,  // 全高背景允许从边缘开始
    fill: { color: theme.primary }
  });

  // 左侧装饰线 - 使用安全边距
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 3.8, y: 1.5, w: 0.04, h: 2.6,
    fill: { color: theme.accent }
  });

  // 左侧主标题（竖排或特殊排版）- 使用安全边距
  const title = options.title || "演示标题";
  const subtitle = options.subtitle || "副标题说明";
  const date = options.date || "2024年1月";

  // 左侧标题 - x 从安全边距开始
  slide.addText(title, {
    x: MARGIN.left, y: 1.8, w: 3.2, h: 1.2,
    fontSize: 36,
    fontFace: "Microsoft YaHei",
    color: "FFFFFF",
    bold: true,
    valign: "middle"
  });

  // 左侧副标题
  slide.addText(subtitle, {
    x: MARGIN.left, y: 3.1, w: 3.2, h: 0.6,
    fontSize: 16,
    fontFace: "Microsoft YaHei",
    color: theme.light,
    valign: "top"
  });

  // 左侧日期
  slide.addText(date, {
    x: MARGIN.left, y: 4.6, w: 3.2, h: 0.4,
    fontSize: 12,
    fontFace: "Arial",
    color: theme.accent
  });

  // 右侧可选图片区域（使用纯色装饰块模拟）- 从网格第5列开始
  if (options.rightContent === 'image' && options.imagePath) {
    // 实际使用时传入图片路径 - 在安全区域内
    slide.addImage({ data: options.imagePath, x: GRID.x[5], y: 0.8, w: 4.5, h: 4 });
  } else {
    // 默认装饰块 - 在安全区域内
    slide.addShape(pres.shapes.RECTANGLE, {
      x: GRID.x[5], y: 1.2, w: 4.5, h: 3.2,
      fill: { color: theme.secondary, transparency: 15 }
    });
    slide.addShape(pres.shapes.RECTANGLE, {
      x: GRID.x[5] + 0.5, y: 1.7, w: 3.5, h: 2.2,
      fill: { color: theme.light, transparency: 30 }
    });
    // 右侧装饰文字
    slide.addText("BRAND", {
      x: GRID.x[5], y: 2.2, w: 4.5, h: 1.2,
      fontSize: 48,
      fontFace: "Arial",
      color: theme.secondary,
      bold: true,
      align: "center",
      charSpacing: 8
    });
  }

  // Q4记忆点：金句
  if (options.memorableQuote) {
    slide.addText(options.memorableQuote, {
      x: MARGIN.left, y: 4.0, w: 3.2, h: 0.5,
      fontSize: 10,
      fontFace: "Microsoft YaHei",
      color: theme.accent,
      italic: true
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
    title: "年度战略报告",
    subtitle: "2024年业务规划与执行方案",
    date: "2024年1月",
    memorableQuote: "「战略决定成败，细节决定优劣」"
  });
  pres.writeFile({ fileName: "slide-01a-preview.pptx" });
}

module.exports = { createSlide, slideConfig };
