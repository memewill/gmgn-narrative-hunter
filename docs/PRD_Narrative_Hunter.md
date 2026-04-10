# 产品需求文档 (PRD)：Narrative Hunter — AI 叙事聚合

| 字段 | 内容 |
|---|---|
| 产品名称 | Narrative Hunter（叙事猎手） |
| 所属产品 | GMGN App |
| 版本 | v1.0 |
| 作者 | PM |
| 日期 | 2026-04-10 |
| 状态 | 待开发 |
| 优先级 | P0 |
| MVP Demo | `xushi/narrative-hunter/` |

---

## 1. 背景与目标

### 1.1 背景

当前 Memecoin 市场用户更加注重**叙事驱动**的交易逻辑。单一代币的涨跌已不足以帮助用户判断市场方向，用户需要快速了解"当前什么叙事最热"以及"哪些代币属于同一个叙事板块"。

竞品参考：Binance Web3 已上线 Topic Rush 功能（`web3.binance.com/trenches/topic-rush`），按叙事主题聚合代币。

### 1.2 目标

- **核心目标**：帮助用户在 30 秒内了解当前最热的 5 个 Memecoin 叙事板块及其核心代币
- **商业目标**：提升 GMGN App 用户留存与交易转化率，形成"发现叙事 → 查看代币 → 交易"的完整闭环
- **差异化**：AI 驱动的实时叙事分析（Grok + GMGN 链上数据），而非人工编辑

### 1.3 成功指标

| 指标 | 目标 |
|---|---|
| 叙事页日均 UV | 上线首周 > 5K |
| 叙事 → 代币详情页点击率 | > 30% |
| 数据更新频率 | 每小时自动更新 |
| 叙事覆盖准确率 | > 80%（人工抽检） |

---

## 2. 用户故事

| 角色 | 场景 | 期望 |
|---|---|---|
| Memecoin 交易者 | 早上打开 GMGN，想快速了解过夜发生了什么 | 看到 5 个热门叙事，每个叙事有 2-4 个代币，点击即可查看 K 线 |
| 新手用户 | 不知道当前流行什么概念 | 通过叙事标题和原因描述快速理解市场热点 |
| KOL/分析师 | 需要了解社区在讨论什么 | 查看每个叙事下的相关推文内容，了解社区讨论方向 |

---

## 3. 功能规格

### 3.1 页面结构

```
首页（叙事列表页）
├── Header（品牌 + 语言切换 + 更新时间 + 手动刷新按钮）
├── 状态栏（数据加载状态提示）
├── 叙事卡片列表（5个叙事，按热度排序）
│   └── 叙事卡片 × 5
└── Footer

叙事详情页
├── 返回导航
├── 叙事标题 + 热度分数
├── 叙事核心原因
├── 关联代币表格（可点击跳转 GMGN K线页）
└── 相关推文时间线（展示推文原文内容）
```

### 3.2 叙事列表页

#### 3.2.1 Header

| 元素 | 说明 |
|---|---|
| 品牌 Logo + "GMGN" | 左上角 |
| 语言切换 | 右上角下拉菜单，支持：简体中文 / 繁體中文 / English |
| 标题 | "🔥 Narrative Hunter" 居中 |
| 副标题 | "AI 实时叙事聚合 · 捕捉链上热点板块" |
| 更新时间 | 绿色脉冲圆点 + "Updated HH:MM" |
| 手动刷新按钮 | 更新时间旁，点击触发后端立即更新 |

#### 3.2.2 状态栏

根据后端状态显示不同提示：

| 状态 | 显示文案 | 样式 |
|---|---|---|
| fetching | "正在获取链上数据..." | 蓝色 + 旋转图标 |
| analyzing | "AI 正在分析叙事..." | 蓝色 + 旋转图标 |
| ready | 不显示 | — |
| error | "分析出错，显示缓存数据" | 红色 |
| offline | "演示数据（后端离线）" | 黄色 |

