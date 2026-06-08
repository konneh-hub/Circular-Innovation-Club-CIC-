import PageHeader from '../../components/common/PageHeader'
import Button from '../../components/common/Button'
import { partners } from '../../data/publicData'

const Partners = () => (
  <div className="space-y-12">
    <PageHeader title="Partners" subtitle="Meet the organizations collaborating with CIC to drive circular solutions." />

    <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900/95 dark:shadow-black/20">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {partners.map((partner) => (
          <div key={partner.name} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center text-sm font-semibold text-slate-900 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
            {partner.name}
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-between">
        <p className="max-w-2xl text-slate-600 dark:text-slate-300">Our partners support mentorship, project funding, research access, and real-world pilot opportunities.</p>
        <Button variant="primary">Become a partner</Button>
      </div>
    </section>
  </div>
)

export default Partners
