const CHANNEL_ID = 'UCghJTNTO9kcDeUFXMuSDGLQ'; // AI For Humans (@AIForHumansShow)
const FEED = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

export default async function handler(req, res) {
  try {
    const response = await fetch(FEED);
    if (!response.ok) throw new Error(`feed responded ${response.status}`);
    const xml = await response.text();
    // First <yt:videoId> in the feed is the newest upload
    const match = xml.match(/<yt:videoId>([\w-]+)<\/yt:videoId>/);
    if (!match) throw new Error('no video id in feed');
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    res.status(200).json({ videoId: match[1] });
  } catch {
    res.status(502).json({ error: 'feed unavailable' });
  }
}
