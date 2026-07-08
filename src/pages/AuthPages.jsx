import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { loginUser } from '../services/authService'
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
            <p className="text-muted text-center">
              <i className="bi bi-tools me-1"></i>
              Registration form coming in the next step.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
