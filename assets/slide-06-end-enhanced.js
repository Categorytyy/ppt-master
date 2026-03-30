// slide-06-end-enhanced.js - 结束-增强
// PptxGenJS兼容性：✅ addHyperlink | ⚠️ 渐变用色块替代 | ❌ 动画不支持
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'end',
  index: 6,
  title: '结束页-增强'
};

function createSlide(pres, theme, options = {}) {
  const slide = pres.addSlide();
  slide.background = { color: theme.primary };

  // 装饰元素 - 右上角大色块
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 7, y: 0, w: 3, h: 2.5,
    fill: { color: theme.secondary, transparency: 40 }
  });

  // 装饰元素 - 左下角色块
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 4, w: 2.5, h: 1.625,
    fill: { color: theme.accent, transparency: 50 }
  });

  // 主标题
  const mainText = options.mainText || "感谢聆听";
  slide.addText(mainText, {
    x: 0.5, y: 1.8, w: 9, h: 1.2,
    fontSize: 54,
    fontFace: "Microsoft YaHei",
    color: "FFFFFF",
    bold: true,
    align: "center"
  });

  // 副标题
  const subText = options.subText || "欢迎交流与合作";
  slide.addText(subText, {
    x: 0.5, y: 3.0, w: 9, h: 0.6,
    fontSize: 20,
    fontFace: "Microsoft YaHei",
    color: theme.light,
    align: "center"
  });

  // 装饰线
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 4, y: 3.7, w: 2, h: 0.03,
    fill: { color: theme.accent }
  });

  // 联系信息区
  const contactY = 4.2;

  if (options.email) {
    slide.addText(options.email, {
      x: 0.5, y: contactY, w: 9, h: 0.4,
      fontSize: 14,
      fontFace: "Arial",
      color: theme.accent,
      align: "center",
      hyperlink: { url: `mailto:${options.email}` }
    });
  }

  if (options.website) {
    slide.addText(options.website, {
      x: 0.5, y: contactY + 0.5, w: 9, h: 0.4,
      fontSize: 14,
      fontFace: "Arial",
      color: theme.light,
      align: "center",
      hyperlink: { url: options.website.startsWith('http') ? options.website : `https://${options.website}` }
    });
  }

  // Q4记忆点：金句
  if (options.memorableQuote) {
    slide.addText(options.memorableQuote, {
      x: 0.5, y: 5.1, w: 9, h: 0.4,
      fontSize: 12,
      fontFace: "Microsoft YaHei",
      color: theme.light,
      italic: true,
      align: "center",
      transparency: 30
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
    mainText: "感谢聆听",
    subText: "期待与您深入交流",
    email: "contact@example.com",
    website: "www.example.com",
    memorableQuote: "「携手共创，合作共赢」"
  });
  pres.writeFile({ fileName: "slide-06-preview.pptx" });
}

module.exports = { createSlide, slideConfig };
