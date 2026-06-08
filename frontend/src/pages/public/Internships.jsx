import PageHeader from '../../components/common/PageHeader'
import Button from '../../components/common/Button'

const internships = [
  {
    title: 'Sustainability Research Intern',
    host: 'EcoSphere Labs',
    duration: '3 months',
    summary: 'Support research into circular materials and prototype evaluation.',
  },
  {
    title: 'Product Design Intern',
    host: 'GreenTech Alliance',
    duration: '6 months',
    summary: 'Help design low-waste products and scalable reuse systems.',
  },
  {
    title: 'Community Engagement Intern',
    host: 'ReThink NGO',
    duration: '4 months',
    summary: 'Coordinate student outreach and sustainability education events.',
  },
]

const Internships = () => (
  <div className="space-y-12">
    <PageHeader title="Internships" subtitle="Unlock hands-on roles with CIC partners and innovation initiatives." />

    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {internships.map((item) => (
        <article key={item.title} className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900/95 dark:shadow-black/20">
          <p className="text-sm uppercase tracking-[0.3em] text-primary">{item.duration}</p>
          <h3 className="mt-4 text-2xl font-semibold text-slate-950 dark:text-white">{item.title}</h3>
          <p className="mt-4 text-slate-600 dark:text-slate-300">{item.summary}</p>
          <p className="mt-6 text-sm font-medium text-slate-700 dark:text-slate-300">Hosted by {item.host}</p>
          <Button className="mt-8" variant="secondary">
            Apply now
          </Button>
        </article>
      ))}
    </section>
  </div>
)

export default Internships
