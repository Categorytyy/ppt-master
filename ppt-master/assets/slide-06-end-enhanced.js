// slide-06-end-enhanced.js - 结束-增强 (符合安全边距规范)
// PptxGenJS兼容性：✅ addHyperlink | ⚠️ 渐变用色块替代 | ❌ 动画不支持
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
  title: '结束页-增强'
};

function createSlide(pres, theme, options = {}) {
  const slide = pres.addSlide();
  slide.background = { color: theme.primary };

  // 装饰元素 - 右上角大色块（保持在安全区域内）
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 7.0, y: MARGIN.top, w: 3.0, h: 2.0,
    fill: { color: theme.secondary, transparency: 40 }
  });

  // 装饰元素 - 左下角色块（保持在安全区域内）
  slide.addShape(pres.shapes.RECTANGLE, {
    x: MARGIN.left, y: 4.0, w: 2.5, h: 1.225,
    fill: { color: theme.accent, transparency: 50 }
  });

  // 主标题 - 在安全区域内居中
  const mainText = options.mainText || "感谢聆听";
  slide.addText(mainText, {
    x: MARGIN.left, y: 1.8, w: 9, h: 1.2,
    fontSize: 54,
    fontFace: "Microsoft YaHei",
    color: "FFFFFF",
    bold: true,
    align: "center"
  });

  // 副标题 - 在安全区域内
  const subText = options.subText || "欢迎交流与合作";
  slide.addText(subText, {
    x: MARGIN.left, y: 3.0, w: 9, h: 0.6,
    fontSize: 20,
    fontFace: "Microsoft YaHei",
    color: theme.light,
    align: "center"
  });

  // 装饰线 - 居中
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 4.0, y: 3.7, w: 2.0, h: 0.03,
    fill: { color: theme.accent }
  });

  // 联系信息区 - 在安全区域内
  const contactY = GRID.y[4];

  if (options.email) {
    slide.addText(options.email, {
      x: MARGIN.left, y: contactY, w: 9, h: 0.4,
      fontSize: 14,
      fontFace: "Arial",
      color: theme.accent,
      align: "center",
      hyperlink: { url: `mailto:${options.email}` }
    });
  }

  if (options.website) {
    slide.addText(options.website, {
      x: MARGIN.left, y: contactY + 0.5, w: 9, h: 0.4,
      fontSize: 14,
      fontFace: "Arial",
      color: theme.light,
      align: "center",
      hyperlink: { url: options.website.startsWith('http') ? options.website : `https://${options.website}` }
    });
  }

  // Q4记忆点：金句 - 在安全区域底部
  if (options.memorableQuote) {
    slide.addText(options.memorableQuote, {
      x: MARGIN.left, y: 5.0, w: 9, h: 0.4,
      fontSize: 12,
      fontFace: "Microsoft YaHei",
      color: theme.light,
      italic: true,
      align: "center"
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
    subText: "欢迎交流与合作",
    email: "contact@example.com",
    website: "www.example.com",
    memorableQuote: "创新引领未来，合作创造价值"
  });
  pres.writeFile({ fileName: "slide-06-end-enhanced-preview.pptx" });
}

module.exports = { createSlide, slideConfig };
