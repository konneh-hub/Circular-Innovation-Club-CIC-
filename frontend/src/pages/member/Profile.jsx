import { useEffect, useState } from 'react'
import PageHeader from '../../components/common/PageHeader'
import Button from '../../components/common/Button'
import { fetchMemberProfile } from '../../data/memberData'

const Profile = () => {
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    fetchMemberProfile().then(setProfile)
  }, [])

  if (!profile) {
    return <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 text-center text-slate-500 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-400">Loading profile...</div>
  }

  return (
    <section className="space-y-8">
      <PageHeader
        title="Profile"
        subtitle="Manage your member profile and personal details."
        actions={<Button variant="secondary">Edit profile</Button>}
      />

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-950 dark:text-white">About you</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">{profile.bio}</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-900">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">Member ID</p>
              <p className="mt-3 text-lg font-semibold text-slate-950 dark:text-white">{profile.memberId}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-900">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">Membership level</p>
              <p className="mt-3 text-lg font-semibold text-slate-950 dark:text-white">{profile.membershipLevel}</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm text-slate-500 dark:text-slate-400">Joined</p>
              <p className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">{profile.joined}</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm text-slate-500 dark:text-slate-400">Location</p>
              <p className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">{profile.location}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
          <div className="space-y-4 rounded-3xl bg-slate-50 p-5 dark:bg-slate-900">
            <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Contact information</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">{profile.email}</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">{profile.phone}</p>
          </div>

          <div className="space-y-4 rounded-3xl bg-slate-50 p-5 dark:bg-slate-900">
            <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Core skills</h3>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <span key={skill} className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4 rounded-3xl bg-slate-50 p-5 dark:bg-slate-900">
            <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((topic) => (
                <span key={topic} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200">
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Profile
