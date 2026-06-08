import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../../components/common/PageHeader'
import Button from '../../components/common/Button'
import { fetchMemberInternships } from '../../data/internshipData'

const categoryStyles = {
  'Research & Strategy': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  'Design & Innovation': 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  'Community Outreach': 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
}

const MemberInternships = () => {
  const [positions, setPositions] = useState(null)

  useEffect(() => {
    fetchMemberInternships().then(setPositions)
  }, [])

  if (!positions) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 text-center text-slate-500 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-400">
        Loading internships...
      </div>
    )
  }

  return (
    <section className="space-y-8">
      <PageHeader title="Member internships" subtitle="Browse open CIC internship opportunities and apply directly from your member dashboard." />

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {positions.map((position) => (
          <article key={position.id} className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-950 dark:text-white">{position.title}</h2>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{position.host}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-sm font-semibold ${categoryStyles[position.category]}`}>
                {position.category}
              </span>
            </div>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">{position.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-600 dark:text-slate-300">
              <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">{position.location}</span>
              <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">{position.duration}</span>
              <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">{position.stipend}</span>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Link to={`/member/internships/apply/${position.id}`}>
                <Button variant="secondary" className="w-full sm:w-auto">
                  Apply now
                </Button>
              </Link>
              <Link to={`/internships/${position.id}`} className="text-sm font-semibold text-primary hover:underline">
                View details
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default MemberInternships
