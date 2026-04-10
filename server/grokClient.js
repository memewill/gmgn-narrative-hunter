// Port of GrokClient and 3-round conversation from grokapi_test_副本0109.py

const API_KEY = process.env.GROK_API_KEY || '';
const MODEL_NAME = process.env.GROK_MODEL || 'grok-4-1-fast';
const BASE_URL = 'https://api.x.ai/v1/chat/completions';

async function grokChat(messages, temperature = 0.5, retries = 3, maxTokens = 4096) {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      console.log(`  [Grok] Sending request (${messages.length} msgs, attempt ${attempt + 1}/${retries})...`);

      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: MODEL_NAME,
          messages,
          stream: false,
          temperature,
          max_tokens: maxTokens,
        }),
        signal: AbortSignal.timeout(90000),
      });

      if ([500, 502, 503, 504].includes(response.status)) {
        const wait = 2 ** (attempt + 1) * 1000;
        console.log(`  [Grok] Transient ${response.status}, retrying in ${wait / 1000}s...`);
        await new Promise(r => setTimeout(r, wait));
        continue;
      }

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`HTTP ${response.status}: ${text.slice(0, 200)}`);
      }

      const data = await response.json();
      if (data.choices?.length > 0) {
        return data.choices[0].message.content;
      }
      return 'Error: No choices in response.';
    } catch (err) {
      if (attempt < retries - 1) {
        console.log(`  [Grok] Error: ${err.message}, retrying...`);
        await new Promise(r => setTimeout(r, 2 ** (attempt + 1) * 1000));
      } else {
        return `Error after ${retries} attempts: ${err.message}`;
      }
    }
  }
  return 'Error: Max retries reached.';
}

function stripMarkdownJson(text) {
  let s = text.trim();
  if (s.startsWith('```json')) s = s.slice(7);
  else if (s.startsWith('```')) s = s.slice(3);
  if (s.endsWith('```')) s = s.slice(0, -3);
  return s.trim();
}