#### 3.2.3 叙事卡片

每张卡片包含以下元素：

| 元素 | 说明 |
|---|---|
| 排名徽章 | #1 ~ #5，前三名使用渐变色高亮（红→橙→金） |
| 叙事标题 | 6-10 个汉字，精炼有张力 |
| 热度分数 | 🔥 + 数字（0-100），右上角 |
| 核心原因 | 最多显示 2 行，超出截断 |
| 关联代币 Pills | 每个 pill 显示：`$代币名 +涨跌幅% ↗`，最多 4 个 |
| KOL 计数 | "N KOLs discussing" |
| 箭头 | 右下角 "→" 提示可进入详情 |

**卡片背景**：
- 热度 ≥ 90：红金渐变半透明背景
- 热度 ≥ 80：橙黄渐变半透明背景
- 热度 < 80：默认深色背景

**交互**：
- 点击卡片 → 进入叙事详情页
- 点击代币 Pill → 跳转 GMGN 代币 K 线页（新窗口），不触发卡片导航

### 3.3 叙事详情页

#### 3.3.1 顶部

| 元素 | 说明 |
|---|---|
| 返回按钮 | 左上角 "←"，返回列表页 |
| 页面标题 | "Narrative Detail" 居中 |
| 排名 + 热度 | 居中显示，样式同卡片 |
| 叙事标题 | 大号字体居中 |

#### 3.3.2 Narratives（核心原因）

- 标题："💡 Narratives"
- 内容：完整的叙事原因描述，左侧黄色竖线装饰

#### 3.3.3 Hot Tokens（关联代币表格）

| 列 | 说明 |
|---|---|
| Token | `序号 + $代币名 + ↗` |
| Change | 涨跌幅百分比，绿色/红色 |
| Volume | 交易量 |
| MCap | 市值 |

**交互**：点击任意行 → 跳转 GMGN 代币 K 线页
- 跳转 URL：`https://gmgn.ai/{chain}/token/{contract_address}`

#### 3.3.4 Related Posts（相关推文）

- 标题："𝕏 Related Posts (N)"
- 每条推文卡片包含：

| 元素 | 说明 |
|---|---|
| 用户头像 | 首字母圆形头像 |
| Display Name | 用户显示名 |
| @username | 用户 handle |
| 发布时间 | 相对时间（如 "2h ago"） |
| 𝕏 logo | 右上角 |
| 推文正文 | 完整原文，`$TICKER` 黄色高亮，`@mention` 蓝色高亮 |
| 转发数 | 🔁 图标 + 数字 |
| 点赞数 | ❤️ 图标 + 数字 |
| Open ↗ | 跳转原文链接 |

**排序**：按互动量（likes + retweets）降序
**数量**：每个叙事 5-8 条推文

---

## 4. 数据架构

### 4.1 数据流

```
┌──────────────────────────────────────────────┐
│                  定时任务（每小时）               │
├──────────────────────────────────────────────┤
│                                              │
│  ┌─────────┐    并行请求     ┌─────────────┐  │
│  │ GMGN API │ ──────────→  │ 4组链上数据   │  │
│  │ (4路)    │  SOL 1h/6h   │ (text格式)   │  │
│  │          │  BSC 1h/6h   │ + token索引  │  │
│  └─────────┘               └──────┬────────┘  │
│                                   │           │
│  ┌─────────────────────────────────▼────────┐ │
│  │           Grok API (3轮对话)              │ │
│  │                                          │ │
│  │  Round 1: 数据采集 + 交叉验证 (聚类)      │ │
│  │  Round 2: 社区热度筛选 + 中文报告         │ │
│  │  Round 3: 翻译 + JSON格式化 + 推文内容    │ │
│  └─────────────────────────────────┬────────┘ │
│                                   │           │
│  ┌────────────────────────────────▼─────────┐ │
│  │         Token 信息补全 (合约地址/数据)      │ │
│  │         从 GMGN token索引匹配              │ │
│  └────────────────────────────────┬─────────┘ │
│                                   │           │
│                          ┌────────▼────────┐  │
│                          │  内存缓存存储    │  │
│                          │  /api/narratives │  │
│                          └─────────────────┘  │
└──────────────────────────────────────────────┘

前端每 30 秒轮询 /api/narratives
```

