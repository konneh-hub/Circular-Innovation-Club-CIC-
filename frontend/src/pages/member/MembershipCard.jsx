import { useEffect, useRef, useState } from 'react'
import { FiDownload, FiShield } from 'react-icons/fi'
import { toPng } from 'html-to-image'
import QRCode from 'qrcode'
import PageHeader from '../../components/common/PageHeader'
import Button from '../../components/common/Button'
import MembershipCardPreview from '../../components/cards/MembershipCardPreview'
import { fetchMembershipCard } from '../../data/memberData'

const MembershipCard = () => {
  const [card, setCard] = useState(null)
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const [downloading, setDownloading] = useState(false)
  const [downloadStatus, setDownloadStatus] = useState('')
  const [error, setError] = useState('')
  const previewRef = useRef(null)

  useEffect(() => {
    let active = true

    fetchMembershipCard().then(async (data) => {
      if (!active) return
      setCard(data)

      try {
        const qrText = `${data.verificationUrl}`
        const url = await QRCode.toDataURL(qrText, {
          margin: 1,
          width: 220,
          color: {
            dark: '#0f172a',
            light: '#ffffff',
          },
        })
        setQrCodeUrl(url)
      } catch (qrError) {
        setError('Unable to generate QR code. Please refresh the page.')
      } finally {
        setLoading(false)
      }
    })

    return () => {
      active = false
    }
  }, [])

  const downloadCard = async () => {
    if (!previewRef.current || !card) return
    setDownloading(true)
    setError('')
    setDownloadStatus('')

    try {
      const dataUrl = await toPng(previewRef.current, {
        cacheBust: true,
        backgroundColor: '#0f172a',
      })

      const link = document.createElement('a')
      link.href = dataUrl
      link.download = `${card.memberId}-cic-membership-card.png`
      link.click()
      setDownloadStatus('success')
    } catch (downloadError) {
      setError('Unable to download the card image. Please try again.')
    } finally {
      setDownloading(false)
    }
  }

  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 text-center text-slate-500 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-400">
        Loading membership card preview...
      </div>
    )
  }

  if (!card) {
    return (
      <div className="rounded-3xl border border-rose-200 bg-rose-50 p-8 text-center text-rose-700 shadow-sm shadow-rose-200/50 dark:border-rose-900 dark:bg-rose-950/95 dark:text-rose-200">
        Unable to load your membership card. Please refresh or contact support.
      </div>
    )
  }

  return (
    <section className="space-y-8">
      <PageHeader
        title="Digital Membership Card"
        subtitle="Generate your CIC membership card, preview the layout, and download a polished credential for events and partner verification."
      />

      <div className="grid gap-6 xl:grid-cols-[1.45fr_0.95fr]">
        <div className="space-y-6">
          <MembershipCardPreview ref={previewRef} card={card} qrCodeUrl={qrCodeUrl} />

          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 dark:shadow-slate-900/20">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Card actions</h2>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Download a high-resolution PNG of your membership card and keep it ready for CIC events or verification checks.
                </p>
              </div>
              <Button onClick={downloadCard} disabled={downloading} className="flex items-center gap-2">
                <FiDownload className="h-4 w-4" />
                {downloading ? 'Downloading...' : downloadStatus === 'success' ? 'Downloaded' : 'Download card'}
              </Button>
            </div>
            {downloadStatus === 'success' && !error ? (
              <p className="mt-4 text-sm text-emerald-700 dark:text-emerald-300">Your membership card is ready. Save it securely and show it at CIC events.</p>
            ) : null}
            {error ? <p className="mt-4 text-sm text-rose-600 dark:text-rose-300">{error}</p> : null}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 dark:shadow-slate-900/20">
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-3xl bg-slate-950 text-white">
                <FiShield className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Secure digital badge</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Each card includes a scannable QR code that links to membership verification and CIC partner access.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 text-sm text-slate-700 dark:text-slate-300">
              <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Member ID</p>
                <p className="mt-2 font-semibold text-slate-950 dark:text-white">{card.memberId}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Verification URL</p>
                <p className="mt-2 break-all font-semibold text-slate-950 dark:text-white">{card.verificationUrl}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Registered</p>
                <p className="mt-2 font-semibold text-slate-950 dark:text-white">{card.joined}</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/95 dark:shadow-slate-900/20">
            <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Membership benefits</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-400">
              {card.tierBenefits.map((benefit) => (
                <li key={benefit} className="flex gap-3">
                  <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default MembershipCard
