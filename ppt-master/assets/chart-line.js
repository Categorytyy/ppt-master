// chart-line.js - 图表-折线图 (符合安全边距规范)
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

  // 折线图数据
  const chartData = options.data || [
    { name: "2024年", labels: ["1月", "2月", "3月", "4月", "5月", "6月"], values: [120, 145, 168, 172, 195, 220] }
  ];

  // 图表配置 - 在安全区域内
  const chartConfig = {
    x: MARGIN.left, y: options.title ? GRID.y[1] : MARGIN.top + 0.2,
    w: 9, h: 3.8,
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

  // Q4记忆点：趋势洞察 - 在安全区域内
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
    title: "月度销售趋势（2024年上半年）",
    insight: "上半年业绩稳步增长，6月达到峰值220万，环比增长12.8%"
  });
  pres.writeFile({ fileName: "chart-line-preview.pptx" });
}

module.exports = { createSlide, slideConfig };