### 4.2 核心数据结构

```json
{
  "updated_at": "2026-04-10T14:30:00Z",
  "status": "ready",
  "ai_narrative_hunter": [
    {
      "order_number": 1,
      "title": "English Title",
      "title_lang": {
        "zh_hans": "简体标题",
        "zh_hant": "繁體標題",
        "en": "English Title"
      },
      "reason": "English reason text",
      "reason_lang": {
        "zh_hans": "简体原因描述",
        "zh_hant": "繁體原因描述",
        "en": "English reason text"
      },
      "heat_score": 100,
      "hot_tokens": [
        {
          "name": "TOKEN_NAME",
          "contract_address": "0x...",
          "chain": "sol",
          "price_change": "+438.7%",
          "volume": "$125,804",
          "market_cap": "$20,228"
        }
      ],
      "source": [
        {
          "username": "handle",
          "display_name": "Display Name",
          "tweet_text": "推文原文内容...",
          "tweet_url": "https://x.com/handle/status/123",
          "tweet_time": "2h ago",
          "likes": 12500,
          "retweets": 3400
        }
      ]
    }
  ]
}
```

### 4.3 API 接口

| 方法 | 路径 | 说明 |
|---|---|---|
| GET | `/api/narratives` | 获取最新叙事数据（完整 JSON） |
| GET | `/api/status` | 获取管道状态（status, updated_at, is_running） |
| POST | `/api/refresh` | 触发立即刷新（不等待结果） |

---

## 5. AI 分析管道

### 5.1 数据源

| 数据源 | 用途 | 频率 |
|---|---|---|
| GMGN Rank API (`/api/v1/rank/{chain}/swaps/{timeframe}`) | 获取 SOL/BSC 链上 1h/6h 热门代币 Top 100 | 每小时 |
| Grok API (grok-4-1-fast) | AI 叙事分析、聚类、翻译 | 每小时 |

### 5.2 三轮对话流程

**System Prompt**：加密货币 Meme 赛道资深链上分析师角色（见 `gmgninsight_prompt_副本0109.md`）

| 轮次 | 任务 | Temperature | Max Tokens |
|---|---|---|---|
| Round 1 | 基于 GMGN 数据提取热门代币 + 交叉验证 + 初步聚类 | 0.5 | 4096 |
| Round 2 | X/Twitter 社区热度验证 + 筛选 Top 5 叙事 + 中文报告 | 0.5 | 4096 |
| Round 3 | 翻译(简/繁/英) + JSON 格式化 + 推文内容采集 | 0.3 | 8192 |

### 5.3 Token 信息补全

Grok 输出的 `hot_tokens` 仅包含代币名称。后端通过 GMGN API 返回的 token 索引（symbol → address 映射）自动补全：
- `contract_address`：合约地址
- `chain`：所属链
- `volume`：交易量
- `market_cap`：市值
- `price_change`：涨跌幅

---

## 6. 多语言支持

| 语言 | 代码 | 覆盖范围 |
|---|---|---|
| 简体中文 | zh_hans | 标题、原因描述 |
| 繁体中文 | zh_hant | 标题、原因描述 |
| English | en | 标题、原因描述 |

- 语言切换仅影响叙事标题和核心原因，UI 框架文案暂为英文
- 推文内容保留原始语言不翻译

---

## 7. 视觉规范

### 7.1 设计风格

- **主题**：深色模式（与 GMGN App 一致）
- **布局**：移动端优先，最大宽度 480px
- **字体**：系统字体栈（PingFang SC / Microsoft YaHei / -apple-system）

