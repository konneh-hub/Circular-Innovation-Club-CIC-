import React from 'react'

const ProjectCard = ({ title, category, description, tags }) => (
  <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50 transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/95 dark:shadow-black/20">
    <div className="mb-4 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600 dark:bg-slate-800 dark:text-slate-300">
      {category}
    </div>
    <h3 className="text-xl font-semibold text-slate-950 dark:text-white">{title}</h3>
    <p className="mt-4 text-slate-600 dark:text-slate-300">{description}</p>
    <div className="mt-5 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-300">
          {tag}
        </span>
      ))}
    </div>
  </article>
)

export default ProjectCard
