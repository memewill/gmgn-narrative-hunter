// Port of fetch_gmgn_data from grokapi_test_副本0109.py

const DEVICE_ID = 'f98a5d76-93a0-47e5-bc73-e7752d12af2e';
const CLIENT_ID = 'gmgn_web_20260107';

// Token lookup map: symbol -> { address, chain, ... }
let tokenLookup = {};

async function fetchGmgnRank(chain, timeframe) {
  const url = `https://gmgn.ai/api/v1/rank/${chain}/swaps/${timeframe}?device_id=${DEVICE_ID}&client_id=${CLIENT_ID}`;

  console.log(`  [GMGN] Fetching ${chain.toUpperCase()} ${timeframe}...`);

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        'Accept': 'application/json',
      },
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      return `Error: HTTP ${response.status} for ${chain} ${timeframe}`;
    }

    const data = await response.json();

    if (data.code === 0 && data.data?.rank) {
      const tokens = data.data.rank;
      const now = Date.now() / 1000;
      const lines = [];

      for (let i = 0; i < Math.min(tokens.length, 100); i++) {
        const t = tokens[i];
        try {
          const symbol = t.symbol || 'N/A';
          const name = t.name || 'N/A';
          const address = t.address || '';
          const volume = t.volume || 0;
          const marketCap = t.market_cap || 0;
          const priceChange = t[`price_change_percent${timeframe}`] || 0;
          const holderCount = t.holder_count || 0;
          const openTimestamp = t.open_timestamp || 0;
          const isNew = openTimestamp > (now - 86400);

          // Store in lookup map (keyed by uppercase symbol + chain for uniqueness)
          const logo = t.logo || '';

          // Store in lookup map (keyed by uppercase symbol + chain for uniqueness)
          const key = `${symbol.toUpperCase()}_${chain}`;
          if (!tokenLookup[key]) {
            tokenLookup[key] = {
              symbol,
              name,
              address,
              chain,
              volume,
              market_cap: marketCap,
              price_change: priceChange,
              logo,
            };
          }
          // Also store by just symbol (first seen wins)
          const symKey = symbol.toUpperCase();
          if (!tokenLookup[symKey]) {
            tokenLookup[symKey] = tokenLookup[key];
          }

          let line = `${i + 1}. $${symbol} (${name}) | Vol: $${Number(volume).toLocaleString('en-US', { maximumFractionDigits: 0 })} | Chg(${timeframe}): ${priceChange}% | Holders: ${holderCount}`;
          if (isNew) line += ' | [NEW_LAUNCH]';
          lines.push(line);
        } catch {
          continue;
        }
      }

      return lines.join('\n');
    }

    return `Error: Invalid API response structure for ${chain} ${timeframe}`;
  } catch (err) {
    return `Error fetching ${chain} ${timeframe}: ${err.message}`;
  }
}

export async function fetchAllGmgnData() {
  // Reset lookup for fresh fetch
  tokenLookup = {};

  // Fetch all 4 data sources in parallel
  const [sol1h, sol6h, bsc1h, bsc6h] = await Promise.all([
    fetchGmgnRank('sol', '1h'),
    fetchGmgnRank('sol', '6h'),
    fetchGmgnRank('bsc', '1h'),
    fetchGmgnRank('bsc', '6h'),
  ]);

  const textContext = (
    '\n\n=== REAL-TIME ON-CHAIN DATA (GMGN API) ===\n' +
    `--- SOLANA 1H HOT LIST ---\n${sol1h}\n\n` +
    `--- SOLANA 6H HOT LIST ---\n${sol6h}\n\n` +
    `--- BSC 1H HOT LIST ---\n${bsc1h}\n\n` +
    `--- BSC 6H HOT LIST ---\n${bsc6h}\n\n` +
    '==========================================\n'
  );

  return { textContext, tokenLookup: { ...tokenLookup } };
}
