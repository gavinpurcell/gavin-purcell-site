import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { hash } from './signal/dither';
import './signal/signal.css';

const CELL = 6;

// A page that never finishes denoising: the sampler runs forever and never
// finds an image, because there isn't one at this address.
export default function NotFound() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = canvas.getContext('2d');
    let raf = 0;
    let last = 0;
    let step = 0;

    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const cols = Math.ceil(w / CELL);
      const rows = Math.ceil(h / CELL);
      if (canvas.width !== cols || canvas.height !== rows) {
        canvas.width = cols;
        canvas.height = rows;
      }
      const image = ctx.createImageData(cols, rows);
      const u32 = new Uint32Array(image.data.buffer);
      // the "step" wobbles between coarse and fine but never converges
      const block = 1 + Math.round((Math.sin(step / 9) * 0.5 + 0.5) * 5);
      for (let y = 0; y < rows; y += 1) {
        for (let x = 0; x < cols; x += 1) {
          const bi = (y - (y % block)) * cols + (x - (x % block));
          u32[y * cols + x] = hash(bi, step) < 0.32 ? 0xffffffff : 0xffe0331a;
        }
      }
      ctx.putImageData(image, 0, 0);
    };

    const loop = (now) => {
      if (now - last > 90) {
        last = now;
        step += 1;
        draw();
      }
      raf = requestAnimationFrame(loop);
    };
    draw();
    if (!still) raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <main id="main" className="lost">
      <Helmet>
        <title>Page Not Found | Gavin Purcell</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <canvas ref={canvasRef} className="lost-static" aria-hidden="true" />
      <div className="lost-panel">
        <p className="lost-code">404</p>
        <h1 className="lost-title">This page never finished denoising.</h1>
        <p>There's nothing at this address, just noise. Try one of these instead.</p>
        <div className="lost-actions">
          <Link to="/" className="btn btn-invert">Homepage</Link>
          <Link to="/blog" className="btn btn-ghost">Writing</Link>
        </div>
      </div>
    </main>
  );
}
