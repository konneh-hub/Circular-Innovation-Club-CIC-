import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Button from '../../components/common/Button'
import Alert from '../../components/common/Alert'

const inputClasses =
  'w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white'

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (data) => {
    setError('')
    setSuccess('')
    setLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1200))

    if (!data.email.includes('@')) {
      setError('Please provide a valid email address.')
      setLoading(false)
      return
    }

    setSuccess('If the address exists, a password reset link has been sent. Check your inbox.')
    setLoading(false)
  }

  return (
    <div className="space-y-8 rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-lg shadow-slate-200/50 backdrop-blur dark:border-slate-700 dark:bg-slate-950/95">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Reset password</p>
        <h1 className="text-3xl font-semibold text-slate-950 dark:text-white">Forgot your password?</h1>
        <p className="text-slate-600 dark:text-slate-300">Enter your email and we’ll send instructions to reset it safely.</p>
      </div>

      {error ? <Alert variant="error" title="Unable to send" message={error} /> : null}
      {success ? <Alert variant="success" title="Email sent" message={success} /> : null}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Email address</label>
          <input
            type="email"
            placeholder="you@cic.club"
            className={inputClasses}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Enter a valid email address',
              },
            })}
          />
          {errors.email && <p className="mt-2 text-sm text-rose-600 dark:text-rose-300">{errors.email.message}</p>}
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Sending link...' : 'Send reset link'}
        </Button>

        <p className="text-center text-sm text-slate-500 dark:text-slate-400">
          Remembered your password?{' '}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  )
}

export default ForgotPassword
