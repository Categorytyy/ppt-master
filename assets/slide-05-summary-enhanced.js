// slide-05-summary-enhanced.js - 总结-增强
// PptxGenJS兼容性：✅ addNotes | ⚠️ 渐变用色块替代 | ❌ 动画不支持
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'summary',
  index: 5,
  title: '总结页-增强'
};

function createSlide(pres, theme, options = {}) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // 页面标题
  slide.addText("总结", {
    x: 0.5, y: 0.4, w: 9, h: 0.7,
    fontSize: 32,
    fontFace: "Microsoft YaHei",
    color: theme.primary,
    bold: true
  });

  // 标题下装饰线
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.0, w: 1.2, h: 0.04,
    fill: { color: theme.accent }
  });

  // 总结要点
  const summaryPoints = options.points || [
    { icon: "✅", text: "明确的目标：3年内实现市场份额翻倍" },
    { icon: "✅", text: "清晰的路径：产品+渠道+服务三轮驱动" },
    { icon: "✅", text: "可靠的保障：组织能力与资本支撑" }
  ];

  summaryPoints.forEach((point, i) => {
    const y = 1.4 + i * 0.9;

    // 图标背景
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: y, w: 0.6, h: 0.6,
      fill: { color: theme.light }
    });

    // 图标
    slide.addText(point.icon, {
      x: 0.5, y: y, w: 0.6, h: 0.6,
      fontSize: 20,
      align: "center",
      valign: "middle"
    });

    // 文字
    slide.addText(point.text, {
      x: 1.3, y: y, w: 8, h: 0.6,
      fontSize: 16,
      fontFace: "Microsoft YaHei",
      color: theme.primary,
      valign: "middle"
    });
  });

  // 核心数据展示区
  const keyData = options.keyData || {
    value: "200%",
    label: "3年目标增长率"
  };

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.0, w: 9, h: 1.2,
    fill: { color: theme.primary, transparency: 8 }
  });

  slide.addText(keyData.value, {
    x: 0.5, y: 4.0, w: 9, h: 0.8,
    fontSize: 48,
    fontFace: "Arial",
    color: theme.accent,
    bold: true,
    align: "center",
    valign: "bottom"
  });

  slide.addText(keyData.label, {
    x: 0.5, y: 4.75, w: 9, h: 0.4,
    fontSize: 14,
    fontFace: "Microsoft YaHei",
    color: theme.secondary,
    align: "center",
    valign: "top"
  });

  // 演讲者备注（addNotes API）
  if (options.notes) {
    slide.addNotes(options.notes);
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
    title: "项目总结",
    points: [
      { icon: "🎯", text: "目标明确：2024年实现营收突破1亿元" },
      { icon: "📈", text: "路径清晰：产品创新+市场拓展+客户深耕" },
      { icon: "💪", text: "执行有力：团队能力升级+组织架构优化" }
    ],
    keyData: {
      value: "+47%",
      label: "预计年度增长率"
    },
    notes: "演讲提示：这里要停顿3秒，让观众消化核心数据。接下来进入Q&A环节。"
  });
  pres.writeFile({ fileName: "slide-05-preview.pptx" });
}

module.exports = { createSlide, slideConfig };
