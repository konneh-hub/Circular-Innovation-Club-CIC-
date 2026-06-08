import { useEffect, useMemo, useState } from 'react'
import { FiTrendingUp, FiDollarSign, FiUsers, FiFileText, FiShield } from 'react-icons/fi'
import PageHeader from '../../components/common/PageHeader'
import { fetchAdminFunding } from '../../data/adminData'

const statusStyles = {
  Approved: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  Review: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  Pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  Draft: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  'In review': 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
  Active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  Paid: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  Ready: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
}

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)

const Funding = () => {
  const [funding, setFunding] = useState(null)

  useEffect(() => {
    fetchAdminFunding().then(setFunding)
  }, [])

  const approvalCount = useMemo(
    () => funding?.fundingRequests.filter((request) => request.status === 'Approved').length || 0,
    [funding],
  )

  const pendingCount = useMemo(
    () => funding?.fundingRequests.filter((request) => request.status === 'Pending').length || 0,
    [funding],
  )

  const reviewCount = useMemo(
    () => funding?.fundingRequests.filter((request) => request.status === 'Review').length || 0,
    [funding],
  )

  if (!funding) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 text-center text-slate-500 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-400">
        Loading funding dashboard...
      </div>
    )
  }

  const budgetUsage = Math.round((funding.usedBudget / funding.totalBudget) * 100)

  return (
    <section className="space-y-8">
      <PageHeader
        title="Funding management"
        subtitle="Manage funding requests, track budgets, review expenses, and oversee sponsor contributions."
      />

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
          <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Total budget</p>
          <p className="mt-4 text-3xl font-semibold text-slate-950 dark:text-white">{formatCurrency(funding.totalBudget)}</p>
          <div className="mt-4 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <FiDollarSign className="h-4 w-4" />
            <span>Allocated for CIC funding initiatives</span>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
          <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Budget used</p>
          <p className="mt-4 text-3xl font-semibold text-slate-950 dark:text-white">{formatCurrency(funding.usedBudget)}</p>
          <div className="mt-4 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <FiTrendingUp className="h-4 w-4" />
            <span>{budgetUsage}% utilized</span>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
          <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Remaining budget</p>
          <p className="mt-4 text-3xl font-semibold text-slate-950 dark:text-white">{formatCurrency(funding.remainingBudget)}</p>
          <div className="mt-4 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <FiShield className="h-4 w-4" />
            <span>For future projects and contingencies</span>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
          <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Active sponsors</p>
          <p className="mt-4 text-3xl font-semibold text-slate-950 dark:text-white">{funding.sponsors.length}</p>
          <div className="mt-4 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <FiUsers className="h-4 w-4" />
            <span>Organizations contributing support</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Spending trend</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">Monthly funding burn</h2>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              {budgetUsage}% budget used
            </span>
          </div>

          <div className="mt-8 space-y-4">
            {funding.spendingTrend.labels.map((label, index) => {
              const value = funding.spendingTrend.values[index]
              const barWidth = Math.min(100, Math.round((value / Math.max(...funding.spendingTrend.values)) * 100))
              return (
                <div key={label} className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-slate-700 dark:text-slate-300">
                    <span>{label}</span>
                    <span>{formatCurrency(value)}</span>
                  </div>
                  <div className="h-3 rounded-full bg-slate-100 dark:bg-slate-800">
                    <div className="h-3 rounded-full bg-slate-950 dark:bg-slate-200 transition-all" style={{ width: `${barWidth}%` }} />
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-8">
            <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Expense allocation</p>
            <div className="mt-4 space-y-4">
              {funding.expenseSummary.map((segment) => (
                <div key={segment.label}>
                  <div className="flex items-center justify-between text-sm text-slate-700 dark:text-slate-300">
                    <span>{segment.label}</span>
                    <span>{segment.value}%</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div className="h-3 rounded-full bg-slate-900 dark:bg-slate-300" style={{ width: `${segment.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
            <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Funding status</p>
            <div className="mt-4 grid gap-4">
              <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Approved requests</p>
                <p className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">{approvalCount}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Pending review</p>
                <p className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">{reviewCount}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Waiting approval</p>
                <p className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">{pendingCount}</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
            <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Top sponsors</p>
            <div className="mt-6 space-y-4">
              {funding.sponsors.map((sponsor) => (
                <div key={sponsor.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-slate-950 dark:text-white">{sponsor.name}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Contribution: {sponsor.contribution}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[sponsor.status]}`}>
                      {sponsor.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Funding requests</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">Requests & approvals</h2>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              {funding.fundingRequests.length} total
            </span>
          </div>

          <div className="mt-6 space-y-4">
            {funding.fundingRequests.map((request) => (
              <div key={request.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{request.project}</h3>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Requested by {request.requestedBy} • {request.requestedOn}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-sm font-semibold ${statusStyles[request.status]}`}>
                    {request.status}
                  </span>
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-3xl bg-white p-4 text-sm text-slate-700 shadow-sm shadow-slate-200/50 dark:bg-slate-950 dark:text-slate-300">
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Amount requested</p>
                    <p className="mt-2 text-base font-semibold text-slate-950 dark:text-white">{formatCurrency(request.amount)}</p>
                  </div>
                  <div className="rounded-3xl bg-white p-4 text-sm text-slate-700 shadow-sm shadow-slate-200/50 dark:bg-slate-950 dark:text-slate-300">
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Purpose</p>
                    <p className="mt-2 text-base text-slate-600 dark:text-slate-300">{request.purpose}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
            <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Recent expenses</p>
            <div className="mt-6 space-y-4">
              {funding.expenses.map((expense) => (
                <div key={expense.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-slate-950 dark:text-white">{expense.item}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{expense.category} • {expense.date}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[expense.status]}`}>
                      {expense.status}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">{formatCurrency(expense.amount)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Funding reports</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">Reports</h2>
              </div>
              <FiFileText className="h-6 w-6 text-slate-900 dark:text-slate-200" />
            </div>

            <div className="mt-6 space-y-3">
              {funding.reports.map((report) => (
                <div key={report.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-950 dark:text-white">{report.title}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Updated {report.updated}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[report.status]}`}>
                      {report.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default Funding
