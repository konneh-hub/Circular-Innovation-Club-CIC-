import { useEffect, useState } from 'react'
import PageHeader from '../../components/common/PageHeader'
import { fetchMyApplications } from '../../data/internshipData'

const statusStyles = {
  Submitted: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  'Under review': 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  'Interview scheduled': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  Shortlisted: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
}

const MyApplications = () => {
  const [applications, setApplications] = useState(null)

  useEffect(() => {
    fetchMyApplications().then(setApplications)
  }, [])

  if (!applications) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 text-center text-slate-500 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-400">
        Loading your applications...
      </div>
    )
  }

  return (
    <section className="space-y-8">
      <PageHeader title="My applications" subtitle="Review the status of your internship submissions." />

      {applications.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 text-center text-slate-500 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-400">
          No applications yet. Browse open internships to apply.
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((application) => (
            <div key={application.id} className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-950 dark:text-white">{application.title}</h2>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{application.host}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-sm font-semibold ${statusStyles[application.status] || 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'}`}>
                  {application.status}
                </span>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Applied</p>
                  <p className="mt-2 text-base font-semibold text-slate-950 dark:text-white">{application.appliedOn}</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Application ID</p>
                  <p className="mt-2 text-base font-semibold text-slate-950 dark:text-white">{application.id}</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Role</p>
                  <p className="mt-2 text-base font-semibold text-slate-950 dark:text-white">{application.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default MyApplications
