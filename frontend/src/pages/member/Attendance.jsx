import { useEffect, useMemo, useState } from 'react'
import { FiCamera, FiCheckCircle, FiCopy, FiClock, FiXCircle } from 'react-icons/fi'
import QRCode from 'react-qr-code'
import PageHeader from '../../components/common/PageHeader'
import Button from '../../components/common/Button'
import { fetchAttendanceData } from '../../data/memberData'

const statusStyles = {
  success: 'border-emerald-100 bg-emerald-50 text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/40 dark:text-emerald-300',
  warning: 'border-amber-100 bg-amber-50 text-amber-700 dark:border-amber-900/40 dark:bg-amber-950/40 dark:text-amber-300',
  error: 'border-rose-100 bg-rose-50 text-rose-700 dark:border-rose-900/40 dark:bg-rose-950/40 dark:text-rose-300',
}

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState(null)
  const [scannerInput, setScannerInput] = useState('')
  const [scanStatus, setScanStatus] = useState('')
  const [scanMessage, setScanMessage] = useState('')
  const [cameraActive, setCameraActive] = useState(false)
  const [cameraError, setCameraError] = useState('')
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAttendanceData().then((data) => {
      setAttendanceData(data)
      setLoading(false)
    })
  }, [])

  const attendanceCode = useMemo(() => {
    if (!attendanceData) return ''
    return `attendance:${attendanceData.member.memberId}:${attendanceData.activeEvent.eventId}`
  }, [attendanceData])

  const handleCopyCode = async () => {
    if (!attendanceCode) return

    try {
      await navigator.clipboard.writeText(attendanceCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setScanStatus('error')
      setScanMessage('Unable to copy attendance code. Please try again.')
    }
  }

  const handleCameraResult = (result, error) => {
    if (result) {
      const text = result?.text || ''
      setScannerInput(text)
      setScanStatus('success')
      setScanMessage('QR code scanned. Review the token and submit to confirm attendance.')
      setCameraError('')
    }

    if (error) {
      setCameraError('No QR code detected. Move the camera closer to the code or adjust the angle.')
    }
  }

  const handleScan = () => {
    if (!scannerInput.trim()) {
      setScanStatus('error')
      setScanMessage('Please enter or paste the scanned attendance token.')
      return
    }

    const token = scannerInput.trim()
    const match = token.match(/^attendance:([^:]+):(.+)$/)

    if (!match) {
      setScanStatus('error')
      setScanMessage('This does not appear to be a valid attendance QR code.')
      return
    }

    const [, scannedMember, scannedEventId] = match
    if (scannedMember !== attendanceData.member.memberId) {
      setScanStatus('error')
      setScanMessage('The scanned code belongs to a different member.')
      return
    }

    const existingRecord = attendanceData.history.find((item) => item.eventId === scannedEventId)
    const eventRecord = existingRecord || attendanceData.activeEvent

    if (!eventRecord) {
      setScanStatus('error')
      setScanMessage('This attendance code does not match any known event.')
      return
    }

    if (existingRecord?.status === 'Present') {
      setScanStatus('warning')
      setScanMessage(`Attendance already recorded for ${eventRecord.event}.`)
      return
    }

    const updatedRecord = {
      ...eventRecord,
      event: eventRecord.event || attendanceData.activeEvent.event,
      date: eventRecord.date || attendanceData.activeEvent.date,
      location: eventRecord.location || attendanceData.activeEvent.location,
      status: 'Present',
      scannedAt: new Date().toLocaleString('en-US', { hour12: true }),
    }

    setAttendanceData((current) => ({
      ...current,
      history: [updatedRecord, ...(current.history.filter((item) => item.eventId !== scannedEventId) || [])],
    }))
    setScanStatus('success')
    setScanMessage(`Attendance recorded for ${updatedRecord.event}.`)
    setScannerInput('')
  }

  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 text-center text-slate-500 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-400">
        Loading attendance module...
      </div>
    )
  }

  const { member, activeEvent, history } = attendanceData

  return (
    <section className="space-y-8">
      <PageHeader
        title="QR Attendance"
        subtitle="Generate your attendance QR, scan participation codes, and track your attendance history in one place."
      />

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Your attendance QR</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white">Show this QR to mark your attendance</h2>
              </div>
              <Button onClick={handleCopyCode} variant="secondary" className="rounded-full">
                <FiCopy className="mr-2 h-4 w-4" />
                {copied ? 'Copied' : 'Copy token'}
              </Button>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-[2rem] bg-slate-950/95 p-6 text-center text-white shadow-2xl shadow-slate-950/20">
                <div className="inline-flex rounded-3xl bg-slate-900/70 p-4 shadow-inner shadow-slate-950/20">
                  <QRCode value={attendanceCode} size={200} bgColor="transparent" fgColor="#ffffff" />
                </div>
                <p className="mt-5 text-sm text-slate-300">Attendance QR for</p>
                <p className="mt-1 text-xl font-semibold text-white">{member.name}</p>
                <p className="mt-2 text-sm text-slate-400">{activeEvent.event} • {activeEvent.date}</p>
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 text-sm text-slate-700 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Event details</p>
                <div className="mt-4 space-y-4">
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Event name</p>
                    <p className="font-semibold text-slate-950 dark:text-white">{activeEvent.event}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Date</p>
                    <p className="font-semibold text-slate-950 dark:text-white">{activeEvent.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Location</p>
                    <p className="font-semibold text-slate-950 dark:text-white">{activeEvent.location}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-[1.75rem] bg-slate-50 p-5 text-sm text-slate-700 ring-1 ring-slate-200 dark:bg-slate-950 dark:text-slate-300 dark:ring-slate-800">
              <p className="font-semibold text-slate-950 dark:text-white">Attendance token</p>
              <p className="mt-3 break-all rounded-3xl bg-white/90 px-4 py-3 text-xs tracking-[0.02em] text-slate-600 shadow-sm shadow-slate-200/50 dark:bg-slate-900 dark:text-slate-300">
                {attendanceCode}
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-primary/10 text-primary">
                <FiCamera className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Attendance scanner</p>
                <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Scan attendance codes</h2>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Live camera scan</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Use your device camera to scan the attendance QR code automatically.</p>
                </div>
                <Button onClick={() => setCameraActive((active) => !active)} variant="secondary" className="rounded-full">
                  {cameraActive ? 'Hide camera scanner' : 'Use camera scanner'}
                </Button>
              </div>
              {cameraActive ? (
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                  <p className="font-semibold text-slate-900 dark:text-white">Camera scanner unavailable</p>
                  <p className="mt-3">The live camera scanner is currently unavailable in this build. Please paste the QR attendance token into the field above and submit it manually.</p>
                </div>
              ) : null}

              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Scanned QR token</label>
              <textarea
                rows={3}
                value={scannerInput}
                onChange={(event) => setScannerInput(event.target.value)}
                placeholder="Paste scanned attendance token here"
                className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-500 dark:text-slate-400">Use the token from event staff or scan dialog to register your presence.</p>
                <Button onClick={handleScan} className="rounded-full">
                  Scan attendance
                </Button>
              </div>
              {scanStatus ? (
                <div className={`rounded-3xl border p-4 text-sm ${statusStyles[scanStatus]}`}>
                  <div className="flex items-center gap-3">
                    {scanStatus === 'success' ? <FiCheckCircle className="h-5 w-5" /> : scanStatus === 'warning' ? <FiClock className="h-5 w-5" /> : <FiXCircle className="h-5 w-5" />}
                    <p>{scanMessage}</p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Attendance summary</p>
                <h2 className="mt-2 text-xl font-semibold text-slate-950 dark:text-white">Recent check-ins</h2>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                {history.filter((item) => item.status === 'Present').length} present
              </span>
            </div>

            <div className="mt-6 space-y-4">
              {history.length ? (
                history.map((item) => (
                  <div key={item.eventId} className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-semibold text-slate-950 dark:text-white">{item.event}</h3>
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{item.date} • {item.location}</p>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.status === 'Present' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200' : 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-200'}`}>
                        {item.status}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Scanned at {item.scannedAt || '–'}</p>
                  </div>
                ))
              ) : (
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                  No attendance history available yet. Scan your first event QR to start tracking attendance.
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default Attendance
