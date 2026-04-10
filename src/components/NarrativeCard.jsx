import { openToken } from '../utils/tokenUrl'
import './NarrativeCard.css'

function NarrativeCard({ narrative, index, lang, onClick }) {
  const title = narrative.title_lang?.[lang] || narrative.title
  const reason = narrative.reason_lang?.[lang] || narrative.reason
  const tokens = narrative.hot_tokens?.slice(0, 4) || []

  return (
    <div className="narrative-card" onClick={onClick}>
      <div className="card-top">
        <div className="card-rank-badge">
          <span className={`rank-num rank-${index + 1}`}>{index + 1}</span>
        </div>
        <div className="card-info">
          <div className="card-title-row">
            <h3 className="card-title">{title}</h3>
            <span className="card-heat">
              🔥 {narrative.heat_score}
            </span>
          </div>
          <p className="card-reason">{reason}</p>
        </div>
      </div>

      <div className="card-tokens">
        {tokens.map(token => (
          <div
            key={token.name}
            className="token-chip"
            onClick={e => openToken(token, e)}
          >
            <span className="chip-name">${token.name}</span>
            {token.price_change && (
              <span className={`chip-change ${token.price_change.startsWith('+') ? 'up' : token.price_change.startsWith('-') ? 'down' : ''}`}>
                {token.price_change}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="card-bottom">
        <div className="card-avatars-row">
          <div className="card-avatars">
            {(narrative.source || []).slice(0, 5).map((s, i) => (
              <div
                key={s.username + i}
                className="avatar-stack-item"
                style={{ zIndex: 10 - i }}
              >
                <img
                  src={`https://unavatar.io/twitter/${s.username}`}
                  alt={s.username}
                  className="avatar-img"
                  onError={e => {
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                />
                <span className="avatar-fallback" style={{ display: 'none' }}>
                  {(s.display_name || s.username || '?').charAt(0).toUpperCase()}
                </span>
              </div>
            ))}
          </div>
          <span className="card-post-count">
            {narrative.source?.length || 0} posts mentioned
          </span>
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </div>
    </div>
  )
}

export default NarrativeCard
