const statusStyles = {
  Open: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  Confirmed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  Registration: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  Closed: 'bg-slate-100 text-slate-600 dark:bg-slate-800/40 dark:text-slate-300',
}

const EventTable = ({ events, onView, onEdit, onDelete }) => (
  <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white/90 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
    <table className="min-w-full border-collapse text-left text-sm">
      <thead className="bg-slate-50 text-slate-500 dark:bg-slate-900/50 dark:text-slate-400">
        <tr>
          <th className="px-6 py-4 font-medium">Event</th>
          <th className="px-6 py-4 font-medium">Date</th>
          <th className="px-6 py-4 font-medium">Location</th>
          <th className="px-6 py-4 font-medium">Status</th>
          <th className="px-6 py-4 font-medium">Registrations</th>
          <th className="px-6 py-4 font-medium">Attendance</th>
          <th className="px-6 py-4 font-medium">Certificates</th>
          <th className="px-6 py-4 font-medium">Actions</th>
        </tr>
      </thead>
      <tbody>
        {events.map((event) => (
          <tr key={event.id} className="border-t border-slate-200 dark:border-slate-800">
            <td className="px-6 py-4 font-semibold text-slate-950 dark:text-white">{event.title}</td>
            <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{event.date}</td>
            <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{event.location}</td>
            <td className="px-6 py-4">
              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[event.status]}`}>
                {event.status}
              </span>
            </td>
            <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{event.registrations.length}</td>
            <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{event.attendance.length}</td>
            <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{event.certificates.length}</td>
            <td className="px-6 py-4 space-x-2">
              <button
                type="button"
                onClick={() => onView(event)}
                className="rounded-2xl bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                View
              </button>
              <button
                type="button"
                onClick={() => onEdit(event)}
                className="rounded-2xl bg-primary px-3 py-1 text-xs font-semibold text-white transition hover:bg-primary-dark"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => onDelete(event.id)}
                className="rounded-2xl bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700 transition hover:bg-rose-200 dark:bg-rose-900/40 dark:text-rose-300 dark:hover:bg-rose-800"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default EventTable
