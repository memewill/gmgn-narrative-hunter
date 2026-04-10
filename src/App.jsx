import { useState } from 'react'
import { useNarratives } from './hooks/useNarratives'
import Header from './components/Header'
import NarrativeCard from './components/NarrativeCard'
import NarrativeDetail from './components/NarrativeDetail'
import './App.css'

const STATUS_LABELS = {
  initializing: '正在初始化...',
  fetching: '正在获取链上数据...',
  analyzing: 'AI 正在分析叙事...',
  mock: '演示数据（后端未连接）',
  offline: '演示数据（后端离线）',
  error: '分析出错，显示缓存数据',
}

function App() {
  const { data, loading, refresh } = useNarratives()
  const [selectedNarrative, setSelectedNarrative] = useState(null)
  const [lang, setLang] = useState('zh_hans')

  if (loading || !data) {
    return (
      <div className="app loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading Narrative Hunter...</p>
      </div>
    )
  }

  const narratives = data.ai_narrative_hunter || []
  const status = data.status

  if (selectedNarrative) {
    return (
      <NarrativeDetail
        narrative={selectedNarrative}
        lang={lang}
        onBack={() => setSelectedNarrative(null)}
      />
    )
  }

  return (
    <div className="app">
      <Header
        lang={lang}
        onLangChange={setLang}
        updatedAt={data.updated_at}
        onRefresh={refresh}
      />

      {status && STATUS_LABELS[status] && (
        <div className={`status-bar status-${status}`}>
          {(status === 'fetching' || status === 'analyzing' || status === 'initializing') && (
            <span className="status-spinner"></span>
          )}
          <span>{STATUS_LABELS[status]}</span>
        </div>
      )}

      <div className="narrative-list">
        {narratives.map((narrative, index) => (
          <NarrativeCard
            key={narrative.order_number}
            narrative={narrative}
            index={index}
            lang={lang}
            onClick={() => setSelectedNarrative(narrative)}
          />
        ))}
        {narratives.length === 0 && (
          <div className="empty-state">
            <p>No narratives found for this filter.</p>
          </div>
        )}
      </div>

      <div className="footer">
        <p>Powered by AI Narrative Analysis (Grok + GMGN)</p>
        <p className="footer-sub">Auto-refresh every hour</p>
      </div>
    </div>
  )
}

export default App
