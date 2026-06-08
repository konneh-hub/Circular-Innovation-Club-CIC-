import PageHeader from '../../components/common/PageHeader'
import EventCard from '../../components/cards/EventCard'
import Button from '../../components/common/Button'
import { upcomingEvents } from '../../data/publicData'

const Events = () => (
  <div className="space-y-12">
    <PageHeader title="Events" subtitle="Participate in CIC workshops, forums and collaboration sessions." />

    <section className="grid gap-8 lg:grid-cols-[0.9fr_0.8fr]">
      <div className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900/95 dark:shadow-black/20">
        <h2 className="text-3xl font-semibold text-slate-950 dark:text-white">Upcoming gatherings</h2>
        <p className="text-slate-600 dark:text-slate-300">Join live hybrid events, mentorship sessions, and project showcases designed for students and founders entering the circular innovation space.</p>
      </div>
      <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 dark:border-slate-800 dark:bg-slate-950">
        <h3 className="text-xl font-semibold text-slate-950 dark:text-white">Stay in the loop</h3>
        <p className="mt-4 text-slate-600 dark:text-slate-300">Subscribe to our event newsletter for first access to speaker announcements and registration links.</p>
        <Button className="mt-6" variant="primary">Subscribe now</Button>
      </div>
    </section>

    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {upcomingEvents.map((event) => (
        <EventCard key={event.title} {...event} />
      ))}
    </div>
  </div>
)

export default Events
