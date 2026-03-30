// slide-05.js - 总结页模板
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'summary',
  index: 5,
  title: '总结'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // 页面标题
  slide.addText("总结", {
    x: 0.5, y: 0.4, w: 9, h: 0.7,
    fontSize: 36,
    fontFace: "Microsoft YaHei",
    color: theme.primary,
    bold: true
  });

  // 标题下划线
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.0, w: 1.0, h: 0.06,
    fill: { color: theme.accent }
  });

  // 总结要点卡片
  const summaryItems = [
    { num: "1", text: "核心要点一" },
    { num: "2", text: "核心要点二" },
    { num: "3", text: "核心要点三" }
  ];

  summaryItems.forEach((item, index) => {
    const yPos = 1.4 + index * 1.2;

    // 数字圆圈
    slide.addShape(pres.shapes.OVAL, {
      x: 0.5, y: yPos, w: 0.5, h: 0.5,
      fill: { color: theme.accent }
    });

    slide.addText(item.num, {
      x: 0.5, y: yPos, w: 0.5, h: 0.5,
      fontSize: 16,
      fontFace: "Arial",
      color: "FFFFFF",
      bold: true,
      align: "center",
      valign: "middle"
    });

    // 要点文字
    slide.addText(item.text, {
      x: 1.2, y: yPos, w: 8, h: 0.5,
      fontSize: 20,
      fontFace: "Microsoft YaHei",
      color: theme.secondary,
      valign: "middle"
    });
  });

  // 页码
  slide.addText("05", {
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
  pres.writeFile({ fileName: "slide-05-preview.pptx" });
}

module.exports = { createSlide, slideConfig };
