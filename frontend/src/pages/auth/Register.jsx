import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/common/Button'
import Alert from '../../components/common/Alert'

const inputClasses =
  'w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white'

const Register = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      rememberMe: false,
    },
  })

  const password = watch('password')

  const onSubmit = async (data) => {
    setError('')
    setSuccess('')
    setLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1200))

    if (data.password !== data.confirmPassword) {
      setError('Passwords do not match.')
      setLoading(false)
      return
    }

    setSuccess('Account created successfully! Redirecting to login...')
    setTimeout(() => navigate('/login'), 1400)
    setLoading(false)
  }

  return (
    <div className="space-y-8 rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-lg shadow-slate-200/50 backdrop-blur dark:border-slate-700 dark:bg-slate-950/95">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Register</p>
        <h1 className="text-3xl font-semibold text-slate-950 dark:text-white">Create your CIC account</h1>
        <p className="text-slate-600 dark:text-slate-300">Register to join CIC, access member resources, and participate in events.</p>
      </div>

      {error ? <Alert variant="error" title="Registration failed" message={error} /> : null}
      {success ? <Alert variant="success" title="Registration complete" message={success} /> : null}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Full name</label>
          <input
            type="text"
            placeholder="Your full name"
            className={inputClasses}
            {...register('fullName', { required: 'Full name is required' })}
          />
          {errors.fullName && <p className="mt-2 text-sm text-rose-600 dark:text-rose-300">{errors.fullName.message}</p>}
        </div>

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

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a password"
              className={inputClasses}
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 8, message: 'Password must be at least 8 characters' },
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.password && <p className="mt-2 text-sm text-rose-600 dark:text-rose-300">{errors.password.message}</p>}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Confirm password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Confirm your password"
            className={inputClasses}
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) => value === password || 'Passwords do not match',
            })}
          />
          {errors.confirmPassword && <p className="mt-2 text-sm text-rose-600 dark:text-rose-300">{errors.confirmPassword.message}</p>}
        </div>

        <label className="inline-flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
          <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary" {...register('rememberMe')} />
          Remember me
        </label>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Creating account...' : 'Create account'}
        </Button>

        <p className="text-center text-sm text-slate-500 dark:text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Register
