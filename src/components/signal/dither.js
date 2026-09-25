// 1-bit imaging for the two-ink site: load an image into a coarse grid,
// shape its tones, and Floyd-Steinberg it down to white-or-blue cells.

const cache = new Map();

export function loadImage(src) {
  if (!cache.has(src)) {
    cache.set(
      src,
      new Promise((resolve, reject) => {
        const img = new Image();
        img.decoding = 'async';
        if (/^https?:/.test(src)) img.crossOrigin = 'anonymous';
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      })
    );
  }
  return cache.get(src);
}

// Luminance of `img` drawn "cover" into a cols x rows grid, 0..1.
export function sampleLuma(img, cols, rows, { focusY = 0.5, floor = 0 } = {}) {
  const c = document.createElement('canvas');
  c.width = cols;
  c.height = rows;
  const ctx = c.getContext('2d', { willReadFrequently: true });
  const scale = Math.max(cols / img.naturalWidth, rows / img.naturalHeight);
  const w = img.naturalWidth * scale;
  const h = img.naturalHeight * scale;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(img, (cols - w) / 2, (rows - h) * focusY, w, h);
  const { data } = ctx.getImageData(0, 0, cols, rows);
  const out = new Float32Array(cols * rows);
  for (let i = 0; i < out.length; i += 1) {
    const r = data[i * 4] / 255;
    const g = data[i * 4 + 1] / 255;
    const b = data[i * 4 + 2] / 255;
    const a = data[i * 4 + 3] / 255;
    // Transparent pixels are ink. Opaque darks keep a floor of density so a
    // dark shirt or hair still draws a silhouette instead of vanishing.
    out[i] = a * (floor + (1 - floor) * (0.2126 * r + 0.7152 * g + 0.0722 * b));
  }
  return out;
}

// Contrast/gamma shaping plus an optional soft elliptical vignette, so the
// subject dissolves into the blue instead of ending at a hard rectangle.
export function shape(luma, cols, rows, { contrast = 1.35, gamma = 0.9, lift = 0, vignette = 0, fadeBottom = 0 } = {}) {
  const out = new Float32Array(luma.length);
  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      const i = y * cols + x;
      if (luma[i] === 0) {
        out[i] = 0;
        continue;
      }
      let v = (luma[i] - 0.5) * contrast + 0.5 + lift;
      v = Math.min(1, Math.max(0, v)) ** gamma;
      if (vignette) {
        const dx = (x / cols - 0.5) * 2;
        const dy = (y / rows - 0.42) * 2;
        const d = Math.sqrt(dx * dx * 1.1 + dy * dy * 0.75);
        const m = 1 - Math.min(1, Math.max(0, (d - (1 - vignette)) / vignette));
        v *= m * m * (3 - 2 * m);
      }
      if (fadeBottom) {
        const f = Math.min(1, Math.max(0, (1 - y / rows) / fadeBottom));
        v *= f;
      }
      out[i] = v;
    }
  }
  return out;
}

// Unsharp mask on the luma grid: crisper eyes and edges once it goes 1-bit.
export function sharpen(values, cols, rows, amount = 0.9) {
  const out = new Float32Array(values.length);
  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      const i = y * cols + x;
      let sum = 0;
      let n = 0;
      for (let dy = -1; dy <= 1; dy += 1) {
        for (let dx = -1; dx <= 1; dx += 1) {
          const xx = x + dx;
          const yy = y + dy;
          if (xx < 0 || yy < 0 || xx >= cols || yy >= rows) continue;
          sum += values[yy * cols + xx];
          n += 1;
        }
      }
      out[i] = values[i] + amount * (values[i] - sum / n);
    }
  }
  return out;
}

export function floydSteinberg(values, cols, rows) {
  const buf = Float32Array.from(values);
  const bits = new Uint8Array(cols * rows);
  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      const i = y * cols + x;
      const old = buf[i];
      const bit = old > 0.5 ? 1 : 0;
      bits[i] = bit;
      const err = old - bit;
      if (x + 1 < cols) buf[i + 1] += (err * 7) / 16;
      if (y + 1 < rows) {
        if (x > 0) buf[i + cols - 1] += (err * 3) / 16;
        buf[i + cols] += (err * 5) / 16;
        if (x + 1 < cols) buf[i + cols + 1] += err / 16;
      }
    }
  }
  return bits;
}

// Atkinson (the original Mac) dither: only 6/8 of the error is passed on,
// so highlights and shadows stay clean and faces keep their edges at low res.
export function atkinson(values, cols, rows) {
  const buf = Float32Array.from(values);
  const bits = new Uint8Array(cols * rows);
  const spread = [
    [1, 0], [2, 0], [-1, 1], [0, 1], [1, 1], [0, 2],
  ];
  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      const i = y * cols + x;
      const bit = buf[i] > 0.5 ? 1 : 0;
      bits[i] = bit;
      const err = (buf[i] - bit) / 8;
      for (const [dx, dy] of spread) {
        const xx = x + dx;
        const yy = y + dy;
        if (xx >= 0 && xx < cols && yy < rows) buf[yy * cols + xx] += err;
      }
    }
  }
  return bits;
}

// Cheap deterministic hash so a given (cell, step) always rolls the same
// noise: the static holds still between sampling steps instead of boiling.
export function hash(a, b) {
  let h = Math.imul(a ^ 0x9e3779b9, 0x85ebca6b) ^ Math.imul(b + 0x632be5ab, 0xc2b2ae35);
  h ^= h >>> 15;
  h = Math.imul(h, 0x2c1b3c6d);
  h ^= h >>> 12;
  return (h >>> 0) / 4294967296;
}
