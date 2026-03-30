// slide-04d-content-timeline.js - 内容-时间轴
// PptxGenJS兼容性：✅ 时间轴布局 | ⚠️ 渐变用色块替代 | ❌ 动画不支持
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 4,
  title: '时间轴内容页'
};

function createSlide(pres, theme, options = {}) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // 页面标题
  const title = options.title || "发展历程";
  slide.addText(title, {
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

  // 时间轴数据
  const events = options.events || [
    { year: "2019", title: "公司成立", desc: "完成初始团队组建" },
    { year: "2020", title: "产品上线", desc: "核心产品正式发布" },
    { year: "2022", title: "A轮融资", desc: "获得头部资本投资" },
    { year: "2024", title: "市场扩张", desc: "业务覆盖全国20省" }
  ];

  // 时间轴参数
  const axisY = 3.0;
  const startX = 1.0;
  const endX = 9.0;
  const nodeSpacing = (endX - startX) / (events.length - 1);

  // 主时间轴线
  slide.addShape(pres.shapes.RECTANGLE, {
    x: startX, y: axisY - 0.02, w: endX - startX, h: 0.04,
    fill: { color: theme.secondary }
  });

  // 时间轴节点和内容
  events.forEach((event, i) => {
    const nodeX = startX + i * nodeSpacing;

    // 节点圆圈
    slide.addShape(pres.shapes.OVAL, {
      x: nodeX - 0.15, y: axisY - 0.15, w: 0.3, h: 0.3,
      fill: { color: theme.accent },
      line: { color: theme.bg, width: 2 }
    });

    // 年份（上方）
    slide.addText(event.year, {
      x: nodeX - 0.5, y: axisY - 0.8, w: 1, h: 0.4,
      fontSize: 16,
      fontFace: "Arial",
      color: theme.primary,
      bold: true,
      align: "center"
    });

    // 事件标题（上方或下方交替）
    const isTop = i % 2 === 0;
    const titleY = isTop ? axisY - 1.5 : axisY + 0.4;
    const descY = isTop ? axisY - 1.1 : axisY + 0.8;
    const connectorStartY = isTop ? axisY - 0.15 : axisY + 0.15;
    const connectorEndY = isTop ? axisY - 0.45 : axisY + 0.45;

    // 连接线
    slide.addShape(pres.shapes.RECTANGLE, {
      x: nodeX - 0.01, y: Math.min(connectorStartY, connectorEndY),
      w: 0.02, h: Math.abs(connectorEndY - connectorStartY),
      fill: { color: theme.light }
    });

    // 标题
    slide.addText(event.title, {
      x: nodeX - 0.8, y: titleY, w: 1.6, h: 0.4,
      fontSize: 14,
      fontFace: "Microsoft YaHei",
      color: theme.primary,
      bold: true,
      align: "center"
    });

    // 描述
    slide.addText(event.desc, {
      x: nodeX - 1, y: descY, w: 2, h: 0.5,
      fontSize: 11,
      fontFace: "Microsoft YaHei",
      color: theme.secondary,
      align: "center"
    });
  });

  // Q4记忆点：关键里程碑
  if (options.memorableEvent) {
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: 4.8, w: 9, h: 0.6,
      fill: { color: theme.accent, transparency: 15 }
    });
    slide.addText(options.memorableEvent, {
      x: 0.5, y: 4.8, w: 9, h: 0.6,
      fontSize: 14,
      fontFace: "Microsoft YaHei",
      color: theme.accent,
      bold: true,
      align: "center",
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
    title: "企业发展历程",
    events: [
      { year: "2019", title: "公司成立", desc: "完成初始团队组建\n确定发展方向" },
      { year: "2020", title: "产品上线", desc: "核心产品正式发布\n获得首批用户" },
      { year: "2022", title: "A轮融资", desc: "获得头部资本\n估值破亿" },
      { year: "2024", title: "市场扩张", desc: "业务覆盖全国\n20+省份" }
    ],
    memorableEvent: "⭐ 关键里程碑：A轮融资标志着公司进入快速发展期"
  });
  pres.writeFile({ fileName: "slide-04d-preview.pptx" });
}

module.exports = { createSlide, slideConfig };
