import React, { useState } from 'react'
import { Menu, Bell, RefreshCw, ChevronDown, User, LogOut, Settings } from 'lucide-react'

const PAGE_TITLES = {
  overview:   { title: 'Overview',    sub: 'Platform health at a glance' },
  jobs:       { title: 'Job Manager', sub: 'View and manage all listings' },
  users:      { title: 'User Base',   sub: 'Employers and candidates' },
  applicants: { title: 'Applicants',  sub: 'All submitted applications' },
  charts:     { title: 'Analytics',   sub: 'Visual insights & trends' },
}

export default function TopBar({ onMenu, active, data }) {
  const [profileOpen, setProfileOpen] = useState(false)
  const info = PAGE_TITLES[active] || PAGE_TITLES.overview

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="topbar-menu-btn" onClick={onMenu}><Menu size={20} /></button>
        <div>
          <div className="topbar-title">{info.title}</div>
          <div className="topbar-sub">{info.sub}</div>
        </div>
      </div>
      <div className="topbar-right">
        <button className="topbar-icon-btn" onClick={data.refresh} title="Refresh data">
          <RefreshCw size={16} />
        </button>
        <button className="topbar-icon-btn notif-btn" title="Notifications">
          <Bell size={16} />
          <span className="notif-dot" />
        </button>
        <div className="topbar-profile" onClick={() => setProfileOpen(v => !v)}>
          <div className="profile-avatar">A</div>
          <div className="profile-info">
            <div className="profile-name">Admin</div>
            <div className="profile-role">Super Admin</div>
          </div>
          <ChevronDown size={14} className={`profile-chevron ${profileOpen ? 'open' : ''}`} />
          {profileOpen && (
            <div className="profile-dropdown">
              <div className="dropdown-item"><User size={14} /> Profile</div>
              <div className="dropdown-item"><Settings size={14} /> Settings</div>
              <div className="dropdown-divider" />
              <div className="dropdown-item danger"><LogOut size={14} /> Logout</div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
