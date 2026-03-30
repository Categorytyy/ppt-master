// compile-enhanced.js - 编译脚本-增强版
// PptxGenJS兼容性：✅ addSection | ✅ transition | ⚠️ 动画不支持（需手动添加）
const pptxgen = require("pptxgenjs");
const fs = require("fs");
const path = require("path");

// ========== 主题配色（必须与模板一致） ==========
const theme = {
  primary: "1A237E",    // 深蓝 - 主色
  secondary: "3949AB",  // 中蓝 - 次要
  accent: "F57C00",     // 橙色 - 强调
  light: "E8EAF6",      // 浅蓝 - 装饰
  bg: "FFFFFF"          // 白色 - 背景
};

// ========== 1. 自动创建output目录 ==========
const outputDir = path.join(__dirname, '..', 'output');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log('✓ Created output directory');
}

// ========== 2. 创建PPT实例 ==========
const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';
pres.author = 'PPT Master';
pres.title = '演示文稿';
pres.subject = 'Generated with PptxGenJS';

// ========== 3. 加载幻灯片模块 ==========
// 定义要加载的幻灯片模块列表
const slideModules = [
  { file: 'slide-01a-cover-split', config: { title: '封面', subtitle: '演示文稿' } },
  { file: 'slide-02a-toc-grid', config: { title: '目录', chapters: [
    { num: '01', title: '背景与目标' },
    { num: '02', title: '市场分析' },
    { num: '03', title: '产品策略' },
    { num: '04', title: '执行计划' }
  ]} },
  { file: 'slide-03-section-enhanced', config: { num: '01', sectionTitle: '背景与目标', subtitle: '市场现状与项目必要性' } },
  { file: 'slide-04a-content-card', config: { title: '核心要点', cards: [
    { icon: '💡', title: '创新思维', desc: '突破传统框架\n采用差异化策略' },
    { icon: '📊', title: '数据驱动', desc: '基于市场数据分析\n精准决策支持' },
    { icon: '🚀', title: '快速执行', desc: '敏捷开发模式\n快速响应市场' }
  ], memorableData: '客户满意度提升 47%' } },
  { file: 'slide-04b-content-image-text', config: { title: '产品优势', subTitle: '为什么选择我们', content: [
    { text: '领先的技术架构', options: { bullet: true, breakLine: true, bold: true } },
    { text: '基于云原生的微服务设计', options: { indentLevel: 1, breakLine: true, color: theme.secondary } },
    { text: '完善的生态体系', options: { bullet: true, breakLine: true, bold: true } },
    { text: '对接200+主流平台', options: { indentLevel: 1, color: theme.secondary } }
  ], memorableData: '+40% 性能提升' } },
  { file: 'slide-04c-content-chart', config: { title: '数据分析', chartType: 'bar', chartData: [
    { name: '2023', labels: ['华东区', '华北区', '华南区', '西部区'], values: [285, 192, 224, 156] },
    { name: '2024', labels: ['华东区', '华北区', '华南区', '西部区'], values: [312, 208, 267, 178] }
  ], insights: ['华东区持续领先', '华南区增速最快 +19%', '西部区增长潜力大'], memorableData: '总销售额同比增长 23.5%' } },
  { file: 'slide-04d-content-timeline', config: { title: '发展历程', events: [
    { year: '2019', title: '公司成立', desc: '完成初始团队组建' },
    { year: '2020', title: '产品上线', desc: '核心产品正式发布' },
    { year: '2022', title: 'A轮融资', desc: '获得头部资本投资' },
    { year: '2024', title: '市场扩张', desc: '业务覆盖全国20省' }
  ], memorableEvent: '关键里程碑：A轮融资标志着公司进入快速发展期' } },
  { file: 'slide-04e-content-compare', config: { title: '方案对比', leftTitle: '传统方案', leftFeatures: ['成本较低', '部署周期短', '维护简单', '功能基础'], rightTitle: '推荐方案', rightFeatures: ['功能全面', '扩展性强', '性能优越', '支持定制'], conclusion: '推荐：选择方案B，为未来3年预留扩展空间' } },
  { file: 'slide-04f-content-table', config: { title: '方案对比', recommendation: '推荐方案B，功能与价格最佳平衡点' } },
  { file: 'slide-05-summary-enhanced', config: { points: [
    { icon: '🎯', text: '目标明确：3年内实现市场份额翻倍' },
    { icon: '📈', text: '路径清晰：产品+渠道+服务三轮驱动' },
    { icon: '💪', text: '执行有力：组织能力与资本支撑' }
  ], keyData: { value: '200%', label: '3年目标增长率' }, notes: '这里要停顿3秒，让观众消化核心数据。' } },
  { file: 'slide-06-end-enhanced', config: { mainText: '感谢聆听', subText: '欢迎交流与合作', email: 'contact@example.com', website: 'www.example.com', memorableQuote: '携手共创，合作共赢' } }
];

// 加载并生成每页幻灯片
let slideCount = 0;
for (const slideModule of slideModules) {
  try {
    const modulePath = path.join(__dirname, `${slideModule.file}.js`);
    if (fs.existsSync(modulePath)) {
      const mod = require(modulePath);
      mod.createSlide(pres, theme, slideModule.config);
      slideCount++;
      console.log(`✓ slide-${slideModule.file} loaded`);
    } else {
      console.warn(`⚠ Module not found: ${modulePath}`);
    }
  } catch (err) {
    console.error(`✗ Error in ${slideModule.file}:`, err.message);
    // 继续生成，不中断（页面间无隐式状态依赖）
  }
}

// ========== 4. 输出文件 ==========
const outputPath = path.join(outputDir, 'presentation.pptx');
pres.writeFile({ fileName: outputPath })
  .then(() => {
    console.log(`\n✓ PPT生成成功: ${outputPath}`);
    console.log(`  共生成 ${slideCount} 页幻灯片`);
  })
  .catch(err => {
    console.error('\n✗ PPT生成失败:', err);
  });

// ========== 5. QA验证提示 ==========
console.log('\n📋 QA验证建议：');
console.log('1. 提取文本内容检查：');
console.log('   python -m markitdown output/presentation.pptx');
console.log('2. 检查是否有placeholder残留：');
console.log('   python -m markitdown output/presentation.pptx | grep -iE "xxxx|lorem|ipsum|placeholder"');
console.log('3. 验证章节结构（需PowerPoint打开）：');
console.log('   查看大纲视图确认章节分组正确');
console.log('4. 动画效果需手动添加：');
console.log('   ⚠️ PptxGenJS不支持动画，请在PowerPoint中手动添加');

// ========== 6. 页面无状态依赖原则说明 ==========
console.log('\n📌 设计原则：');
console.log('   每个slide模块独立，无隐式状态依赖');
console.log('   单页失败不影响其他页面生成');
console.log('   各页面可独立预览和调试');
