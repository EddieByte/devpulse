import { useState } from 'react'

function StatCard({ title, value, color, tooltip }) {
  const [showTip, setShowTip] = useState(false)

  return (
    <div className="stat-card" style={{ borderTop: '3px solid ' + color }}>
      <div className="stat-header">
        <div className="stat-title">{title}</div>
        {tooltip && (
          <div className="tooltip-wrap"
            onMouseEnter={() => setShowTip(true)}
            onMouseLeave={() => setShowTip(false)}>
            <span className="info-icon">?</span>
            {showTip && <div className="tooltip-box">{tooltip}</div>}
          </div>
        )}
      </div>
      <div className="stat-value" style={{ color }}>{value}</div>
    </div>
  )
}

export default StatCard
