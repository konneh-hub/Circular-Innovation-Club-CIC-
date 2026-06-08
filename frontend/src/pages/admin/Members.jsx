import { useEffect, useState } from 'react'
import PageHeader from '../../components/common/PageHeader'
import { fetchAdminMembers } from '../../data/adminData'

const statusStyles = {
  Active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  Pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  Suspended: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
}

const Members = () => {
  const [members, setMembers] = useState(null)

  useEffect(() => {
    fetchAdminMembers().then(setMembers)
  }, [])

  if (!members) {
    return <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 text-center text-slate-500 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-400">Loading members...</div>
  }

  return (
    <section className="space-y-8">
      <PageHeader title="Members" subtitle="View and manage CIC member listings." />
      <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white/90 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
        <table className="min-w-full divide-y divide-slate-200 text-left dark:divide-slate-800">
          <thead className="bg-slate-50 text-slate-600 dark:bg-slate-900 dark:text-slate-300">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold">Name</th>
              <th className="px-6 py-4 text-sm font-semibold">Role</th>
              <th className="px-6 py-4 text-sm font-semibold">Joined</th>
              <th className="px-6 py-4 text-sm font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-800 dark:bg-slate-950">
            {members.map((member) => (
              <tr key={member.name}>
                <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">{member.name}</td>
                <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">{member.role}</td>
                <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">{member.joined}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`inline-flex rounded-full px-3 py-1 font-semibold ${statusStyles[member.status]}`}>
                    {member.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Members
