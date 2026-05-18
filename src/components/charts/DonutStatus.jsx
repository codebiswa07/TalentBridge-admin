import React from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

const STATUS_COLORS = { Pending: '#fac06c', Shortlisted: '#6cfaa8', Rejected: '#fa6c7c' }

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="chart-tooltip">
      <div className="ct-label">{payload[0].name}</div>
      <div className="ct-value">{payload[0].value}</div>
    </div>
  )
}

export default function DonutStatus({ data }) {
  const chartData = Object.entries(data).map(([name, value]) => ({ name, value }))
  const total = chartData.reduce((s, d) => s + d.value, 0)

  return (
    <div className="donut-wrap">
      <div className="donut-chart-area">
        <ResponsiveContainer width={160} height={160}>
          <PieChart>
            <Pie data={chartData} cx="50%" cy="50%" innerRadius={50} outerRadius={70}
              dataKey="value" paddingAngle={4}>
              {chartData.map((d) => <Cell key={d.name} fill={STATUS_COLORS[d.name]} stroke="none" />)}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="donut-center">
          <div className="donut-total">{total}</div>
          <div className="donut-label">Total</div>
        </div>
      </div>
      <div className="donut-legend">
        {chartData.map(d => (
          <div key={d.name} className="donut-row">
            <span className="legend-dot" style={{ background: STATUS_COLORS[d.name] }} />
            <span className="donut-name">{d.name}</span>
            <span className="donut-val">{d.value}</span>
            <span className="donut-pct">{total ? Math.round(d.value/total*100) : 0}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
