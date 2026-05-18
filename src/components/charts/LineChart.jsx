import React from 'react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="chart-tooltip">
      <div className="ct-label">{label}</div>
      <div className="ct-value">{payload[0].value} application{payload[0].value !== 1 ? 's' : ''}</div>
    </div>
  )
}

export default function DailyAreaChart({ data }) {
  const formatted = data.map(d => ({ name: d.label, value: d.count }))
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={formatted} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#7c6cfa" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#7c6cfa" stopOpacity={0}   />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis dataKey="name" tick={{ fill: '#7070a0', fontSize: 11, fontFamily:'DM Mono' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: '#7070a0', fontSize: 11, fontFamily:'DM Mono' }} axisLine={false} tickLine={false} allowDecimals={false} />
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey="value" stroke="#7c6cfa" strokeWidth={2.5} fill="url(#areaGrad)" dot={{ fill: '#7c6cfa', strokeWidth: 0, r: 4 }} activeDot={{ r: 6 }} />
      </AreaChart>
    </ResponsiveContainer>
  )
}
