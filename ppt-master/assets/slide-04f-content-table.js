// slide-04f-content-table.js - 内容-表格页 (符合安全边距规范)
// PptxGenJS兼容性：✅ addTable | ⚠️ 表格合并不支持 | ❌ 动画不支持
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
  title: '表格内容页'
};

function createSlide(pres, theme, options = {}) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // 页面标题 - 使用安全边距
  const title = options.title || "数据对比";
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

  // 表格数据
  const tableData = options.tableData || [
    // 表头行
    [
      { text: "对比项", options: { bold: true, fill: theme.primary, color: "FFFFFF", align: "center" } },
      { text: "方案A", options: { bold: true, fill: theme.primary, color: "FFFFFF", align: "center" } },
      { text: "方案B", options: { bold: true, fill: theme.primary, color: "FFFFFF", align: "center" } },
      { text: "方案C", options: { bold: true, fill: theme.primary, color: "FFFFFF", align: "center" } }
    ],
    // 数据行1
    [
      { text: "价格", options: { fill: theme.light, bold: true } },
      { text: "¥999", options: { fill: theme.light, color: theme.accent, align: "center" } },
      { text: "¥1,499", options: { fill: theme.light, color: theme.accent, align: "center" } },
      { text: "¥2,999", options: { fill: theme.light, color: theme.accent, align: "center" } }
    ],
    // 数据行2
    [
      { text: "功能数量", options: { fill: theme.bg } },
      { text: "基础版", options: { fill: theme.bg, align: "center" } },
      { text: "专业版", options: { fill: theme.bg, align: "center" } },
      { text: "企业版", options: { fill: theme.bg, align: "center" } }
    ],
    // 数据行3
    [
      { text: "用户数上限", options: { fill: theme.light } },
      { text: "10人", options: { fill: theme.light, align: "center" } },
      { text: "50人", options: { fill: theme.light, align: "center" } },
      { text: "不限", options: { fill: theme.light, align: "center", color: theme.accent, bold: true } }
    ],
    // 数据行4
    [
      { text: "支持", options: { fill: theme.bg } },
      { text: "邮件", options: { fill: theme.bg, align: "center" } },
      { text: "邮件+电话", options: { fill: theme.bg, align: "center" } },
      { text: "7×24专属", options: { fill: theme.bg, align: "center", color: theme.accent, bold: true } }
    ],
    // 数据行5
    [
      { text: "部署方式", options: { fill: theme.light } },
      { text: "SaaS", options: { fill: theme.light, align: "center" } },
      { text: "SaaS/私有", options: { fill: theme.light, align: "center" } },
      { text: "私有化", options: { fill: theme.light, align: "center", color: theme.accent, bold: true } }
    ]
  ];

  // 表格配置 - 在安全区域内
  const tableConfig = {
    x: MARGIN.left, y: GRID.y[1], w: 9, h: 3.5,
    colW: [2.5, 2, 2, 2.5],
    rowH: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
    fontFace: "Microsoft YaHei",
    fontSize: 13,
    color: theme.secondary,
    border: { pt: 0.5, color: theme.light },
    align: "left",
    valign: "middle"
  };

  slide.addTable(tableData, tableConfig);

  // Q4记忆点：推荐方案 - 在安全区域内
  if (options.recommendation) {
    slide.addShape(pres.shapes.RECTANGLE, {
      x: MARGIN.left, y: 5.0, w: 9, h: 0.5,
      fill: { color: theme.accent, transparency: 15 }
    });
    slide.addText(options.recommendation, {
      x: MARGIN.left, y: 5.0, w: 9, h: 0.5,
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
    title: "方案价格对比",
    recommendation: "💡 推荐方案B，功能与价格最佳平衡点，适合成长型企业"
  });
  pres.writeFile({ fileName: "slide-04f-preview.pptx" });
}

module.exports = { createSlide, slideConfig };
