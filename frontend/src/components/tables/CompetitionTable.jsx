const statusStyles = {
  Open: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  Review: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  Closed: 'bg-slate-100 text-slate-600 dark:bg-slate-800/40 dark:text-slate-300',
}

const CompetitionTable = ({ competitions, onView, onEdit, onDelete }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full border-separate border-spacing-0 text-left text-sm text-slate-700 dark:text-slate-300">
      <thead>
        <tr className="bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-slate-200">
          <th className="px-5 py-4">Competition</th>
          <th className="px-5 py-4">Prize</th>
          <th className="px-5 py-4">Deadline</th>
          <th className="px-5 py-4">Registrations</th>
          <th className="px-5 py-4">Judges</th>
          <th className="px-5 py-4">Status</th>
          <th className="px-5 py-4 text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        {competitions.map((competition) => (
          <tr key={competition.id} className="border-t border-slate-200 dark:border-slate-800">
            <td className="px-5 py-4 font-medium text-slate-900 dark:text-white">{competition.title}</td>
            <td className="px-5 py-4">{competition.prize}</td>
            <td className="px-5 py-4">{competition.deadline}</td>
            <td className="px-5 py-4">{competition.registrationTeams.length}</td>
            <td className="px-5 py-4">{competition.judges.filter((judge) => judge.assigned).length}</td>
            <td className="px-5 py-4">
              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[competition.status]}`}>
                {competition.status}
              </span>
            </td>
            <td className="px-5 py-4 text-right">
              <div className="inline-flex flex-wrap gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => onView(competition)}
                  className="rounded-2xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  View
                </button>
                <button
                  type="button"
                  onClick={() => onEdit(competition)}
                  className="rounded-2xl bg-primary px-3 py-2 text-xs font-semibold text-white transition hover:bg-primary-dark"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(competition.id)}
                  className="rounded-2xl bg-rose-100 px-3 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-200 dark:bg-rose-900/40 dark:text-rose-300 dark:hover:bg-rose-800"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default CompetitionTable
