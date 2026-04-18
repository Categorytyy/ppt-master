// slide-01.js - 封面页模板 (符合安全边距规范)
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
  title: '演示标题'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();

  // 全背景色
  slide.background = { color: theme.primary };

  // 装饰线条 - 使用安全边距
  slide.addShape(pres.shapes.RECTANGLE, {
    x: MARGIN.left, y: 2.2, w: 9, h: 0.02,
    fill: { color: theme.accent }
  });

  // 主标题 - 居中对齐
  slide.addText("演示标题", {
    x: MARGIN.left, y: 2.4, w: 9, h: 1.2,
    fontSize: 54,
    fontFace: "Microsoft YaHei",
    color: "FFFFFF",
    bold: true,
    align: "center",
    valign: "middle"
  });

  // 副标题
  slide.addText("副标题说明", {
    x: MARGIN.left, y: 3.6, w: 9, h: 0.6,
    fontSize: 24,
    fontFace: "Microsoft YaHei",
    color: theme.light,
    align: "center"
  });

  // 日期 - 在安全区域内
  slide.addText("2024年1月", {
    x: MARGIN.left, y: 4.8, w: 9, h: 0.4,
    fontSize: 14,
    fontFace: "Arial",
    color: theme.accent,
    align: "center"
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
  createSlide(pres, theme);
  pres.writeFile({ fileName: "slide-01-preview.pptx" });
}

module.exports = { createSlide, slideConfig };
