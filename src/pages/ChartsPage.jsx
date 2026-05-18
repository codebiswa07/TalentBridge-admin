import React from 'react'
import AppsBarChart    from '../components/charts/BarChart'
import CategoryPieChart from '../components/charts/PieChart'
import DailyAreaChart  from '../components/charts/LineChart'
import DonutStatus     from '../components/charts/DonutStatus'
import { Activity, PieChart, TrendingUp, Layers } from 'lucide-react'

export default function ChartsPage({ data }) {
  const { appsByJob, jobsByCategory, statusCounts, dailyApps, jobs, applications, activeJobs } = data

  const topJobs = [...appsByJob].slice(0, 5)
  const convRate = jobs.length > 0 ? Math.round(applications.length / jobs.length * 10) / 10 : 0

  return (
    <div className="page-inner">
      {/* KPI row */}
      <div className="kpi-row">
        <div className="kpi-card"><div className="kpi-val">{convRate}</div><div className="kpi-label">Avg. apps / job</div></div>
        <div className="kpi-card"><div className="kpi-val">{activeJobs.length}</div><div className="kpi-label">Active listings</div></div>
        <div className="kpi-card"><div className="kpi-val">{statusCounts.Shortlisted}</div><div className="kpi-label">Shortlisted</div></div>
        <div className="kpi-card">
          <div className="kpi-val">{applications.length > 0 ? Math.round(statusCounts.Shortlisted/applications.length*100) : 0}%</div>
          <div className="kpi-label">Shortlist rate</div>
        </div>
      </div>

      <div className="charts-row-2">
        <div className="chart-card wide">
          <div className="chart-card-hd">
            <div>
              <div className="chart-title">Applications per Job</div>
              <div className="chart-sub">Full breakdown across all listings</div>
            </div>
            <Activity size={16} className="chart-icon" />
          </div>
          <AppsBarChart data={appsByJob} />
        </div>

        <div className="chart-card">
          <div className="chart-card-hd">
            <div>
              <div className="chart-title">Application Trend</div>
              <div className="chart-sub">Daily volume — last 7 days</div>
            </div>
            <TrendingUp size={16} className="chart-icon" />
          </div>
          <DailyAreaChart data={dailyApps} />
        </div>
      </div>

      <div className="charts-row-2">
        <div className="chart-card">
          <div className="chart-card-hd">
            <div>
              <div className="chart-title">Jobs by Category</div>
              <div className="chart-sub">Sector distribution</div>
            </div>
            <PieChart size={16} className="chart-icon" />
          </div>
          <CategoryPieChart data={jobsByCategory} />
        </div>

        <div className="chart-card">
          <div className="chart-card-hd">
            <div>
              <div className="chart-title">Application Status Mix</div>
              <div className="chart-sub">Pipeline health snapshot</div>
            </div>
            <Layers size={16} className="chart-icon" />
          </div>
          <DonutStatus data={statusCounts} />
        </div>

        <div className="chart-card">
          <div className="chart-card-hd">
            <div>
              <div className="chart-title">Top 5 Jobs</div>
              <div className="chart-sub">By application count</div>
            </div>
          </div>
          <div className="top-jobs-list">
            {topJobs.map((j, i) => (
              <div key={j.name} className="top-job-row">
                <div className="tj-rank">#{i + 1}</div>
                <div className="tj-logo">{j.logo}</div>
                <div className="tj-info">
                  <div className="tj-title">{j.fullName}</div>
                  <div className="tj-company">{j.company}</div>
                </div>
                <div className="tj-bar-wrap">
                  <div className="tj-bar" style={{ width: `${appsByJob[0]?.count ? (j.count / appsByJob[0].count) * 100 : 0}%` }} />
                </div>
                <div className="tj-count">{j.count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
