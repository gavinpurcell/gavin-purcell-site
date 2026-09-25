import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { atkinson, hash, loadImage, sampleLuma, shape } from './dither';

// Pre-cut with macOS Vision and pre-graded with a wide unsharp mask (local
// contrast), which is what makes the eyes survive 1-bit at ~190 cells wide.
const PORTRAIT = '/gavin-portrait-dither.webp';
const PORTRAIT_RATIO = 490 / 443; // h / w of the cropped cutout
const STEPS = 48;
const SAMPLE_MS = 2600;
const WHITE = 0xffffffff;

// The hero is a tiny diffusion sampler. It opens on pure static and walks
// 48 steps, coarse to fine, down to a 1-bit portrait. The cursor paints
// entropy back in; scrolling away dissolves the whole thing back to noise.
export default function DiffusionHero() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const captionRef = useRef(null);
  const rangeRef = useRef(null);
  const hintRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const caption = captionRef.current;
    const range = rangeRef.current;
    const hint = hintRef.current;
    let manualStep = null; // set once someone grabs the scrubber
    if (!section || !canvas) return undefined;

    const ctx = canvas.getContext('2d');
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;

    let grid = null; // { cols, rows, cell, target, local, image, u32, off, offCtx }
    let portrait = null;
    let start = 0;
    let raf = 0;
    let scrollNoise = 0;
    let lastPoint = null;
    let frame = 0;

    const setCaption = (text) => {
      if (caption && caption.textContent !== text) caption.textContent = text;
    };

    function build() {
      const W = section.clientWidth;
      const H = section.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cell = Math.max(3, Math.round(W / 330));
      const cols = Math.ceil(W / cell);
      const rows = Math.ceil(H / cell);

      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;

      const off = document.createElement('canvas');
      off.width = cols;
      off.height = rows;
      const offCtx = off.getContext('2d');
      const image = offCtx.createImageData(cols, rows);
      const target = new Uint8Array(cols * rows);

      if (portrait) {
        // Desktop: tall portrait on the right, cropped by the bottom edge.
        // Phones: across the top, under the nav.
        let bw;
        let bh;
        let bx;
        let by;
        if (W >= 900) {
          bh = H * 0.9;
          bw = bh / PORTRAIT_RATIO;
          bx = W - bw - W * 0.03;
          by = H - bh;
        } else {
          bw = W * 1.05;
          bh = Math.min(bw * PORTRAIT_RATIO, H * 0.62);
          bx = (W - bw) / 2;
          by = 40;
        }
        const pc = Math.round(bw / cell);
        const pr = Math.round(bh / cell);
        const ox = Math.round(bx / cell);
        const oy = Math.round(by / cell);
        const luma = sampleLuma(portrait, pc, pr, { focusY: 0.3, floor: 0.1 });
        const toned = shape(luma, pc, pr, { contrast: 1.0, gamma: 1.2, lift: 0, fadeBottom: 0.16 });
        const bits = atkinson(toned, pc, pr);
        for (let y = 0; y < pr; y += 1) {
          const ty = oy + y;
          if (ty < 0 || ty >= rows) continue;
          for (let x = 0; x < pc; x += 1) {
            const tx = ox + x;
            if (tx < 0 || tx >= cols) continue;
            target[ty * cols + tx] = bits[y * pc + x];
          }
        }
      }

      grid = {
        cols,
        rows,
        cell,
        dpr,
        target,
        local: new Float32Array(cols * rows),
        localActive: false,
        image,
        u32: new Uint32Array(image.data.buffer),
        off,
        offCtx,
      };
    }

    function render(step, globalNoise, seed) {
      const { cols, rows, target, local, u32 } = grid;
      const block = globalNoise > 0 ? Math.max(1, Math.round(1 + globalNoise ** 1.5 * 9)) : 1;
      let anyLocal = false;
      for (let y = 0; y < rows; y += 1) {
        const by = y - (y % block);
        for (let x = 0; x < cols; x += 1) {
          const i = y * cols + x;
          const bi = by * cols + (x - (x % block));
          let bit;
          if (globalNoise > 0 && hash(bi, seed) < globalNoise) {
            bit = hash(bi, seed + 7919) < 0.5;
          } else {
            bit = target[bi] === 1;
          }
          const l = local[i];
          if (l > 0.02) {
            anyLocal = true;
            // chunky 2x2 grains, reshuffled every few frames, healing slowly
            const gi = (y - (y % 2)) * cols + (x - (x % 2));
            const tick = frame >> 2;
            if (hash(gi, tick * 31 + 3) < l) bit = hash(gi, tick * 17 + 11) < 0.5;
            local[i] = l * 0.955;
          } else if (l !== 0) {
            local[i] = 0;
          }
          u32[i] = bit ? WHITE : 0;
        }
      }
      grid.localActive = anyLocal;
      grid.offCtx.putImageData(grid.image, 0, 0);
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(grid.off, 0, 0, cols * grid.cell * grid.dpr, rows * grid.cell * grid.dpr);
      return step;
    }

    function tick(now) {
      raf = 0;
      if (!grid) return;
      frame += 1;
      const elapsed = now - start;
      const progress = still ? 1 : Math.min(1, Math.max(0, (elapsed - 200) / SAMPLE_MS));
      const autoStep = Math.floor(STEPS * progress ** 0.85);
      const autoSampling = manualStep === null && autoStep < STEPS;
      const step = manualStep ?? autoStep;
      const sampling = step < STEPS;
      const sampleNoise = sampling ? (1 - step / STEPS) ** 1.3 : 0;
      const noise = Math.max(sampleNoise, scrollNoise);
      const seed = sampling && sampleNoise >= scrollNoise ? step + 1 : 1000 + Math.round(scrollNoise * 40);
      render(step, noise, seed);

      if (step >= STEPS * 0.55 || manualStep !== null) section.dataset.resolved = 'true';
      setCaption(`Step ${step} of ${STEPS}`);
      if (range && manualStep === null) range.value = String(step);
      if (autoSampling || grid.localActive) raf = requestAnimationFrame(tick);
    }

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    function stir(clientX, clientY, strength = 0.95) {
      if (!grid || still) return;
      const rect = section.getBoundingClientRect();
      const px = clientX - rect.left;
      const py = clientY - rect.top;
      const radius = Math.max(56, rect.width * 0.06);
      const from = lastPoint || { x: px, y: py };
      const dist = Math.hypot(px - from.x, py - from.y);
      const stepsAlong = Math.max(1, Math.ceil(dist / (radius / 2)));
      const { cols, rows, cell, local } = grid;
      const rc = radius / cell;
      for (let s = 1; s <= stepsAlong; s += 1) {
        const cx = (from.x + ((px - from.x) * s) / stepsAlong) / cell;
        const cy = (from.y + ((py - from.y) * s) / stepsAlong) / cell;
        const x0 = Math.max(0, Math.floor(cx - rc));
        const x1 = Math.min(cols - 1, Math.ceil(cx + rc));
        const y0 = Math.max(0, Math.floor(cy - rc));
        const y1 = Math.min(rows - 1, Math.ceil(cy + rc));
        for (let y = y0; y <= y1; y += 1) {
          for (let x = x0; x <= x1; x += 1) {
            const d = Math.hypot(x - cx, y - cy) / rc;
            if (d >= 1) continue;
            const f = (1 - d * d) * strength;
            const i = y * cols + x;
            if (local[i] < f) local[i] = f;
          }
        }
      }
      lastPoint = { x: px, y: py };
      grid.localActive = true;
      kick();
    }

    const onMove = (e) => stir(e.clientX, e.clientY);
    const onLeave = () => {
      lastPoint = null;
    };
    const onDown = (e) => {
      lastPoint = null;
      stir(e.clientX, e.clientY, 1);
    };

    const onScrub = () => {
      manualStep = Number(range.value);
      kick();
    };

    const onScroll = () => {
      const h = section.clientHeight || 1;
      const t = Math.min(1, Math.max(0, window.scrollY / (h * 0.85)));
      const next = still ? 0 : Math.round(t ** 1.4 * 40) / 40;
      if (next !== scrollNoise) {
        scrollNoise = next;
        kick();
      }
    };

    let resizeTimer = 0;
    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        build();
        kick();
      }, 120);
    });

    let cancelled = false;
    build();
    start = performance.now();
    kick();
    loadImage(PORTRAIT)
      .then((img) => {
        if (cancelled) return;
        portrait = img;
        build();
        kick();
      })
      .catch(() => {});

    ro.observe(section);
    section.addEventListener('pointermove', onMove);
    section.addEventListener('pointerleave', onLeave);
    section.addEventListener('pointerdown', onDown);
    window.addEventListener('scroll', onScroll, { passive: true });
    range?.addEventListener('input', onScrub);
    if (hint) {
      hint.textContent = still
        ? 'Drag back to see the static it started as.'
        : `Drag back to see the static. ${coarsePointer ? 'Drag across' : 'Move your cursor through'} the portrait to add noise.`;
    }

    return () => {
      range?.removeEventListener('input', onScrub);
      cancelled = true;
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      ro.disconnect();
      section.removeEventListener('pointermove', onMove);
      section.removeEventListener('pointerleave', onLeave);
      section.removeEventListener('pointerdown', onDown);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <section className="hero" ref={sectionRef}>
      <canvas
        ref={canvasRef}
        className="hero-canvas"
        role="img"
        aria-label="Portrait of Gavin Purcell, drawn in dithered pixels that resolve out of static"
      />
      <div className="hero-content">
        <h1 className="hero-name">
          <span>Gavin</span> <span>Purcell</span>
        </h1>
        <p className="hero-statement">
          Emmy-winning showrunner turned creative technologist. I help media and entertainment
          teams actually ship with AI.
        </p>
        <div className="hero-actions">
          <a href="#consulting" className="btn btn-invert">Work with me</a>
          <Link to="/work" className="btn btn-ghost">See the work</Link>
        </div>
      </div>
      <div className="sampler">
        <label htmlFor="sampler-step" className="sampler-label">
          <span>Denoising</span>
          <span ref={captionRef}>Step 0 of {STEPS}</span>
        </label>
        <input
          ref={rangeRef}
          id="sampler-step"
          className="sampler-range"
          type="range"
          min="0"
          max={STEPS}
          step="1"
          defaultValue="0"
        />
        <p className="sampler-hint" ref={hintRef}>Drag back to see the static it started as.</p>
      </div>
    </section>
  );
}
