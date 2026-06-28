import './AuthPage.css'

export function LoginPage() {
  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-card">
          <div className="auth-header">
            <i className="bi bi-lock auth-icon"></i>
            <h2 className="auth-title">Logga in</h2>
            <p className="auth-subtitle">Välkommen tillbaka!</p>
          </div>
          <div className="auth-body">
            <p className="text-muted text-center">
              <i className="bi bi-tools me-1"></i>
              Inloggningsformulär byggs här i nästa steg.
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
            <h2 className="auth-title">Skapa konto</h2>
            <p className="auth-subtitle">Kom igång på ett par sekunder</p>
          </div>
          <div className="auth-body">
            <p className="text-muted text-center">
              <i className="bi bi-tools me-1"></i>
              Registreringsformulär byggs här i nästa steg.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
