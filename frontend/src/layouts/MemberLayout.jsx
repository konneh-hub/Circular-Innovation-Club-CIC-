import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'

const MemberLayout = () => (
  <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
    <Navbar />
    <main className="mx-auto flex min-h-[calc(100vh-88px)] max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6">
      <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900/95">
        <Outlet />
      </div>
    </main>
    <Footer />
  </div>
)

export default MemberLayout
