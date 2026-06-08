import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../../components/common/PageHeader'
import Button from '../../components/common/Button'
import { fetchPublicInternships } from '../../data/internshipData'

const categoryStyles = {
  'Research & Strategy': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  'Design & Innovation': 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  'Community Outreach': 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
}

const Internships = () => {
  const [positions, setPositions] = useState(null)

  useEffect(() => {
    fetchPublicInternships().then(setPositions)
  }, [])

  if (!positions) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 text-center text-slate-500 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-400">
        Loading internships...
      </div>
    )
  }

  return (
    <section className="space-y-12">
      <PageHeader title="Internships" subtitle="Explore hands-on CIC internship placements with partner organizations." />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {positions.map((position) => (
          <article key={position.id} className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900/95 dark:shadow-black/20">
            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">{position.location}</span>
              <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">{position.duration}</span>
            </div>
            <h3 className="mt-4 text-2xl font-semibold text-slate-950 dark:text-white">{position.title}</h3>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{position.summary}</p>
            <p className="mt-5 text-sm font-medium text-slate-700 dark:text-slate-300">Hosted by {position.host}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Link to={`/internships/${position.id}`}>
                <Button variant="secondary">View details</Button>
              </Link>
              <div className={`rounded-full px-3 py-1 text-xs font-semibold ${categoryStyles[position.category] || 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'}`}>
                {position.category}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Internships
