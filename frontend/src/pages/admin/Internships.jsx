import { useEffect, useState } from 'react'
import PageHeader from '../../components/common/PageHeader'
import { fetchEmployerDashboard } from '../../data/internshipData'

const statusStyles = {
  Pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  Shortlisted: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  Interview: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
  Active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
}

const Internships = () => {
  const [dashboard, setDashboard] = useState(null)

  useEffect(() => {
    fetchEmployerDashboard().then(setDashboard)
  }, [])

  if (!dashboard) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 text-center text-slate-500 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-400">
        Loading employer dashboard...
      </div>
    )
  }

  return (
    <section className="space-y-8">
      <PageHeader title="Employer dashboard" subtitle="Manage internship listings, review applications, and track employer placement progress." />

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
          <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Open positions</p>
          <p className="mt-4 text-4xl font-semibold text-slate-950 dark:text-white">{dashboard.activePositions}</p>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">Active internship postings across partner employers.</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
          <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Open roles</p>
          <p className="mt-4 text-4xl font-semibold text-slate-950 dark:text-white">{dashboard.openRoles}</p>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">Remaining internship slots across all listings.</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
          <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Pending applications</p>
          <p className="mt-4 text-4xl font-semibold text-slate-950 dark:text-white">{dashboard.pendingApplications}</p>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">Applications waiting for employer review.</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
          <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Interviews scheduled</p>
          <p className="mt-4 text-4xl font-semibold text-slate-950 dark:text-white">{dashboard.interviewsScheduled}</p>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">Candidates moving through the interview pipeline.</p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Open internship positions</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">Current listings</h2>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {dashboard.positions.map((position) => (
              <div key={position.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-slate-950 dark:text-white">{position.title}</h3>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{position.host} • {position.location}</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {position.slots} roles
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
            <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Top employers</p>
            <div className="mt-6 space-y-4">
              {dashboard.topEmployers.map((employer) => (
                <div key={employer.name} className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-slate-950 dark:text-white">{employer.name}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{employer.hires} hires</p>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{employer.openRoles} open roles</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
            <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Recent applications</p>
            <div className="mt-6 space-y-4">
              {dashboard.recentApplications.map((application) => (
                <div key={application.id} className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                  <p className="font-semibold text-slate-950 dark:text-white">{application.candidate}</p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{application.role} at {application.employer}</p>
                  <span className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[application.status] || 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'}`}>
                    {application.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default Internships
