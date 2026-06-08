import PageHeader from '../../components/common/PageHeader'
import { galleryItems } from '../../data/publicData'

const Gallery = () => (
  <div className="space-y-12">
    <PageHeader title="Gallery" subtitle="Browse snapshots from CIC events, workshops and showcase days." />

    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {galleryItems.map((item) => (
        <figure key={item.title} className="group overflow-hidden rounded-[2rem] bg-slate-950 shadow-lg shadow-slate-900/20">
          <img src={item.image} alt={item.title} className="h-72 w-full object-cover transition duration-500 group-hover:scale-105" />
          <div className="bg-gradient-to-t from-slate-950/90 to-transparent px-5 py-6 text-white">
            <p className="text-lg font-semibold">{item.title}</p>
          </div>
        </figure>
      ))}
    </section>
  </div>
)

export default Gallery
