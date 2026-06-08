import React from 'react'

const variants = {
  primary: 'bg-primary text-white hover:bg-primary-dark',
  secondary:
    'bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700',
  ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800',
}

const Button = React.forwardRef(({ variant = 'primary', className = '', children, ...props }, ref) => (
  <button
    ref={ref}
    className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition duration-150 focus:outline-none focus:ring-2 focus:ring-primary/30 ${variants[variant]} ${className}`}
    {...props}
  >
    {children}
  </button>
))

export default Button
