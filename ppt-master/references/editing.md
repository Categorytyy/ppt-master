# 编辑现有PPT完整指南

## 何时使用编辑工作流

| 任务类型 | 使用工作流 |
|----------|-----------|
| 用户提供了模板/参考PPT | 编辑现有PPT |
| 需要保留原有设计风格 | 编辑现有PPT |
| 从零开始，无任何参考 | 从零创建（PptxGenJS） |

---

## 工作流程概览

```
Step 1: 复制并分析 → markitdown提取内容
Step 2: 解压 → PPTX解压为XML
Step 3: 编辑 → 修改slide XML内容
Step 4: 重新打包 → XML压缩为PPTX
```

---

## Step 1: 复制并分析

### 复制原始文件

```bash
cp /path/to/user-provided.pptx template.pptx
```

### 提取文本内容

```bash
python -m markitdown template.pptx > template.md
```

### 分析结构

阅读 `template.md`，识别：
- 占位符文本（如"标题"、"此处填写内容"）
- 幻灯片数量
- 内容结构
- 需要修改的部分

---

## Step 2: 解压PPT为XML

PPTX本质上是一个ZIP文件，包含XML和媒体资源。

```python
import zipfile
import os

# 解压到unpacked目录
with zipfile.ZipFile('template.pptx', 'r') as zip_ref:
    zip_ref.extractall('unpacked')

# 目录结构
# unpacked/
# ├── [Content_Types].xml
# ├── _rels/
# └── ppt/
#     ├── presentation.xml      # 幻灯片列表和顺序
#     ├── slides/              # 每个slide的XML
#     │   ├── slide1.xml
#     │   ├── slide2.xml
#     │   └── ...
#     ├── media/                # 图片、视频等
#     └── _rels/               # 关系文件
```

---

## Step 3: 编辑Slide XML

### 理解Slide XML结构

```xml
<p:sp>
  <p:nvSpPr>
    <p:nvPr/>
    <p:spPr/>
  </p:nvSpPr>
  <p:txBody>
    <a:p>
      <a:r>
        <a:rPr lang="zh-CN" b="1"/>
        <a:t>这是标题文本</a:t>
      </a:r>
    </a:p>
  </p:txBody>
</p:sp>
```

### 关键XML元素

| 元素 | 说明 |
|------|------|
| `<p:sp>` | 形状（文本框、图表等） |
| `<p:txBody>` | 文本内容区域 |
| `<a:p>` | 段落 |
| `<a:r>` | 文本运行 |
| `<a:t>` | 实际文本内容 |
| `<a:rPr>` | 文本属性（粗体、颜色等） |
| `<a:buChar>` | 项目符号字符 |

### 编辑规则

**1. 使用Edit工具，不要用sed或Python脚本**

**2. 粗体所有标题**
```xml
<a:rPr lang="zh-CN" b="1"/>
```

**3. 不要使用Unicode项目符号**
```xml
<!-- 错误 -->
<a:buChar char="•"/>

<!-- 正确 - 让bullet继承自layout -->
<a:buNone/>
```

**4. 格式化规则**
- 标题：`b="1"` 粗体
- 子标题：`b="1"` 粗体
- 正文：不加粗

---

## Step 4: 重新打包

```python
import zipfile
import os
import shutil

# 先写到/tmp/避免volume mount问题
output_path = '/tmp/edited.pptx'

with zipfile.ZipFile(output_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk('unpacked'):
        for file in files:
            file_path = os.path.join(root, file)
            arcname = os.path.relpath(file_path, 'unpacked')
            zipf.write(file_path, arcname)

# 复制到最终位置
shutil.copy(output_path, 'edited.pptx')
```

---

## 常见任务

### 删除幻灯片

1. 从 `presentation.xml` 的 `<p:sldIdLst>` 中删除 `<p:sldId>`
2. 删除对应的slide文件和rels文件
3. 清理orphaned媒体文件

### 重排幻灯片

在 `presentation.xml` 的 `<p:sldIdLst>` 中重新排序 `<p:sldId>` 元素。

### 复制幻灯片

1. 复制 `slide{N}.xml` 为新文件
2. 复制 `slide{N}.xml.rels`
3. 在 `Content_Types.xml` 添加新slide的引用
4. 在 `presentation.xml` 添加新的 `<p:sldId>`
5. 更新所有关系文件的ID

### 查找替换文本

在slide XML中使用Edit工具精确替换：
- 找到：`<a:t>旧文本</a:t>`
- 替换为：`<a:t>新文本</a:t>`

---

## 输出结构

```
./
├── template.pptx      # 用户提供的原始文件（不修改）
├── template.md        # markitdown提取的内容
├── unpacked/          # 可编辑的XML树
│   ├── [Content_Types].xml
│   ├── _rels/
│   └── ppt/
│       ├── presentation.xml
│       ├── slides/
│       │   ├── slide1.xml
│       │   └── ...
│       └── media/
└── edited.pptx       # 最终编辑后的文件
```

---

## 注意事项

1. **始终先复制原始文件** - 保留备份
2. **使用/tmp/写入** - 避免volume mount问题
3. **使用Edit工具** - 保证精确替换
4. **验证最终文件** - 用markitdown检查内容
