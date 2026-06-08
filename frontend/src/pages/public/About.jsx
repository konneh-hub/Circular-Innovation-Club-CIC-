import PageHeader from '../../components/common/PageHeader'
import Button from '../../components/common/Button'
import { stats } from '../../data/publicData'

const About = () => (
  <div className="space-y-12">
    <PageHeader title="About CIC" subtitle="Discover how Circular Innovation Club brings students, startups and partners together." />

    <section className="grid gap-10 lg:grid-cols-[0.9fr_0.8fr]">
      <div className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900/95 dark:shadow-black/20">
        <h2 className="text-3xl font-semibold text-slate-950 dark:text-white">Our story</h2>
        <p className="text-slate-600 dark:text-slate-300">
          Circular Innovation Club (CIC) is a student-led network that supports ambitious teams working at the intersection of sustainability, technology and social impact. We provide mentorship, event programming and resources to help circular ideas become viable ventures.
        </p>
        <p className="text-slate-600 dark:text-slate-300">
          Since launch, CIC has grown into a collaborative ecosystem with universities, non-profits and corporate sponsors, focused on practical solutions to resource scarcity, pollution and climate resilience.
        </p>
        <Button variant="primary">Explore our programs</Button>
      </div>
      <div className="grid gap-6">
        <article className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 dark:border-slate-800 dark:bg-slate-950">
          <h3 className="text-xl font-semibold text-slate-950 dark:text-white">How we operate</h3>
          <ul className="mt-6 space-y-4 text-slate-600 dark:text-slate-300">
            <li>• Project-based learning with real partners.</li>
            <li>• Monthly innovation labs and community showcases.</li>
            <li>• Support for circular startups and research pilots.</li>
            <li>• Open collaboration tools for students and mentors.</li>
          </ul>
        </article>
        <article className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 dark:border-slate-800 dark:bg-slate-950">
          <h3 className="text-xl font-semibold text-slate-950 dark:text-white">Our values</h3>
          <ul className="mt-6 space-y-4 text-slate-600 dark:text-slate-300">
            <li>• Circularity over consumption.</li>
            <li>• Collaboration across disciplines.</li>
            <li>• Systems thinking in every solution.</li>
            <li>• Equity and accessibility for all members.</li>
          </ul>
        </article>
      </div>
    </section>

    <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900/95 dark:shadow-black/20">
          <p className="text-4xl font-semibold text-slate-950 dark:text-white">{stat.value}</p>
          <p className="mt-3 text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">{stat.label}</p>
        </div>
      ))}
    </section>
  </div>
)

export default About
