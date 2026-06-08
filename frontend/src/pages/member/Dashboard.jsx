import { useEffect, useState } from 'react'
import PageHeader from '../../components/common/PageHeader'
import { fetchMemberDashboard } from '../../data/memberData'

const statCardClasses =
  'rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95'

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null)

  useEffect(() => {
    fetchMemberDashboard().then(setDashboard)
  }, [])

  if (!dashboard) {
    return <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 text-center text-slate-500 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-400">Loading dashboard...</div>
  }

  return (
    <section className="space-y-8">
      <PageHeader title="Member Dashboard" subtitle="Overview of your CIC activity and upcoming events." />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <div className={statCardClasses}>
          <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Total Projects</p>
          <p className="mt-4 text-4xl font-semibold text-slate-950 dark:text-white">{dashboard.totalProjects}</p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Projects you are currently contributing to.</p>
        </div>
        <div className={statCardClasses}>
          <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Events Joined</p>
          <p className="mt-4 text-4xl font-semibold text-slate-950 dark:text-white">{dashboard.eventsJoined}</p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Active workshops, forums, and meetups this year.</p>
        </div>
        <div className={statCardClasses}>
          <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Certificates</p>
          <p className="mt-4 text-4xl font-semibold text-slate-950 dark:text-white">{dashboard.certificatesEarned}</p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Verified achievements earned through CIC programs.</p>
        </div>
        <div className={statCardClasses}>
          <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Upcoming Events</p>
          <p className="mt-4 text-4xl font-semibold text-slate-950 dark:text-white">{dashboard.upcomingEvents.length}</p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Events on your calendar in the coming weeks.</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
        <div className="space-y-6 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
          <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Active project highlights</h2>
          <div className="space-y-4">
            {dashboard.activeProjects.map((project) => (
              <div key={project.name} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{project.name}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{project.role}</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-300">{project.completion}% complete</span>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${project.completion}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Upcoming events</h2>
            <span className="text-sm text-slate-500 dark:text-slate-400">Next 30 days</span>
          </div>
          <div className="space-y-4">
            {dashboard.upcomingEvents.map((event) => (
              <div key={event.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{event.title}</h3>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{event.location}</p>
                  </div>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">{event.status}</span>
                </div>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">{event.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Dashboard
