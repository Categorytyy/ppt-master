// slide-03.js - 章节过渡页模板 (符合安全边距规范)
const pptxgen = require("pptxgenjs");

// 安全边距与网格系统
const MARGIN = { left: 0.5, right: 0.5, top: 0.4, bottom: 0.4 };
const GRID = {
  x: [0.5, 1.25, 2.0, 2.75, 3.5, 4.25, 5.0, 5.75, 6.5, 7.25, 8.0, 8.75],
  y: [0.4, 1.3, 2.2, 3.1, 4.0, 4.9]
};

const slideConfig = {
  type: 'section',
  index: 3,
  title: '章节标题'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.primary };

  // 大号章节编号 - 在安全区域内
  slide.addText("01", {
    x: MARGIN.left, y: 1.2, w: 9, h: 2,
    fontSize: 120,
    fontFace: "Arial",
    color: theme.secondary,
    bold: true,
    align: "center"
  });

  // 章节标题
  slide.addText("章节标题", {
    x: MARGIN.left, y: 3.2, w: 9, h: 0.9,
    fontSize: 44,
    fontFace: "Microsoft YaHei",
    color: "FFFFFF",
    bold: true,
    align: "center"
  });

  // 副标题（可选）
  slide.addText("章节副标题说明", {
    x: MARGIN.left, y: 4.1, w: 9, h: 0.5,
    fontSize: 18,
    fontFace: "Microsoft YaHei",
    color: theme.light,
    align: "center"
  });

  // 装饰线 - 在安全区域内
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 4, y: 4.8, w: 2, h: 0.04,
    fill: { color: theme.accent }
  });

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
  pres.writeFile({ fileName: "slide-03-preview.pptx" });
}

module.exports = { createSlide, slideConfig };