### 7.2 色彩系统

| 用途 | 色值 |
|---|---|
| 背景主色 | `#0b0e11` |
| 卡片背景 | `#1e2229` |
| 文字主色 | `#eaecef` |
| 文字次级 | `#848e9c` |
| 强调色（黄） | `#f0b90b` |
| 涨（绿） | `#0ecb81` |
| 跌（红） | `#f6465d` |
| 推特蓝 | `#1d9bf0` |
| $TICKER 高亮 | `#f0b90b`（黄色） |
| @mention 高亮 | `#1d9bf0`（蓝色） |

### 7.3 热度卡片渐变

| 热度范围 | 背景渐变 |
|---|---|
| ≥ 90 | `#f6465d22 → #f0b90b22` 红金渐变 |
| ≥ 80 | `#ff6b3522 → #f7c94822` 橙黄渐变 |
| < 80 | 默认 `#1e2229` |

---

## 8. 技术实现要点

### 8.1 后端

- 定时任务每小时触发一次完整管道（GMGN 拉取 → Grok 分析 → 缓存更新）
- GMGN 4 路数据并行拉取，Token 索引表（symbol → address/chain/volume）同步构建
- Grok 3 轮对话串行执行，每轮间隔 1 秒
- 结果存内存缓存，API 直接返回缓存
- 支持 POST `/api/refresh` 手动触发

### 8.2 前端

- 前端每 30 秒轮询 `/api/narratives`
- 后端离线时自动 fallback 到 mock 数据
- 代币点击跳转：`https://gmgn.ai/{chain}/token/{contract_address}`
- 推文卡片中 `$TICKER` 和 `@mention` 正则匹配高亮

### 8.3 容错

| 场景 | 处理 |
|---|---|
| GMGN API 超时 | 单路超时 15s，不影响其他 3 路 |
| Grok API 报错 | 每轮最多重试 3 次，指数退避 |
| Grok JSON 解析失败 | 保留上次成功缓存，状态标记为 error |
| 后端完全离线 | 前端显示 mock 演示数据 + 黄色状态栏 |
| Token 合约地址未匹配 | 跳转 URL 使用代币名称作为 fallback |

---

## 9. 后续迭代方向

| 优先级 | 功能 | 说明 |
|---|---|---|
| P1 | 推送通知 | 新叙事出现时推送通知 |
| P1 | 叙事历史记录 | 保存历史叙事数据，支持回看 |
| P2 | 用户自定义关注叙事 | 用户可收藏/关注特定叙事主题 |
| P2 | 叙事涨跌趋势图 | 展示叙事板块整体涨跌走势 |
| P2 | 更多链支持 | 扩展到 ETH、Base 等链 |
| P3 | 社区投票 | 用户对叙事热度投票 |
| P3 | AI 叙事预测 | 基于历史数据预测下一个热点叙事 |

---

## 10. MVP Demo 说明

MVP Demo 位于 `xushi/narrative-hunter/`，可直接运行体验：

```bash
cd xushi/narrative-hunter

# 安装依赖
npm install

# 启动后端（端口 3001）
npm run server

# 启动前端（端口 5173，自动代理 /api → 3001）
npm run dev
```

关键文件：
| 路径 | 说明 |
|---|---|
| `server/index.js` | Express 服务器 + 定时任务调度 |
| `server/gmgnFetcher.js` | GMGN API 数据拉取 + Token 索引构建 |
| `server/grokClient.js` | Grok API 3 轮对话 + JSON 解析 |
| `src/App.jsx` | 前端主页面 |
| `src/components/NarrativeCard.jsx` | 叙事卡片组件 |
| `src/components/NarrativeDetail.jsx` | 叙事详情页组件 |
| `src/components/TweetEmbed.jsx` | 推文内容卡片组件 |
| `src/hooks/useNarratives.js` | 数据轮询 Hook |
| `src/utils/tokenUrl.js` | 代币跳转 URL 构建 |
