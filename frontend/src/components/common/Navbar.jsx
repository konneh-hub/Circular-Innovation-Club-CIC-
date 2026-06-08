import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import Button from './Button'

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Events', path: '/events' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Contact', path: '/contact' },
]

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm shadow-slate-200/60 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
        <NavLink to="/" className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">
          CIC
        </NavLink>

        {/* Desktop Navigation */}
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

        {/* Desktop Auth Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <NavLink to="/login">
            <Button variant="ghost">Login</Button>
          </NavLink>
          <NavLink to="/register">
            <Button variant="primary">Join CIC</Button>
          </NavLink>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden rounded-full p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          {mobileMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="border-t border-slate-200 bg-slate-50 px-4 py-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block rounded-full px-4 py-2 text-sm transition ${
                    isActive ? 'bg-primary text-white' : 'text-slate-600 hover:bg-white dark:text-slate-300 dark:hover:bg-slate-800'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
          <div className="mt-4 space-y-2 border-t border-slate-200 pt-4 dark:border-slate-800">
            <NavLink to="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-center">
                Login
              </Button>
            </NavLink>
            <NavLink to="/register" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" className="w-full justify-center">
                Join CIC
              </Button>
            </NavLink>
          </div>
        </nav>
      )}
    </header>
  )
}

export default Navbar
