import { useEffect, useState } from 'react'

const statusOptions = ['Open', 'Registration', 'Confirmed', 'Closed']
const typeOptions = ['Workshop', 'Forum', 'Hackathon', 'Meetup']

const EventForm = ({ event, onSubmit, onCancel }) => {
  const [formState, setFormState] = useState({
    title: '',
    date: '',
    location: '',
    type: 'Workshop',
    status: 'Open',
    capacity: 40,
    description: '',
  })

  useEffect(() => {
    if (event) {
      setFormState({
        title: event.title || '',
        date: event.date || '',
        location: event.location || '',
        type: event.type || 'Workshop',
        status: event.status || 'Open',
        capacity: event.capacity || 40,
        description: event.description || '',
      })
    }
  }, [event])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((current) => ({
      ...current,
      [name]: name === 'capacity' ? Number(value) : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formState.title || !formState.date || !formState.location) {
      return
    }

    onSubmit({
      ...event,
      ...formState,
      id: event?.id || `event-${Date.now()}`,
      registrations: event?.registrations ?? [],
      attendance: event?.attendance ?? [],
      certificates: event?.certificates ?? [],
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Event name</span>
          <input
            name="title"
            value={formState.title}
            onChange={handleChange}
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
            placeholder="Circular Hackathon"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Date</span>
          <input
            type="text"
            name="date"
            value={formState.date}
            onChange={handleChange}
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
            placeholder="Aug 18, 2026"
          />
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Location</span>
          <input
            name="location"
            value={formState.location}
            onChange={handleChange}
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
            placeholder="Campus Hub"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Type</span>
          <select
            name="type"
            value={formState.type}
            onChange={handleChange}
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
          >
            {typeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Status</span>
          <select
            name="status"
            value={formState.status}
            onChange={handleChange}
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Capacity</span>
          <input
            type="number"
            name="capacity"
            value={formState.capacity}
            min={0}
            onChange={handleChange}
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
          />
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Description</span>
        <textarea
          name="description"
          rows={4}
          value={formState.description}
          onChange={handleChange}
          className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
          placeholder="Share the event goals, speakers, and activities."
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
          Save event
        </button>
      </div>
    </form>
  )
}

export default EventForm
