import { useEffect, useState } from 'react'
import PageHeader from '../../components/common/PageHeader'
import ActivityChart from '../../components/dashboard/ActivityChart'
import { fetchAdminDashboard } from '../../data/adminData'

const statClass =
  'rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95'

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null)

  useEffect(() => {
    fetchAdminDashboard().then(setDashboard)
  }, [])

  if (!dashboard) {
    return <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 text-center text-slate-500 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-400">Loading dashboard...</div>
  }

  const lineChartData = {
    labels: dashboard.monthlySummary.labels,
    datasets: [
      {
        label: 'Projects',
        data: dashboard.monthlySummary.projects,
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.12)',
        tension: 0.35,
      },
      {
        label: 'Events',
        data: dashboard.monthlySummary.events,
        borderColor: '#ec4899',
        backgroundColor: 'rgba(236, 72, 153, 0.14)',
        tension: 0.35,
      },
    ],
  }

  const barChartData = {
    labels: dashboard.reportBreakdown.labels,
    datasets: [
      {
        label: 'Items',
        data: dashboard.reportBreakdown.values,
        backgroundColor: ['#0ea5e9', '#22c55e', '#f59e0b', '#a855f7', '#f97316'],
      },
    ],
  }

  return (
    <section className="space-y-8">
      <PageHeader title="Admin Dashboard" subtitle="View CIC analytics, operational metrics, and recent activity." />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <div className={statClass}>
          <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Total members</p>
          <p className="mt-4 text-4xl font-semibold text-slate-950 dark:text-white">{dashboard.totalMembers}</p>
        </div>
        <div className={statClass}>
          <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Active projects</p>
          <p className="mt-4 text-4xl font-semibold text-slate-950 dark:text-white">{dashboard.activeProjects}</p>
        </div>
        <div className={statClass}>
          <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Upcoming events</p>
          <p className="mt-4 text-4xl font-semibold text-slate-950 dark:text-white">{dashboard.upcomingEvents}</p>
        </div>
        <div className={statClass}>
          <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Competitions</p>
          <p className="mt-4 text-4xl font-semibold text-slate-950 dark:text-white">{dashboard.competitions}</p>
        </div>
        <div className={statClass}>
          <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Funding requests</p>
          <p className="mt-4 text-4xl font-semibold text-slate-950 dark:text-white">{dashboard.fundingRequests}</p>
        </div>
        <div className={statClass}>
          <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Internship opportunities</p>
          <p className="mt-4 text-4xl font-semibold text-slate-950 dark:text-white">{dashboard.internshipOpportunities}</p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
          <h2 className="mb-5 text-xl font-semibold text-slate-950 dark:text-white">Monthly activity overview</h2>
          <ActivityChart type="line" data={lineChartData} />
        </div>
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
            <h2 className="mb-5 text-xl font-semibold text-slate-950 dark:text-white">Report breakdown</h2>
            <ActivityChart type="bar" data={barChartData} options={{ indexAxis: 'y' }} />
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
            <h2 className="mb-5 text-xl font-semibold text-slate-950 dark:text-white">Recent activity</h2>
            <ul className="space-y-4">
              {dashboard.recentItems.map((item) => (
                <li key={item.label} className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                  <p className="text-sm font-semibold text-slate-950 dark:text-white">{item.label}</p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{item.value}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Dashboard
