import React from 'react'

const PageHeader = ({ title, subtitle, actions }) => (
  <header className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm shadow-slate-300/20 dark:border-slate-700 dark:bg-slate-900/80">
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">{title}</h1>
        {subtitle ? <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{subtitle}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
    </div>
  </header>
)

export default PageHeader
