// slide-01b-cover-fullimage.js - 封面-全图背景 (符合安全边距规范)
// PptxGenJS兼容性：✅ 背景图片+透明度 | ⚠️ 渐变有限支持用纯色+阴影替代 | ❌ 动画不支持
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
  title: '全图背景封面'
};

function createSlide(pres, theme, options = {}) {
  const slide = pres.addSlide();

  // 全图背景（使用透明度模拟叠加效果）- 全页背景可以贴边
  const imagePath = options.imagePath || null;

  if (imagePath) {
    // 实际背景图片
    slide.background = { color: theme.primary };
    slide.addImage({
      data: imagePath,
      x: 0, y: 0, w: 10, h: 5.625  // 全页图片可以贴边
    });
    // 半透明遮罩
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 5.625,
      fill: { color: theme.primary, transparency: 60 }
    });
  } else {
    // 默认渐变模拟（多层色块）
    slide.background = { color: theme.primary };
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 5.625,
      fill: { color: theme.secondary, transparency: 40 }
    });
  }

  // 装饰线条 - 使用安全边距
  slide.addShape(pres.shapes.RECTANGLE, {
    x: MARGIN.left, y: 2.0, w: 1.5, h: 0.04,
    fill: { color: theme.accent }
  });

  // 主标题 - 在安全区域内
  const title = options.title || "演示标题";
  slide.addText(title, {
    x: MARGIN.left, y: 2.2, w: 9, h: 1.0,
    fontSize: 48,
    fontFace: "Microsoft YaHei",
    color: "FFFFFF",
    bold: true
  });

  // 副标题
  const subtitle = options.subtitle || "副标题说明";
  slide.addText(subtitle, {
    x: MARGIN.left, y: 3.3, w: 9, h: 0.6,
    fontSize: 20,
    fontFace: "Microsoft YaHei",
    color: theme.light
  });

  // 日期/来源
  const date = options.date || "2024年1月";
  slide.addText(date, {
    x: MARGIN.left, y: 4.5, w: 4, h: 0.4,
    fontSize: 14,
    fontFace: "Arial",
    color: theme.accent
  });

  // Q4记忆点：金句或数据
  if (options.memorableQuote) {
    slide.addText(options.memorableQuote, {
      x: MARGIN.left, y: 4.0, w: 6, h: 0.4,
      fontSize: 12,
      fontFace: "Microsoft YaHei",
      color: "FFFFFF",
      italic: true,
      transparency: 20
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
    title: "创新驱动未来",
    subtitle: "2024年产品战略发布会",
    date: "2024年1月 北京",
    memorableQuote: "「以技术创新引领行业变革」"
  });
  pres.writeFile({ fileName: "slide-01b-preview.pptx" });
}

module.exports = { createSlide, slideConfig };
