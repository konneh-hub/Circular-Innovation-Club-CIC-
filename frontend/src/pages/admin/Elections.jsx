import { useEffect, useState } from 'react'
import PageHeader from '../../components/common/PageHeader'
import { fetchAdminElections } from '../../data/adminData'

const Elections = () => {
  const [elections, setElections] = useState(null)

  useEffect(() => {
    fetchAdminElections().then(setElections)
  }, [])

  if (!elections) {
    return <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 text-center text-slate-500 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-400">Loading election data...</div>
  }

  return (
    <section className="space-y-8">
      <PageHeader title="Elections" subtitle="Supervise CIC election processes." />
      <div className="space-y-6">
        {elections.map((election) => (
          <div key={election.title} className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-950 dark:text-white">{election.title}</h2>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{election.candidates} candidates</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">{election.stage}</span>
            </div>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">Timeline: {election.date}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Elections
