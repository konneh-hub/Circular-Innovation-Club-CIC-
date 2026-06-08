import { useEffect, useState } from 'react'
import PageHeader from '../../components/common/PageHeader'
import { fetchMemberEvents } from '../../data/memberData'

const statusStyles = {
  Confirmed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  Registered: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  Open: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
}

const MyEvents = () => {
  const [events, setEvents] = useState(null)

  useEffect(() => {
    fetchMemberEvents().then(setEvents)
  }, [])

  if (!events) {
    return <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 text-center text-slate-500 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-400">Loading events...</div>
  }

  return (
    <section className="space-y-8">
      <PageHeader title="My Events" subtitle="Track the events you are registered for." />

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {events.map((event) => (
          <div key={event.title} className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-950 dark:text-white">{event.title}</h2>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{event.location}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-sm font-semibold ${statusStyles[event.status]}`}>
                {event.status}
              </span>
            </div>
            <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">{event.date}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default MyEvents
