# Narrative Hunter

AI-powered memecoin narrative aggregation for GMGN App. Automatically analyzes on-chain data and social trends to identify the hottest 5 narrative themes every hour.

## Features

- AI narrative analysis (Grok + GMGN on-chain data)
- Real-time token data with GMGN contract address links
- Related tweet timeline for each narrative
- Multi-language support (Simplified Chinese, Traditional Chinese, English)
- Auto-refresh every hour + manual refresh
- Mobile-first responsive design

## Quick Start

```bash
# Install dependencies
npm install

# Copy env and add your Grok API key
cp .env.example .env
# Edit .env and set GROK_API_KEY

# Start backend (port 3001)
npm run server

# Start frontend (port 5173, proxies /api to backend)
npm run dev
```

Open http://localhost:5173 to view the app.

## Static Demo (No Backend)

The frontend works without the backend — it falls back to mock data automatically.

```bash
npm install
npm run dev
```

## Build & Deploy

```bash
npm run build    # Outputs to dist/
```

GitHub Pages deployment is configured via `.github/workflows/deploy.yml`. Push to `main` to trigger automatic deployment.

## Project Structure

```
server/
  index.js          # Express server + hourly cron
  gmgnFetcher.js    # GMGN API data fetcher + token index
  grokClient.js     # Grok API 3-round conversation
src/
  App.jsx           # Main app with routing
  components/
    Header.jsx      # Navigation + tabs
    NarrativeCard.jsx   # List page card
    NarrativeDetail.jsx # Detail page
    TweetEmbed.jsx      # Tweet content card
  hooks/
    useNarratives.js    # API polling hook
  data/
    mockNarratives.js   # Fallback demo data
  utils/
    tokenUrl.js         # GMGN token link builder
```

## API Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/api/narratives` | Latest narrative data |
| GET | `/api/status` | Pipeline status |
| POST | `/api/refresh` | Force refresh |

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `GROK_API_KEY` | Grok API key from x.ai | (required) |
| `GROK_MODEL` | Grok model name | `grok-4-1-fast` |
