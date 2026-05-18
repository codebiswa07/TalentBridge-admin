import React, { useState, useMemo } from 'react'
import Table from '../components/ui/Table'
import Badge from '../components/ui/Badge'
import SearchBar from '../components/ui/SearchBar'
import Modal from '../components/ui/Modal'
import { Trash2, Eye, Users, Briefcase, UserCheck } from 'lucide-react'

export default function UsersPage({ data }) {
  const { users, jobs, applications, deleteUser } = data
  const [q, setQ]           = useState('')
  const [role, setRole]     = useState('All')
  const [detail, setDetail] = useState(null)
  const [confirmDel, setConfirmDel] = useState(null)

  const filtered = useMemo(() => users.filter(u => {
    const qm = !q || u.name.toLowerCase().includes(q.toLowerCase()) || u.email.toLowerCase().includes(q.toLowerCase())
    const rm = role === 'All' || u.role === role
    return qm && rm
  }), [users, q, role])

  const cols = [
    { key: 'avatar', label: '', style:{width:40}, render: r => (
        <div className="user-avatar">{r.name[0].toUpperCase()}</div>
    )},
    { key: 'name',  label: 'Name', render: r => (
        <div>
          <div className="tbl-primary">{r.name}</div>
          <div className="tbl-secondary tbl-mono">{r.email}</div>
        </div>
    )},
    { key: 'role',  label: 'Role', render: r => <Badge text={r.role} /> },
    { key: 'activity', label: 'Activity', render: r => (
        <span className="tbl-secondary">
          {r.role === 'employer'
            ? `${jobs.filter(j=>j.employerId===r.id).length} jobs posted`
            : `${applications.filter(a=>a.candidateId===r.id).length} applications`
          }
        </span>
    )},
    { key: 'joined', label: 'Joined', render: r => (
        <span className="tbl-mono tbl-secondary">
          {r.joinedAt ? new Date(r.joinedAt).toLocaleDateString('en-IN',{day:'numeric',month:'short'}) : '—'}
        </span>
    )},
    { key: 'actions', label: 'Actions', style:{textAlign:'right'}, render: r => (
        <div className="tbl-actions">
          <button className="tbl-btn" onClick={() => setDetail(r)} title="View"><Eye size={13}/></button>
          <button className="tbl-btn danger" onClick={() => setConfirmDel(r)} title="Delete"><Trash2 size={13}/></button>
        </div>
    )},
  ]

  const employers  = users.filter(u => u.role === 'employer').length
  const candidates = users.filter(u => u.role === 'candidate').length

  return (
    <div className="page-inner">
      <div className="mini-stats">
        <div className="mini-stat"><Users size={14}/> {users.length} Total Users</div>
        <div className="mini-stat"><Briefcase size={14}/> {employers} Employers</div>
        <div className="mini-stat"><UserCheck size={14}/> {candidates} Candidates</div>
      </div>

      <div className="page-controls">
        <SearchBar value={q} onChange={setQ} placeholder="Search by name or email…" />
        <div className="filter-row">
          <select value={role} onChange={e => setRole(e.target.value)} className="select-pill">
            <option value="All">All Roles</option>
            <option value="employer">Employer</option>
            <option value="candidate">Candidate</option>
          </select>
        </div>
        <div className="result-count">{filtered.length} result{filtered.length!==1?'s':''}</div>
      </div>

      <Table columns={cols} data={filtered} emptyMsg="No users found" />

      {detail && (
        <Modal title="User Profile" onClose={() => setDetail(null)} size="sm">
          <div className="detail-modal">
            <div className="dm-header centered">
              <div className="user-avatar large">{detail.name[0].toUpperCase()}</div>
              <div className="dm-title">{detail.name}</div>
              <div className="dm-company">{detail.email}</div>
              <Badge text={detail.role} />
            </div>
            <div className="dm-grid">
              <div><span className="dm-key">Role</span><Badge text={detail.role}/></div>
              <div><span className="dm-key">User ID</span><span className="dm-val tbl-mono">{detail.id}</span></div>
              {detail.role === 'employer'
                ? <div><span className="dm-key">Jobs Posted</span><span className="dm-val">{jobs.filter(j=>j.employerId===detail.id).length}</span></div>
                : <div><span className="dm-key">Applications</span><span className="dm-val">{applications.filter(a=>a.candidateId===detail.id).length}</span></div>
              }
            </div>
          </div>
        </Modal>
      )}

      {confirmDel && (
        <Modal title="Delete User" onClose={() => setConfirmDel(null)} size="sm">
          <div className="confirm-modal">
            <p>Remove <strong>{confirmDel.name}</strong> from the platform?</p>
            <div className="confirm-actions">
              <button className="btn-ghost" onClick={() => setConfirmDel(null)}>Cancel</button>
              <button className="btn-danger" onClick={() => { deleteUser(confirmDel.id); setConfirmDel(null) }}>Delete</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
