// slide-04b-content-image-text.js - 内容-左图右文 (符合安全边距规范)
// PptxGenJS兼容性：✅ 图片+文字混排 | ⚠️ 图片需外部预处理 | ❌ 动画不支持
const pptxgen = require("pptxgenjs");

// 安全边距与网格系统
const MARGIN = { left: 0.5, right: 0.5, top: 0.4, bottom: 0.4 };
const GRID = {
  x: [0.5, 1.25, 2.0, 2.75, 3.5, 4.25, 5.0, 5.75, 6.5, 7.25, 8.0, 8.75],
  y: [0.4, 1.3, 2.2, 3.1, 4.0, 4.9]
};

const slideConfig = {
  type: 'content',
  index: 4,
  title: '左图右文内容页'
};

function createSlide(pres, theme, options = {}) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // 页面标题 - 使用安全边距
  const title = options.title || "图文详情";
  slide.addText(title, {
    x: MARGIN.left, y: MARGIN.top, w: 9, h: 0.7,
    fontSize: 32,
    fontFace: "Microsoft YaHei",
    color: theme.primary,
    bold: true
  });

  // 标题下装饰线
  slide.addShape(pres.shapes.RECTANGLE, {
    x: MARGIN.left, y: 1.0, w: 1.2, h: 0.04,
    fill: { color: theme.accent }
  });

  // 左侧图片区域 - 使用安全边距
  const imageX = MARGIN.left;
  const imageY = GRID.y[1];
  const imageW = 4.2;
  const imageH = 3.6;

  if (options.imagePath) {
    // 使用传入的图片路径
    slide.addImage({
      data: options.imagePath,
      x: imageX, y: imageY, w: imageW, h: imageH
    });
  } else {
    // 默认图片占位区域（色块模拟）
    slide.addShape(pres.shapes.RECTANGLE, {
      x: imageX, y: imageY, w: imageW, h: imageH,
      fill: { color: theme.light }
    });
    slide.addShape(pres.shapes.RECTANGLE, {
      x: imageX + 0.3, y: imageY + 0.3, w: imageW - 0.6, h: imageH - 0.6,
      fill: { color: theme.secondary, transparency: 30 }
    });
    slide.addText("📷 产品图片", {
      x: imageX, y: imageY, w: imageW, h: imageH,
      fontSize: 16,
      color: theme.secondary,
      align: "center",
      valign: "middle"
    });
  }

  // 右侧文字区域 - 从网格第6列开始
  const textX = GRID.x[6];
  const textY = GRID.y[1];
  const textW = 4.5;

  // 小标题
  const subTitle = options.subTitle || "核心特性";
  slide.addText(subTitle, {
    x: textX, y: textY, w: textW, h: 0.5,
    fontSize: 20,
    fontFace: "Microsoft YaHei",
    color: theme.primary,
    bold: true
  });

  // 正文内容
  const content = options.content || [
    { text: "特性一：高性能表现", options: { bullet: true, breakLine: true } },
    { text: "采用最新一代处理器，性能提升40%", options: { indentLevel: 1, breakLine: true, color: theme.secondary } },
    { text: "特性二：低功耗设计", options: { bullet: true, breakLine: true } },
    { text: "智能功耗管理，续航提升60%", options: { indentLevel: 1, breakLine: true, color: theme.secondary } },
    { text: "特性三：便携性强", options: { bullet: true, breakLine: true } },
    { text: "轻薄机身，重量仅1.2kg", options: { indentLevel: 1, color: theme.secondary } }
  ];

  slide.addText(content, {
    x: textX, y: textY + 0.7, w: textW, h: 2.5,
    fontSize: 14,
    fontFace: "Microsoft YaHei",
    color: theme.primary,
    valign: "top"
  });

  // Q4记忆点：关键数据 - 在安全区域内
  if (options.memorableData) {
    slide.addShape(pres.shapes.RECTANGLE, {
      x: textX, y: 4.3, w: textW, h: 0.7,
      fill: { color: theme.accent, transparency: 15 }
    });
    slide.addText(options.memorableData, {
      x: textX + 0.2, y: 4.3, w: textW - 0.4, h: 0.7,
      fontSize: 16,
      fontFace: "Arial",
      color: theme.accent,
      bold: true,
      valign: "middle"
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
    title: "产品核心优势",
    subTitle: "为什么选择我们",
    content: [
      { text: "领先的技术架构", options: { bullet: true, breakLine: true, bold: true } },
      { text: "基于云原生的微服务设计，支持弹性扩展", options: { indentLevel: 1, breakLine: true, color: theme.secondary } },
      { text: "完善的生态体系", options: { bullet: true, breakLine: true, bold: true } },
      { text: "对接200+主流平台，一键集成", options: { indentLevel: 1, breakLine: true, color: theme.secondary } },
      { text: "专业的服务支持", options: { bullet: true, breakLine: true, bold: true } },
      { text: "7×24小时技术支持，响应时间<5分钟", options: { indentLevel: 1, color: theme.secondary } }
    ],
    memorableData: "+40% 性能提升 | -60% 功耗降低"
  });
  pres.writeFile({ fileName: "slide-04b-preview.pptx" });
}

module.exports = { createSlide, slideConfig };
