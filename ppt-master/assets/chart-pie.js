// chart-pie.js - 图表-饼图
// PptxGenJS兼容性：✅ addChart | ⚠️ 渐变图表不支持 | ❌ 动画不支持
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'chart',
  index: 0,
  title: '饼图模板'
};

/**
 * 创建饼图
 * @param {Object} pres - PptxGenJS 实例
 * @param {Object} theme - 主题配色
 * @param {Object} options - 配置选项
 * @param {Array} options.data - 图表数据 [{name: string, labels: string[], values: number[]}]
 * @param {string} options.title - 图表标题
 * @param {string} options.showPercent - 是否显示百分比
 */
function createSlide(pres, theme, options = {}) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // 图表标题
  if (options.title) {
    slide.addText(options.title, {
      x: 0.5, y: 0.3, w: 9, h: 0.6,
      fontSize: 28,
      fontFace: "Microsoft YaHei",
      color: theme.primary,
      bold: true
    });
  }

  // 饼图数据
  const chartData = options.data || [{
    name: "市场份额",
    labels: ["产品A", "产品B", "产品C", "产品D", "其他"],
    values: [35, 25, 22, 13, 5]
  }];

  // 图表配置
  const chartConfig = {
    x: 0.5, y: options.title ? 1.0 : 0.5,
    w: 5.5, h: 4.5,
    showTitle: false,
    showLegend: true,
    legendPos: 'r',
    legendFontSize: 12,
    legendColor: theme.secondary,
    chartColors: [theme.primary, theme.accent, theme.secondary, theme.light, "B0BEC5"],
    showPercent: options.showPercent !== false,
    showValue: false,
    showLabel: false,
    pieHole: options.pieHole || 0,
    dataBorder: { pt: 1, color: theme.bg },
    dataLabelColor: "FFFFFF",
    dataLabelFontSize: 11,
    dataLabelFontFace: "Arial"
  };

  slide.addChart(pres.charts.PIE, chartData, chartConfig);

  // 右侧补充信息
  const infoX = 6.3;
  const infoY = 1.5;

  slide.addText("占比分析", {
    x: infoX, y: infoY, w: 3.2, h: 0.5,
    fontSize: 16,
    fontFace: "Microsoft YaHei",
    color: theme.primary,
    bold: true
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: infoX, y: infoY + 0.5, w: 0.8, h: 0.03,
    fill: { color: theme.accent }
  });

  // 详细数据
  const details = options.details || [
    { label: "产品A", value: "35%", color: theme.primary },
    { label: "产品B", value: "25%", color: theme.accent },
    { label: "产品C", value: "22%", color: theme.secondary },
    { label: "产品D", value: "13%", color: theme.light },
    { label: "其他", value: "5%", color: "B0BEC5" }
  ];

  details.forEach((item, i) => {
    const itemY = infoY + 0.8 + i * 0.6;

    slide.addShape(pres.shapes.RECTANGLE, {
      x: infoX, y: itemY + 0.1, w: 0.25, h: 0.25,
      fill: { color: item.color }
    });

    slide.addText(item.label, {
      x: infoX + 0.4, y: itemY, w: 1.5, h: 0.4,
      fontSize: 13,
      fontFace: "Microsoft YaHei",
      color: theme.secondary,
      valign: "middle"
    });

    slide.addText(item.value, {
      x: infoX + 1.9, y: itemY, w: 1, h: 0.4,
      fontSize: 13,
      fontFace: "Arial",
      color: theme.primary,
      bold: true,
      valign: "middle",
      align: "right"
    });
  });

  // Q4记忆点：核心洞察
  if (options.insight) {
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: 5.0, w: 9, h: 0.5,
      fill: { color: theme.accent, transparency: 15 }
    });
    slide.addText(options.insight, {
      x: 0.5, y: 5.0, w: 9, h: 0.5,
      fontSize: 13,
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
    title: "产品市场份额分布",
    insight: "💡 产品A+产品B占据60%份额，是核心利润来源"
  });
  pres.writeFile({ fileName: "chart-pie-preview.pptx" });
}

module.exports = { createSlide, slideConfig };
