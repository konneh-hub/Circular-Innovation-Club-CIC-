const CandidateCard = ({
  candidate,
  selected,
  onSelect,
  disabled,
  voted,
}) => {
  const voteLabel = voted ? 'Voting complete' : selected ? 'Selected' : 'Select'
  return (
    <article className={`rounded-3xl border p-5 transition ${selected ? 'border-primary bg-primary/5 shadow-sm shadow-primary/20' : 'border-slate-200 bg-white shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950 dark:shadow-slate-900/20'}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-100 text-lg font-semibold text-slate-800 dark:bg-slate-800 dark:text-slate-100">
            {candidate.initials}
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{candidate.name}</h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{candidate.role}</p>
          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{candidate.statement}</p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Expertise</p>
          <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">{candidate.experience}</p>
        </div>
        <button
          type="button"
          onClick={onSelect}
          disabled={disabled}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${selected ? 'bg-primary text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800'} ${disabled ? 'cursor-not-allowed opacity-60' : ''}`}
        >
          {voteLabel}
        </button>
      </div>

      <div className="mt-4 rounded-3xl bg-slate-100 p-4 dark:bg-slate-900">
        <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Votes</p>
        <p className="mt-2 text-xl font-semibold text-slate-950 dark:text-white">{candidate.votes}</p>
      </div>
    </article>
  )
}

export default CandidateCard
