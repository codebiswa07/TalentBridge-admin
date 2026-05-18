import { useState, useEffect, useCallback } from 'react'
import { read, write, KEYS, ensureData } from '../utils/storage'

export function useData() {
  const [jobs, setJobs]               = useState([])
  const [users, setUsers]             = useState([])
  const [applications, setApps]       = useState([])
  const [lastRefresh, setLastRefresh] = useState(Date.now())

  useEffect(() => {
    ensureData()
    setJobs(read(KEYS.JOBS))
    setUsers(read(KEYS.USERS))
    setApps(read(KEYS.APPLICATIONS))
  }, [lastRefresh])

  const refresh = useCallback(() => setLastRefresh(Date.now()), [])

  const deleteJob = useCallback((id) => {
    const updated = read(KEYS.JOBS).filter(j => j.id !== id)
    write(KEYS.JOBS, updated)
    const updatedApps = read(KEYS.APPLICATIONS).filter(a => a.jobId !== id)
    write(KEYS.APPLICATIONS, updatedApps)
    refresh()
  }, [refresh])

  const deleteUser = useCallback((id) => {
    const updated = read(KEYS.USERS).filter(u => u.id !== id)
    write(KEYS.USERS, updated)
    refresh()
  }, [refresh])

  const deleteApplication = useCallback((id) => {
    const updated = read(KEYS.APPLICATIONS).filter(a => a.id !== id)
    write(KEYS.APPLICATIONS, updated)
    refresh()
  }, [refresh])

  const updateAppStatus = useCallback((id, status) => {
    const updated = read(KEYS.APPLICATIONS).map(a => a.id === id ? { ...a, status } : a)
    write(KEYS.APPLICATIONS, updated)
    refresh()
  }, [refresh])

  const toggleJobStatus = useCallback((id) => {
    const updated = read(KEYS.JOBS).map(j =>
      j.id === id ? { ...j, status: j.status === 'active' ? 'closed' : 'active' } : j
    )
    write(KEYS.JOBS, updated)
    refresh()
  }, [refresh])

  // ── derived analytics ──
  const employers   = users.filter(u => u.role === 'employer')
  const candidates  = users.filter(u => u.role === 'candidate')
  const activeJobs  = jobs.filter(j => j.status !== 'closed')
  const closedJobs  = jobs.filter(j => j.status === 'closed')

  const appsByJob = jobs.map(j => ({
    name: j.title.length > 18 ? j.title.slice(0, 18) + '…' : j.title,
    fullName: j.title,
    company: j.company,
    count: applications.filter(a => a.jobId === j.id).length,
    logo: j.logo,
  })).sort((a, b) => b.count - a.count)

  const catCounts = jobs.reduce((acc, j) => {
    acc[j.category] = (acc[j.category] || 0) + 1
    return acc
  }, {})
  const jobsByCategory = Object.entries(catCounts).map(([name, value]) => ({ name, value }))

  const statusCounts = {
    Pending:     applications.filter(a => a.status === 'Pending').length,
    Shortlisted: applications.filter(a => a.status === 'Shortlisted').length,
    Rejected:    applications.filter(a => a.status === 'Rejected').length,
  }

  // monthly trend (last 7 days apps)
  const dailyApps = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (6 - i))
    const label = d.toLocaleDateString('en-IN', { weekday: 'short' })
    const count = applications.filter(a => {
      const ad = new Date(a.appliedAt)
      return ad.getDate() === d.getDate() && ad.getMonth() === d.getMonth()
    }).length
    return { label, count }
  })

  return {
    jobs, users, applications, employers, candidates,
    activeJobs, closedJobs, appsByJob, jobsByCategory,
    statusCounts, dailyApps, refresh,
    deleteJob, deleteUser, deleteApplication, updateAppStatus, toggleJobStatus,
  }
}
