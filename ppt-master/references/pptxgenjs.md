# PptxGenJS 完整API参考

## 基础结构

```javascript
const pptxgen = require("pptxgenjs");

let pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';  // 10" x 5.625"
pres.author = 'Author Name';
pres.title = 'Presentation Title';

let slide = pres.addSlide();
slide.background = { color: "FFFFFF" };

// 添加内容...

pres.writeFile({ fileName: "output.pptx" });
```

## 布局尺寸与安全区域

### 页面尺寸

| 布局 | 尺寸 | 说明 |
|------|------|------|
| LAYOUT_16x9 | 10" x 5.625" | 默认16:9 |
| LAYOUT_16x10 | 10" x 6.25" | 16:10 |
| LAYOUT_4x3 | 10" x 7.5" | 4:3 |
| LAYOUT_WIDE | 13.3" x 7.5" | 超宽 |

### ⚠️ 安全边距规范（强制）

**所有元素必须在安全区域内，禁止超出！**

```javascript
// 标准边距常量（16:9 布局）
const MARGIN = {
  left: 0.5,      // 左边距 0.5英寸
  right: 0.5,     // 右边距 0.5英寸
  top: 0.4,       // 上边距 0.4英寸
  bottom: 0.4     // 下边距 0.4英寸
};

// 安全区域尺寸（必须在区域内放置元素）
const SAFE_AREA = {
  x: MARGIN.left,                    // 0.5"
  y: MARGIN.top,                     // 0.4"
  width: 10 - MARGIN.left - MARGIN.right,   // 9"
  height: 5.625 - MARGIN.top - MARGIN.bottom // 4.825"
};

// 标题栏区域
const HEADER = {
  y: MARGIN.top,           // 0.4"
  height: 0.8              // 标题栏高度
};

// 内容区域（标题下方）
const CONTENT = {
  y: MARGIN.top + 0.9,     // 1.3"
  height: 5.625 - MARGIN.top - MARGIN.bottom - 0.9 // 3.925"
};
```

### ❌ 常见错误（必须避免）

| 错误写法 | 问题 | 正确写法 |
|----------|------|----------|
| `x: 0, w: "100%"` | 超出页面边界 | `x: 0.5, w: 9` |
| `x: 0` | 紧贴边缘无留白 | `x: 0.5` |
| `w: 9.5` | 宽度超出安全区 | `w: 9` |
| `y: 0` | 标题贴顶 | `y: 0.4` |

### 标准网格系统

```javascript
// 12列网格（每列 0.75"，间距 0.25"）
const GRID = {
  colWidth: 0.75,
  gutter: 0.25,
  cols: 12
};

// 快速定位函数
function gridX(colIndex) {
  return MARGIN.left + colIndex * (GRID.colWidth + GRID.gutter);
}

function gridW(span) {
  return span * GRID.colWidth + (span - 1) * GRID.gutter;
}

// 使用示例：从第2列开始，占8列宽度
// x: gridX(2), w: gridW(8)
```

---

## 文本 (addText)

```javascript
// 基础文本
slide.addText("Hello World", {
  x: 0.5, y: 0.5,    // 位置（英寸）
  w: 8, h: 1,         // 宽高（英寸）
  fontSize: 24,       // 字号
  fontFace: "Arial",  // 字体
  color: "333333",    // 颜色（6位HEX无#）
  bold: true,         // 粗体
  align: "center",    // 水平对齐
  valign: "middle"    // 垂直对齐
});

// 富文本数组
slide.addText([
  { text: "Bold ", options: { bold: true } },
  { text: "Italic ", options: { italic: true } },
  { text: "Normal" }
], { x: 0.5, y: 1.5, w: 8, h: 0.5 });

// 多行文本
slide.addText([
  { text: "第一行", options: { breakLine: true } },
  { text: "第二行", options: { breakLine: true } },
  { text: "第三行" }
], { x: 0.5, y: 2, w: 8, h: 1.5 });
```

**重要：**
- `breakLine: true` 用于换行（最后一行不需要）
- 用 `margin: 0` 精确定位文本边缘

---

## 列表 (Bullets)

