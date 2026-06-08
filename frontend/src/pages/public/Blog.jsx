import PageHeader from '../../components/common/PageHeader'
import Button from '../../components/common/Button'
import { blogPosts } from '../../data/publicData'

const Blog = () => (
  <div className="space-y-12">
    <PageHeader title="Blog" subtitle="Read stories, insights and circular innovation updates from CIC." />

    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {blogPosts.map((post) => (
        <article key={post.title} className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900/95 dark:shadow-black/20">
          <p className="text-sm uppercase tracking-[0.28em] text-primary">{post.date}</p>
          <h3 className="mt-4 text-2xl font-semibold text-slate-950 dark:text-white">{post.title}</h3>
          <p className="mt-4 text-slate-600 dark:text-slate-300">{post.summary}</p>
          <Button className="mt-8" variant="ghost">Read more</Button>
        </article>
      ))}
    </section>
  </div>
)

export default Blog
