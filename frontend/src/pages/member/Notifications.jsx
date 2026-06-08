import { useEffect, useState } from 'react'
import PageHeader from '../../components/common/PageHeader'
import Button from '../../components/common/Button'
import { fetchNotifications } from '../../data/memberData'

const statusColor = {
  success: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300',
  info: 'bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300',
  warning: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300',
}

const Notifications = () => {
  const [notifications, setNotifications] = useState(null)
  const [readAll, setReadAll] = useState(false)

  useEffect(() => {
    fetchNotifications().then(setNotifications)
  }, [])

  if (!notifications) {
    return <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 text-center text-slate-500 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-400">Loading notifications...</div>
  }

  return (
    <section className="space-y-8">
      <PageHeader
        title="Notifications"
        subtitle="Review alerts and announcements from CIC."
        actions={<Button variant="secondary" onClick={() => setReadAll(true)}>Mark all read</Button>}
      />

      <div className="space-y-4">
        {notifications.map((note) => (
          <div key={note.id} className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${statusColor[note.type]}`}>
                  {note.type}
                </div>
                <h2 className="mt-3 text-lg font-semibold text-slate-950 dark:text-white">{note.title}</h2>
              </div>
              <span className="text-sm text-slate-500 dark:text-slate-400">{note.date}</span>
            </div>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">{note.message}</p>
            {readAll ? <p className="mt-4 text-sm font-medium text-emerald-700 dark:text-emerald-300">Marked read</p> : null}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Notifications
