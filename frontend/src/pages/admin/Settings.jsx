import { useEffect, useState } from 'react'
import PageHeader from '../../components/common/PageHeader'
import Button from '../../components/common/Button'
import { fetchAdminSettings } from '../../data/adminData'

const Settings = () => {
  const [settings, setSettings] = useState(null)

  useEffect(() => {
    fetchAdminSettings().then(setSettings)
  }, [])

  if (!settings) {
    return <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 text-center text-slate-500 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-400">Loading settings...</div>
  }

  const togglePreference = (index) => {
    setSettings((current) => {
      const copy = { ...current }
      copy.preferences = copy.preferences.map((item, idx) =>
        idx === index ? { ...item, enabled: !item.enabled } : item,
      )
      return copy
    })
  }

  return (
    <section className="space-y-8">
      <PageHeader title="Settings" subtitle="Configure CIC platform preferences and access." />
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
          <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Account settings</h2>
          <div className="mt-5 space-y-4 rounded-3xl bg-slate-50 p-5 dark:bg-slate-900">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Admin name</p>
              <p className="mt-1 font-semibold text-slate-950 dark:text-white">{settings.account.adminName}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Email</p>
              <p className="mt-1 font-semibold text-slate-950 dark:text-white">{settings.account.email}</p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
          <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Preferences</h2>
          <div className="mt-5 space-y-4">
            {settings.preferences.map((item, index) => (
              <div key={item.label} className="flex items-center justify-between rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                <div>
                  <p className="font-semibold text-slate-950 dark:text-white">{item.label}</p>
                </div>
                <button
                  type="button"
                  onClick={() => togglePreference(index)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${item.enabled ? 'bg-primary text-white' : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'}`}
                >
                  {item.enabled ? 'Enabled' : 'Disabled'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Platform actions</h2>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">Manage platform permissions and run health checks for CIC services.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button variant="primary">Update access</Button>
          <Button variant="secondary">Run health check</Button>
        </div>
      </div>
    </section>
  )
}

export default Settings
