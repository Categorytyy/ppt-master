// chart-pie.js - 图表-饼图 (符合安全边距规范)
// PptxGenJS兼容性：✅ addChart | ⚠️ 渐变图表不支持 | ❌ 动画不支持
const pptxgen = require("pptxgenjs");

// 安全边距与网格系统
const MARGIN = { left: 0.5, right: 0.5, top: 0.4, bottom: 0.4 };
const GRID = {
  x: [0.5, 1.25, 2.0, 2.75, 3.5, 4.25, 5.0, 5.75, 6.5, 7.25, 8.0, 8.75],
  y: [0.4, 1.3, 2.2, 3.1, 4.0, 4.9]
};

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

  // 图表标题 - 使用安全边距
  if (options.title) {
    slide.addText(options.title, {
      x: MARGIN.left, y: MARGIN.top, w: 9, h: 0.6,
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

  // 图表配置 - 在安全区域内，饼图宽度减小以留出右侧空间
  const chartConfig = {
    x: MARGIN.left, y: options.title ? GRID.y[1] : MARGIN.top + 0.2,
    w: 5.5, h: 3.8,
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

  // 右侧补充信息 - 在安全区域内
  const infoX = GRID.x[8];
  const infoY = GRID.y[1];

  slide.addText("占比分析", {
    x: infoX, y: infoY, w: 2.5, h: 0.5,
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
      x: infoX + 0.4, y: itemY, w: 1.2, h: 0.4,
      fontSize: 13,
      fontFace: "Microsoft YaHei",
      color: theme.secondary,
      valign: "middle"
    });

    slide.addText(item.value, {
      x: infoX + 1.8, y: itemY, w: 0.8, h: 0.4,
      fontSize: 13,
      fontFace: "Arial",
      color: theme.primary,
      bold: true,
      align: "right",
      valign: "middle"
    });
  });

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
    title: "市场份额分布"
  });
  pres.writeFile({ fileName: "chart-pie-preview.pptx" });
}

module.exports = { createSlide, slideConfig };
