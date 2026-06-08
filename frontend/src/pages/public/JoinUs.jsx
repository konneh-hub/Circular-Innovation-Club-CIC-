import PageHeader from '../../components/common/PageHeader'
import Button from '../../components/common/Button'

const JoinUs = () => (
  <div className="space-y-12">
    <PageHeader title="Join Us" subtitle="Become a CIC member and help create better circular systems." />

    <section className="grid gap-10 lg:grid-cols-[0.95fr_0.75fr]">
      <div className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900/95 dark:shadow-black/20">
        <h2 className="text-3xl font-semibold text-slate-950 dark:text-white">Why join CIC?</h2>
        <p className="text-slate-600 dark:text-slate-300">Joining CIC gives you access to mentorship, funding opportunities, events, and a community of students building circular impact.</p>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
            <h3 className="font-semibold text-slate-950 dark:text-white">Mentorship</h3>
            <p className="mt-3 text-slate-600 dark:text-slate-300">Work with faculty, founders, and industry leaders on practical projects.</p>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
            <h3 className="font-semibold text-slate-950 dark:text-white">Events</h3>
            <p className="mt-3 text-slate-600 dark:text-slate-300">Attend workshops, showcases and collaboration sessions each month.</p>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
            <h3 className="font-semibold text-slate-950 dark:text-white">Funding</h3>
            <p className="mt-3 text-slate-600 dark:text-slate-300">Apply for grants to take your circular prototypes further.</p>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
            <h3 className="font-semibold text-slate-950 dark:text-white">Network</h3>
            <p className="mt-3 text-slate-600 dark:text-slate-300">Join a network of students, partners and changemakers around sustainability.</p>
          </div>
        </div>
      </div>
      <aside className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950 dark:shadow-black/20">
        <h3 className="text-2xl font-semibold text-slate-950 dark:text-white">Ready to apply?</h3>
        <p className="mt-4 text-slate-600 dark:text-slate-300">Complete a short application and we’ll connect you with a CIC coordinator.</p>
        <div className="mt-8 space-y-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Eligibility</p>
            <p className="mt-3 text-slate-600 dark:text-slate-300">Open to all students with a passion for sustainable innovation.</p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Next cohort</p>
            <p className="mt-3 text-slate-600 dark:text-slate-300">Applications reviewed on a rolling basis.</p>
          </div>
        </div>
        <Button className="mt-8 w-full" variant="primary">Apply to join</Button>
      </aside>
    </section>
  </div>
)

export default JoinUs
