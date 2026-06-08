import { useEffect, useState } from 'react'
import PageHeader from '../../components/common/PageHeader'
import { fetchAdminSustainability } from '../../data/adminData'

const Sustainability = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetchAdminSustainability().then(setData)
  }, [])

  if (!data) {
    return <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 text-center text-slate-500 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-400">Loading sustainability metrics...</div>
  }

  return (
    <section className="space-y-8">
      <PageHeader title="Sustainability" subtitle="Track CIC sustainability initiatives." />
      <div className="grid gap-6 md:grid-cols-3">
        {data.metrics.map((metric) => (
          <div key={metric.name} className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
            <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">{metric.name}</p>
            <p className="mt-4 text-3xl font-semibold text-slate-950 dark:text-white">{metric.value}</p>
          </div>
        ))}
      </div>
      <div className="space-y-6 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Initiatives in progress</h2>
        <div className="space-y-4">
          {data.initiatives.map((initiative) => (
            <div key={initiative.title} className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
              <div className="flex items-center justify-between gap-4">
                <p className="font-semibold text-slate-950 dark:text-white">{initiative.title}</p>
                <span className="text-sm text-slate-600 dark:text-slate-400">{initiative.progress}</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                <div className="h-full rounded-full bg-primary" style={{ width: initiative.progress }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Sustainability
