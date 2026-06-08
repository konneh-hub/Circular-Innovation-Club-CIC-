import React from 'react'

const Footer = () => (
  <footer className="border-t border-slate-200 bg-white/90 py-6 text-sm text-slate-600 shadow-sm shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-950/90 dark:text-slate-400">
    <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <p>© {new Date().getFullYear()} Circular Innovation Club. All rights reserved.</p>
      <div className="flex flex-wrap items-center gap-3">
        <a href="/about" className="hover:text-slate-900 dark:hover:text-white">About</a>
        <a href="/partners" className="hover:text-slate-900 dark:hover:text-white">Partners</a>
        <a href="/contact" className="hover:text-slate-900 dark:hover:text-white">Contact</a>
      </div>
    </div>
  </footer>
)

export default Footer
