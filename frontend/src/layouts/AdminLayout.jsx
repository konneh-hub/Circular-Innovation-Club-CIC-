import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import Sidebar from '../components/common/Sidebar'

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <Navbar />
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[18rem_1fr]">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-900/95">
          <div className="mb-5 flex items-center justify-between gap-4 lg:hidden">
            <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Admin navigation</h2>
            <button
              type="button"
              onClick={() => setSidebarOpen((open) => !open)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-900 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900"
            >
              ☰
            </button>
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
