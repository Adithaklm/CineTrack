export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  const token = process.env.TMDB_READ_ACCESS_TOKEN;
  if (!token) return res.status(503).json({ error: 'TMDB is not configured yet. Add TMDB_READ_ACCESS_TOKEN in Vercel project environment variables.' });
  const { action, query, type, id, season_number } = req.query;
  const headers = { Authorization: 'Bearer ' + token, accept: 'application/json' };
  try {
    let url;
    if (action === 'search') {
      if (!query || !query.trim()) return res.status(400).json({ error: 'Enter a title to search.' });
      url = 'https://api.themoviedb.org/3/search/multi?query=' + encodeURIComponent(query) + '&include_adult=false&language=en-US&page=1';
    } else if (action === 'details') {
      if (!id || !['movie','tv'].includes(type)) return res.status(400).json({ error: 'A valid title type and ID are required.' });
      url = 'https://api.themoviedb.org/3/' + type + '/' + encodeURIComponent(id) + '?language=en-US&append_to_response=credits,videos';
    } else if (action === 'season') { if (!id || type !== 'tv' || !season_number) return res.status(400).json({ error: 'A valid TV ID and season number are required.' }); url = 'https://api.themoviedb.org/3/tv/' + encodeURIComponent(id) + '/season/' + encodeURIComponent(season_number) + '?language=en-US'; } else return res.status(400).json({ error: 'Unknown TMDB action.' });
    const response = await fetch(url, { headers });
    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: data.status_message || 'TMDB request failed.' });
    if (action === 'search') data.results = (data.results || []).filter(x => ['movie','tv'].includes(x.media_type));
    return res.status(200).json(data);
  } catch (error) {
    return res.status(502).json({ error: 'Unable to reach TMDB. Please try again.' });
  }
}