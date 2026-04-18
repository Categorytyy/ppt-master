// chart-bar.js - 图表-柱状图 (符合安全边距规范)
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
  title: '柱状图模板'
};

/**
 * 创建柱状图
 * @param {Object} pres - PptxGenJS 实例
 * @param {Object} theme - 主题配色
 * @param {Object} options - 配置选项
 * @param {Array} options.data - 图表数据 [{name: string, labels: string[], values: number[]}]
 * @param {string} options.title - 图表标题
 * @param {string} options.barDir - 'col'(柱状) 或 'bar'(条形)
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

  // 柱状图数据
  const chartData = options.data || [
    { name: "2023", labels: ["华东区", "华北区", "华南区", "西部区"], values: [285, 192, 224, 156] },
    { name: "2024", labels: ["华东区", "华北区", "华南区", "西部区"], values: [312, 208, 267, 178] }
  ];

  // 图表配置 - 在安全区域内
  const chartConfig = {
    x: MARGIN.left, y: options.title ? GRID.y[1] : MARGIN.top + 0.2,
    w: 9, h: 3.8,
    barDir: options.barDir || 'col',
    barGapWidthPct: 50,
    showTitle: false,
    showLegend: true,
    legendPos: 'b',
    legendFontSize: 11,
    legendColor: theme.secondary,
    chartColors: [theme.primary, theme.accent, theme.secondary, theme.light],
    catAxisLabelColor: theme.secondary,
    catAxisLabelFontSize: 11,
    catAxisLabelFontFace: "Microsoft YaHei",
    valAxisLabelColor: theme.secondary,
    valAxisLabelFontSize: 10,
    valGridLine: { color: theme.light, size: 0.5 },
    catGridLine: { style: 'none' },
    showValue: true,
    dataLabelPosition: 'outEnd',
    dataLabelColor: theme.primary,
    dataLabelFontSize: 10,
    dataLabelFontFace: "Arial"
  };

  slide.addChart(pres.charts.BAR, chartData, chartConfig);

  // Q4记忆点：数据洞察 - 在安全区域内
  if (options.insight) {
    slide.addShape(pres.shapes.RECTANGLE, {
      x: MARGIN.left, y: GRID.y[4] + 0.1, w: 9, h: 0.5,
      fill: { color: theme.accent, transparency: 15 }
    });
    slide.addText(options.insight, {
      x: MARGIN.left, y: GRID.y[4] + 0.1, w: 9, h: 0.5,
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
    title: "区域销售业绩对比",
    insight: "华东地区连续两年保持领先，增长率达9.5%"
  });
  pres.writeFile({ fileName: "chart-bar-preview.pptx" });
}

module.exports = { createSlide, slideConfig };
