import React from 'react'

const COLORS = {
  active:      'green',
  closed:      'red',
  pending:     'orange',
  shortlisted: 'blue',
  rejected:    'red',
  employer:    'purple',
  candidate:   'teal',
  engineering: 'blue',
  design:      'pink',
  'ai/ml':     'purple',
  marketing:   'orange',
  data:        'teal',
  product:     'green',
  sales:       'yellow',
}

export default function Badge({ text }) {
  const color = COLORS[text?.toLowerCase()] || 'gray'
  return <span className={`badge badge-${color}`}>{text}</span>
}
