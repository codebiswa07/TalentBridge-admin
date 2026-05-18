import React, { useState } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Sector } from 'recharts'

const COLORS = ['#7c6cfa','#6cbcfa','#6cfaa8','#fac06c','#fa6c7c','#d46cfa','#fa9a6c','#6ce4fa']

const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props
  return (
    <g>
      <Sector cx={cx} cy={cy} innerRadius={innerRadius - 4} outerRadius={outerRadius + 8}
        startAngle={startAngle} endAngle={endAngle} fill={fill} opacity={0.9} />
    </g>
  )
}

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="chart-tooltip">
      <div className="ct-label">{payload[0].name}</div>
      <div className="ct-value">{payload[0].value} job{payload[0].value !== 1 ? 's' : ''}</div>
    </div>
  )
}

export default function CategoryPieChart({ data }) {
  const [activeIdx, setActiveIdx] = useState(null)

  return (
    <div className="pie-wrap">
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data} cx="50%" cy="50%"
            innerRadius={60} outerRadius={90}
            dataKey="value" nameKey="name"
            activeIndex={activeIdx}
            activeShape={renderActiveShape}
            onMouseEnter={(_, i) => setActiveIdx(i)}
            onMouseLeave={() => setActiveIdx(null)}
            paddingAngle={3}
          >
            {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="none" />)}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="pie-legend">
        {data.map((d, i) => (
          <div key={d.name} className="legend-item">
            <span className="legend-dot" style={{ background: COLORS[i % COLORS.length] }} />
            <span className="legend-name">{d.name}</span>
            <span className="legend-val">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
