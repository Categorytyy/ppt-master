// slide-06.js - 结束页模板 (符合安全边距规范)
const pptxgen = require("pptxgenjs");

// 安全边距与网格系统
const MARGIN = { left: 0.5, right: 0.5, top: 0.4, bottom: 0.4 };
const GRID = {
  x: [0.5, 1.25, 2.0, 2.75, 3.5, 4.25, 5.0, 5.75, 6.5, 7.25, 8.0, 8.75],
  y: [0.4, 1.3, 2.2, 3.1, 4.0, 4.9]
};

const slideConfig = {
  type: 'end',
  index: 6,
  title: '感谢'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.primary };

  // 感谢语 - 居中显示，在安全区域内
  slide.addText("感谢聆听", {
    x: MARGIN.left, y: 2.0, w: 9, h: 1.0,
    fontSize: 54,
    fontFace: "Microsoft YaHei",
    color: "FFFFFF",
    bold: true,
    align: "center"
  });

  // 装饰线 - 居中
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 4.0, y: 3.1, w: 2.0, h: 0.04,
    fill: { color: theme.accent }
  });

  // 副标题 - 在安全区域内
  slide.addText("Q & A", {
    x: MARGIN.left, y: 3.4, w: 9, h: 0.5,
    fontSize: 24,
    fontFace: "Arial",
    color: theme.light,
    align: "center"
  });

  // 联系方式（可选）- 在安全区域底部
  slide.addText("contact@example.com", {
    x: MARGIN.left, y: 4.5, w: 9, h: 0.4,
    fontSize: 14,
    fontFace: "Arial",
    color: theme.accent,
    align: "center"
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
  pres.writeFile({ fileName: "slide-06-end-preview.pptx" });
}

module.exports = { createSlide, slideConfig };
