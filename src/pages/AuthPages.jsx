import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { loginUser, registerUser } from '../services/authService'
import './AuthPage.css'

export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const data = await loginUser(
        e.target.email.value,
        e.target.password.value
      )
      login(data.token)
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-card">
          <div className="auth-header">
            <i className="bi bi-lock auth-icon"></i>
            <h2 className="auth-title">Log in</h2>
            <p className="auth-subtitle">Welcome back!</p>
          </div>
          <div className="auth-body">
            {error && (
              <div className="alert auth-alert" role="alert">
                <i className="bi bi-exclamation-circle me-2"></i>{error}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="auth-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control auth-input"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="auth-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control auth-input"
                  placeholder="••••••••"
                  required
                />
              </div>
              <button
                type="submit"
                className="btn auth-btn-primary w-100"
                disabled={loading}
              >
                {loading
                  ? <><i className="bi bi-hourglass-split me-2"></i>Logging in...</>
                  : <><i className="bi bi-lock me-2"></i>Log in</>
                }
              </button>
            </form>
            <p className="auth-footer-text">
              Don't have an account? <Link to="/register" className="auth-link">Create account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const registerSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters').max(20, 'First name must be at most 20 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters').max(20, 'Last name must be at most 20 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(5, 'Password must be at least 5 characters').max(20, 'Password must be at most 20 characters')
})

export function RegisterPage() {
  const navigate = useNavigate()
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur'
  })

  const onSubmit = async (data) => {
    setServerError('')
    setLoading(true)
    try {
      await registerUser(data.email, data.password, data.firstName, data.lastName)
      navigate('/login')
    } catch (err) {
      setServerError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-card">
          <div className="auth-header">
            <i className="bi bi-person-plus auth-icon"></i>
            <h2 className="auth-title">Create account</h2>
            <p className="auth-subtitle">Get started in seconds</p>
          </div>
          <div className="auth-body">
            {serverError && (
              <div className="alert auth-alert" role="alert">
                <i className="bi bi-exclamation-circle me-2"></i>{serverError}
              </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="row g-3 mb-3">
                <div className="col-6">
                  <label className="auth-label">First name</label>
                  <input
                    type="text"
                    className={`form-control auth-input ${errors.firstName ? 'auth-input--error' : ''}`}
                    placeholder="John"
                    {...register('firstName')}
                  />
                  {errors.firstName && (
                    <small className="auth-error">{errors.firstName.message}</small>
                  )}
                </div>
                <div className="col-6">
                  <label className="auth-label">Last name</label>
                  <input
                    type="text"
                    className={`form-control auth-input ${errors.lastName ? 'auth-input--error' : ''}`}
                    placeholder="Doe"
                    {...register('lastName')}
                  />
                  {errors.lastName && (
                    <small className="auth-error">{errors.lastName.message}</small>
                  )}
                </div>
              </div>
              <div className="mb-3">
                <label className="auth-label">Email</label>
                <input
                  type="email"
                  className={`form-control auth-input ${errors.email ? 'auth-input--error' : ''}`}
                  placeholder="your@email.com"
                  {...register('email')}
                />
                {errors.email && (
                  <small className="auth-error">{errors.email.message}</small>
                )}
              </div>
              <div className="mb-4">
                <label className="auth-label">Password</label>
                <input
                  type="password"
                  className={`form-control auth-input ${errors.password ? 'auth-input--error' : ''}`}
                  placeholder="••••••••"
                  {...register('password')}
                />
                {errors.password
                  ? <small className="auth-error">{errors.password.message}</small>
                  : <small className="auth-hint">Between 5 and 20 characters</small>
                }
              </div>
              <button
                type="submit"
                className="btn auth-btn-primary w-100"
                disabled={loading}
              >
                {loading
                  ? <><i className="bi bi-hourglass-split me-2"></i>Creating account...</>
                  : <><i className="bi bi-person-plus me-2"></i>Create account</>
                }
              </button>
            </form>
            <p className="auth-footer-text">
              Already have an account? <Link to="/login" className="auth-link">Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}