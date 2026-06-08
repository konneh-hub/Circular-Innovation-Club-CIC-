import { Link } from 'react-router-dom'
import Button from '../../components/common/Button'
import ProjectCard from '../../components/cards/ProjectCard'
import EventCard from '../../components/cards/EventCard'
import { featuredProjects, upcomingEvents, partners, stats } from '../../data/publicData'

const Home = () => (
  <div className="space-y-20">
    <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-6 py-20 text-white sm:px-10 lg:px-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.24),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(34,197,94,0.18),_transparent_30%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-8">
            <span className="inline-flex rounded-full bg-sky-500/20 px-4 py-2 text-sm font-semibold text-sky-100 backdrop-blur">
              Circular innovation for changemakers
            </span>
            <div className="space-y-6">
              <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                Build a sustainable future with CIC.
              </h1>
              <p className="max-w-2xl text-lg text-slate-200 sm:text-xl">
                Join students, founders and partners in designing circular solutions for energy, waste, mobility and community impact.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link to="/join-us">
                <Button className="w-full sm:w-auto" variant="primary">
                  Join CIC
                </Button>
              </Link>
              <Link to="/projects">
                <Button className="w-full sm:w-auto" variant="secondary">
                  Explore projects
                </Button>
              </Link>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl shadow-slate-950/10 backdrop-blur-xl">
              <h2 className="text-lg font-semibold text-white">27 active cohorts</h2>
              <p className="mt-3 text-slate-200">Member-led labs and innovation sprints running across campus and industry.</p>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl shadow-slate-950/10 backdrop-blur-xl">
              <h2 className="text-lg font-semibold text-white">120+ events this year</h2>
              <p className="mt-3 text-slate-200">Workshops, showcases and networking experiences for the circular economy community.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="grid gap-12 xl:grid-cols-[0.8fr_1.2fr]">
      <article className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900/95 dark:shadow-black/20">
        <span className="text-sm font-semibold uppercase tracking-[0.32em] text-primary">Our mission</span>
        <h2 className="text-3xl font-semibold text-slate-950 dark:text-white">Activate youth-led circular innovation.</h2>
        <p className="text-slate-600 dark:text-slate-300">
          Circular Innovation Club empowers university teams to build sustainable products, launch community programs, and scale ethical ventures that reduce waste and unlock new value.
        </p>
      </article>
      <article className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900/95 dark:shadow-black/20">
        <span className="text-sm font-semibold uppercase tracking-[0.32em] text-primary">Our vision</span>
        <h2 className="text-3xl font-semibold text-slate-950 dark:text-white">A circular campus that inspires global change.</h2>
        <p className="text-slate-600 dark:text-slate-300">
          We imagine connected ecosystems where materials are reused, energy systems are regenerative, and student creativity drives low-impact innovation across industries.
        </p>
      </article>
    </section>

    <section className="grid gap-8 lg:grid-cols-2">
      {stats.map((item) => (
        <div key={item.label} className="rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900/95 dark:shadow-black/20">
          <p className="text-5xl font-semibold text-slate-950 dark:text-white">{item.value}</p>
          <p className="mt-4 text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">{item.label}</p>
        </div>
      ))}
    </section>

    <section className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="text-sm font-semibold uppercase tracking-[0.32em] text-primary">Featured projects</span>
          <h2 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">Ideas that are moving faster than ever.</h2>
        </div>
        <Link to="/projects">
          <Button variant="ghost">View all projects</Button>
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </section>

    <section className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="text-sm font-semibold uppercase tracking-[0.32em] text-primary">Upcoming events</span>
          <h2 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">Join the next wave of learning.</h2>
        </div>
        <Link to="/events">
          <Button variant="ghost">See event calendar</Button>
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {upcomingEvents.map((event) => (
          <EventCard key={event.title} {...event} />
        ))}
      </div>
    </section>

    <section className="space-y-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900/95 dark:shadow-black/20">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="text-sm font-semibold uppercase tracking-[0.32em] text-primary">Partners</span>
          <h2 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">Driving impact with trusted collaborators.</h2>
        </div>
        <Link to="/partners">
          <Button variant="secondary">Learn more</Button>
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {partners.map((partner) => (
          <div key={partner.name} className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-6 text-center text-sm font-semibold text-slate-800 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
            {partner.name}
          </div>
        ))}
      </div>
    </section>

    <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 px-8 py-16 text-white sm:px-12 lg:px-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(14,165,233,0.16),_transparent_28%)]" />
      <div className="relative mx-auto max-w-5xl text-center">
        <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Ready to shape the future of circular innovation?</h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
          Join CIC and access mentorship, funding pathways, and collaboration opportunities for makers who want real environmental and social impact.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link to="/join-us">
            <Button variant="primary">Become a member</Button>
          </Link>
          <Link to="/contact">
            <Button variant="secondary">Contact the team</Button>
          </Link>
        </div>
      </div>
    </section>
  </div>
)

export default Home
