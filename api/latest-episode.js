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
    // 15 min at the edge, stale for at most an hour while refreshing (was 1h / 1 day,
    // which let a new Wednesday episode lag behind for most of the day).
    res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=3600');
    res.status(200).json({ videoId: match[1] });
  } catch {
    res.status(502).json({ error: 'feed unavailable' });
  }
}
