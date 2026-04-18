// slide-02.js - 目录页模板 (符合安全边距规范)
const pptxgen = require("pptxgenjs");

// 安全边距与网格系统
const MARGIN = { left: 0.5, right: 0.5, top: 0.4, bottom: 0.4 };
const GRID = {
  x: [0.5, 1.25, 2.0, 2.75, 3.5, 4.25, 5.0, 5.75, 6.5, 7.25, 8.0, 8.75],
  y: [0.4, 1.3, 2.2, 3.1, 4.0, 4.9]
};

const slideConfig = {
  type: 'toc',
  index: 2,
  title: '目录'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // 页面标题 - 使用安全边距
  slide.addText("目录", {
    x: MARGIN.left, y: MARGIN.top, w: 9, h: 0.7,
    fontSize: 36,
    fontFace: "Microsoft YaHei",
    color: theme.primary,
    bold: true
  });

  // 标题下划线
  slide.addShape(pres.shapes.RECTANGLE, {
    x: MARGIN.left, y: 1.0, w: 1.2, h: 0.06,
    fill: { color: theme.accent }
  });

  // 目录项
  const tocItems = [
    { num: "01", title: "第一章内容" },
    { num: "02", title: "第二章内容" },
    { num: "03", title: "第三章内容" },
    { num: "04", title: "第四章内容" }
  ];

  tocItems.forEach((item, index) => {
    const yPos = GRID.y[1] + index * 0.9;

    // 编号
    slide.addText(item.num, {
      x: MARGIN.left, y: yPos, w: 0.8, h: 0.6,
      fontSize: 28,
      fontFace: "Arial",
      color: theme.accent,
      bold: true,
      valign: "middle"
    });

    // 标题
    slide.addText(item.title, {
      x: GRID.x[1], y: yPos, w: 7, h: 0.6,
      fontSize: 20,
      fontFace: "Microsoft YaHei",
      color: theme.secondary,
      valign: "middle"
    });

    // 分隔线
    if (index < tocItems.length - 1) {
      slide.addShape(pres.shapes.RECTANGLE, {
        x: MARGIN.left, y: yPos + 0.7, w: 8.4, h: 0.01,
        fill: { color: theme.light }
      });
    }
  });

  // 页码 - 在安全区域内
  slide.addText("02", {
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
  pres.writeFile({ fileName: "slide-02-preview.pptx" });
}

module.exports = { createSlide, slideConfig };
