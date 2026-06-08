import { NavLink } from 'react-router-dom'
import Button from './Button'

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Events', path: '/events' },
  { label: 'Contact', path: '/contact' },
]

const Navbar = () => (
  <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm shadow-slate-200/60 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
    <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
      <NavLink to="/" className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">
        CIC
      </NavLink>
      <nav className="hidden items-center gap-2 md:flex">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `rounded-full px-4 py-2 text-sm transition ${
                isActive ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="flex items-center gap-3">
        <NavLink to="/login">
          <Button variant="ghost">Login</Button>
        </NavLink>
        <NavLink to="/register">
          <Button variant="primary">Join CIC</Button>
        </NavLink>
      </div>
    </div>
  </header>
)

export default Navbar
