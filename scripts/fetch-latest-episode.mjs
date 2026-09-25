// Runs before `vite build`. Bakes the newest AI For Humans upload into
// src/data/latest-episode.json so the prerendered HTML (and the no-JS fallback)
// is at worst as old as the last deploy, not frozen at whatever ID was hardcoded.
// Never fails the build: on any error the previously committed JSON stays.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const CHANNEL_ID = 'UCghJTNTO9kcDeUFXMuSDGLQ'; // AI For Humans (@AIForHumansShow)
const FEED = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), '../src/data/latest-episode.json');

try {
  const res = await fetch(FEED, { signal: AbortSignal.timeout(10000) });
  if (!res.ok) throw new Error(`feed responded ${res.status}`);
  const xml = await res.text();
  const entry = xml.match(/<entry>[\s\S]*?<\/entry>/)?.[0] ?? '';
  const videoId = entry.match(/<yt:videoId>([\w-]+)<\/yt:videoId>/)?.[1];
  const title = entry.match(/<title>([^<]*)<\/title>/)?.[1] ?? '';
  if (!videoId) throw new Error('no video id in feed');
  const previous = JSON.parse(readFileSync(OUT, 'utf8'));
  if (previous.videoId === videoId) {
    console.log(`[latest-episode] unchanged: ${videoId} (${title})`);
  } else {
    writeFileSync(OUT, JSON.stringify({ videoId, title, fetchedAt: new Date().toISOString() }, null, 2) + '\n');
    console.log(`[latest-episode] updated: ${previous.videoId} -> ${videoId} (${title})`);
  }
} catch (err) {
  console.warn(`[latest-episode] feed fetch failed, keeping committed fallback: ${err.message}`);
}
