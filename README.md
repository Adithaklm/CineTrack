# CineTrack 🎬

A personal movie and TV-series watch tracker.

## Features
- Dashboard for completed, currently watching and planned titles
- Add movies and series to your library
- Search and filter by watch status
- Track season and episode progress
- Personal ratings and watch statistics
- Responsive dark cinematic interface
- Browser localStorage persistence

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Stack
React, Vite, Lucide icons and CSS. This starter stores data in the current browser. TMDB search, accounts and cloud sync can be added next.

## TMDB integration
CineTrack uses a Vercel serverless function at `/api/tmdb` so the TMDB Read Access Token stays on the server rather than in browser code.

1. Create a TMDB account and request a developer API key at https://www.themoviedb.org/settings/api.
2. Copy the **API Read Access Token** from the API settings page.
3. In Vercel, open Project → Settings → Environment Variables.
4. Add `TMDB_READ_ACCESS_TOKEN` with the token value for Production, Preview and Development as needed.
5. Redeploy the project.

The API proxy supports multi-search and movie/TV details. For local development with the serverless function, use Vercel CLI (`vercel dev`) after setting the environment variable. Never commit your real token or put it in a `VITE_*` variable.
