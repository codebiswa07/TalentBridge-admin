import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import TopBar  from './components/TopBar'
import Overview    from './pages/Overview'
import JobsPage    from './pages/JobsPage'
import UsersPage   from './pages/UsersPage'
import ApplicantsPage from './pages/ApplicantsPage'
import ChartsPage  from './pages/ChartsPage'
import { useData } from './hooks/useData'

export default function App() {
  const [active, setActive]     = useState('overview')
  const [sideOpen, setSideOpen] = useState(false)
  const data = useData()

  const pages = {
    overview:   <Overview    data={data} setActive={setActive} />,
    jobs:       <JobsPage    data={data} />,
    users:      <UsersPage   data={data} />,
    applicants: <ApplicantsPage data={data} />,
    charts:     <ChartsPage  data={data} />,
  }

  return (
    <div className="app-shell">
      <Sidebar active={active} setActive={setActive} open={sideOpen} setOpen={setSideOpen} data={data} />
      <div className={`main-area ${sideOpen ? 'shifted' : ''}`}>
        <TopBar onMenu={() => setSideOpen(v => !v)} active={active} data={data} />
        <div className="page-content">
          {pages[active] || pages.overview}
        </div>
      </div>
    </div>
  )
}
