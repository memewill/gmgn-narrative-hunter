// Mock data based on AI Narrative Hunter JSON output structure
// This simulates the output from the Grok API narrative analysis pipeline

export const narrativeData = {
  updated_at: "2026-04-10T14:30:00Z",
  ai_narrative_hunter: [
    {
      order_number: 1,
      title: "世界杯狂热席卷链上",
      title_lang: {
        zh_hans: "世界杯狂热席卷链上",
        zh_hant: "世界盃狂熱席捲鏈上",
        en: "World Cup Fever On-Chain"
      },
      reason: "2026 世界杯开幕在即，社区围绕参赛国家和球星部署系列代币，KOL 集体转发引爆链上交易狂潮，多币共振形成体育叙事板块。",
      reason_lang: {
        zh_hans: "2026 世界杯开幕在即，社区围绕参赛国家和球星部署系列代币，KOL 集体转发引爆链上交易狂潮，多币共振形成体育叙事板块。",
        zh_hant: "2026 世界盃開幕在即，社群圍繞參賽國家和球星部署系列代幣，KOL 集體轉發引爆鏈上交易狂潮，多幣共振形成體育敘事板塊。",
        en: "With the 2026 World Cup approaching, the community deploys tokens around participating nations and star players. KOL collective sharing ignites on-chain trading frenzy with multi-token resonance forming sports narrative sector."
      },
      hot_tokens: [
        { name: "WORLDCUP", price_change: "+342%", volume: "$12.5M", chain: "sol", market_cap: "$8.2M" },
        { name: "MESSI", price_change: "+218%", volume: "$8.3M", chain: "sol", market_cap: "$5.1M" },
        { name: "GOAL", price_change: "+156%", volume: "$4.7M", chain: "sol", market_cap: "$3.4M" },
        { name: "FIFA26", price_change: "+89%", volume: "$2.1M", chain: "bsc", market_cap: "$1.8M" }
      ],
      source: [
        { username: "MustStopMurad" },
        { username: "AnsemBull" },
        { username: "lookonchain" },
        { username: "CryptoKaleo" },
        { username: "0xMert_" },
        { username: "cobie" },
        { username: "CryptoTony__" },
        { username: "degentwiiter" },
        { username: "CryptoGodJohn" },
        { username: "TheCryptoDog" }
      ],
      heat_score: 98
    },
    {
      order_number: 2,
      title: "AI Agent 自主交易浪潮",
      title_lang: {
        zh_hans: "AI Agent 自主交易浪潮",
        zh_hant: "AI Agent 自主交易浪潮",
        en: "AI Agent Autonomous Trading Wave"
      },
      reason: "多个 AI Agent 项目宣布链上自主交易功能，社区围绕 AI 交易员概念疯狂部署代币，smart money 大量涌入推动板块爆发。",
      reason_lang: {
        zh_hans: "多个 AI Agent 项目宣布链上自主交易功能，社区围绕 AI 交易员概念疯狂部署代币，smart money 大量涌入推动板块爆发。",
        zh_hant: "多個 AI Agent 項目宣布鏈上自主交易功能，社群圍繞 AI 交易員概念瘋狂部署代幣，smart money 大量湧入推動板塊爆發。",
        en: "Multiple AI Agent projects announce on-chain autonomous trading features. Community frantically deploys tokens around AI trader concept, smart money floods in driving sector explosion."
      },
      hot_tokens: [
        { name: "AITRADER", price_change: "+567%", volume: "$18.2M", chain: "sol", market_cap: "$12.3M" },
        { name: "AUTOBOT", price_change: "+234%", volume: "$6.8M", chain: "sol", market_cap: "$4.5M" },
        { name: "NEURAL", price_change: "+178%", volume: "$3.9M", chain: "sol", market_cap: "$2.8M" }
      ],
      source: [
        { username: "shawmakesmagic" },
        { username: "0xMert_" },
        { username: "AnsemBull" },
        { username: "MustStopMurad" },
        { username: "superverse" },
        { username: "levelsio" },
        { username: "pmarca" },
        { username: "CryptoKaleo" }
      ],
      heat_score: 95
    },
    {
      order_number: 3,
      title: "链上打工人文化崛起",
      title_lang: {
        zh_hans: "链上打工人文化崛起",
        zh_hant: "鏈上打工人文化崛起",
        en: "On-Chain Worker Culture Rise"
      },
      reason: "BSC 中文社区掀起打工人 meme 浪潮，牛马、摸鱼等职场梗引发共鸣，草根文化驱动 BSC 链上交易量暴增形成独特板块。",
      reason_lang: {
        zh_hans: "BSC 中文社区掀起打工人 meme 浪潮，牛马、摸鱼等职场梗引发共鸣，草根文化驱动 BSC 链上交易量暴增形成独特板块。",
        zh_hant: "BSC 中文社群掀起打工人 meme 浪潮，牛馬、摸魚等職場梗引發共鳴，草根文化驅動 BSC 鏈上交易量暴增形成獨特板塊。",
        en: "BSC Chinese community sparks worker meme wave. Office humor like 'cow-horse' and 'slacking fish' resonate widely, grassroots culture drives BSC trading volume surge forming unique sector."
      },
      hot_tokens: [
        { name: "牛马", price_change: "+890%", volume: "$9.5M", chain: "bsc", market_cap: "$6.2M" },
        { name: "摸鱼", price_change: "+445%", volume: "$5.2M", chain: "bsc", market_cap: "$3.8M" },
        { name: "打工人", price_change: "+267%", volume: "$3.1M", chain: "bsc", market_cap: "$2.1M" },
        { name: "摆烂", price_change: "+189%", volume: "$1.8M", chain: "bsc", market_cap: "$1.2M" }
      ],
      source: [
        { username: "cz_binance" },
        { username: "BSCchain" },
        { username: "binancezh" },
        { username: "lookonchain" },
        { username: "CryptoKaleo" },
        { username: "superverse" },
        { username: "0xMert_" }
      ],
      heat_score: 88
    },
    {
      order_number: 4,
      title: "吉祥物大战全面开花",
      title_lang: {
        zh_hans: "吉祥物大战全面开花",
        zh_hant: "吉祥物大戰全面開花",
        en: "Mascot Wars Full Bloom"
      },
      reason: "世界杯各国吉祥物成为 meme 新战场，社区围绕各国官方吉祥物形象展开创作竞赛，多个吉祥物币同时冲榜形成板块效应。",
      reason_lang: {
        zh_hans: "世界杯各国吉祥物成为 meme 新战场，社区围绕各国官方吉祥物形象展开创作竞赛，多个吉祥物币同时冲榜形成板块效应。",
        zh_hant: "世界盃各國吉祥物成為 meme 新戰場，社群圍繞各國官方吉祥物形象展開創作競賽，多個吉祥物幣同時衝榜形成板塊效應。",
        en: "World Cup national mascots become new meme battlefield. Community launches creative contests around official mascot images, multiple mascot tokens simultaneously chart-topping forming sector effect."
      },
      hot_tokens: [
        { name: "IXTLE", price_change: "+456%", volume: "$7.8M", chain: "sol", market_cap: "$5.6M" },
        { name: "MASCOT", price_change: "+312%", volume: "$4.5M", chain: "sol", market_cap: "$3.2M" },
        { name: "WILLIE", price_change: "+198%", volume: "$2.3M", chain: "sol", market_cap: "$1.5M" }
      ],
      source: [
        { username: "AnsemBull" },
        { username: "MustStopMurad" },
        { username: "CryptoGodJohn" },
        { username: "lookonchain" },
        { username: "degentwiiter" },
        { username: "farmerkist_eth" },
        { username: "CryptoTony__" },
        { username: "TheCryptoDog" },
        { username: "CryptoMichNL" }
      ],
      heat_score: 82
    },
    {
      order_number: 5,
      title: "模因复古风暴来袭",
      title_lang: {
        zh_hans: "模因复古风暴来袭",
        zh_hant: "模因復古風暴來襲",
        en: "Retro Meme Storm Incoming"
      },
      reason: "经典互联网 meme 如 Pepe 衍生品与 Doge 变体意外重聚，nostalgia 机制驱动社区病毒传播与链上抢购，形成怀旧文化板块。",
      reason_lang: {
        zh_hans: "经典互联网 meme 如 Pepe 衍生品与 Doge 变体意外重聚，nostalgia 机制驱动社区病毒传播与链上抢购，形成怀旧文化板块。",
        zh_hant: "經典互聯網 meme 如 Pepe 衍生品與 Doge 變體意外重聚，nostalgia 機制驅動社群病毒傳播與鏈上搶購，形成懷舊文化板塊。",
        en: "Classic internet memes like Pepe derivatives and Doge variants unexpectedly reunite. Nostalgia mechanism drives community viral spread and on-chain buying, forming retro culture sector."
      },
      hot_tokens: [
        { name: "RETROPEPE", price_change: "+234%", volume: "$5.6M", chain: "sol", market_cap: "$4.1M" },
        { name: "OLDDOGE", price_change: "+178%", volume: "$3.2M", chain: "sol", market_cap: "$2.3M" },
        { name: "NOSTALGIA", price_change: "+145%", volume: "$2.1M", chain: "sol", market_cap: "$1.6M" }
      ],
      source: [
        { username: "MustStopMurad" },
        { username: "cobie" },
        { username: "CryptoCapo_" },
        { username: "Washigorira" },
        { username: "CryptoMichNL" },
        { username: "farmerkist_eth" },
        { username: "superverse" }
      ],
      heat_score: 76
    }
  ]
};
