import { useEffect, useState } from 'react'

const statusOptions = ['Open', 'Review', 'Closed']
const categoryOptions = ['Sustainability', 'Design', 'Impact', 'Technology']

const CompetitionForm = ({ competition, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Sustainability',
    prize: '',
    deadline: '',
    status: 'Open',
    description: '',
  })

  useEffect(() => {
    if (competition) {
      setFormData({
        title: competition.title || '',
        category: competition.category || 'Sustainability',
        prize: competition.prize || '',
        deadline: competition.deadline || '',
        status: competition.status || 'Open',
        description: competition.description || '',
      })
    }
  }, [competition])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!formData.title || !formData.deadline || !formData.prize) {
      return
    }

    onSubmit({
      ...competition,
      ...formData,
      id: competition?.id || `competition-${Date.now()}`,
      registrationTeams: competition?.registrationTeams ?? [],
      submissions: competition?.submissions ?? [],
      judges: competition?.judges ?? [],
      scores: competition?.scores ?? [],
      winner: competition?.winner ?? null,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block space-y-2 text-sm text-slate-700 dark:text-slate-300">
          <span>Competition title</span>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            placeholder="Circular Innovation Challenge"
          />
        </label>
        <label className="block space-y-2 text-sm text-slate-700 dark:text-slate-300">
          <span>Prize</span>
          <input
            name="prize"
            value={formData.prize}
            onChange={handleChange}
            required
            className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            placeholder="$10,000 + mentorship"
          />
        </label>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block space-y-2 text-sm text-slate-700 dark:text-slate-300">
          <span>Deadline</span>
          <input
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
            className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            placeholder="Dec 10, 2026"
          />
        </label>
        <label className="block space-y-2 text-sm text-slate-700 dark:text-slate-300">
          <span>Category</span>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          >
            {categoryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block space-y-2 text-sm text-slate-700 dark:text-slate-300">
          <span>Status</span>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="block space-y-2 text-sm text-slate-700 dark:text-slate-300">
        <span>Description</span>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          placeholder="Describe the challenge focus, eligibility, and judging criteria."
        />
      </label>
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-3xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-3xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
        >
          Save competition
        </button>
      </div>
    </form>
  )
}

export default CompetitionForm
