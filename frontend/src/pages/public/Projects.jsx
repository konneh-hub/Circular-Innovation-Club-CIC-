import PageHeader from '../../components/common/PageHeader'
import ProjectCard from '../../components/cards/ProjectCard'
import Button from '../../components/common/Button'
import { featuredProjects } from '../../data/publicData'

const Projects = () => (
  <div className="space-y-12">
    <PageHeader title="Projects" subtitle="Browse CIC projects that bring circular innovation into the real world." />

    <section className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
      <div className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900/95 dark:shadow-black/20">
        <h2 className="text-3xl font-semibold text-slate-950 dark:text-white">Featured projects</h2>
        <p className="text-slate-600 dark:text-slate-300">
          Our members are developing circular systems for energy, textiles, waste conversion and product reuse. Each project is created to reduce environmental impact while delivering community benefits.
        </p>
      </div>
      <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 dark:border-slate-800 dark:bg-slate-950">
        <h3 className="text-xl font-semibold text-slate-950 dark:text-white">Want to start your own?</h3>
        <p className="mt-4 text-slate-600 dark:text-slate-300">We support student teams from concept through pilot launch. Get mentorship, co-working space, and access to partner networks.</p>
        <Button className="mt-6" variant="primary">Submit a project idea</Button>
      </div>
    </section>

    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {featuredProjects.map((project) => (
        <ProjectCard key={project.title} {...project} />
      ))}
    </div>
  </div>
)

export default Projects
