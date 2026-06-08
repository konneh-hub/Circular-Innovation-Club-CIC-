import { useEffect, useState } from 'react'
import PageHeader from '../../components/common/PageHeader'
import { fetchAdminInternships } from '../../data/adminData'

const Internships = () => {
  const [opportunities, setOpportunities] = useState(null)

  useEffect(() => {
    fetchAdminInternships().then(setOpportunities)
  }, [])

  if (!opportunities) {
    return <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 text-center text-slate-500 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-400">Loading internship opportunities...</div>
  }

  return (
    <section className="space-y-8">
      <PageHeader title="Internships" subtitle="Approve internship programs and placements." />
      <div className="grid gap-6 lg:grid-cols-2">
        {opportunities.map((internship) => (
          <div key={internship.title} className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-slate-950 dark:text-white">{internship.title}</h2>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Location: {internship.location}</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">{internship.status}</span>
            </div>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">Applicants: {internship.applicants}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Internships
