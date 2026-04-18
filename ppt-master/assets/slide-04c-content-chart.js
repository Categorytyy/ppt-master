// slide-04c-content-chart.js - 内容-图表页 (符合安全边距规范)
// PptxGenJS兼容性：✅ 图表展示 | ⚠️ 渐变用色块替代 | ❌ 动画不支持
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
  title: '图表内容页'
};

function createSlide(pres, theme, options = {}) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // 页面标题 - 使用安全边距
  const title = options.title || "数据分析";
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

  // 图表类型
  const chartType = options.chartType || 'bar';

  // 图表数据
  const chartData = options.chartData || [
    { name: "Q1", labels: ["产品A", "产品B", "产品C"], values: [120, 85, 95] },
    { name: "Q2", labels: ["产品A", "产品B", "产品C"], values: [145, 92, 88] }
  ];

  // 图表配置 - 在安全区域内
  const chartConfig = {
    x: MARGIN.left, y: GRID.y[1], w: 6, h: 3.8,
    barDir: 'col',
    showTitle: false,
    showLegend: true,
    legendPos: 'b',
    chartColors: [theme.primary, theme.accent, theme.secondary],
    catAxisLabelColor: theme.secondary,
    valAxisLabelColor: theme.secondary,
    valGridLine: { color: theme.light, size: 0.5 },
    catGridLine: { style: 'none' },
    showValue: true,
    dataLabelPosition: 'outEnd',
    dataLabelColor: theme.primary,
    dataLabelFontSize: 10
  };

  // 根据图表类型添加
  if (chartType === 'bar') {
    slide.addChart(pres.charts.BAR, chartData, chartConfig);
  } else if (chartType === 'line') {
    chartConfig.lineSize = 2;
    chartConfig.lineSmooth = true;
    slide.addChart(pres.charts.LINE, chartData, chartConfig);
  } else if (chartType === 'pie') {
    slide.addChart(pres.charts.PIE, [{
      name: "占比",
      labels: ["A类", "B类", "C类", "D类"],
      values: [35, 25, 22, 18]
    }], {
      x: MARGIN.left, y: GRID.y[1], w: 5, h: 3.8,
      showTitle: false,
      showLegend: true,
      legendPos: 'b',
      chartColors: [theme.primary, theme.secondary, theme.accent, theme.light]
    });
  }

  // 右侧关键洞察 - 从网格第8列开始
  const insightsX = GRID.x[8];
  const insightsY = GRID.y[1];

  slide.addText("关键洞察", {
    x: insightsX, y: insightsY, w: 2.8, h: 0.5,
    fontSize: 16,
    fontFace: "Microsoft YaHei",
    color: theme.primary,
    bold: true
  });

  // 装饰线
  slide.addShape(pres.shapes.RECTANGLE, {
    x: insightsX, y: insightsY + 0.5, w: 0.8, h: 0.03,
    fill: { color: theme.accent }
  });

  const insights = options.insights || [
    "产品A连续两季度增长",
    "Q2整体呈上升趋势",
    "B类产品趋于稳定"
  ];

  insights.forEach((insight, i) => {
    slide.addShape(pres.shapes.RECTANGLE, {
      x: insightsX, y: insightsY + 0.8 + i * 0.7, w: 0.15, h: 0.15,
      fill: { color: theme.accent }
    });
    slide.addText(insight, {
      x: insightsX + 0.3, y: insightsY + 0.7 + i * 0.7, w: 2.5, h: 0.5,
      fontSize: 12,
      fontFace: "Microsoft YaHei",
      color: theme.secondary,
      valign: "middle"
    });
  });

  // Q4记忆点：核心数据结论 - 在安全区域内
  if (options.memorableData) {
    slide.addShape(pres.shapes.RECTANGLE, {
      x: MARGIN.left, y: 5.0, w: 9, h: 0.5,
      fill: { color: theme.primary, transparency: 10 }
    });
    slide.addText(options.memorableData, {
      x: MARGIN.left, y: 5.0, w: 9, h: 0.5,
      fontSize: 14,
      fontFace: "Microsoft YaHei",
      color: theme.primary,
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
    title: "季度销售分析",
    chartType: 'bar',
    chartData: [
      { name: "2023Q4", labels: ["华东区", "华北区", "华南区", "西部区"], values: [285, 192, 224, 156] },
      { name: "2024Q1", labels: ["华东区", "华北区", "华南区", "西部区"], values: [312, 208, 267, 178] }
    ],
    insights: [
      "华东区持续领先",
      "华南区增速最快 +19%",
      "西部区增长潜力大"
    ],
    memorableData: "📈 2024Q1总销售额同比增长 23.5%"
  });
  pres.writeFile({ fileName: "slide-04c-preview.pptx" });
}

module.exports = { createSlide, slideConfig };
