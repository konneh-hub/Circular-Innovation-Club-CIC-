import { useEffect, useState } from 'react'
import PageHeader from '../../components/common/PageHeader'
import { fetchMemberProjects } from '../../data/memberData'

const MyProjects = () => {
  const [projects, setProjects] = useState(null)

  useEffect(() => {
    fetchMemberProjects().then(setProjects)
  }, [])

  if (!projects) {
    return <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 text-center text-slate-500 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-400">Loading your projects...</div>
  }

  return (
    <section className="space-y-8">
      <PageHeader title="My Projects" subtitle="See the projects you are contributing to." />

      <div className="grid gap-6">
        {projects.map((project) => (
          <div key={project.name} className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-950 dark:text-white">{project.name}</h2>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{project.role}</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">{project.status}</span>
            </div>

            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                <div className="h-full rounded-full bg-primary" style={{ width: `${project.progress}%` }} />
              </div>
            </div>

            <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">Last updated {project.updated}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default MyProjects
