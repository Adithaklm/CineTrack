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


## Android APK

CineTrack can be packaged as an Android app with Capacitor. GitHub Actions builds a debug APK automatically when the Android app source/configuration changes, or when you manually run the **Build CineTrack Android APK** workflow.

### Configure the TMDB API endpoint for the APK

The Android app bundles the interface, while TMDB requests are sent to the Vercel serverless API so the secret TMDB token stays server-side.

In GitHub, open **Settings → Secrets and variables → Actions → Variables → New repository variable** and add:

- Name: `CINETRACK_API_URL`
- Value: your deployed Vercel project URL, for example `https://your-project.vercel.app` (no trailing slash)

The Vercel project must also have the `TMDB_READ_ACCESS_TOKEN` environment variable configured.

### Download the APK

1. Open the repository's **Actions** tab.
2. Select **Build CineTrack Android APK**.
3. Open the latest successful workflow run.
4. Under **Artifacts**, download `CineTrack-Android-APK`.
5. Extract the ZIP and install `app-debug.apk` on your Android phone. Android may ask you to allow installation from that source.

The APK is an unsigned debug build for personal testing, not a Play Store release.
