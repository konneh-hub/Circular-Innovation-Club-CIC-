import { Link, Outlet } from 'react-router-dom'
import Button from '../components/common/Button'

const AuthLayout = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-4 py-12 text-white sm:px-6 lg:px-8">
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 rounded-[2rem] bg-white/5 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-2xl sm:p-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link to="/" className="text-2xl font-semibold tracking-tight text-white">
          CIC
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <Link to="/" className="text-sm text-slate-300 transition hover:text-white">
            Back to home
          </Link>
          <Link to="/join-us">
            <Button variant="primary">Join CIC</Button>
          </Link>
        </div>
      </header>

      <div className="grid gap-8 rounded-[2rem] bg-slate-950/90 p-6 sm:grid-cols-[0.9fr_1.1fr] sm:p-10">
        <aside className="space-y-6 rounded-[2rem] border border-slate-800 bg-slate-900/95 p-8 sm:p-10">
          <p className="text-sm uppercase tracking-[0.35em] text-sky-400">Member access</p>
          <h1 className="text-4xl font-semibold tracking-tight text-white">Secure access for CIC users.</h1>
          <p className="text-slate-300">
            Sign in, register, or recover your password to access member-only tools, event registration, and project dashboards.
          </p>
        </aside>
        <div className="rounded-[2rem] bg-white p-8 text-slate-950 shadow-xl shadow-slate-950/10 dark:bg-slate-950 dark:text-white sm:p-10">
          <Outlet />
        </div>
      </div>
    </div>
  </div>
)

export default AuthLayout
