const ResultChart = ({ candidates }) => {
  const totalVotes = candidates.reduce((sum, candidate) => sum + candidate.votes, 0)

  const formatShare = (votes) => {
    if (!totalVotes) return '0%'
    const percent = Math.round((votes / totalVotes) * 100)
    return `${percent}%`
  }

  return (
    <div className="space-y-4">
      {candidates.map((candidate) => {
        const share = totalVotes ? Math.max(5, Math.round((candidate.votes / totalVotes) * 100)) : 0
        return (
          <div key={candidate.id} className="space-y-2 rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 dark:shadow-slate-900/20">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-950 dark:text-white">{candidate.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{candidate.role}</p>
              </div>
              <div className="text-right text-sm font-semibold text-slate-900 dark:text-white">
                <p>{candidate.votes} votes</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{formatShare(candidate.votes)}</p>
              </div>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div style={{ width: `${share}%` }} className="h-full rounded-full bg-primary transition-all duration-300" />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ResultChart
