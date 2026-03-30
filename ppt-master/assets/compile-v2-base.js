// compile.js - PPT编译脚本
// 用法: cd slides && node compile.js

const pptxgen = require('pptxgenjs');
const pres = new pptxgen();

// 设置演示文稿属性
pres.layout = 'LAYOUT_16x9';  // 10" x 5.625"
pres.author = 'PPT Master';
pres.title = 'Presentation';

// ========== 主题配色 ==========
// 请根据实际项目修改以下配色
const theme = {
  primary: "1A237E",    // 深蓝 - 主色（标题、深色背景）
  secondary: "3949AB",  // 中蓝 - 次要元素
  accent: "F57C00",     // 橙色 - 强调色
  light: "E8EAF6",      // 浅蓝 - 浅色装饰
  bg: "FFFFFF"          // 白色 - 背景
};

// ========== 幻灯片模块 ==========
// 按顺序加载所有幻灯片
// 确保slide-XX.js文件存在
const slideCount = 12;  // 修改为实际幻灯片数量

for (let i = 1; i <= slideCount; i++) {
  const num = String(i).padStart(2, '0');
  try {
    const slideModule = require(`./slide-${num}.js`);
    slideModule.createSlide(pres, theme);
    console.log(`✓ slide-${num}.js loaded`);
  } catch (err) {
    console.error(`✗ Error loading slide-${num}.js:`, err.message);
  }
}

// ========== 输出文件 ==========
pres.writeFile({ fileName: './output/presentation.pptx' })
  .then(() => {
    console.log('\n✓ PPT生成成功: ./output/presentation.pptx');
  })
  .catch(err => {
    console.error('\n✗ PPT生成失败:', err);
  });
