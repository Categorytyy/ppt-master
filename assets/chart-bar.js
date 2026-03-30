// chart-bar.js - 图表-柱状图
// PptxGenJS兼容性：✅ addChart | ⚠️ 渐变图表不支持 | ❌ 动画不支持
const pptxgen = require("pptxgenjs");

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

  // 柱状图数据
  const chartData = options.data || [
    { name: "2023", labels: ["华东区", "华北区", "华南区", "西部区"], values: [285, 192, 224, 156] },
    { name: "2024", labels: ["华东区", "华北区", "华南区", "西部区"], values: [312, 208, 267, 178] }
  ];

  // 图表配置
  const chartConfig = {
    x: 0.5, y: options.title ? 1.0 : 0.5,
    w: 9, h: 4.5,
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

  // Q4记忆点：数据洞察
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
    title: "区域销售对比（2023-2024）",
    data: [
      { name: "2023年", labels: ["华东区", "华北区", "华南区", "西部区"], values: [285, 192, 224, 156] },
      { name: "2024年", labels: ["华东区", "华北区", "华南区", "西部区"], values: [312, 208, 267, 178] }
    ],
    insight: "📈 华南区增速最快，同比增长 19.2%"
  });
  pres.writeFile({ fileName: "chart-bar-preview.pptx" });
}

module.exports = { createSlide, slideConfig };
