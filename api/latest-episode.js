import { latestEpisode } from './_youtube.js';

export default async function handler(req, res) {
  try {
    const { videoId, title } = await latestEpisode();
    // 15 min at the edge, stale for at most an hour while refreshing.
    res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=3600');
    res.status(200).json({ videoId, title });
  } catch (err) {
    res.status(502).json({ error: 'feed unavailable', detail: String(err?.message ?? err) });
  }
}
