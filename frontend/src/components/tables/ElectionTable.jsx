const ElectionTable = ({ elections, onView, onEdit, onDelete, onResults }) => {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950 dark:shadow-slate-900/20">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm dark:divide-slate-800">
          <thead className="bg-slate-50 text-slate-600 dark:bg-slate-900 dark:text-slate-300">
            <tr>
              <th className="px-6 py-4 font-semibold">Election</th>
              <th className="px-6 py-4 font-semibold">Stage</th>
              <th className="px-6 py-4 font-semibold">Deadline</th>
              <th className="px-6 py-4 font-semibold">Candidates</th>
              <th className="px-6 py-4 font-semibold">Votes</th>
              <th className="px-6 py-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-800 dark:bg-slate-950">
            {elections.map((election) => (
              <tr key={election.id} className="border-b border-slate-200 dark:border-slate-800">
                <td className="px-6 py-4">
                  <p className="font-semibold text-slate-950 dark:text-white">{election.title}</p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{election.type}</p>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {election.stage}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{election.deadline}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {election.candidates.slice(0, 2).map((candidate) => (
                      <span
                        key={candidate.id}
                        className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                      >
                        {candidate.name}
                      </span>
                    ))}
                    {election.candidates.length > 2 && (
                      <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        +{election.candidates.length - 2} more
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{election.totalVotes}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => onView(election)}
                      className="rounded-3xl border border-slate-200 bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      View
                    </button>
                    <button
                      type="button"
                      onClick={() => onResults(election)}
                      className="rounded-3xl border border-sky-200 bg-sky-100 px-3 py-2 text-xs font-semibold text-sky-700 transition hover:bg-sky-200 dark:border-sky-900/50 dark:bg-sky-900/20 dark:text-sky-200 dark:hover:bg-sky-900/40"
                    >
                      Results
                    </button>
                    <button
                      type="button"
                      onClick={() => onEdit(election)}
                      className="rounded-3xl border border-amber-200 bg-amber-100 px-3 py-2 text-xs font-semibold text-amber-700 transition hover:bg-amber-200 dark:border-amber-900/40 dark:bg-amber-900/20 dark:text-amber-300 dark:hover:bg-amber-900/40"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(election.id)}
                      className="rounded-3xl border border-rose-200 bg-rose-100 px-3 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-200 dark:border-rose-900/40 dark:bg-rose-900/20 dark:text-rose-300 dark:hover:bg-rose-900/40"
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
    </div>
  )
}

export default ElectionTable
