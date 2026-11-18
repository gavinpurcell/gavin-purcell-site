import { useEffect, useRef } from 'react';
import { ign, loadImage } from './dither';

const FPS = 12; // on twos, roughly: it should feel printed, not streamed
const INK = [0x1a, 0x33, 0xe0];

// A picture in the site's two inks. Give it a video loop and it redraws every
// frame as blue-and-white dither; give it a still and it prints that once.
// When `active` (the parent's hover or focus) it develops into full colour,
// cell by cell, and on touch screens it does the same whenever it sits in the
// middle of the viewport. The real <video>/<img> is always underneath, so
// the page still works with no canvas at all.
export default function DitherPlate({ video, poster, image, alt = '', active = false, gamma = 0.85, aspect = '16 / 9', focusY = 0.5 }) {
  const frameRef = useRef(null);
  const canvasRef = useRef(null);
  const mediaRef = useRef(null);
  const wantRef = useRef(false);
  const kickRef = useRef(() => {});

  useEffect(() => {
    wantRef.current = active;
    kickRef.current();
  }, [active]);

  useEffect(() => {
    const frame = frameRef.current;
    const canvas = canvasRef.current;
    const media = mediaRef.current;
    if (!frame || !canvas || !media) return undefined;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const touch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    const isVideo = media.tagName === 'VIDEO';

    let cols = 0;
    let rows = 0;
    let screen = null; // dither threshold per cell
    let order = null; // when each cell turns to colour, 0..1
    let lo = 0.05; // running black and white points, so dark footage still prints
    let hi = 0.9;
    let colour = 0;
    let last = 0;
    let raf = 0;
    let visible = false;
    let centred = false;
    let dirty = true;
    let posterImg = null;
    let cancelled = false;

    function size() {
      const w = frame.clientWidth;
      const h = frame.clientHeight;
      if (!w || !h) return;
      const cell = w > 900 ? 4 : 3;
      cols = Math.max(8, Math.round(w / cell));
      rows = Math.max(8, Math.round(h / cell));
      canvas.width = cols;
      canvas.height = rows;
      screen = new Float32Array(cols * rows);
      order = new Float32Array(cols * rows);
      for (let y = 0; y < rows; y += 1) {
        for (let x = 0; x < cols; x += 1) {
          screen[y * cols + x] = ign(x, y);
          // colour arrives in 3x3 clumps: grain, not fizz
          const h2 = Math.sin(Math.floor(x / 3) * 127.1 + Math.floor(y / 3) * 311.7) * 43758.5453;
          order[y * cols + x] = h2 - Math.floor(h2);
        }
      }
      dirty = true;
    }

    function source() {
      if (isVideo) {
        if (media.readyState >= 2) return [media, media.videoWidth, media.videoHeight];
        if (posterImg) return [posterImg, posterImg.naturalWidth, posterImg.naturalHeight];
        return null;
      }
      return media.complete && media.naturalWidth ? [media, media.naturalWidth, media.naturalHeight] : null;
    }

    function paint() {
      const src = source();
      if (!src || !screen) return false;
      const [el, sw, sh] = src;
      // cover-fit the source into the grid
      const ratio = cols / rows;
      let w = sw;
      let h = sh;
      let x = 0;
      let y = 0;
      if (sw / sh > ratio) {
        w = sh * ratio;
        x = (sw - w) / 2;
      } else {
        h = sw / ratio;
        y = (sh - h) * focusY;
      }
      ctx.drawImage(el, x, y, w, h, 0, 0, cols, rows);
      const img = ctx.getImageData(0, 0, cols, rows);
      const d = img.data;
      const n = cols * rows;

      // Find this frame's 4th and 96th percentile and ease the levels toward
      // them, so a dark game screen and a bright face both use the full range.
      const hist = new Uint32Array(64);
      const luma = new Float32Array(n);
      for (let p = 0, i = 0; p < n; p += 1, i += 4) {
        const l = (0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2]) / 255;
        luma[p] = l;
        hist[Math.min(63, (l * 64) | 0)] += 1;
      }
      let acc = 0;
      let p04 = 0;
      let p96 = 1;
      for (let b = 0, seenLo = false; b < 64; b += 1) {
        acc += hist[b];
        if (!seenLo && acc >= n * 0.04) {
          p04 = b / 64;
          seenLo = true;
        }
        if (acc >= n * 0.96) {
          p96 = (b + 1) / 64;
          break;
        }
      }
      if (p96 - p04 < 0.2) p96 = p04 + 0.2;
      const ease = dirty ? 1 : 0.15;
      lo += (p04 - lo) * ease;
      hi += (p96 - hi) * ease;
      const span = hi - lo;

      for (let p = 0, i = 0; p < n; p += 1, i += 4) {
        d[i + 3] = 255;
        if (order[p] < colour) continue; // already developed: keep the real pixel
        const l = Math.min(1, Math.max(0, (luma[p] - lo) / span)) ** gamma;
        if (l > screen[p]) {
          d[i] = 255;
          d[i + 1] = 255;
          d[i + 2] = 255;
        } else {
          d[i] = INK[0];
          d[i + 1] = INK[1];
          d[i + 2] = INK[2];
        }
      }
      ctx.putImageData(img, 0, 0);
      dirty = false;
      return true;
    }

    function tick(now) {
      raf = 0;
      if (!visible) return;
      const want = wantRef.current || (touch && centred) ? 1 : 0;
      const developing = colour !== want;
      const playing = isVideo && !still && !media.paused && colour < 1;
      if (developing || dirty || (playing && now - last >= 1000 / FPS)) {
        if (developing) colour = want ? Math.min(1, colour + (still ? 1 : 0.07)) : Math.max(0, colour - (still ? 1 : 0.09));
        canvas.classList.toggle('is-clear', colour >= 1);
        if (colour < 1 && paint()) {
          last = now;
          frame.dataset.printed = 'true';
        }
      }
      if (colour !== want || dirty || playing) raf = requestAnimationFrame(tick);
    }

    const kick = () => {
      if (!raf && visible) raf = requestAnimationFrame(tick);
    };
    kickRef.current = kick;

    const near = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (isVideo && !still) {
          if (visible) media.play().catch(() => {});
          else media.pause();
        }
        kick();
      },
      { rootMargin: '300px 0px' }
    );
    near.observe(frame);

    // No hover on a phone: the plate in the middle of the screen develops.
    let middle = null;
    if (touch) {
      middle = new IntersectionObserver(
        ([entry]) => {
          centred = entry.isIntersecting;
          kick();
        },
        { rootMargin: '-45% 0px -45% 0px' }
      );
      middle.observe(frame);
    }

    const ro = new ResizeObserver(() => {
      size();
      kick();
    });
    ro.observe(frame);

    const onReady = () => {
      dirty = true;
      kick();
    };
    media.addEventListener(isVideo ? 'loadeddata' : 'load', onReady);
    media.addEventListener('playing', onReady);
    if (isVideo && poster) {
      loadImage(poster)
        .then((img) => {
          if (cancelled) return;
          posterImg = img;
          onReady();
        })
        .catch(() => {});
    }

    size();
    kick();

    return () => {
      cancelled = true;
      kickRef.current = () => {};
      cancelAnimationFrame(raf);
      near.disconnect();
      middle?.disconnect();
      ro.disconnect();
      media.removeEventListener(isVideo ? 'loadeddata' : 'load', onReady);
      media.removeEventListener('playing', onReady);
    };
  }, [video, image, poster, gamma, focusY]);

  return (
    <div className="plate-frame" ref={frameRef} style={{ aspectRatio: aspect }}>
      {video ? (
        <video ref={mediaRef} src={video} poster={poster} muted loop playsInline preload="none" aria-label={alt} />
      ) : (
        <img ref={mediaRef} src={image} alt={alt} loading="lazy" />
      )}
      <canvas ref={canvasRef} aria-hidden="true" />
    </div>
  );
}
