import { useEffect, useState } from 'react'
import PageHeader from '../../components/common/PageHeader'
import EventCard from '../../components/cards/EventCard'
import EventForm from '../../components/forms/EventForm'
import EventTable from '../../components/tables/EventTable'
import { fetchAdminEvents } from '../../data/adminData'

const statusStyles = {
  Open: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  Confirmed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  Registration: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  Closed: 'bg-slate-100 text-slate-600 dark:bg-slate-800/40 dark:text-slate-300',
}

const Events = () => {
  const [events, setEvents] = useState(null)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [formMode, setFormMode] = useState(null)
  const [editingEvent, setEditingEvent] = useState(null)

  useEffect(() => {
    fetchAdminEvents().then((data) => {
      setEvents(data)
      setSelectedEvent(data[0] ?? null)
    })
  }, [])

  const openCreateForm = () => {
    setEditingEvent(null)
    setFormMode('create')
  }

  const openEditForm = (event) => {
    setEditingEvent(event)
    setFormMode('edit')
  }

  const closeForm = () => {
    setFormMode(null)
    setEditingEvent(null)
  }

  const handleEventSubmit = (event) => {
    setEvents((current) => {
      if (!current) return [event]

      if (formMode === 'edit') {
        return current.map((item) => (item.id === event.id ? event : item))
      }

      return [{ ...event, id: `event-${Date.now()}` }, ...current]
    })

    setSelectedEvent((current) => (current?.id === event.id ? event : current))
    closeForm()
  }

  const handleEventDelete = (eventId) => {
    if (!window.confirm('Delete this event? This action cannot be undone.')) return
    setEvents((current) => current.filter((item) => item.id !== eventId))
    if (selectedEvent?.id === eventId) {
      setSelectedEvent(null)
    }
  }

  const updateSelectedEvent = (updater) => {
    setEvents((current) => current.map((item) => (item.id === selectedEvent.id ? updater(item) : item)))
    setSelectedEvent((current) => (current ? updater(current) : null))
  }

  const handleRegister = () => {
    if (!selectedEvent) return
    const nextRegistration = {
      id: `reg-${Date.now()}`,
      name: `Guest ${selectedEvent.registrations.length + 1}`,
      email: `guest${selectedEvent.registrations.length + 1}@cic.club`,
      status: 'Registered',
    }
    updateSelectedEvent((event) => ({
      ...event,
      registrations: [...event.registrations, nextRegistration],
    }))
  }

  const handleCheckIn = () => {
    if (!selectedEvent) return
    const nextAttendee = {
      id: `att-${Date.now()}`,
      name: `Attendee ${selectedEvent.attendance.length + 1}`,
      status: 'Checked in',
    }
    updateSelectedEvent((event) => ({
      ...event,
      attendance: [...event.attendance, nextAttendee],
    }))
  }

  const handleIssueCertificate = () => {
    if (!selectedEvent) return
    const nextCertificate = {
      id: `cert-${Date.now()}`,
      recipient: `Participant ${selectedEvent.certificates.length + 1}`,
      issued: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Issued',
    }
    updateSelectedEvent((event) => ({
      ...event,
      certificates: [...event.certificates, nextCertificate],
    }))
  }

  if (!events) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 text-center text-slate-500 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-400">
        Loading event management...
      </div>
    )
  }

  const totalRegistrations = events.reduce((sum, event) => sum + event.registrations.length, 0)
  const totalAttendance = events.reduce((sum, event) => sum + event.attendance.length, 0)
  const totalCertificates = events.reduce((sum, event) => sum + event.certificates.length, 0)

  return (
    <section className="space-y-8">
      <PageHeader
        title="Event Management"
        subtitle="Manage CIC events, registrations, attendance, and certificates."
        actions={
          <button
            type="button"
            onClick={openCreateForm}
            className="rounded-3xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
          >
            New Event
          </button>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.95fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white/90 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
            <div className="border-b border-slate-200 p-6 dark:border-slate-800">
              <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Event list</h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Review upcoming CIC events and track attendee workflow.</p>
            </div>
            <div className="p-6">
              <EventTable events={events} onView={setSelectedEvent} onEdit={openEditForm} onDelete={handleEventDelete} />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {events.map((event) => (
              <EventCard
                key={event.id}
                title={event.title}
                date={event.date}
                location={event.location}
                type={event.type}
                status={event.status}
                description={event.description}
                registrations={event.registrations.length}
                attendance={event.attendance.length}
                certificates={event.certificates.length}
                onSelect={() => setSelectedEvent(event)}
              />
            ))}
          </div>
        </div>

        <aside className="space-y-6">
          {selectedEvent ? (
            <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-950 dark:text-white">{selectedEvent.title}</h2>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{selectedEvent.description}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-sm font-semibold ${statusStyles[selectedEvent.status]}`}>
                  {selectedEvent.status}
                </span>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Date</p>
                  <p className="mt-2 font-semibold text-slate-950 dark:text-white">{selectedEvent.date}</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Location</p>
                  <p className="mt-2 font-semibold text-slate-950 dark:text-white">{selectedEvent.location}</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Capacity</p>
                  <p className="mt-2 font-semibold text-slate-950 dark:text-white">{selectedEvent.capacity}</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Event type</p>
                  <p className="mt-2 font-semibold text-slate-950 dark:text-white">{selectedEvent.type}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={handleRegister}
                  className="rounded-3xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
                >
                  Register attendee
                </button>
                <button
                  type="button"
                  onClick={handleCheckIn}
                  className="rounded-3xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Mark attendance
                </button>
                <button
                  type="button"
                  onClick={handleIssueCertificate}
                  className="rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
                >
                  Issue certificate
                </button>
              </div>

              <div className="mt-6 space-y-5">
                <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Registrations</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">{selectedEvent.registrations.length}</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Attendance</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">{selectedEvent.attendance.length}</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Certificates</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">{selectedEvent.certificates.length}</p>
                </div>
              </div>

              <div className="mt-6 space-y-5">
                <div>
                  <h3 className="text-base font-semibold text-slate-950 dark:text-white">Latest registrations</h3>
                  <div className="mt-4 space-y-3">
                    {selectedEvent.registrations.slice(-3).map((registration) => (
                      <div key={registration.id} className="rounded-3xl bg-white p-4 shadow-sm shadow-slate-200/40 dark:bg-slate-950 dark:text-slate-200 dark:shadow-slate-900/20">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="font-medium text-slate-950 dark:text-white">{registration.name}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{registration.email}</p>
                          </div>
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">{registration.status}</span>
                        </div>
                      </div>
                    ))}
                    {selectedEvent.registrations.length === 0 && (
                      <p className="text-sm text-slate-500 dark:text-slate-400">No registrations yet.</p>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-semibold text-slate-950 dark:text-white">Recent certificates</h3>
                  <div className="mt-4 space-y-3">
                    {selectedEvent.certificates.slice(-3).map((certificate) => (
                      <div key={certificate.id} className="rounded-3xl bg-white p-4 shadow-sm shadow-slate-200/40 dark:bg-slate-950 dark:text-slate-200 dark:shadow-slate-900/20">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="font-medium text-slate-950 dark:text-white">{certificate.recipient}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Issued {certificate.issued}</p>
                          </div>
                          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">{certificate.status}</span>
                        </div>
                      </div>
                    ))}
                    {selectedEvent.certificates.length === 0 && (
                      <p className="text-sm text-slate-500 dark:text-slate-400">No certificates issued yet.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 text-center shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
              <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Event details</h2>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">Select an event from the list to review registrations, attendance, and certification progress.</p>
            </div>
          )}

          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
            <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Summary</h2>
            <div className="mt-5 space-y-4">
              <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                <p className="text-sm text-slate-500 dark:text-slate-400">Total events</p>
                <p className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">{events.length}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                <p className="text-sm text-slate-500 dark:text-slate-400">Total registrations</p>
                <p className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">{totalRegistrations}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                <p className="text-sm text-slate-500 dark:text-slate-400">Total checked-in</p>
                <p className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">{totalAttendance}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                <p className="text-sm text-slate-500 dark:text-slate-400">Total certificates</p>
                <p className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">{totalCertificates}</p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {formMode && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-3xl rounded-3xl bg-white p-6 shadow-2xl shadow-slate-900/10 dark:bg-slate-950 dark:text-white">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">{formMode === 'edit' ? 'Edit event' : 'Create event'}</p>
                <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">{formMode === 'edit' ? 'Update event details' : 'Add a new event'}</h2>
              </div>
              <button
                type="button"
                onClick={closeForm}
                className="rounded-2xl border border-slate-200 bg-slate-100 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Close
              </button>
            </div>
            <EventForm event={editingEvent} onSubmit={handleEventSubmit} onCancel={closeForm} />
          </div>
        </div>
      )}
    </section>
  )
}

export default Events
