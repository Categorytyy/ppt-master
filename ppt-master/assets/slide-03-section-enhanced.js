// slide-03-section-enhanced.js - 章节过渡-增强 (符合安全边距规范)
// PptxGenJS兼容性：✅ addSection | ✅ transition | ⚠️ 装饰元素用色块组合 | ❌ 动画不支持
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
  title: '章节过渡-增强'
};

function createSlide(pres, theme, options = {}) {
  const slide = pres.addSlide();
  slide.background = { color: theme.primary };

  // 添加章节标记（大纲视图中可见）
  const sectionTitleForAdd = options.sectionTitle || "章节";
  pres.addSection(sectionTitleForAdd);

  // 大号章节编号
  const num = options.num || "01";
  const sectionTitle = options.sectionTitle || "章节标题";
  const subtitle = options.subtitle || "";

  // 装饰元素组合 - 左侧大色块
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 3.5, h: 5.625,  // 全页背景允许贴边
    fill: { color: theme.secondary, transparency: 30 }
  });

  // 装饰元素 - 右上角色块
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 7.5, y: 0, w: 2.5, h: 2,
    fill: { color: theme.accent, transparency: 40 }
  });

  // 装饰线条 - 横向 - 使用安全边距
  slide.addShape(pres.shapes.RECTANGLE, {
    x: MARGIN.left, y: 2.6, w: 2, h: 0.03,
    fill: { color: theme.accent }
  });

  // 大号编号
  slide.addText(num, {
    x: MARGIN.left, y: 1.0, w: 3, h: 1.8,
    fontSize: 120,
    fontFace: "Arial",
    color: theme.secondary,
    bold: true,
    valign: "middle"
  });

  // 章节标题 - 在安全区域内
  slide.addText(sectionTitle, {
    x: MARGIN.left, y: 2.8, w: 8.5, h: 1.0,
    fontSize: 44,
    fontFace: "Microsoft YaHei",
    color: "FFFFFF",
    bold: true
  });

  // 副标题（可选）
  if (subtitle) {
    slide.addText(subtitle, {
      x: MARGIN.left, y: 3.8, w: 8.5, h: 0.6,
      fontSize: 18,
      fontFace: "Microsoft YaHei",
      color: theme.light
    });
  }

  // 装饰元素 - 右下角小色块
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 8.5, y: 4.2, w: 1.2, h: 1.2,
    fill: { color: theme.light, transparency: 60 }
  });

  // 设置过渡效果
  slide.transition = { type: "fade", duration: 0.5 };

  // Q4记忆点：编号+标题组合
  slide.addNotes(`章节过渡页：${num} ${sectionTitle}`);

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
    num: "01",
    sectionTitle: "背景与目标",
    subtitle: "市场现状与项目必要性"
  });
  pres.writeFile({ fileName: "slide-03-preview.pptx" });
}

module.exports = { createSlide, slideConfig };
