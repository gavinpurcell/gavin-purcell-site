import { useEffect, useRef, useState } from 'react';
import { atkinson, hash, loadImage, sampleLuma, shape } from './dither';

const PREVIEW_W = 360;
const CELL = 4;
const REVEAL_STEPS = 14;
const bitsCache = new Map();

async function ditherFor(src, aspect) {
  const key = `${src}:${aspect}`;
  if (!bitsCache.has(key)) {
    const img = await loadImage(src);
    const cols = Math.round(PREVIEW_W / CELL);
    const rows = Math.round(cols * aspect);
    const luma = sampleLuma(img, cols, rows, { floor: 0 });
    // sampleLuma treats alpha as ink; these are opaque so floor 0 is plain luma
    bitsCache.set(key, { cols, rows, bits: atkinson(shape(luma, cols, rows, { contrast: 1.2, gamma: 1.05 }), cols, rows) });
  }
  return bitsCache.get(key);
}

// A preview that trails the cursor. Every image arrives as blue 1-bit static
// and denoises to the real, full-color screenshot.
export default function DitherPreview({ item, point }) {
  const boxRef = useRef(null);
  const canvasRef = useRef(null);
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  // Which item has finished denoising; set only from the reveal timer.
  const [revealedId, setRevealedId] = useState(null);
  const revealed = item && revealedId === item.id;
  const aspect = item?.aspect ?? (item?.image.endsWith('.png') ? 1 : 0.5625);

  // follow the cursor with a little lag
  useEffect(() => {
    pos.current.tx = point.x;
    pos.current.ty = point.y;
  }, [point]);

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      const p = pos.current;
      p.x += (p.tx - p.x) * 0.18;
      p.y += (p.ty - p.y) * 0.18;
      if (boxRef.current) boxRef.current.style.transform = `translate3d(${p.x + 24}px, ${p.y - 28}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    pos.current.x = pos.current.tx;
    pos.current.y = pos.current.ty;
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!item) return undefined;
    let cancelled = false;
    let timer = 0;
    ditherFor(item.image, aspect).then(({ cols, rows, bits }) => {
      if (cancelled || !canvasRef.current) return;
      const canvas = canvasRef.current;
      canvas.width = cols;
      canvas.height = rows;
      const ctx = canvas.getContext('2d');
      const image = ctx.createImageData(cols, rows);
      const u32 = new Uint32Array(image.data.buffer);
      let step = 0;
      const draw = () => {
        const noise = 1 - step / REVEAL_STEPS;
        const block = Math.max(1, Math.round(1 + noise * 5));
        for (let y = 0; y < rows; y += 1) {
          for (let x = 0; x < cols; x += 1) {
            const bi = (y - (y % block)) * cols + (x - (x % block));
            const bit = hash(bi, step + 1) < noise ? hash(bi, step + 99) < 0.5 : bits[bi] === 1;
            u32[y * cols + x] = bit ? 0xffffffff : 0xffe0331a; // white or ink (ABGR)
          }
        }
        ctx.putImageData(image, 0, 0);
        step += 1;
        if (step <= REVEAL_STEPS) timer = window.setTimeout(draw, 30);
        else timer = window.setTimeout(() => !cancelled && setRevealedId(item.id), 260);
      };
      draw();
    });
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [item, aspect]);

  return (
    <div ref={boxRef} className={`work-preview ${item ? 'is-on' : ''}`} aria-hidden="true">
      {item && (
        <div className="work-preview-frame" style={{ aspectRatio: `1 / ${aspect}` }}>
          <img src={item.image} alt="" />
          <canvas ref={canvasRef} className={revealed ? 'is-gone' : ''} />
        </div>
      )}
    </div>
  );
}
