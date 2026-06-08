const EventCard = ({
  title,
  date,
  location,
  type,
  status,
  registrations = 0,
  attendance = 0,
  certificates = 0,
  onSelect,
}) => (
  <article
    onClick={onSelect}
    className="cursor-pointer rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50 transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/95 dark:shadow-black/20"
  >
    <div className="mb-4 flex items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-400">
      <span>{date}</span>
      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-700 dark:bg-slate-800 dark:text-slate-300">
        {location}
      </span>
    </div>
    <h3 className="text-xl font-semibold text-slate-950 dark:text-white">{title}</h3>
    <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{type}</p>
    <div className="mt-4 flex flex-wrap items-center gap-2">
      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-700 dark:bg-slate-800 dark:text-slate-300">
        {status}
      </span>
      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
        {registrations} regs
      </span>
      <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700 dark:bg-sky-900/40 dark:text-sky-300">
        {attendance} checked in
      </span>
    </div>
    <p className="mt-4 text-slate-600 dark:text-slate-300">{description}</p>
    <div className="mt-5 flex flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-400">
      <span>{certificates} certificates</span>
    </div>
  </article>
)

export default EventCard