```javascript
// 正确的bullet写法
slide.addText([
  { text: "第一点", options: { bullet: true, breakLine: true } },
  { text: "第二点", options: { bullet: true, breakLine: true } },
  { text: "第三点", options: { bullet: true } }
], { x: 0.5, y: 1, w: 8, h: 2 });

// 子级列表
{ text: "子级内容", options: { bullet: true, indentLevel: 1 } }

// 数字列表
{ text: "第一项", options: { bullet: { type: "number" }, breakLine: true } }
```

**禁止：** 不要用Unicode符号如 `*` 或 `•`

---

## 形状 (Shapes)

```javascript
// 矩形
slide.addShape(pres.shapes.RECTANGLE, {
  x: 0.5, y: 0.8, w: 1.5, h: 3.0,
  fill: { color: "FF0000" },
  line: { color: "000000", width: 2 }
});

// 椭圆
slide.addShape(pres.shapes.OVAL, {
  x: 4, y: 1, w: 2, h: 2,
  fill: { color: "0000FF" }
});

// 圆角矩形
slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 1, y: 1, w: 3, h: 2,
  fill: { color: "FFFFFF" },
  rectRadius: 0.1
});

// 线条
slide.addShape(pres.shapes.LINE, {
  x: 1, y: 3, w: 5, h: 0,
  line: { color: "FF0000", width: 3, dashType: "dash" }
});

// 透明度
slide.addShape(pres.shapes.RECTANGLE, {
  x: 1, y: 1, w: 3, h: 2,
  fill: { color: "0088CC", transparency: 50 }
});

// 阴影
slide.addShape(pres.shapes.RECTANGLE, {
  x: 1, y: 1, w: 3, h: 2,
  fill: { color: "FFFFFF" },
  shadow: { type: "outer", color: "000000", blur: 6, offset: 2, angle: 135, opacity: 0.15 }
});
```

### 阴影属性

| 属性 | 类型 | 说明 |
|------|------|------|
| type | string | "outer" 或 "inner" |
| color | 6位HEX | 无#号 |
| blur | number | 模糊度 0-100 |
| offset | number | 偏移距离（必须≥0） |
| angle | number | 角度 0-359 |
| opacity | number | 透明度 0.0-1.0 |

---

## 图片 (Images)

```javascript
// 从文件路径
slide.addImage({
  path: "imgs/chart.png",
  x: 1, y: 1, w: 5, h: 3
});

// 从URL
slide.addImage({
  path: "https://example.com/image.jpg",
  x: 1, y: 1, w: 5, h: 3
});

// 从Base64
slide.addImage({
  data: "image/png;base64,iVBORw0KG...",
  x: 1, y: 1, w: 5, h: 3
});
```

---

## 图表 (Charts)

```javascript
slide.addChart(pres.charts.BAR, {
  x: 1, y: 1, w: 8, h: 4,
  data: [
    { name: "系列1", labels: ["A", "B", "C"], values: [25, 35, 40] },
    { name: "系列2", labels: ["A", "B", "C"], values: [30, 25, 35] }
  ],
  chartColors: ["1A237E", "F57C00"]
});

slide.addChart(pres.charts.LINE, {
  x: 1, y: 1, w: 8, h: 4,
  data: [ { name: "数据", labels: ["1月", "2月", "3月"], values: [10, 30, 20] } ]
});

slide.addChart(pres.charts.PIE, {
  x: 1, y: 1, w: 5, h: 4,
  data: [ { name: "份额", labels: ["A", "B", "C"], values: [30, 45, 25] } ]
});
```

---

## 关键陷阱（必须避免）

### ❌ 永远不要做的事

