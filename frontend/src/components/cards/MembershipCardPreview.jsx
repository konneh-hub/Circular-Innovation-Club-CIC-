import React from 'react'

const MembershipCardPreview = React.forwardRef(({ card, qrCodeUrl }, ref) => {
  const initials = card.name
    .split(' ')
    .map((part) => part[0] || '')
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-6 text-white shadow-2xl shadow-slate-950/40"
      style={{ minHeight: '440px' }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_18%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.16),_transparent_24%)]" />
      <div className="absolute left-0 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="absolute right-0 bottom-10 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative z-10 flex h-full flex-col justify-between gap-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Circular Innovation Club</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[0.02em] text-white">Digital Membership</h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">
                A polished, scannable membership credential for CIC events, partner access, and community verification.
              </p>
            </div>
            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-xs uppercase tracking-[0.24em] text-slate-200 shadow-sm shadow-slate-950/10 backdrop-blur-sm">
              {card.level} Member
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-[1.7fr_1.1fr]">
            <div className="overflow-hidden rounded-[2rem] bg-slate-950/70 p-6 shadow-xl shadow-slate-950/20 ring-1 ring-white/10">
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-slate-100/10 to-slate-200/10 text-3xl font-semibold text-white ring-1 ring-white/10">
                    {initials}
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Member name</p>
                    <p className="mt-2 text-3xl font-semibold text-white">{card.name}</p>
                    <p className="mt-1 text-sm uppercase tracking-[0.26em] text-slate-500">{card.role}</p>
                  </div>
                </div>

                <div className="grid gap-3 rounded-[1.75rem] bg-slate-900/80 p-5 text-sm text-slate-300 ring-1 ring-white/10">
                  <div className="flex items-center justify-between">
                    <span>Member ID</span>
                    <span className="font-semibold text-white">{card.memberId}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Joined</span>
                    <span className="font-semibold text-white">{card.joined}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Valid until</span>
                    <span className="font-semibold text-white">{card.expiry}</span>
                  </div>
                </div>

                <div className="grid gap-3 rounded-[1.75rem] bg-white/5 p-5 text-sm text-slate-300 ring-1 ring-white/10">
                  <div className="flex items-center justify-between">
                    <span>Organization</span>
                    <span className="text-sm font-semibold text-white">{card.organization}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Email</span>
                    <span className="text-sm text-slate-400">{card.email}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Phone</span>
                    <span className="text-sm text-slate-400">{card.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] bg-white/10 p-5 shadow-xl shadow-slate-950/20 ring-1 ring-white/10">
              <div className="flex h-full flex-col justify-between gap-5">
                <div className="space-y-2">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Verification</p>
                  <h3 className="text-xl font-semibold text-white">Scannable access</h3>
                  <p className="text-sm leading-6 text-slate-300">
                    Use this QR code to quickly verify your membership at CIC events, partner locations, and digital programs.
                  </p>
                </div>

                <div className="mx-auto rounded-[1.75rem] bg-slate-950 p-4 shadow-[0_16px_64px_rgba(15,23,42,0.25)]">
                  {qrCodeUrl ? (
                    <img src={qrCodeUrl} alt="Membership QR code" className="h-40 w-40 object-contain" />
                  ) : (
                    <div className="flex h-40 w-40 items-center justify-center rounded-3xl bg-slate-900 text-xs text-slate-400">
                      Generating QR code...
                    </div>
                  )}
                </div>

                <div className="rounded-3xl bg-slate-950/70 p-4 text-xs uppercase tracking-[0.24em] text-slate-500 ring-1 ring-white/10">
                  <p className="truncate">{card.verificationUrl}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-3 rounded-[1.75rem] bg-slate-950/70 p-5 text-sm text-slate-300 ring-1 ring-white/10">
          <div className="flex items-center justify-between gap-3 rounded-3xl bg-slate-900/80 p-4 text-white ring-1 ring-white/10">
            <span className="text-xs uppercase tracking-[0.26em] text-slate-400">Access</span>
            <span className="rounded-full bg-sky-500/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-sky-200">Verified member</span>
          </div>
          <p className="text-sm leading-6 text-slate-300">
            Your digital membership card is ready to download and share. Keep the PNG saved for fast access during CIC events and partner checks.
          </p>
        </div>
      </div>
    </div>
  )
})

export default MembershipCardPreview
