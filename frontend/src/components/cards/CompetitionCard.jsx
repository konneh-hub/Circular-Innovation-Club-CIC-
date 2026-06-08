const CompetitionCard = ({
  title,
  category,
  prize,
  deadline,
  status,
  registrationCount,
  judgeCount,
  submissionCount,
  averageScore,
  onSelect,
}) => (
  <article
    onClick={onSelect}
    className="cursor-pointer rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50 transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/95 dark:shadow-black/20"
  >
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
      <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600 dark:bg-slate-800 dark:text-slate-300">
        {category}
      </span>
      <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
        {status}
      </span>
    </div>
    <h3 className="text-xl font-semibold text-slate-950 dark:text-white">{title}</h3>
    <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">Prize: {prize}</p>
    <div className="mt-5 grid gap-3 sm:grid-cols-2">
      <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
        <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Registrations</p>
        <p className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">{registrationCount}</p>
      </div>
      <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
        <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Judges</p>
        <p className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">{judgeCount}</p>
      </div>
      <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
        <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Submissions</p>
        <p className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">{submissionCount}</p>
      </div>
      <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
        <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Avg score</p>
        <p className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">{averageScore}</p>
      </div>
    </div>
    <div className="mt-5 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
      <span>Deadline</span>
      <span>{deadline}</span>
    </div>
  </article>
)

export default CompetitionCard
