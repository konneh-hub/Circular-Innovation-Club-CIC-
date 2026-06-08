import { useEffect, useState } from 'react'
import PageHeader from '../../components/common/PageHeader'
import Button from '../../components/common/Button'
import { fetchMembershipCard } from '../../data/memberData'

const MembershipCard = () => {
  const [card, setCard] = useState(null)

  useEffect(() => {
    fetchMembershipCard().then(setCard)
  }, [])

  if (!card) {
    return <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 text-center text-slate-500 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-400">Loading membership card...</div>
  }

  return (
    <section className="space-y-8">
      <PageHeader title="Membership Card" subtitle="View your CIC membership credentials." />

      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-8 text-white shadow-xl shadow-slate-950/20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-slate-400">CIC Member</p>
              <h2 className="mt-2 text-3xl font-semibold">{card.name}</h2>
            </div>
            <span className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white">{card.level}</span>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="space-y-2 rounded-3xl bg-white/10 p-5">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-300">Member ID</p>
              <p className="text-lg font-semibold text-white">{card.memberId}</p>
            </div>
            <div className="space-y-2 rounded-3xl bg-white/10 p-5">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-300">Expiry</p>
              <p className="text-lg font-semibold text-white">{card.expiry}</p>
            </div>
          </div>

          <div className="mt-8 rounded-3xl bg-white/10 p-6 text-sm text-slate-300">
            <p className="font-semibold text-white">Tier benefits</p>
            <ul className="mt-3 space-y-2">
              {card.tierBenefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-2">
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-6 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-slate-950 dark:text-white">Membership details</h3>
            <div className="grid gap-4">
              <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-900">
                <p className="text-sm text-slate-500 dark:text-slate-400">Joined</p>
                <p className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">{card.joined}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-900">
                <p className="text-sm text-slate-500 dark:text-slate-400">Membership tier</p>
                <p className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">{card.level} member</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Ready to share?</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Use your CIC membership details when applying for events or partner programs.</p>
            <Button variant="primary">Copy membership ID</Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MembershipCard
