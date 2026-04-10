import { config } from 'dotenv';
import express from 'express';
import cron from 'node-cron';
import { fetchAllGmgnData } from './gmgnFetcher.js';
import { runNarrativeAnalysis } from './grokClient.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';

// Load .env from project root
config({ path: new URL('../.env', import.meta.url).pathname });
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = 3001;

// In-memory store for latest narrative data
let latestNarratives = {
  updated_at: null,
  status: 'initializing',
  ai_narrative_hunter: [],
};
let isRunning = false;

// Load system prompt
const PROMPT_PATH = join(__dirname, 'system_prompt.md');
let systemPrompt;
try {
  systemPrompt = readFileSync(PROMPT_PATH, 'utf-8');
  console.log('[Init] System prompt loaded');
} catch (e) {
  console.error('[Init] Failed to load system prompt:', e.message);
  process.exit(1);
}

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// API: get latest narratives
app.get('/api/narratives', (req, res) => {
  res.json(latestNarratives);
});

// API: get status
app.get('/api/status', (req, res) => {
  res.json({
    status: latestNarratives.status,
    updated_at: latestNarratives.updated_at,
    narrative_count: latestNarratives.ai_narrative_hunter.length,
    is_running: isRunning,
  });
});

// API: force refresh
app.post('/api/refresh', async (req, res) => {
  if (isRunning) {
    return res.json({ message: 'Already running, please wait.' });
  }
  res.json({ message: 'Refresh triggered.' });
  runPipeline();
});

// Main pipeline: fetch GMGN data → Grok analysis → update store
async function runPipeline() {
  if (isRunning) {
    console.log('[Pipeline] Already running, skipping.');
    return;
  }

  isRunning = true;
  latestNarratives.status = 'fetching';
  const startTime = Date.now();

  try {
    // Step 1: Fetch GMGN on-chain data
    console.log('\n[Pipeline] === Starting data fetch ===');
    const { textContext, tokenLookup } = await fetchAllGmgnData();
    console.log(`[Pipeline] GMGN data fetched (${Object.keys(tokenLookup).length} tokens indexed)`);

    // Step 2: Run 3-round Grok analysis
    console.log('[Pipeline] === Starting Grok analysis ===');
    latestNarratives.status = 'analyzing';
    const result = await runNarrativeAnalysis(systemPrompt, textContext, tokenLookup);

    if (result && result.ai_narrative_hunter) {
      latestNarratives = {
        updated_at: new Date().toISOString(),
        status: 'ready',
        ai_narrative_hunter: result.ai_narrative_hunter,
      };
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      console.log(`[Pipeline] === Complete in ${elapsed}s, ${result.ai_narrative_hunter.length} narratives ===\n`);
    } else {
      console.error('[Pipeline] Grok returned invalid result');
      latestNarratives.status = 'error';
    }
  } catch (err) {
    console.error('[Pipeline] Error:', err.message);
    latestNarratives.status = 'error';
  } finally {
    isRunning = false;
  }
}

// Schedule: every hour
cron.schedule('0 * * * *', () => {
  console.log(`[Cron] Triggering pipeline at ${new Date().toISOString()}`);
  runPipeline();
});

app.listen(PORT, () => {
  console.log(`[Server] Narrative Hunter backend running on http://localhost:${PORT}`);
  console.log('[Server] Endpoints:');
  console.log('  GET  /api/narratives  - Latest narrative data');
  console.log('  GET  /api/status      - Pipeline status');
  console.log('  POST /api/refresh     - Force refresh');
  console.log('[Server] Auto-refresh every 3 minutes');

  // Run immediately on start
  console.log('[Server] Running initial pipeline...');
  runPipeline();
});
