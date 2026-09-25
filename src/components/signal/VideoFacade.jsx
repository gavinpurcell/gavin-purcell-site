import { useEffect, useRef, useState } from 'react';
import { atkinson, loadImage, sampleLuma, shape } from './dither';

const CELL = 5;

// The latest episode sits on the page as a 1-bit print of its thumbnail.
// Hover resolves it to color; click swaps in the real player. YouTube's
// iframe (and its half-megabyte of script) only loads when someone asks.
export default function VideoFacade({ videoId, title }) {
  const boxRef = useRef(null);
  const canvasRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const thumb = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

  useEffect(() => {
    if (playing) return undefined;
    let cancelled = false;
    const box = boxRef.current;
    const canvas = canvasRef.current;
    if (!box || !canvas) return undefined;

    const draw = async () => {
      try {
        const img = await loadImage(thumb);
        if (cancelled) return;
        const cols = Math.max(80, Math.round(box.clientWidth / CELL));
        const rows = Math.round((cols * 9) / 16);
        const luma = sampleLuma(img, cols, rows);
        const bits = atkinson(shape(luma, cols, rows, { contrast: 1.25, gamma: 1.1 }), cols, rows);
        canvas.width = cols;
        canvas.height = rows;
        const ctx = canvas.getContext('2d');
        const image = ctx.createImageData(cols, rows);
        const u32 = new Uint32Array(image.data.buffer);
        for (let i = 0; i < bits.length; i += 1) u32[i] = bits[i] ? 0xffffffff : 0xffe0331a;
        ctx.putImageData(image, 0, 0);
        box.dataset.ready = 'true';
      } catch {
        // thumbnail blocked: the plain color image underneath still shows
      }
    };
    draw();
    return () => {
      cancelled = true;
    };
  }, [thumb, playing]);

  if (playing) {
    return (
      <div className="aifh-video">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
          title={title ? `AI For Humans: ${title}` : 'Latest AI For Humans episode'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button ref={boxRef} type="button" className="aifh-video video-facade" onClick={() => setPlaying(true)}>
      <img src={thumb} alt="" loading="lazy" />
      <canvas ref={canvasRef} aria-hidden="true" />
      <span className="facade-play">
        <span className="facade-icon" aria-hidden="true" />
        <span>Play the latest episode</span>
      </span>
    </button>
  );
}
