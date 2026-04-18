// slide-05.js - 总结页模板 (符合安全边距规范)
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
  title: '总结'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // 页面标题 - 使用安全边距
  slide.addText("总结", {
    x: MARGIN.left, y: MARGIN.top, w: 9, h: 0.7,
    fontSize: 36,
    fontFace: "Microsoft YaHei",
    color: theme.primary,
    bold: true
  });

  // 标题下划线 - 使用安全边距
  slide.addShape(pres.shapes.RECTANGLE, {
    x: MARGIN.left, y: 1.0, w: 1.0, h: 0.06,
    fill: { color: theme.accent }
  });

  // 总结要点卡片 - 在安全区域内
  const summaryItems = [
    { num: "1", text: "核心要点一" },
    { num: "2", text: "核心要点二" },
    { num: "3", text: "核心要点三" }
  ];

  summaryItems.forEach((item, index) => {
    const yPos = GRID.y[1] + index * 1.2;

    // 数字圆圈
    slide.addShape(pres.shapes.OVAL, {
      x: MARGIN.left, y: yPos, w: 0.5, h: 0.5,
      fill: { color: theme.accent }
    });

    slide.addText(item.num, {
      x: MARGIN.left, y: yPos, w: 0.5, h: 0.5,
      fontSize: 16,
      fontFace: "Arial",
      color: "FFFFFF",
      bold: true,
      align: "center",
      valign: "middle"
    });

    // 要点文字
    slide.addText(item.text, {
      x: GRID.x[1], y: yPos, w: 8, h: 0.5,
      fontSize: 20,
      fontFace: "Microsoft YaHei",
      color: theme.secondary,
      valign: "middle"
    });
  });

  // 页码 - 在安全区域内
  slide.addText("05", {
    x: 8.75, y: 5.0, w: 0.5, h: 0.3,
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
