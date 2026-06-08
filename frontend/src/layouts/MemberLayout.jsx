import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'

const memberLinks = [
  { label: 'Dashboard', path: '/member' },
  { label: 'Profile', path: '/member/profile' },
  { label: 'Membership Card', path: '/member/membership-card' },
  { label: 'Attendance', path: '/member/attendance' },
  { label: 'Internships', path: '/member/internships' },
  { label: 'My Applications', path: '/member/my-applications' },
  { label: 'AI Chat', path: '/member/chat' },
  { label: 'Events', path: '/member/events' },
  { label: 'Voting', path: '/member/voting' },
  { label: 'Certificates', path: '/member/certificates' },
  { label: 'Notifications', path: '/member/notifications' },
]

const MemberLayout = () => (
  <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
    <Navbar />
    <main className="mx-auto min-h-[calc(100vh-88px)] max-w-6xl px-4 py-8 sm:px-6">
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-4 rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Member navigation</p>
            <nav className="flex flex-col gap-2">
              {memberLinks.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `rounded-2xl px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? 'bg-primary text-white'
                        : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </aside>

        <div className="space-y-8">
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900/95">
            <Outlet />
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
)

export default MemberLayout
