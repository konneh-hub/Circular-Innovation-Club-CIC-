import { useEffect, useState } from 'react'
import PageHeader from '../../components/common/PageHeader'
import { fetchAdminFunding } from '../../data/adminData'

const statusStyles = {
  Approved: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  Review: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  Pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
}

const Funding = () => {
  const [requests, setRequests] = useState(null)

  useEffect(() => {
    fetchAdminFunding().then(setRequests)
  }, [])

  if (!requests) {
    return <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 text-center text-slate-500 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-400">Loading funding requests...</div>
  }

  return (
    <section className="space-y-8">
      <PageHeader title="Funding" subtitle="Manage CIC funding rounds and sponsorships." />
      <div className="grid gap-6 lg:grid-cols-2">
        {requests.map((request) => (
          <div key={request.project} className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-950 dark:text-white">{request.project}</h2>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Requested by {request.requestedBy}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-sm font-semibold ${statusStyles[request.status]}`}>
                {request.status}
              </span>
            </div>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">Amount: {request.amount}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Funding