| 错误 | 正确 |
|------|------|
| `color: "#FF0000"` | `color: "FF0000"` (无#) |
| `shadow: { color: "00000020" }` | `shadow: { color: "000000", opacity: 0.12 }` |
| `async function createSlide()` | `function createSlide()` (同步) |
| 复用option对象 | 每次创建新对象 |

### ❌ 永远不要在标题中换行

```javascript
// 用 fit:'shrink' 防止标题换行
slide.addText("非常长的标题文字", {
  x: 0.5, y: 0.3, w: 9, h: 0.6,
  fontSize: 48, fit: "shrink"
});
```

---

## 页面类型代码模板

### Cover (封面)

```javascript
function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.primary };

  slide.addText("主标题", {
    x: 0.5, y: 2, w: 9, h: 1.2,
    fontSize: 54, fontFace: "Microsoft YaHei",
    color: "FFFFFF", bold: true, align: "center"
  });

  slide.addText("副标题", {
    x: 0.5, y: 3.3, w: 9, h: 0.6,
    fontSize: 24, fontFace: "Microsoft YaHei",
    color: theme.light, align: "center"
  });

  slide.addText("2024年1月", {
    x: 0.5, y: 4.5, w: 9, h: 0.4,
    fontSize: 14, fontFace: "Arial",
    color: theme.accent, align: "center"
  });

  return slide;
}
```

### Content (内容页)

```javascript
function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addText("页面标题", {
    x: 0.5, y: 0.4, w: 9, h: 0.6,
    fontSize: 32, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.2, w: 0.1, h: 3.5,
    fill: { color: theme.accent }
  });

  slide.addText([
    { text: "要点1", options: { bullet: true, breakLine: true } },
    { text: "要点2", options: { bullet: true, breakLine: true } },
    { text: "要点3", options: { bullet: true } }
  ], {
    x: 0.8, y: 1.2, w: 8.5, h: 3.5,
    fontSize: 18, fontFace: "Microsoft YaHei",
    color: theme.secondary, valign: "top"
  });

  slide.addText("01", {
    x: 9.3, y: 5.1, w: 0.5, h: 0.3,
    fontSize: 10, fontFace: "Arial",
    color: theme.light, align: "right"
  });

  return slide;
}
```

### Section (章节过渡)

```javascript
function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.primary };

  slide.addText("02", {
    x: 0.5, y: 1.5, w: 9, h: 1.5,
    fontSize: 120, fontFace: "Arial",
    color: theme.secondary, bold: true, align: "center"
  });

  slide.addText("章节标题", {
    x: 0.5, y: 3, w: 9, h: 0.8,
    fontSize: 44, fontFace: "Microsoft YaHei",
    color: "FFFFFF", bold: true, align: "center"
  });

  slide.addText("章节副标题（可选）", {
    x: 0.5, y: 3.9, w: 9, h: 0.5,
    fontSize: 18, fontFace: "Microsoft YaHei",
    color: theme.light, align: "center"
  });

  return slide;
}
```

---

## ⚠️ PptxGenJS 关键陷阱（必读）

### ❌ 禁止使用 async/await

```javascript
// 错误 - compile.js 不会等待
async function createSlide(pres, theme) { ... }

// 正确
function createSlide(pres, theme) { ... }
```

### ❌ 禁止使用 "#" 前缀

```javascript
// 错误 - 导致文件损坏
color: "#FF0000"

// 正确 - 6位HEX无#
color: "FF0000"
```

### ❌ 禁止在HEX中编码opacity

```javascript
// 错误 - 导致文件损坏
shadow: { color: "00000020" }

// 正确 - 使用独立的opacity属性
shadow: { color: "000000", opacity: 0.12 }
```

### ❌ 禁止复用对象

```javascript
// 错误 - PptxGenJS会修改对象
const shadow = { type: "outer", blur: 6, offset: 2, color: "000000", opacity: 0.15 };
slide.addShape(pres.shapes.RECTANGLE, { shadow, ... });
slide.addShape(pres.shapes.RECTANGLE, { shadow, ... }); // 对象已被修改

// 正确 - 使用工厂函数
const makeShadow = () => ({ type: "outer", blur: 6, offset: 2, color: "000000", opacity: 0.15 });
slide.addShape(pres.shapes.RECTANGLE, { shadow: makeShadow(), ... });
slide.addShape(pres.shapes.RECTANGLE, { shadow: makeShadow(), ... });
```

### ✅ 长标题使用 fit:'shrink'

```javascript
// 防止文字换行
slide.addText("很长的标题文字", {
  x: 0.5, y: 2, w: 9, h: 1,
  fontSize: 48, fit: "shrink"
});
```

---

## QA验证

```bash
# 提取文本内容
python -m markitdown slides/output/presentation.pptx

# 检查placeholder（grep检测）
python -m markitdown slides/output/presentation.pptx | grep -iE "xxxx|lorem|ipsum|placeholder"
```
