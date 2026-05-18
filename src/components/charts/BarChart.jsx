import React from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts'

const COLORS = ['#7c6cfa','#6cbcfa','#fa6c7c','#6cfaa8','#fac06c','#d46cfa','#fa9a6c','#6ce4fa']

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="chart-tooltip">
      <div className="ct-label">{payload[0]?.payload?.fullName || label}</div>
      <div className="ct-value">{payload[0].value} application{payload[0].value !== 1 ? 's' : ''}</div>
    </div>
  )
}

export default function AppsBarChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 60 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis
          dataKey="name"
          tick={{ fill: '#7070a0', fontSize: 11, fontFamily: 'DM Mono' }}
          angle={-35} textAnchor="end" interval={0}
          axisLine={{ stroke: 'rgba(255,255,255,0.08)' }} tickLine={false}
        />
        <YAxis
          tick={{ fill: '#7070a0', fontSize: 11, fontFamily: 'DM Mono' }}
          axisLine={false} tickLine={false} allowDecimals={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(124,108,250,0.08)' }} />
        <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={48}>
          {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
