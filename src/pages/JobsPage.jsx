import React, { useState, useMemo } from 'react'
import Table from '../components/ui/Table'
import Badge from '../components/ui/Badge'
import SearchBar from '../components/ui/SearchBar'
import Modal from '../components/ui/Modal'
import { Trash2, ToggleLeft, ToggleRight, Eye, Filter } from 'lucide-react'

const CATS = ['All','Engineering','Design','Marketing','AI/ML','Data','Product','Sales']

export default function JobsPage({ data }) {
  const { jobs, applications, deleteJob, toggleJobStatus } = data
  const [q, setQ]         = useState('')
  const [cat, setCat]     = useState('All')
  const [status, setStatus] = useState('All')
  const [detail, setDetail] = useState(null)
  const [confirmDel, setConfirmDel] = useState(null)

  const filtered = useMemo(() => jobs.filter(j => {
    const qm = !q || j.title.toLowerCase().includes(q.toLowerCase()) || j.company.toLowerCase().includes(q.toLowerCase())
    const cm = cat === 'All' || j.category === cat
    const sm = status === 'All' || (status === 'active' ? j.status !== 'closed' : j.status === 'closed')
    return qm && cm && sm
  }), [jobs, q, cat, status])

  const cols = [
    { key: 'logo',    label: '',        style:{width:40}, render: r => <span className="tbl-logo">{r.logo}</span> },
    { key: 'title',   label: 'Job Title', render: r => (
        <div>
          <div className="tbl-primary">{r.title}</div>
          <div className="tbl-secondary">{r.company}</div>
        </div>
    )},
    { key: 'location',label: 'Location', render: r => <span className="tbl-mono">{r.location}</span> },
    { key: 'category',label: 'Category', render: r => <Badge text={r.category} /> },
    { key: 'type',    label: 'Type',     render: r => <Badge text={r.type} /> },
    { key: 'apps',    label: 'Apps',     style:{textAlign:'center'}, render: r => (
        <span className="apps-count">{applications.filter(a => a.jobId === r.id).length}</span>
    )},
    { key: 'status',  label: 'Status',   render: r => <Badge text={r.status || 'active'} /> },
    { key: 'actions', label: 'Actions',  style:{textAlign:'right'}, render: r => (
        <div className="tbl-actions">
          <button className="tbl-btn" onClick={() => setDetail(r)} title="Details"><Eye size={13}/></button>
          <button className="tbl-btn toggle" onClick={() => toggleJobStatus(r.id)} title="Toggle status">
            {(r.status||'active') === 'active' ? <ToggleRight size={15}/> : <ToggleLeft size={15}/>}
          </button>
          <button className="tbl-btn danger" onClick={() => setConfirmDel(r)} title="Delete"><Trash2 size={13}/></button>
        </div>
    )},
  ]

  return (
    <div className="page-inner">
      <div className="page-controls">
        <SearchBar value={q} onChange={setQ} placeholder="Search by title or company…" />
        <div className="filter-row">
          <Filter size={14} className="filter-icon" />
          <select value={cat} onChange={e => setCat(e.target.value)} className="select-pill">
            {CATS.map(c => <option key={c}>{c}</option>)}
          </select>
          <select value={status} onChange={e => setStatus(e.target.value)} className="select-pill">
            <option value="All">All Status</option>
            <option value="active">Active</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        <div className="result-count">{filtered.length} result{filtered.length!==1?'s':''}</div>
      </div>

      <Table columns={cols} data={filtered} emptyMsg="No jobs match your filters" />

      {detail && (
        <Modal title="Job Details" onClose={() => setDetail(null)} size="lg">
          <div className="detail-modal">
            <div className="dm-header">
              <span className="dm-logo">{detail.logo}</span>
              <div>
                <div className="dm-title">{detail.title}</div>
                <div className="dm-company">{detail.company} · {detail.location}</div>
              </div>
            </div>
            <div className="dm-grid">
              <div><span className="dm-key">Category</span><Badge text={detail.category}/></div>
              <div><span className="dm-key">Type</span><Badge text={detail.type}/></div>
              <div><span className="dm-key">Salary</span><span className="dm-val">{detail.salary}</span></div>
              <div><span className="dm-key">Status</span><Badge text={detail.status||'active'}/></div>
              <div><span className="dm-key">Applications</span><span className="dm-val">{applications.filter(a=>a.jobId===detail.id).length}</span></div>
              <div><span className="dm-key">Posted</span><span className="dm-val">{new Date(detail.postedAt).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}</span></div>
            </div>
            <div className="dm-section"><div className="dm-key">Description</div><p className="dm-desc">{detail.description}</p></div>
            {detail.requirements?.length > 0 && (
              <div className="dm-section">
                <div className="dm-key">Requirements</div>
                <div className="dm-tags">{detail.requirements.map((r,i)=><span key={i} className="req-tag">{r}</span>)}</div>
              </div>
            )}
          </div>
        </Modal>
      )}

      {confirmDel && (
        <Modal title="Confirm Delete" onClose={() => setConfirmDel(null)} size="sm">
          <div className="confirm-modal">
            <p>Delete <strong>{confirmDel.title}</strong>? This will also remove all related applications.</p>
            <div className="confirm-actions">
              <button className="btn-ghost" onClick={() => setConfirmDel(null)}>Cancel</button>
              <button className="btn-danger" onClick={() => { deleteJob(confirmDel.id); setConfirmDel(null) }}>Delete</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
