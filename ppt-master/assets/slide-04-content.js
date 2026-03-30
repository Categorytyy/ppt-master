// slide-04.js - 内容页模板
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 4,
  title: '页面标题'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // 页面标题
  slide.addText("页面标题", {
    x: 0.5, y: 0.4, w: 9, h: 0.7,
    fontSize: 32,
    fontFace: "Microsoft YaHei",
    color: theme.primary,
    bold: true
  });

  // 标题下划线装饰
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.0, w: 0.8, h: 0.05,
    fill: { color: theme.accent }
  });

  // 左侧强调条
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.4, w: 0.08, h: 3.2,
    fill: { color: theme.accent }
  });

  // 内容要点
  slide.addText([
    { text: "第一要点说明", options: { bullet: true, breakLine: true } },
    { text: "第二要点说明", options: { bullet: true, breakLine: true } },
    { text: "第三要点说明", options: { bullet: true, breakLine: true } },
    { text: "第四要点说明", options: { bullet: true } }
  ], {
    x: 0.8, y: 1.4, w: 8.5, h: 3.2,
    fontSize: 18,
    fontFace: "Microsoft YaHei",
    color: theme.secondary,
    valign: "top",
    paraSpaceAfter: 14
  });

  // 页码
  slide.addText("04", {
    x: 9.3, y: 5.1, w: 0.5, h: 0.3,
    fontSize: 10,
    fontFace: "Arial",
    color: theme.light,
    align: "right"
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
  pres.writeFile({ fileName: "slide-04-preview.pptx" });
}

module.exports = { createSlide, slideConfig };
