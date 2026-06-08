import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'

const MainLayout = () => (
  <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
    <Navbar />
    <main className="mx-auto flex min-h-[calc(100vh-88px)] max-w-7xl flex-col px-4 py-8 sm:px-6">
      <Outlet />
    </main>
    <Footer />
  </div>
)

export default MainLayout
