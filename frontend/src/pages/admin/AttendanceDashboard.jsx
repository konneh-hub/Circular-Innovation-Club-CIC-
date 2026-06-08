import { useEffect, useMemo, useState } from 'react'
import { FiTrendingUp, FiUsers, FiCheckCircle, FiCalendar, FiActivity, FiRefreshCw } from 'react-icons/fi'
import PageHeader from '../../components/common/PageHeader'
import { fetchAdminEvents } from '../../data/adminData'

const statCardClasses =
  'rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95'

const AttendanceDashboard = () => {
  const [events, setEvents] = useState(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [lastUpdate, setLastUpdate] = useState(null)

  useEffect(() => {
    fetchAdminEvents().then((data) => {
      setEvents(data)
      setLastUpdate(new Date())
      setLoading(false)
    })
  }, [])

  const attendanceSummary = useMemo(() => {
    if (!events) return {
      totalAttendance: 0,
      totalEvents: 0,
      openEvents: 0,
      averageAttendance: 0,
      busiestEvent: null,
    }

    const totalAttendance = events.reduce((sum, event) => sum + event.attendance.length, 0)
    const totalEvents = events.length
    const openEvents = events.filter((event) => event.status === 'Open').length
    const averageAttendance = totalEvents ? Math.round(totalAttendance / totalEvents) : 0
    const busiestEvent = events.slice().sort((a, b) => b.attendance.length - a.attendance.length)[0]

    return { totalAttendance, totalEvents, openEvents, averageAttendance, busiestEvent }
  }, [events])

  const liveOpenEvents = useMemo(() => {
    if (!events) return []
    return events.filter((event) => ['Open', 'Registration'].includes(event.status))
  }, [events])

  const recentCheckIns = useMemo(() => {
    if (!events) return []
    return events
      .flatMap((event) =>
        event.attendance.map((attendee) => ({
          ...attendee,
          eventTitle: event.title,
          eventStatus: event.status,
        })),
      )
      .slice(-6)
      .reverse()
  }, [events])

  const handleRefreshLive = async () => {
    setRefreshing(true)
    const latest = await fetchAdminEvents()
    setEvents(latest)
    setLastUpdate(new Date())
    setRefreshing(false)
  }

  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 text-center text-slate-500 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-400">
        Loading admin attendance dashboard...
      </div>
    )
  }

  const { totalAttendance, totalEvents, openEvents, averageAttendance, busiestEvent } = attendanceSummary

  return (
    <section className="space-y-8">
      <PageHeader
        title="Attendance dashboard"
        subtitle="Monitor event check-ins, view attendance history, and track top-performing events in the CIC admin panel."
      />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <div className={statCardClasses}>
          <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Total check-ins</p>
          <p className="mt-4 text-4xl font-semibold text-slate-950 dark:text-white">{totalAttendance}</p>
          <div className="mt-4 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <FiCheckCircle className="h-4 w-4" />
            <span>Across all active events</span>
          </div>
        </div>

        <div className={statCardClasses}>
          <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Active events</p>
          <p className="mt-4 text-4xl font-semibold text-slate-950 dark:text-white">{totalEvents}</p>
          <div className="mt-4 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <FiCalendar className="h-4 w-4" />
            <span>Events tracked in attendance system</span>
          </div>
        </div>

        <div className={statCardClasses}>
          <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Open events</p>
          <p className="mt-4 text-4xl font-semibold text-slate-950 dark:text-white">{openEvents}</p>
          <div className="mt-4 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <FiActivity className="h-4 w-4" />
            <span>Events still accepting check-ins</span>
          </div>
        </div>

        <div className={statCardClasses}>
          <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Average attendance</p>
          <p className="mt-4 text-4xl font-semibold text-slate-950 dark:text-white">{averageAttendance}</p>
          <div className="mt-4 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <FiTrendingUp className="h-4 w-4" />
            <span>Check-ins per event</span>
          </div>
        </div>
      </div>

      <div className={statCardClasses}>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Live attendance monitoring</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">Open events & latest check-ins</h2>
          </div>
          <button
            type="button"
            onClick={handleRefreshLive}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
          >
            <FiRefreshCw className="h-4 w-4" />
            {refreshing ? 'Refreshing...' : 'Refresh live data'}
          </button>
        </div>

        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
          {lastUpdate ? `Last updated ${lastUpdate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : 'Live event attendance data is updated automatically.'}
        </p>

        <div className="mt-6 space-y-4">
          {liveOpenEvents.length ? (
            liveOpenEvents.map((event) => (
              <div key={event.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{event.title}</h3>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{event.date} • {event.location}</p>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200">
                    {event.status}
                  </span>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-3xl bg-white p-4 text-sm text-slate-700 shadow-sm shadow-slate-200/50 dark:bg-slate-950 dark:text-slate-300">
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Checked in</p>
                    <p className="mt-2 text-base font-semibold text-slate-950 dark:text-white">{event.attendance.length}</p>
                  </div>
                  <div className="rounded-3xl bg-white p-4 text-sm text-slate-700 shadow-sm shadow-slate-200/50 dark:bg-slate-950 dark:text-slate-300">
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Capacity</p>
                    <p className="mt-2 text-base font-semibold text-slate-950 dark:text-white">{event.capacity}</p>
                  </div>
                  <div className="rounded-3xl bg-white p-4 text-sm text-slate-700 shadow-sm shadow-slate-200/50 dark:bg-slate-950 dark:text-slate-300">
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Registrations</p>
                    <p className="mt-2 text-base font-semibold text-slate-950 dark:text-white">{event.registrations.length}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
              No live open events are available for monitoring right now.
            </div>
          )}
        </div>

        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Recent check-ins</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Latest attendance registrations across events.</p>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {recentCheckIns.length ? (
              recentCheckIns.map((item) => (
                <div key={item.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-slate-950 dark:text-white">{item.name}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{item.eventTitle}</p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      {item.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                No check-ins have been recorded yet.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">
        <div className={statCardClasses}>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Event attendance</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">Attendance by event</h2>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {events.map((event) => (
              <div key={event.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{event.title}</h3>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{event.date} • {event.location}</p>
                  </div>
                  <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {event.attendance.length} / {event.capacity} checked in
                  </div>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-3xl bg-white p-4 text-sm text-slate-700 shadow-sm shadow-slate-200/50 dark:bg-slate-950 dark:text-slate-300">
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Registrations</p>
                    <p className="mt-2 text-base font-semibold text-slate-950 dark:text-white">{event.registrations.length}</p>
                  </div>
                  <div className="rounded-3xl bg-white p-4 text-sm text-slate-700 shadow-sm shadow-slate-200/50 dark:bg-slate-950 dark:text-slate-300">
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Certificates</p>
                    <p className="mt-2 text-base font-semibold text-slate-950 dark:text-white">{event.certificates.length}</p>
                  </div>
                  <div className="rounded-3xl bg-white p-4 text-sm text-slate-700 shadow-sm shadow-slate-200/50 dark:bg-slate-950 dark:text-slate-300">
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Status</p>
                    <p className="mt-2 text-base font-semibold text-slate-950 dark:text-white">{event.status}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className={statCardClasses}>
          <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Top event</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">Busiest check-in</h2>

          {busiestEvent ? (
            <div className="mt-6 space-y-4 rounded-[1.75rem] bg-slate-950/95 p-6 text-white shadow-2xl shadow-slate-950/20">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-slate-400">{busiestEvent.type}</p>
                  <h3 className="mt-2 text-xl font-semibold">{busiestEvent.title}</h3>
                </div>
                <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-sm text-emerald-200">
                  {busiestEvent.attendance.length} checked in
                </span>
              </div>
              <p className="text-sm text-slate-300">{busiestEvent.date} • {busiestEvent.location}</p>
              <div className="grid gap-4 rounded-3xl bg-white/5 p-4 text-sm text-slate-200 ring-1 ring-white/10">
                <div className="flex items-center justify-between">
                  <span>Capacity</span>
                  <span>{busiestEvent.capacity}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Registrations</span>
                  <span>{busiestEvent.registrations.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Certificates</span>
                  <span>{busiestEvent.certificates.length}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-6 rounded-[1.75rem] bg-slate-50 p-6 text-sm text-slate-600 dark:bg-slate-900 dark:text-slate-300">
              No event attendance data is available yet.
            </div>
          )}
        </aside>
      </div>
    </section>
  )
}

export default AttendanceDashboard
