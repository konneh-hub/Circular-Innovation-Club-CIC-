import { useEffect, useMemo, useState } from 'react'
import PageHeader from '../../components/common/PageHeader'
import { fetchAdminSustainability } from '../../data/adminData'

const statStyles = {
  treesPlanted: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  wasteRecycled: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  communityReach: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
  carbonReduced: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  activeProjects: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
}

const paletteMap = {
  emerald: 'bg-emerald-500',
  sky: 'bg-sky-500',
  amber: 'bg-amber-500',
}

const formatNumber = (value) => new Intl.NumberFormat('en-US').format(value)

const Sustainability = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetchAdminSustainability().then(setData)
  }, [])

  const chartMax = useMemo(() => {
    if (!data) return 0
    return Math.max(...data.impactTrends.datasets.flatMap((dataset) => dataset.values))
  }, [data])

  if (!data) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 text-center text-slate-500 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-400">
        Loading sustainability metrics...
      </div>
    )
  }

  return (
    <section className="space-y-8">
      <PageHeader
        title="Sustainability impact"
        subtitle="Visualize CIC environmental progress and community benefits across our sustainability portfolio."
      />

      <div className="grid gap-6 xl:grid-cols-5">
        <div className={`rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 ${statStyles.treesPlanted}`}>
          <p className="text-sm uppercase tracking-[0.32em]">Trees planted</p>
          <p className="mt-4 text-3xl font-semibold">{formatNumber(data.totals.treesPlanted)}</p>
        </div>
        <div className={`rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 ${statStyles.wasteRecycled}`}>
          <p className="text-sm uppercase tracking-[0.32em]">Waste recycled</p>
          <p className="mt-4 text-3xl font-semibold">{data.totals.wasteRecycled}t</p>
        </div>
        <div className={`rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 ${statStyles.communityReach}`}>
          <p className="text-sm uppercase tracking-[0.32em]">Community impact</p>
          <p className="mt-4 text-3xl font-semibold">{formatNumber(data.totals.communityReach)}</p>
        </div>
        <div className={`rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 ${statStyles.carbonReduced}`}>
          <p className="text-sm uppercase tracking-[0.32em]">Carbon reduction</p>
          <p className="mt-4 text-3xl font-semibold">{formatNumber(data.totals.carbonReduced)} kg</p>
        </div>
        <div className={`rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 ${statStyles.activeProjects}`}>
          <p className="text-sm uppercase tracking-[0.32em]">Active sustainability projects</p>
          <p className="mt-4 text-3xl font-semibold">{data.totals.activeProjects}</p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Impact trends</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">Monthly performance</h2>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Tracking trees, waste recovery, and carbon reduction over the last 7 months.</p>
          </div>

          <div className="mt-8 space-y-6">
            {data.impactTrends.datasets.map((dataset) => (
              <div key={dataset.name} className="space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-950 dark:text-white">{dataset.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Latest: {dataset.values.at(-1)} {dataset.suffix}</p>
                  </div>
                  <div className="h-3 w-24 rounded-full bg-slate-100 dark:bg-slate-800">
                    <div
                      className={`${paletteMap[dataset.color]} h-3 rounded-full`}
                      style={{ width: `${Math.round((dataset.values.at(-1) / chartMax) * 100)}%` }}
                    />
                  </div>
                </div>

                <div className="grid gap-2 grid-cols-7">
                  {dataset.values.map((value, index) => (
                    <div key={`${dataset.name}-${index}`} className="rounded-full bg-slate-100 text-center text-xs text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                      <div className="mx-auto h-16 w-6 rounded-full bg-slate-200 dark:bg-slate-900" style={{ height: `${Math.max(24, (value / chartMax) * 96)}px` }} />
                      <p className="mt-2">{data.impactTrends.labels[index]}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
            <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Project progress</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">Active sustainability work</h2>

            <div className="mt-6 space-y-4">
              {data.projects.map((project) => (
                <div key={project.id} className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-slate-950 dark:text-white">{project.title}</p>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{project.impact}</p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      {project.status}
                    </span>
                  </div>
                  <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${project.progress}%` }} />
                  </div>
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{project.progress}% complete</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
            <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Community analytics</p>
            <div className="mt-6 space-y-4">
              {data.communityInsights.map((insight) => (
                <div key={insight.label} className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                  <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">{insight.label}</p>
                  <p className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white">{insight.value}</p>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{insight.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {data.achievements.map((achievement) => (
          <div key={achievement.title} className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
            <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">{achievement.title}</p>
            <p className="mt-4 text-2xl font-semibold text-slate-950 dark:text-white">{achievement.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Program focus</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">Sustainability initiatives</h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">Review active initiatives and track the next milestone across CIC sustainability programs.</p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {data.initiatives.map((initiative) => (
            <div key={initiative.title} className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
              <div className="flex items-center justify-between gap-4">
                <p className="font-semibold text-slate-950 dark:text-white">{initiative.title}</p>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  {initiative.progress}
                </span>
              </div>
              <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                <div className="h-full rounded-full bg-primary" style={{ width: initiative.progress }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Sustainability
