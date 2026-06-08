import PageHeader from '../../components/common/PageHeader'
import Button from '../../components/common/Button'

const Contact = () => (
  <div className="space-y-12">
    <PageHeader title="Contact" subtitle="Reach out to CIC with questions, collaboration requests, or project proposals." />

    <section className="grid gap-10 lg:grid-cols-[0.9fr_0.75fr]">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900/95 dark:shadow-black/20">
        <h2 className="text-3xl font-semibold text-slate-950 dark:text-white">Get in touch</h2>
        <p className="mt-4 text-slate-600 dark:text-slate-300">Our team is happy to answer your questions on membership, partnerships, events, and project opportunities.</p>

        <div className="mt-8 space-y-6 text-slate-700 dark:text-slate-300">
          <div>
            <p className="font-semibold">Email</p>
            <p>hello@cic.club</p>
          </div>
          <div>
            <p className="font-semibold">Location</p>
            <p>Campus Innovation Center, City Campus</p>
          </div>
          <div>
            <p className="font-semibold">Office hours</p>
            <p>Mon - Fri · 9:00 AM - 6:00 PM</p>
          </div>
        </div>
      </div>
      <form className="space-y-6 rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950 dark:shadow-black/20">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Name</label>
          <input type="text" placeholder="Your name" className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
          <input type="email" placeholder="you@example.com" className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Message</label>
          <textarea rows="5" placeholder="Tell us about your inquiry" className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white" />
        </div>
        <Button variant="primary">Send message</Button>
      </form>
    </section>
  </div>
)

export default Contact