export async function runNarrativeAnalysis(systemPrompt, gmgnDataContext, tokenLookup = {}) {
  const systemReinforcement =
    '\nIMPORTANT: 你必须逐字严格执行所有步骤。数据已在下文中提供，请直接基于提供的 GMGN 真实数据进行分析，严禁编造数据。';
  const systemContent = systemPrompt + systemReinforcement;

  const currentUtcTime = new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC';
  console.log(`  [Grok] Reference time: ${currentUtcTime}`);

  const messages = [{ role: 'system', content: systemContent }];

  // === Round 1: Data Collection & Cross-Validation ===
  console.log('  [Grok] --- Round 1: Data Collection ---');
  const round1 =
    `Found Real-Time Data:\n${gmgnDataContext}\n\n` +
    `当前时间 (Current Time): ${currentUtcTime}。\n` +
    '请以此时间为基准，严格计算过去12小时的窗口 (Since/Until)。\n' +
    '请执行 **第一步 (GMGN核心数据采集)** 和 **第二步 (交叉验证)**。\n' +
    '1. **基于上述提供的【REAL-TIME ON-CHAIN DATA】**，提取 1h/6h 热门代币。\n' +
    '2. 模拟去 DexScreener/Birdeye 验证 (假设验证通过)。\n' +
    '3. 输出通过双重验证的候选代币列表和初步聚类。**请直接输出收集到的数据文本，不要使用 Tool Call。**';

  messages.push({ role: 'user', content: round1 });
  const response1 = await grokChat(messages, 0.5);

  if (response1.includes('Error:') || response1.includes('HTTP Error')) {
    console.error('  [Grok] Round 1 failed:', response1.slice(0, 200));
    return null;
  }
  console.log(`  [Grok] Round 1 complete (${response1.length} chars)`);
  messages.push({ role: 'assistant', content: response1 });

  await new Promise(r => setTimeout(r, 1000));

  // === Round 2: Social Filtering & Final Output ===
  console.log('  [Grok] --- Round 2: Social Filtering ---');
  const round2 =
    '基于第一轮的候选结果，请执行 **第三步 (社区热度筛选)** 和 **第四步 (最终输出)**。\n' +
    '1. 在 X (Twitter) 上验证候选代币的热度。\n' +
    '2. 筛选出综合得分最高的5个热点 (必须包含至少1个BSC热点)。热点和代币均按热度排序。\n' +
    '3. 按指定格式输出最终中文报告。\n' +
    '**重要：请基于分析结果直接生成最终报告文本，绝不要输出 XML 或 Function Call。**';

  messages.push({ role: 'user', content: round2 });
  const response2 = await grokChat(messages, 0.5);

  if (response2.includes('Error:') || response2.includes('HTTP Error')) {
    console.error('  [Grok] Round 2 failed:', response2.slice(0, 200));
    return null;
  }
  console.log(`  [Grok] Round 2 complete (${response2.length} chars)`);
  messages.push({ role: 'assistant', content: response2 });

  await new Promise(r => setTimeout(r, 1000));

  // === Round 3: Translation & JSON Formatting ===
  console.log('  [Grok] --- Round 3: JSON Output ---');
  const round3 =
    '请将第二轮生成的 5 个热点叙事内容进行翻译，并严格按照以下 JSON 格式输出：\n' +
    '1. 翻译语言：繁体中文 (zh_hant) 和 英文 (en)。要求表达准确、流畅、地道。\n' +
    '2. JSON 格式必须严格遵循以下结构（ai_narrative_hunter 数组）：\n' +
    '{\n' +
    '  "ai_narrative_hunter": [\n' +
    '    {\n' +
    '      "order_number": 1,\n' +
    '      "title": "English Title",\n' +
    '      "title_lang": {"zh_hans": "简体标题", "zh_hant": "繁體標題", "en": "English Title"},\n' +
    '      "reason": "English Reason",\n' +
    '      "reason_lang": {"zh_hans": "简体原因", "zh_hant": "繁體原因", "en": "English Reason"},\n' +
    '      "hot_tokens": [{"name": "TICKER"}, {"name": "TICKER2"}],\n' +
    '      "source": [\n' +
    '        {\n' +
    '          "username": "handle1",\n' +
    '          "display_name": "Display Name",\n' +
    '          "tweet_text": "这条推文的完整原文内容...",\n' +
    '          "tweet_url": "https://x.com/handle1/status/123456789",\n' +
    '          "tweet_time": "2h ago",\n' +
    '          "likes": 1200,\n' +
    '          "retweets": 350\n' +
    '        }\n' +
    '      ]\n' +
    '    }\n' +
    '  ]\n' +
    '}\n' +
    '3. 注意事项：\n' +
    '   - **仅输出 JSON 字符串，不要包含任何 markdown 标记或额外解释**。\n' +
    '   - hot_tokens 中的 name **不带 $ 符号**。\n' +
    '   - source 中的 username **不带 @ 符号**，且必须是真实的推特用户名（Handle）。\n' +
    '   - **source 是该叙事相关的真实推文列表（最重要的字段）**：\n' +
    '     - tweet_text：推文的原文内容（保留原始语言，不翻译，完整复制推文正文）。这是最关键的字段。\n' +
    '     - display_name：该用户的 X 显示名称。\n' +
    '     - tweet_url：推文链接（格式 https://x.com/用户名/status/推文ID），尽力提供，无法确认则设为空字符串。\n' +
    '     - tweet_time：推文发布的相对时间（如 "2h ago", "30m ago"）。\n' +
    '     - likes / retweets：互动数据（整数）。\n' +
    '   - 每个热点提供 5-8 条相关推文，按互动量降序排列。\n' +
    '   - 确保 JSON 语法正确，不要遗漏逗号或括号。';

  messages.push({ role: 'user', content: round3 });
  const response3 = await grokChat(messages, 0.3, 3, 8192);

  console.log(`  [Grok] Round 3 complete (${response3.length} chars)`);

  // Parse JSON result
  try {
    const jsonStr = stripMarkdownJson(response3);
    const parsed = JSON.parse(jsonStr);

    if (parsed.ai_narrative_hunter && Array.isArray(parsed.ai_narrative_hunter)) {
      // Enrich tokens with address, chain, volume from GMGN lookup
      parsed.ai_narrative_hunter.forEach((item, i) => {
        item.heat_score = Math.max(100 - i * 8, 50);
        item.hot_tokens = item.hot_tokens.map(t => {
          const chain = inferChain(t.name, gmgnDataContext);
          const lookup = tokenLookup[`${t.name.toUpperCase()}_${chain}`]
            || tokenLookup[t.name.toUpperCase()]
            || {};
          return {
            ...t,
            chain: lookup.chain || chain,
            contract_address: lookup.address || '',
            logo: lookup.logo || '',
            volume: lookup.volume ? `$${Number(lookup.volume).toLocaleString('en-US', { maximumFractionDigits: 0 })}` : '',
            market_cap: lookup.market_cap ? `$${Number(lookup.market_cap).toLocaleString('en-US', { maximumFractionDigits: 0 })}` : '',
            price_change: lookup.price_change != null ? `${lookup.price_change > 0 ? '+' : ''}${Number(lookup.price_change).toFixed(1)}%` : '',
          };
        });
      });
      return parsed;
    }

    console.error('  [Grok] Missing ai_narrative_hunter array in response');
    return null;
  } catch (err) {
    console.error('  [Grok] JSON parse error:', err.message);
    console.error('  [Grok] Raw response (first 500):', response3.slice(0, 500));
    return null;
  }
}

// Infer chain from data context - check if token appeared in BSC data
function inferChain(tokenName, dataContext) {
  const upper = tokenName.toUpperCase();
  // Check BSC sections of data
  const bscSection = dataContext.split('--- BSC').slice(1).join('');
  const solSection = dataContext.split('--- SOLANA').slice(1).join('').split('--- BSC')[0] || '';

  const inBsc = bscSection.toUpperCase().includes(`$${upper}`);
  const inSol = solSection.toUpperCase().includes(`$${upper}`);

  if (inBsc && !inSol) return 'bsc';
  if (inSol && !inBsc) return 'sol';
  if (inBsc && inSol) return 'sol'; // default to sol if in both
  // Chinese token names are typically BSC
  if (/[\u4e00-\u9fff]/.test(tokenName)) return 'bsc';
  return 'sol'; // default
}
