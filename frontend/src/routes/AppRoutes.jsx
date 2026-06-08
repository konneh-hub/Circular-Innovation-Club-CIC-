import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import MemberLayout from '../layouts/MemberLayout'
import AdminLayout from '../layouts/AdminLayout'
import ProtectedRoute from '../components/common/ProtectedRoute'
import ErrorPage from '../pages/ErrorPage'

import Home from '../pages/public/Home'
import About from '../pages/public/About'
import Projects from '../pages/public/Projects'
import Events from '../pages/public/Events'
import Competitions from '../pages/public/Competitions'
import Internships from '../pages/public/Internships'
import Partners from '../pages/public/Partners'
import Blog from '../pages/public/Blog'
import Gallery from '../pages/public/Gallery'
import Contact from '../pages/public/Contact'
import JoinUs from '../pages/public/JoinUs'

import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import ForgotPassword from '../pages/auth/ForgotPassword'

import MemberDashboard from '../pages/member/Dashboard'
import Profile from '../pages/member/Profile'
import MembershipCard from '../pages/member/MembershipCard'
import MyEvents from '../pages/member/MyEvents'
import MyProjects from '../pages/member/MyProjects'
import Voting from '../pages/member/Voting'
import Certificates from '../pages/member/Certificates'
import Notifications from '../pages/member/Notifications'

import AdminDashboard from '../pages/admin/Dashboard'
import Members from '../pages/admin/Members'
import AdminEvents from '../pages/admin/Events'
import AdminProjects from '../pages/admin/Projects'
import AdminCompetitions from '../pages/admin/Competitions'
import Elections from '../pages/admin/Elections'
import Funding from '../pages/admin/Funding'
import AdminPartners from '../pages/admin/Partners'
import AdminInternships from '../pages/admin/Internships'
import Sustainability from '../pages/admin/Sustainability'
import Reports from '../pages/admin/Reports'
import Settings from '../pages/admin/Settings'

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="projects" element={<Projects />} />
        <Route path="events" element={<Events />} />
        <Route path="competitions" element={<Competitions />} />
        <Route path="internships" element={<Internships />} />
        <Route path="partners" element={<Partners />} />
        <Route path="blog" element={<Blog />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="contact" element={<Contact />} />
        <Route path="join-us" element={<JoinUs />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Route>

      <Route
        path="/member"
        element={
          <ProtectedRoute>
            <MemberLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<MemberDashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="membership-card" element={<MembershipCard />} />
        <Route path="events" element={<MyEvents />} />
        <Route path="projects" element={<MyProjects />} />
        <Route path="voting" element={<Voting />} />
        <Route path="certificates" element={<Certificates />} />
        <Route path="notifications" element={<Notifications />} />
      </Route>

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="members" element={<Members />} />
        <Route path="events" element={<AdminEvents />} />
        <Route path="projects" element={<AdminProjects />} />
        <Route path="competitions" element={<AdminCompetitions />} />
        <Route path="elections" element={<Elections />} />
        <Route path="funding" element={<Funding />} />
        <Route path="partners" element={<AdminPartners />} />
        <Route path="internships" element={<AdminInternships />} />
        <Route path="sustainability" element={<Sustainability />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </BrowserRouter>
)

export default AppRoutes
