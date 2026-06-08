import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import PageHeader from '../../components/common/PageHeader'
import Button from '../../components/common/Button'
import { fetchInternshipById } from '../../data/internshipData'

const InternshipDetails = () => {
  const { id } = useParams()
  const [position, setPosition] = useState(null)

  useEffect(() => {
    fetchInternshipById(id).then(setPosition)
  }, [id])

  if (!position) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 text-center text-slate-500 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-400">
        Loading internship details...
      </div>
    )
  }

  return (
    <section className="space-y-8">
      <PageHeader title={position.title} subtitle={`Hosted by ${position.host}. Apply by ${position.deadline}.`} />

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6 rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
            <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">{position.category}</span>
            <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">{position.location}</span>
            <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">{position.duration}</span>
            <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">{position.stipend}</span>
          </div>

          <div className="space-y-4">
            <p className="text-slate-600 dark:text-slate-300">{position.summary}</p>
            <p className="text-slate-600 dark:text-slate-300">{position.description}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Responsibilities</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                {position.responsibilities.map((item) => (
                  <li key={item} className="rounded-3xl bg-slate-50 p-3 dark:bg-slate-900">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Requirements</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                {position.requirements.map((item) => (
                  <li key={item} className="rounded-3xl bg-slate-50 p-3 dark:bg-slate-900">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
            <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Apply for this role</p>
            <p className="mt-4 text-3xl font-semibold text-slate-950 dark:text-white">{position.title}</p>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Host: {position.host}</p>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Open roles: {position.slots}</p>
            <div className="mt-6 flex flex-col gap-3">
              <Link to={`/member/internships/apply/${position.id}`}>
                <Button className="w-full">Apply now</Button>
              </Link>
              <Link to="/internships" className="text-sm font-semibold text-primary hover:underline">
                Back to all internships
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-700 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
            <p className="font-semibold text-slate-950 dark:text-white">Timeline</p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between">
                <span>Posted</span>
                <span>{position.postedOn}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Apply by</span>
                <span>{position.deadline}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default InternshipDetails
