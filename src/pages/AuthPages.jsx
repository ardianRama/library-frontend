import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { loginUser, registerUser } from '../services/authService'
import './AuthPage.css'

export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const data = await loginUser(email, password)
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
                  className="form-control auth-input"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="auth-label">Password</label>
                <input
                  type="password"
                  className="form-control auth-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

export function RegisterPage() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const validateField = (name, value) => {
    switch (name) {
      case 'firstName':
        if (value.length < 2 || value.length > 20)
          setError('First name must be between 2 and 20 characters')
        else setError('')
        break
      case 'lastName':
        if (value.length < 2 || value.length > 20)
          setError('Last name must be between 2 and 20 characters')
        else setError('')
        break
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          setError('Please enter a valid email address')
        else setError('')
        break
      case 'password':
        if (value.length < 5 || value.length > 20)
          setError('Password must be between 5 and 20 characters')
        else setError('')
        break
    }
  }

  const validate = () => {
    if (formData.firstName.length < 2 || formData.firstName.length > 20) {
      setError('First name must be between 2 and 20 characters')
      return false
    }
    if (formData.lastName.length < 2 || formData.lastName.length > 20) {
      setError('Last name must be between 2 and 20 characters')
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address')
      return false
    }
    if (formData.password.length < 5 || formData.password.length > 20) {
      setError('Password must be between 5 and 20 characters')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!validate()) return

    setLoading(true)
    try {
      await registerUser(formData.email, formData.password, formData.firstName, formData.lastName)
      navigate('/login')
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
            <i className="bi bi-person-plus auth-icon"></i>
            <h2 className="auth-title">Create account</h2>
            <p className="auth-subtitle">Get started in seconds</p>
          </div>
          <div className="auth-body">
            {error && (
              <div className="alert auth-alert" role="alert">
                <i className="bi bi-exclamation-circle me-2"></i>{error}
              </div>
            )}
            <form onSubmit={handleSubmit} noValidate>
              <div className="row g-3 mb-3">
                <div className="col-6">
                  <label className="auth-label">First name</label>
                  <input
                    type="text"
                    name="firstName"
                    className="form-control auth-input"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                    onBlur={(e) => validateField(e.target.name, e.target.value)}
                    required
                  />
                </div>
                <div className="col-6">
                  <label className="auth-label">Last name</label>
                  <input
                    type="text"
                    name="lastName"
                    className="form-control auth-input"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                    onBlur={(e) => validateField(e.target.name, e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="auth-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control auth-input"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={(e) => validateField(e.target.name, e.target.value)}
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
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={(e) => validateField(e.target.name, e.target.value)}
                  required
                />
                <small className="auth-hint">Between 5 and 20 characters</small>
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