import { NavLink } from 'react-router-dom'

const adminLinks = [
  { label: 'Dashboard', path: '/admin' },
  { label: 'Members', path: '/admin/members' },
  { label: 'Projects', path: '/admin/projects' },
  { label: 'Events', path: '/admin/events' },
  { label: 'Attendance', path: '/admin/attendance' },
  { label: 'Competitions', path: '/admin/competitions' },
  { label: 'Elections', path: '/admin/elections' },
  { label: 'Funding', path: '/admin/funding' },
  { label: 'Partners', path: '/admin/partners' },
  { label: 'Internships', path: '/admin/internships' },
  { label: 'Sustainability', path: '/admin/sustainability' },
  { label: 'Reports', path: '/admin/reports' },
  { label: 'Settings', path: '/admin/settings' },
]

const Sidebar = ({ open, onClose }) => (
  <>
    <div
      className={`fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm transition-opacity lg:hidden ${open ? 'block' : 'hidden'}`}
      onClick={onClose}
    />
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex w-72 shrink-0 flex-col gap-3 border-r border-slate-200 bg-white/95 p-6 shadow-2xl shadow-slate-900/10 transition-transform duration-300 dark:border-slate-800 dark:bg-slate-950/95 lg:static lg:block lg:translate-x-0 ${
        open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      <div className="mb-8 flex items-center justify-between gap-4 lg:block">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Admin panel</h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-900 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900 lg:hidden"
        >
          ✕
        </button>
      </div>
      <nav className="flex flex-col gap-1">
        {adminLinks.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onClose}
            className={({ isActive }) =>
              `rounded-2xl px-4 py-3 text-sm font-medium transition ${
                isActive ? 'bg-primary text-white' : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  </>
)

export default Sidebar
