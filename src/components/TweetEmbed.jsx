import './TweetEmbed.css'

function TweetEmbed({ tweet }) {
  const {
    username = '',
    display_name = '',
    tweet_text = '',
    tweet_url = '',
    tweet_time = '',
    likes = 0,
    retweets = 0,
  } = tweet

  const profileUrl = `https://x.com/${username}`
  const linkUrl = tweet_url || profileUrl

  const renderText = (text) => {
    if (!text) return null
    const parts = text.split(/(\$[A-Za-z\u4e00-\u9fff]+|@[A-Za-z0-9_]+|https?:\/\/\S+)/g)
    return parts.map((part, i) => {
      if (part.startsWith('$')) return <span key={i} className="xt-ticker">{part}</span>
      if (part.startsWith('@')) return <span key={i} className="xt-mention">{part}</span>
      if (part.startsWith('http')) return <span key={i} className="xt-link">{part.replace(/https?:\/\/(www\.)?/, '').slice(0, 30)}...</span>
      return part
    })
  }

  const formatNum = (n) => {
    if (!n) return '0'
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K'
    return String(n)
  }

  return (
    <div className="xt-card" onClick={() => window.open(linkUrl, '_blank', 'noopener,noreferrer')}>
      <div className="xt-header">
        <div className="xt-avatar">
          <img
            src={`https://unavatar.io/twitter/${username}`}
            alt={username}
            className="xt-avatar-img"
            onError={e => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}
          />
          <span className="xt-avatar-fallback" style={{ display: 'none' }}>
            {(display_name || username).charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="xt-user">
          <div className="xt-user-top">
            <span className="xt-displayname">{display_name || username}</span>
          </div>
          <span className="xt-handle">@{username}</span>
        </div>
        <div className="xt-meta">
          <span className="xt-time">{tweet_time}</span>
          <svg className="xt-reply-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2">
            <path d="M14 9l-5 5 5 5"/><path d="M19 4v7a4 4 0 0 1-4 4H4"/>
          </svg>
        </div>
      </div>

      {tweet_text && (
        <div className="xt-body">
          {renderText(tweet_text)}
        </div>
      )}

      <div className="xt-footer">
        <span className="xt-stat">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/>
            <path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>
          </svg>
          {formatNum(retweets)}
        </span>
        <span className="xt-stat">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          {formatNum(likes)}
        </span>
      </div>
    </div>
  )
}

export default TweetEmbed
