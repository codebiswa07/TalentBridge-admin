import React from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

export default function StatCard({ label, value, sub, icon: Icon, color, trend, trendLabel, onClick }) {
  const TrendIcon = trend > 0 ? TrendingUp : trend < 0 ? TrendingDown : Minus
  return (
    <div className={`stat-card color-${color}`} onClick={onClick} style={onClick ? {cursor:'pointer'} : {}}>
      <div className="sc-top">
        <div className="sc-meta">
          <div className="sc-label">{label}</div>
          <div className="sc-value">{value}</div>
        </div>
        <div className={`sc-icon bg-${color}`}><Icon size={20} /></div>
      </div>
      <div className="sc-bottom">
        {trend !== undefined && (
          <span className={`sc-trend ${trend >= 0 ? 'up' : 'down'}`}>
            <TrendIcon size={12} />
            {Math.abs(trend)}%
          </span>
        )}
        <span className="sc-sub">{sub}</span>
      </div>
    </div>
  )
}
