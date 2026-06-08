import React from 'react'

const variantStyles = {
  success: 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-200',
  error: 'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/60 dark:text-rose-200',
  info: 'bg-sky-50 text-sky-800 border-sky-200 dark:bg-sky-950/60 dark:text-sky-200',
}

const Alert = ({ variant = 'info', title, message }) => (
  <div className={`rounded-3xl border px-5 py-4 text-sm ${variantStyles[variant] || variantStyles.info}`}>
    {title ? <p className="font-semibold">{title}</p> : null}
    <p className="mt-1 leading-6">{message}</p>
  </div>
)

export default Alert
