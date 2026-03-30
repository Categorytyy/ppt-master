function formulaBox(pres, slide, theme, options = {}) {
  const { x, y, w = 9, h = 0.8, formula, label } = options;

  slide.addShape(pres.ShapeType.rect, {
    x, y, w, h,
    fill: { color: theme.light }
  });

  slide.addShape(pres.ShapeType.rect, {
    x, y, w: 0.06, h,
    fill: { color: theme.accent }
  });

  if (label) {
    slide.addText(label, {
      x: x + 0.15, y: y + 0.08, w: w - 0.3, h: 0.22,
      fontSize: 9, fontFace: "Microsoft YaHei",
      color: theme.accent, bold: true
    });
  }

  slide.addText(formula, {
    x: x + 0.15, y: y + (label ? 0.3 : 0.15), w: w - 0.3, h: h - (label ? 0.4 : 0.3),
    fontSize: 13, fontFace: "Consolas",
    color: theme.primary, valign: "middle"
  });
}

function keywordTag(pres, slide, theme, options = {}) {
  const { x, y, w = 1.2, h = 0.3, text, color } = options;

  slide.addShape(pres.ShapeType.roundRect, {
    x, y, w, h,
    fill: { color: color || theme.light },
    rectRadius: 0.05
  });

  slide.addText(text, {
    x, y, w, h,
    fontSize: 9, fontFace: "Microsoft YaHei",
    color: theme.primary, align: "center", valign: "middle"
  });
}

function sectionHeader(pres, slide, theme, options = {}) {
  const { x = 0, y = 0, w = 10, h = 5.63, title, subtitle, bgColor } = options;

  slide.background = { color: bgColor || theme.primary };

  slide.addText(title, {
    x: 0.5, y: 2.0, w: 9, h: 0.9,
    fontSize: 40, fontFace: "Microsoft YaHei",
    color: "FFFFFF", bold: true, align: "center"
  });

  if (subtitle) {
    slide.addShape(pres.ShapeType.rect, {
      x: 4, y: 3.0, w: 2, h: 0.04,
      fill: { color: theme.accent }
    });

    slide.addText(subtitle, {
      x: 0.5, y: 3.2, w: 9, h: 0.5,
      fontSize: 16, fontFace: "Microsoft YaHei",
      color: theme.light, align: "center"
    });
  }
}

function highlightBox(pres, slide, theme, options = {}) {
  const { x, y, w = 9, h = 1.0, title, content, icon } = options;

  slide.addShape(pres.ShapeType.rect, {
    x, y, w, h,
    fill: { color: theme.light }
  });

  if (icon) {
    slide.addText(icon, {
      x: x + 0.15, y: y + 0.15, w: 0.5, h: 0.5,
      fontSize: 24, align: "center", valign: "middle"
    });
  }

  if (title) {
    slide.addText(title, {
      x: x + (icon ? 0.7 : 0.2), y: y + 0.1, w: w - (icon ? 0.9 : 0.4), h: 0.3,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: theme.accent, bold: true
    });
  }

  slide.addText(content, {
    x: x + (icon ? 0.7 : 0.2), y: y + (title ? 0.4 : 0.15), w: w - (icon ? 0.9 : 0.4), h: h - (title ? 0.5 : 0.3),
    fontSize: 10, fontFace: "Microsoft YaHei",
    color: "333333", valign: "top"
  });
}

function dataTable(pres, slide, theme, options = {}) {
  const { x, y, w = 9, h = 2.5, headers, rows, colWidths } = options;

  const tableData = [
    headers.map(h => ({
      text: h,
      options: { fill: { color: theme.primary }, color: "FFFFFF", bold: true }
    })),
    ...rows
  ];

  slide.addTable(tableData, {
    x, y, w, h,
    colW: colWidths || undefined,
    fontSize: 10, fontFace: "Microsoft YaHei",
    color: "333333",
    border: { pt: 0.5, color: "E0E0E0" },
    align: "center", valign: "middle"
  });
}

module.exports = { formulaBox, keywordTag, sectionHeader, highlightBox, dataTable };
