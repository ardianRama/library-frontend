import './AuthPage.css'

export function LoginPage() {
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
            <p className="text-muted text-center">
              <i className="bi bi-tools me-1"></i>
              Login form coming in the next step.
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
