import React, { useState, useMemo } from 'react'
import Table from '../components/ui/Table'
import Badge from '../components/ui/Badge'
import SearchBar from '../components/ui/SearchBar'
import Modal from '../components/ui/Modal'
import { Trash2, Eye, ChevronDown } from 'lucide-react'

const STATUSES = ['All', 'Pending', 'Shortlisted', 'Rejected']

export default function ApplicantsPage({ data }) {
  const { applications, jobs, deleteApplication, updateAppStatus } = data
  const [q, setQ]           = useState('')
  const [status, setStatus] = useState('All')
  const [detail, setDetail] = useState(null)
  const [confirmDel, setConfirmDel] = useState(null)

  const enriched = useMemo(() =>
    applications.map(a => ({ ...a, job: jobs.find(j => j.id === a.jobId) }))
  , [applications, jobs])

  const filtered = useMemo(() => enriched.filter(a => {
    const qm = !q
      || a.candidateName.toLowerCase().includes(q.toLowerCase())
      || a.candidateEmail.toLowerCase().includes(q.toLowerCase())
      || a.job?.title.toLowerCase().includes(q.toLowerCase())
    const sm = status === 'All' || a.status === status
    return qm && sm
  }), [enriched, q, status])

  const cols = [
    { key: 'avatar', label: '', style:{width:40}, render: r => (
        <div className="user-avatar sm">{r.candidateName[0]}</div>
    )},
    { key: 'candidate', label: 'Candidate', render: r => (
        <div>
          <div className="tbl-primary">{r.candidateName}</div>
          <div className="tbl-secondary tbl-mono">{r.candidateEmail}</div>
        </div>
    )},
    { key: 'job', label: 'Applied For', render: r => (
        <div>
          <div className="tbl-primary">{r.job?.title || '—'}</div>
          <div className="tbl-secondary">{r.job?.company}</div>
        </div>
    )},
    { key: 'appliedAt', label: 'Date', render: r => (
        <span className="tbl-mono tbl-secondary">
          {new Date(r.appliedAt).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'2-digit'})}
        </span>
    )},
    { key: 'status', label: 'Status', render: r => (
        <div className="status-select-wrap">
          <select
            value={r.status}
            onChange={e => updateAppStatus(r.id, e.target.value)}
            className={`status-select st-${r.status.toLowerCase()}`}
          >
            {['Pending','Shortlisted','Rejected'].map(s => <option key={s}>{s}</option>)}
          </select>
          <ChevronDown size={10} className="ss-chevron" />
        </div>
    )},
    { key: 'actions', label: '', style:{textAlign:'right'}, render: r => (
        <div className="tbl-actions">
          <button className="tbl-btn" onClick={() => setDetail(r)} title="Details"><Eye size={13}/></button>
          <button className="tbl-btn danger" onClick={() => setConfirmDel(r)} title="Delete"><Trash2 size={13}/></button>
        </div>
    )},
  ]

  return (
    <div className="page-inner">
      <div className="page-controls">
        <SearchBar value={q} onChange={setQ} placeholder="Search candidate, email, or job…" />
        <div className="filter-row">
          {STATUSES.map(s => (
            <button key={s} className={`chip-filter ${status===s?'active':''}`} onClick={() => setStatus(s)}>{s}</button>
          ))}
        </div>
        <div className="result-count">{filtered.length} result{filtered.length!==1?'s':''}</div>
      </div>

      <Table columns={cols} data={filtered} emptyMsg="No applications found" />

      {detail && (
        <Modal title="Application Detail" onClose={() => setDetail(null)} size="md">
          <div className="detail-modal">
            <div className="dm-header">
              <div className="user-avatar">{detail.candidateName[0]}</div>
              <div>
                <div className="dm-title">{detail.candidateName}</div>
                <div className="dm-company">{detail.candidateEmail}</div>
              </div>
            </div>
            <div className="dm-grid">
              <div><span className="dm-key">Applied For</span><span className="dm-val">{detail.job?.title || '—'}</span></div>
              <div><span className="dm-key">Company</span><span className="dm-val">{detail.job?.company}</span></div>
              <div><span className="dm-key">Status</span><Badge text={detail.status}/></div>
              <div><span className="dm-key">Date</span><span className="dm-val tbl-mono">{new Date(detail.appliedAt).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})}</span></div>
            </div>
            {detail.coverLetter && (
              <div className="dm-section">
                <div className="dm-key">Cover Letter</div>
                <div className="cover-box">{detail.coverLetter}</div>
              </div>
            )}
          </div>
        </Modal>
      )}

      {confirmDel && (
        <Modal title="Delete Application" onClose={() => setConfirmDel(null)} size="sm">
          <div className="confirm-modal">
            <p>Remove <strong>{confirmDel.candidateName}</strong>'s application for <strong>{confirmDel.job?.title}</strong>?</p>
            <div className="confirm-actions">
              <button className="btn-ghost" onClick={() => setConfirmDel(null)}>Cancel</button>
              <button className="btn-danger" onClick={() => { deleteApplication(confirmDel.id); setConfirmDel(null) }}>Delete</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
