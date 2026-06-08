import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PageHeader from '../../components/common/PageHeader'
import Button from '../../components/common/Button'
import { fetchInternshipById, submitInternshipApplication } from '../../data/internshipData'

const InternshipApplication = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [position, setPosition] = useState(null)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    portfolio: '',
    motivation: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(null)

  useEffect(() => {
    fetchInternshipById(id).then(setPosition)
  }, [id])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)

    const application = await submitInternshipApplication({
      internshipId: id,
      title: position?.title,
      host: position?.host,
      ...formData,
    })

    setSubmitted(application)
    setIsSubmitting(false)
  }

  if (!position) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 text-center text-slate-500 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-400">
        Loading application form...
      </div>
    )
  }

  if (submitted) {
    return (
      <section className="space-y-8">
        <PageHeader title="Application submitted" subtitle="Your internship application has been recorded successfully." />
        <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
          <p className="text-slate-700 dark:text-slate-300">Thanks for applying to the <strong>{submitted.title}</strong> role at {submitted.host}. Your application is now in review.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-50 p-6 dark:bg-slate-900">
              <p className="text-sm text-slate-500 dark:text-slate-400">Application reference</p>
              <p className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">{submitted.id}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-6 dark:bg-slate-900">
              <p className="text-sm text-slate-500 dark:text-slate-400">Current status</p>
              <p className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">{submitted.status}</p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="secondary" onClick={() => navigate('/member/my-applications')}>
              View my applications
            </Button>
            <Button onClick={() => navigate('/member/internships')}>Browse more internships</Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="space-y-8">
      <PageHeader title={`Apply: ${position.title}`} subtitle={`Host: ${position.host} • Deadline: ${position.deadline}`} />
      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
          <div className="grid gap-6 md:grid-cols-2">
            <label className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
              <span>Full name</span>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                placeholder="Amina Conteh"
              />
            </label>
            <label className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
              <span>Email address</span>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                placeholder="amina@example.com"
              />
            </label>
          </div>

          <label className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <span>Phone number</span>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
              placeholder="+232 76 123 987"
            />
          </label>

          <label className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <span>Portfolio or sample work</span>
            <input
              name="portfolio"
              value={formData.portfolio}
              onChange={handleChange}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
              placeholder="Portfolio URL or project summary"
            />
          </label>

          <label className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <span>Why are you a fit for this role?</span>
            <textarea
              name="motivation"
              value={formData.motivation}
              onChange={handleChange}
              rows={6}
              required
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
              placeholder="Share your motivation, relevant experience, and what you hope to learn."
            />
          </label>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500 dark:text-slate-400">Your application will be sent directly to the internship host for review.</p>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit application'}
            </Button>
          </div>
        </form>

        <aside className="space-y-6 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">About this internship</p>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">{position.summary}</p>
          </div>
          <div className="grid gap-4">
            <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
              <p className="text-sm text-slate-500 dark:text-slate-400">Position</p>
              <p className="mt-2 font-semibold text-slate-950 dark:text-white">{position.title}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
              <p className="text-sm text-slate-500 dark:text-slate-400">Host</p>
              <p className="mt-2 font-semibold text-slate-950 dark:text-white">{position.host}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
              <p className="text-sm text-slate-500 dark:text-slate-400">Deadline</p>
              <p className="mt-2 font-semibold text-slate-950 dark:text-white">{position.deadline}</p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default InternshipApplication
