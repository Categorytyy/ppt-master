// slide-06.js - 结束页模板
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'end',
  index: 6,
  title: '感谢'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.primary };

  // 感谢语
  slide.addText("感谢聆听", {
    x: 0.5, y: 2, w: 9, h: 1,
    fontSize: 54,
    fontFace: "Microsoft YaHei",
    color: "FFFFFF",
    bold: true,
    align: "center"
  });

  // 装饰线
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 4, y: 3.1, w: 2, h: 0.04,
    fill: { color: theme.accent }
  });

  // 副标题
  slide.addText("Q & A", {
    x: 0.5, y: 3.4, w: 9, h: 0.5,
    fontSize: 24,
    fontFace: "Arial",
    color: theme.light,
    align: "center"
  });

  // 联系方式（可选）
  slide.addText("contact@example.com", {
    x: 0.5, y: 4.5, w: 9, h: 0.4,
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
