import { useEffect, useState } from 'react'
import PageHeader from '../../components/common/PageHeader'
import Button from '../../components/common/Button'
import { fetchCertificates } from '../../data/memberData'

const Certificates = () => {
  const [certificates, setCertificates] = useState(null)

  useEffect(() => {
    fetchCertificates().then(setCertificates)
  }, [])

  if (!certificates) {
    return <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 text-center text-slate-500 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-400">Loading certificates...</div>
  }

  return (
    <section className="space-y-8">
      <PageHeader title="Certificates" subtitle="Download your CIC achievement certificates." />

      <div className="grid gap-6 lg:grid-cols-2">
        {certificates.map((certificate) => (
          <div key={certificate.certificateId} className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-950 dark:text-white">{certificate.title}</h2>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{certificate.issuer}</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">{certificate.date}</span>
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-600 dark:text-slate-400">Certificate ID: {certificate.certificateId}</p>
              <Button variant="secondary">Download</Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Certificates
