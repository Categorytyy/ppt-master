// chart-line.js - 图表-折线图
// PptxGenJS兼容性：✅ addChart | ⚠️ 渐变图表不支持 | ❌ 动画不支持
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'chart',
  index: 0,
  title: '折线图模板'
};

/**
 * 创建折线图
 * @param {Object} pres - PptxGenJS 实例
 * @param {Object} theme - 主题配色
 * @param {Object} options - 配置选项
 * @param {Array} options.data - 图表数据 [{name: string, labels: string[], values: number[]}]
 * @param {string} options.title - 图表标题
 * @param {boolean} options.lineSmooth - 是否平滑曲线
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

  // 折线图数据
  const chartData = options.data || [
    { name: "2024年", labels: ["1月", "2月", "3月", "4月", "5月", "6月"], values: [120, 145, 168, 172, 195, 220] }
  ];

  // 图表配置
  const chartConfig = {
    x: 0.5, y: options.title ? 1.0 : 0.5,
    w: 9, h: 4.5,
    lineSize: 2.5,
    lineSmooth: options.lineSmooth !== false,
    showTitle: false,
    showLegend: true,
    legendPos: 'b',
    legendFontSize: 11,
    legendColor: theme.secondary,
    chartColors: [theme.primary, theme.accent, theme.secondary],
    catAxisLabelColor: theme.secondary,
    catAxisLabelFontSize: 11,
    catAxisLabelFontFace: "Microsoft YaHei",
    valAxisLabelColor: theme.secondary,
    valAxisLabelFontSize: 10,
    valGridLine: { color: theme.light, size: 0.5 },
    catGridLine: { style: 'none' },
    showValue: false,
    lineDataSymbol: 'circle',
    lineDataSymbolSize: 8,
    showMarker: true,
    catAxisLabelRotate: 0
  };

  slide.addChart(pres.charts.LINE, chartData, chartConfig);

  // Q4记忆点：趋势洞察
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
    title: "月度销售趋势（2024年上半年）",
    data: [
      { name: "月度销售额(万元)", labels: ["1月", "2月", "3月", "4月", "5月", "6月"], values: [120, 145, 168, 172, 195, 220] }
    ],
    insight: "📈 连续6个月增长，6月环比增长 12.8%"
  });
  pres.writeFile({ fileName: "chart-line-preview.pptx" });
}

module.exports = { createSlide, slideConfig };
