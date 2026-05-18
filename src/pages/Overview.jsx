import React from 'react'
import { Briefcase, Users, FileText, CheckCircle, TrendingUp, Activity } from 'lucide-react'
import StatCard from '../components/ui/StatCard'
import AppsBarChart from '../components/charts/BarChart'
import DailyAreaChart from '../components/charts/LineChart'
import DonutStatus from '../components/charts/DonutStatus'
import CategoryPieChart from '../components/charts/PieChart'

export default function Overview({ data, setActive }) {
  const { jobs, users, applications, activeJobs, employers, candidates, appsByJob, jobsByCategory, statusCounts, dailyApps } = data

  const recentApps = [...applications]
    .sort((a,b) => new Date(b.appliedAt) - new Date(a.appliedAt))
    .slice(0, 5)
    .map(app => ({ ...app, job: jobs.find(j => j.id === app.jobId) }))

  return (
    <div className="page-inner">
      {/* STAT CARDS */}
      <div className="stats-grid">
        <StatCard label="Total Jobs"       value={jobs.length}         sub="All listings"           icon={Briefcase}    color="violet" trend={12}  trendLabel="this month" onClick={() => setActive('jobs')} />
        <StatCard label="Total Users"      value={users.length}        sub={`${employers.length} employers · ${candidates.length} candidates`} icon={Users} color="blue" trend={8} onClick={() => setActive('users')} />
        <StatCard label="Applications"     value={applications.length} sub="Across all jobs"        icon={FileText}     color="teal"   trend={23}  trendLabel="this week"  onClick={() => setActive('applicants')} />
        <StatCard label="Active Jobs"      value={activeJobs.length}   sub={`${jobs.length - activeJobs.length} closed`} icon={CheckCircle} color="green" trend={5} />
      </div>

      {/* ROW 1: Bar chart + Area chart */}
      <div className="charts-row-2">
        <div className="chart-card wide">
          <div className="chart-card-hd">
            <div>
              <div className="chart-title">Applications per Job</div>
              <div className="chart-sub">Top listings by application volume</div>
            </div>
            <Activity size={16} className="chart-icon" />
          </div>
          <AppsBarChart data={appsByJob} />
        </div>
        <div className="chart-card">
          <div className="chart-card-hd">
            <div>
              <div className="chart-title">Daily Applications</div>
              <div className="chart-sub">Last 7 days trend</div>
            </div>
            <TrendingUp size={16} className="chart-icon" />
          </div>
          <DailyAreaChart data={dailyApps} />
        </div>
      </div>

      {/* ROW 2: Pie + Donut + Recent activity */}
      <div className="charts-row-3">
        <div className="chart-card">
          <div className="chart-card-hd">
            <div>
              <div className="chart-title">Jobs by Category</div>
              <div className="chart-sub">Distribution across sectors</div>
            </div>
          </div>
          <CategoryPieChart data={jobsByCategory} />
        </div>

        <div className="chart-card">
          <div className="chart-card-hd">
            <div>
              <div className="chart-title">Application Status</div>
              <div className="chart-sub">Review pipeline breakdown</div>
            </div>
          </div>
          <DonutStatus data={statusCounts} />
        </div>

        <div className="chart-card">
          <div className="chart-card-hd">
            <div>
              <div className="chart-title">Recent Applications</div>
              <div className="chart-sub">Latest submissions</div>
            </div>
          </div>
          <div className="recent-list">
            {recentApps.length === 0
              ? <div className="empty-mini">No applications yet</div>
              : recentApps.map(app => (
                  <div key={app.id} className="recent-item">
                    <div className="recent-avatar">{app.candidateName[0]}</div>
                    <div className="recent-info">
                      <div className="recent-name">{app.candidateName}</div>
                      <div className="recent-job">{app.job?.title || '—'}</div>
                    </div>
                    <span className={`status-pill st-${app.status.toLowerCase()}`}>{app.status}</span>
                  </div>
                ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}
