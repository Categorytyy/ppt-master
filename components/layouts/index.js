function threeColumn(pres, slide, theme, options = {}) {
  const { title, columns, x = 0.5, y = 1.2, w = 9, h = 3.8 } = options;
  const colW = (w - 0.3) / 3;
  const gap = 0.15;

  if (title) {
    slide.addText(title, {
      x, y: y - 0.5, w, h: 0.4,
      fontSize: 14, fontFace: "Microsoft YaHei",
      color: theme.secondary, bold: true
    });
  }

  columns.forEach((col, i) => {
    const cx = x + i * (colW + gap);

    if (col.header) {
      slide.addShape(pres.ShapeType.rect, {
        x: cx, y, w: colW, h: 0.4,
        fill: { color: theme.primary }
      });
      slide.addText(col.header, {
        x: cx, y, w: colW, h: 0.4,
        fontSize: 12, fontFace: "Microsoft YaHei",
        color: "FFFFFF", bold: true, align: "center", valign: "middle"
      });
    }

    slide.addShape(pres.ShapeType.rect, {
      x: cx, y: y + (col.header ? 0.4 : 0), w: colW, h: h - (col.header ? 0.4 : 0),
      fill: { color: theme.light }
    });

    const textItems = col.items || [];
    slide.addText(
      textItems.map((item, idx) => ({
        text: item,
        options: { bullet: true, breakLine: idx < textItems.length - 1 }
      })),
      {
        x: cx + 0.1, y: y + (col.header ? 0.5 : 0.1), w: colW - 0.2, h: h - (col.header ? 0.5 : 0.2),
        fontSize: 10, fontFace: "Microsoft YaHei",
        color: "333333", valign: "top"
      }
    );
  });
}

function comparison(pres, slide, theme, options = {}) {
  const { title, left, right, x = 0.5, y = 1.2, w = 9, h = 3.8 } = options;
  const halfW = (w - 0.2) / 2;

  if (title) {
    slide.addText(title, {
      x, y: y - 0.5, w, h: 0.4,
      fontSize: 14, fontFace: "Microsoft YaHei",
      color: theme.secondary, bold: true
    });
  }

  [left, right].forEach((side, i) => {
    const sx = x + i * (halfW + 0.2);
    const sideColor = i === 0 ? theme.primary : theme.accent;

    slide.addShape(pres.ShapeType.rect, {
      x: sx, y, w: halfW, h: h,
      fill: { color: theme.light }
    });

    slide.addShape(pres.ShapeType.rect, {
      x: sx, y, w: halfW, h: 0.45,
      fill: { color: sideColor }
    });

    slide.addText(side.title, {
      x: sx, y, w: halfW, h: 0.45,
      fontSize: 13, fontFace: "Microsoft YaHei",
      color: "FFFFFF", bold: true, align: "center", valign: "middle"
    });

    const items = side.items || [];
    slide.addText(
      items.map((item, idx) => ({
        text: item,
        options: { bullet: true, breakLine: idx < items.length - 1 }
      })),
      {
        x: sx + 0.15, y: y + 0.55, w: halfW - 0.3, h: h - 0.7,
        fontSize: 10, fontFace: "Microsoft YaHei",
        color: "333333", valign: "top"
      }
    );
  });
}

function timeline(pres, slide, theme, options = {}) {
  const { title, items, x = 0.5, y = 1.5, w = 9, h = 3.5 } = options;

  if (title) {
    slide.addText(title, {
      x, y: y - 0.5, w, h: 0.4,
      fontSize: 14, fontFace: "Microsoft YaHei",
      color: theme.secondary, bold: true
    });
  }

  const itemH = h / items.length;
  const lineX = x + 0.8;

  slide.addShape(pres.ShapeType.rect, {
    x: lineX, y: y + itemH / 2, w: 0.02, h: h - itemH,
    fill: { color: theme.light }
  });

  items.forEach((item, i) => {
    const iy = y + i * itemH;
    const cy = iy + itemH / 2;

    slide.addShape(pres.ShapeType.ellipse, {
      x: lineX - 0.1, y: cy - 0.1, w: 0.2, h: 0.2,
      fill: { color: theme.accent }
    });

    slide.addText(item.year || item.label, {
      x, y: cy - 0.15, w: 0.7, h: 0.3,
      fontSize: 10, fontFace: "Microsoft YaHei",
      color: theme.primary, bold: true, align: "right", valign: "middle"
    });

    slide.addText(item.title, {
      x: lineX + 0.2, y: cy - 0.2, w: w - 1, h: 0.3,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: theme.primary, bold: true, valign: "middle"
    });

    slide.addText(item.desc, {
      x: lineX + 0.2, y: cy + 0.1, w: w - 1, h: 0.3,
      fontSize: 9, fontFace: "Microsoft YaHei",
      color: "666666", valign: "top"
    });
  });
}

function cardGrid(pres, slide, theme, options = {}) {
  const { title, cards, cols = 2, x = 0.5, y = 1.2, w = 9, h = 3.8 } = options;
  const cardW = (w - (cols - 1) * 0.2) / cols;
  const cardH = (h - 0.2) / Math.ceil(cards.length / cols);

  if (title) {
    slide.addText(title, {
      x, y: y - 0.5, w, h: 0.4,
      fontSize: 14, fontFace: "Microsoft YaHei",
      color: theme.secondary, bold: true
    });
  }

  cards.forEach((card, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const cx = x + col * (cardW + 0.2);
    const cy = y + row * (cardH + 0.2);

    slide.addShape(pres.ShapeType.rect, {
      x: cx, y: cy, w: cardW, h: cardH,
      fill: { color: theme.light }
    });

    slide.addShape(pres.ShapeType.rect, {
      x: cx, y: cy, w: cardW, h: 0.06,
      fill: { color: theme.accent }
    });

    if (card.label) {
      slide.addText(card.label, {
        x: cx + 0.1, y: cy + 0.15, w: cardW - 0.2, h: 0.25,
        fontSize: 9, fontFace: "Microsoft YaHei",
        color: theme.accent, bold: true
      });
    }

    slide.addText(card.title, {
      x: cx + 0.1, y: cy + (card.label ? 0.4 : 0.15), w: cardW - 0.2, h: 0.3,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: theme.primary, bold: true
    });

    slide.addText(card.content, {
      x: cx + 0.1, y: cy + (card.label ? 0.7 : 0.5), w: cardW - 0.2, h: cardH - (card.label ? 0.9 : 0.7),
      fontSize: 9, fontFace: "Microsoft YaHei",
      color: "555555", valign: "top"
    });
  });
}

module.exports = { threeColumn, comparison, timeline, cardGrid };
