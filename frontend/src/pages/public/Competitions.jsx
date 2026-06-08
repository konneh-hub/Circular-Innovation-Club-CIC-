import PageHeader from '../../components/common/PageHeader'
import Button from '../../components/common/Button'

const competitions = [
  {
    title: 'Circular Startup Challenge',
    timeline: 'Applications open now',
    focus: 'Sustainable product and lifecycle innovation',
  },
  {
    title: 'Material Reuse Hackathon',
    timeline: 'Oct 14 - Oct 16',
    focus: 'Designing reusable material flows',
  },
  {
    title: 'Eco Design Showcase',
    timeline: 'Nov 5',
    focus: 'Community solutions for local sustainability',
  },
]

const Competitions = () => (
  <div className="space-y-12">
    <PageHeader title="Competitions" subtitle="Compete with innovative teams and win support for circular solutions." />

    <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900/95 dark:shadow-black/20">
      <h2 className="text-3xl font-semibold text-slate-950 dark:text-white">Open challenges</h2>
      <p className="mt-4 text-slate-600 dark:text-slate-300">Teams can submit proposals for our seasonal competitions and gain access to cash awards, mentorship, and partner support.</p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {competitions.map((competition) => (
          <article key={competition.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">{competition.timeline}</span>
            <h3 className="mt-4 text-2xl font-semibold text-slate-950 dark:text-white">{competition.title}</h3>
            <p className="mt-3 text-slate-600 dark:text-slate-300">{competition.focus}</p>
          </article>
        ))}
      </div>
      <div className="mt-8">
        <Button variant="primary">Apply for the next competition</Button>
      </div>
    </section>
  </div>
)

export default Competitions
