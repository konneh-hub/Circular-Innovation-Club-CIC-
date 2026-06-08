import { NavLink } from 'react-router-dom'

const adminLinks = [
  { label: 'Dashboard', path: '/admin' },
  { label: 'Members', path: '/admin/members' },
  { label: 'Events', path: '/admin/events' },
  { label: 'Projects', path: '/admin/projects' },
  { label: 'Competitions', path: '/admin/competitions' },
  { label: 'Reports', path: '/admin/reports' },
  { label: 'Settings', path: '/admin/settings' },
]

const Sidebar = () => (
  <aside className="hidden w-72 shrink-0 flex-col gap-3 border-r border-slate-200 bg-white/90 p-6 dark:border-slate-800 dark:bg-slate-950/95 lg:flex">
    <div className="mb-8">
      <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Admin panel</h2>
    </div>
    <nav className="flex flex-col gap-1">
      {adminLinks.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
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
)

export default Sidebar
