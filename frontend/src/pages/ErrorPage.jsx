import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/common/Button'

const ErrorPage = () => (
  <main className="grid min-h-screen place-items-center bg-slate-50 px-6 py-12 dark:bg-slate-950">
    <div className="max-w-xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-lg shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">404 error</p>
      <h1 className="mt-6 text-4xl font-semibold text-slate-950 dark:text-white">Page not found</h1>
      <p className="mt-4 text-slate-600 dark:text-slate-400">The page you are looking for does not exist or has been moved.</p>
      <div className="mt-8">
        <Link to="/">
          <Button variant="primary">Return home</Button>
        </Link>
      </div>
    </div>
  </main>
)

export default ErrorPage
