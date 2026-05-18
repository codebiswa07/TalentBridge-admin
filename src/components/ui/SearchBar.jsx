import React from 'react'
import { Search, X } from 'lucide-react'

export default function SearchBar({ value, onChange, placeholder = 'Search…' }) {
  return (
    <div className="search-bar">
      <Search size={15} className="search-icon" />
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
      {value && <button className="search-clear" onClick={() => onChange('')}><X size={13} /></button>}
    </div>
  )
}
