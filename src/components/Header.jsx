import './Header.css'

function Header({ lang, onLangChange, updatedAt, onRefresh }) {
  const formatTime = (iso) => {
    if (!iso) return '--:--'
    const d = new Date(iso)
    return d.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="header">
      <div className="header-nav">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        <h1 className="header-page-title">Hot Searches</h1>
        <select
          className="lang-select"
          value={lang}
          onChange={e => onLangChange(e.target.value)}
        >
          <option value="zh_hans">简体</option>
          <option value="zh_hant">繁體</option>
          <option value="en">EN</option>
        </select>
      </div>

      <div className="header-tabs">
        <span className="tab-item">Watchlist</span>
        <span className="tab-item">Hot Searches</span>
        <span className="tab-item active">
          Narratives
          <span className="tab-badge">AI</span>
        </span>
        <span className="tab-item">Trending</span>
      </div>

      <div className="header-meta-bar">
        <div className="meta-left">
          <span className="pulse-dot"></span>
          <span className="meta-time">Updated {formatTime(updatedAt)}</span>
        </div>
        {onRefresh && (
          <button className="refresh-btn" onClick={onRefresh}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 4v6h6M23 20v-6h-6"/>
              <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

export default Header
