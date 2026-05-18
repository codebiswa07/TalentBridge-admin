import React from 'react'

export default function Table({ columns, data, emptyMsg = 'No data' }) {
  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>{columns.map(c => <th key={c.key} style={c.style}>{c.label}</th>)}</tr>
        </thead>
        <tbody>
          {data.length === 0
            ? <tr><td colSpan={columns.length} className="table-empty">{emptyMsg}</td></tr>
            : data.map((row, i) => (
                <tr key={row.id || i} className="table-row">
                  {columns.map(c => (
                    <td key={c.key} style={c.style}>
                      {c.render ? c.render(row) : row[c.key]}
                    </td>
                  ))}
                </tr>
              ))
          }
        </tbody>
      </table>
    </div>
  )
}
