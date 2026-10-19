// Shared by api/latest-episode.js (runtime) and scripts/fetch-latest-episode.mjs (build).
// Underscore prefix keeps Vercel from exposing this file as a route.
const CHANNEL_ID = 'UCghJTNTO9kcDeUFXMuSDGLQ'; // AI For Humans (@AIForHumansShow)
const FEED = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
// "UULF" + channel id (minus "UC") is YouTube's long-form-only uploads list: no Shorts.
const LONG_FORM = `https://www.youtube.com/playlist?list=UULF${CHANNEL_ID.slice(2)}`;
const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Safari/537.36',
  'Accept-Language': 'en-US,en;q=0.9',
};

const decodeXml = (s) => s
  .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

async function fromFeed() {
  const res = await fetch(FEED, { headers: HEADERS, signal: AbortSignal.timeout(8000) });
  if (!res.ok) throw new Error(`feed responded ${res.status}`);
  const xml = await res.text();
  // Shorts share the feed but link to /shorts/.
  const entry = (xml.match(/<entry>[\s\S]*?<\/entry>/g) ?? [])
    .find((e) => !e.includes('youtube.com/shorts/'));
  const videoId = entry?.match(/<yt:videoId>([\w-]+)<\/yt:videoId>/)?.[1];
  if (!videoId) throw new Error('no video id in feed');
  return { videoId, title: decodeXml(entry.match(/<title>([^<]*)<\/title>/)?.[1] ?? '') };
}

async function fromPlaylistPage() {
  const res = await fetch(LONG_FORM, { headers: HEADERS, signal: AbortSignal.timeout(8000) });
  if (!res.ok) throw new Error(`playlist page responded ${res.status}`);
  const page = await res.text();
  const m = page.match(/"videoId":"([\w-]{11})"/);
  if (!m) throw new Error('no video id on playlist page');
  const after = page.slice(m.index);
  const t = after.match(/"lockupMetadataViewModel":\{"title":\{"content":("(?:[^"\\]|\\.)*")/)
    ?? after.match(/"title":\{"runs":\[\{"text":("(?:[^"\\]|\\.)*")/);
  return { videoId: m[1], title: t ? JSON.parse(t[1]) : '' };
}

// The RSS feed intermittently 404s/500s for hours at a time, so fall back to the
// long-form playlist page instead of failing.
export async function latestEpisode() {
  const errors = [];
  for (const attempt of [fromFeed, fromFeed, fromPlaylistPage]) {
    try { return await attempt(); } catch (err) { errors.push(err.message); }
  }
  throw new Error(errors.join('; '));
}
