import { openToken } from '../utils/tokenUrl'
import TweetEmbed from './TweetEmbed'
import './NarrativeDetail.css'

function NarrativeDetail({ narrative, lang, onBack }) {
  const title = narrative.title_lang?.[lang] || narrative.title
  const reason = narrative.reason_lang?.[lang] || narrative.reason

  return (
    <div className="detail-page">
      <div className="detail-nav">
        <button className="back-btn" onClick={onBack}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="detail-nav-title">{title}
          <div className="nav-rank-heat">
            <span className={`hero-rank rank-${narrative.order_number}`}>
              #{narrative.order_number}
            </span>
            <span className="hero-heat">🔥{narrative.heat_score}</span>
          </div>
        </h2>

      </div>

      <div className="detail-hero">
        <p className="hero-reason">{reason}</p>
      </div>

      <div className="detail-section">
        <div className="section-header">
          <span className="section-label">Hot Tokens</span>
        </div>
        <div className="gmgn-token-header">
          <span className="th-name">Token</span>
          <span className="th-vol">1h Vol</span>
          <span className="th-right">MC</span>
          <span className="th-change">1h%</span>
        </div>
        <div className="gmgn-token-list">
          {narrative.hot_tokens.map((token) => (
            <div
              key={token.name}
              className="gmgn-token-row"
              onClick={() => openToken(token)}
            >
              <div className="gmgn-token-left">
                <div className="gmgn-token-avatar">
                  {token.logo ? (
                    <img
                      src={token.logo}
                      alt={token.name}
                      className="gmgn-token-logo"
                      onError={e => {
                        e.target.style.display = 'none'
                        e.target.nextSibling.style.display = 'flex'
                      }}
                    />
                  ) : null}
                  <span className="gmgn-token-letter" style={token.logo ? { display: 'none' } : {}}>
                    {token.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="gmgn-token-info">
                  <span className="gmgn-token-symbol">{token.name}</span>
                </div>
              </div>
              <span className="gmgn-token-vol">{token.volume || '—'}</span>
              <span className="gmgn-token-mc">{token.market_cap || '—'}</span>
              <span className={`gmgn-token-change ${token.price_change?.startsWith('+') ? 'up' : token.price_change?.startsWith('-') ? 'down' : ''}`}>
                {token.price_change || '—'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="detail-section">
        <div className="section-header">
          <span className="section-label">Related Posts</span>
          <span className="section-count">{narrative.source?.length || 0}</span>
        </div>
        <div className="tweet-list">
          {narrative.source?.map((tweet, i) => (
            <TweetEmbed
              key={tweet.tweet_url || tweet.username + i}
              tweet={tweet}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default NarrativeDetail
