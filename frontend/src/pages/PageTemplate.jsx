import React from 'react'
import PageHeader from '../components/common/PageHeader'

export function createPage(title, subtitle = '') {
  return function Page() {
    return (
      <section className="space-y-6 rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900/95">
        <PageHeader title={title} subtitle={subtitle} />
        <div className="text-slate-600 dark:text-slate-300">
          <p>This is the {title} page of the Circular Innovation Club frontend.</p>
        </div>
      </section>
    )
  }
}
