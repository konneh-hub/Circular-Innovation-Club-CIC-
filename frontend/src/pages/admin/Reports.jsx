import { useEffect, useState } from 'react'
import PageHeader from '../../components/common/PageHeader'
import ActivityChart from '../../components/dashboard/ActivityChart'
import { fetchAdminReports } from '../../data/adminData'

const Reports = () => {
  const [reports, setReports] = useState(null)

  useEffect(() => {
    fetchAdminReports().then(setReports)
  }, [])

  if (!reports) {
    return <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 text-center text-slate-500 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-400">Loading reports...</div>
  }

  const chartData = {
    labels: reports.overview.map((item) => item.title),
    datasets: [
      {
        label: 'Performance',
        data: [12, 9, 14],
        backgroundColor: ['#22c55e', '#0ea5e9', '#f59e0b'],
      },
    ],
  }

  return (
    <section className="space-y-8">
      <PageHeader title="Reports" subtitle="View analytics and performance metrics." />
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
          <h2 className="mb-5 text-xl font-semibold text-slate-950 dark:text-white">Performance summary</h2>
          <ActivityChart data={chartData} />
        </div>
        <div className="space-y-6 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
          <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Report overview</h2>
          <div className="space-y-4">
            {reports.overview.map((item) => (
              <div key={item.title} className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                <p className="font-semibold text-slate-950 dark:text-white">{item.title}</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Report queue</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {reports.reportItems.map((item) => (
            <div key={item.title} className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-900">
              <p className="font-semibold text-slate-950 dark:text-white">{item.title}</p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Status: {item.status}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Reports
