// Runs before `vite build`. Bakes the newest AI For Humans full episode into
// src/data/latest-episode.json so the prerendered HTML (and the no-JS fallback)
// is at worst as old as the last deploy, not frozen at whatever ID was hardcoded.
// Never fails the build: on any error the previously committed JSON stays.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { latestEpisode } from '../api/_youtube.js';

const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), '../src/data/latest-episode.json');

try {
  const { videoId, title } = await latestEpisode();
  const previous = JSON.parse(readFileSync(OUT, 'utf8'));
  if (previous.videoId === videoId) {
    console.log(`[latest-episode] unchanged: ${videoId} (${title})`);
  } else {
    writeFileSync(OUT, JSON.stringify({ videoId, title, fetchedAt: new Date().toISOString() }, null, 2) + '\n');
    console.log(`[latest-episode] updated: ${previous.videoId} -> ${videoId} (${title})`);
  }
} catch (err) {
  console.warn(`[latest-episode] fetch failed, keeping committed fallback: ${err.message}`);
}
