import { useEffect, useState } from 'react'
import PageHeader from '../../components/common/PageHeader'
import { fetchAdminPartners } from '../../data/adminData'

const Partners = () => {
  const [partners, setPartners] = useState(null)

  useEffect(() => {
    fetchAdminPartners().then(setPartners)
  }, [])

  if (!partners) {
    return <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 text-center text-slate-500 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-400">Loading partner data...</div>
  }

  return (
    <section className="space-y-8">
      <PageHeader title="Partners" subtitle="Control partner listings and collaborations." />
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {partners.map((partner) => (
          <div key={partner.name} className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
            <h2 className="text-xl font-semibold text-slate-950 dark:text-white">{partner.name}</h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">Partnership type: {partner.type}</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Status: {partner.status}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Partners
