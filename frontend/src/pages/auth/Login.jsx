import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Button from '../../components/common/Button'
import Alert from '../../components/common/Alert'

const inputClasses =
  'w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white'

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  useEffect(() => {
    const rememberedEmail = localStorage.getItem('cic_remember_email')
    if (rememberedEmail) {
      setValue('email', rememberedEmail)
      setValue('rememberMe', true)
    }
  }, [setValue])

  const onSubmit = async (data) => {
    setError('')
    setSuccess('')
    setLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1200))

    const isValidUser = data.email === 'member@cic.club' && data.password === 'Password123'

    if (!isValidUser) {
      setError('The email or password you entered is incorrect.')
      setLoading(false)
      return
    }

    if (data.rememberMe) {
      localStorage.setItem('cic_remember_email', data.email)
    } else {
      localStorage.removeItem('cic_remember_email')
    }

    setSuccess('Successfully signed in. Redirecting to your member dashboard...')
    setTimeout(() => {
      const from = location.state?.from?.pathname || '/member'
      navigate(from, { replace: true })
    }, 1200)
  }

  return (
    <div className="space-y-8 rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-lg shadow-slate-200/50 backdrop-blur dark:border-slate-700 dark:bg-slate-950/95">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Login</p>
        <h1 className="text-3xl font-semibold text-slate-950 dark:text-white">Sign in to your account</h1>
        <p className="text-slate-600 dark:text-slate-300">Use your CIC credentials to access member dashboards and events.</p>
      </div>

      {error ? <Alert variant="error" title="Login failed" message={error} /> : null}
      {success ? <Alert variant="success" title="Success" message={success} /> : null}

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

        <div>
          <div className="mb-2 flex items-center justify-between text-sm font-medium text-slate-700 dark:text-slate-300">
            <span>Password</span>
            <Link to="/forgot-password" className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
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

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <label className="inline-flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
            <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary" {...register('rememberMe')} />
            Remember me
          </label>
          <Link to="/register" className="text-sm text-primary hover:underline">
            Need an account?
          </Link>
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>
    </div>
  )
}

export default Login
