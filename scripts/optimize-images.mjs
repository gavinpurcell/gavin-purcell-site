// One-shot image optimizer: converts public/ images over 300KB to WebP
// (max 1600px wide, q80) and emits a 1200x630 JPEG OG image from gavin-photo.png.
// Originals are left on disk; delete them once references are migrated.
import { readdirSync, statSync } from 'node:fs';
import { join, extname, basename } from 'node:path';
import sharp from 'sharp';

const PUBLIC = new URL('../public', import.meta.url).pathname;
const THRESHOLD = 300 * 1024;

const rows = [];

for (const file of readdirSync(PUBLIC)) {
  const ext = extname(file).toLowerCase();
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue;
  const path = join(PUBLIC, file);
  const size = statSync(path).size;
  if (size < THRESHOLD) continue;

  const out = join(PUBLIC, `${basename(file, ext)}.webp`);
  await sharp(path)
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(out);
  rows.push({
    file,
    before: `${(size / 1024 / 1024).toFixed(2)}MB`,
    after: `${(statSync(out).size / 1024).toFixed(0)}KB`,
  });
}

// OG image: platforms want JPEG/PNG at 1200x630
await sharp(join(PUBLIC, 'gavin-photo.png'))
  .resize(1200, 630, { fit: 'cover', position: 'top' })
  .jpeg({ quality: 85 })
  .toFile(join(PUBLIC, 'gavin-photo-og.jpg'));
rows.push({
  file: 'gavin-photo.png → gavin-photo-og.jpg',
  before: '',
  after: `${(statSync(join(PUBLIC, 'gavin-photo-og.jpg')).size / 1024).toFixed(0)}KB`,
});

console.table(rows);
