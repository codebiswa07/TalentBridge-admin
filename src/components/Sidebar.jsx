import React from 'react'
import { LayoutDashboard, BriefcaseBusiness, Users, FileText, BarChart2, X, Shield, TrendingUp } from 'lucide-react'

const NAV = [
  { id: 'overview',   icon: LayoutDashboard,    label: 'Overview'    },
  { id: 'jobs',       icon: BriefcaseBusiness,  label: 'Jobs'        },
  { id: 'applicants', icon: FileText,           label: 'Applicants'  },
  { id: 'users',      icon: Users,              label: 'Users'       },
  { id: 'charts',     icon: BarChart2,          label: 'Analytics'   },
]

export default function Sidebar({ active, setActive, open, setOpen, data }) {
  const { jobs, users, applications } = data

  return (
    <>
      {open && <div className="side-overlay" onClick={() => setOpen(false)} />}
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="side-brand">
          <div className="brand-icon"><BriefcaseBusiness size={16} /></div>
          <div>
            <div className="brand-name">TalentBridge</div>
            <div className="brand-sub">Admin Console</div>
          </div>
          <button className="side-close" onClick={() => setOpen(false)}><X size={16} /></button>
        </div>

        <div className="side-section-label">NAVIGATION</div>
        <nav className="side-nav">
          {NAV.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              className={`nav-item ${active === id ? 'active' : ''}`}
              onClick={() => { setActive(id); setOpen(false) }}
            >
              <Icon size={16} />
              <span>{label}</span>
              {id === 'jobs'       && <span className="nav-badge">{jobs.length}</span>}
              {id === 'users'      && <span className="nav-badge">{users.length}</span>}
              {id === 'applicants' && <span className="nav-badge">{applications.length}</span>}
            </button>
          ))}
        </nav>

        <div className="side-section-label" style={{marginTop:'auto'}}>SYSTEM</div>
        <div className="side-health">
          <div className="health-row">
            <span>Data Source</span>
            <span className="health-ok">● localStorage</span>
          </div>
          <div className="health-row">
            <span>Total Records</span>
            <span>{jobs.length + users.length + applications.length}</span>
          </div>
          <div className="health-row">
            <span>Last Sync</span>
            <span>{new Date().toLocaleTimeString('en-IN', {hour:'2-digit',minute:'2-digit'})}</span>
          </div>
        </div>
      </aside>
    </>
  )
}
