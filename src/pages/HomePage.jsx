import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './HomePage.css'

export default function HomePage() {
  const { user } = useAuth()

  return (
    <div className="homepage">
      {/* ── Hero ── */}
      <section className="hero-section">
        <div className="hero-bg-pattern" aria-hidden="true" />
        <div className="container">
          <div className="row align-items-center min-vh-75">
            <div className="col-lg-7 hero-content">
              <p className="hero-eyebrow">Digitalt bibliotekssystem</p>
              <h1 className="hero-title">
                Hitta din nästa<br />
                <span className="hero-title-accent">favoritbok</span>
              </h1>
              <p className="hero-lead">
                Sök, låna och hantera böcker enkelt och smidigt — allt på ett ställe.
                Välkommen till ett modernt bibliotek utan kölappar.
              </p>

              <div className="hero-actions">
                {user ? (
                  <>
                    <Link to="/books" className="btn btn-hero-primary">
                      <i className="bi bi-search me-2"></i>Sök böcker
                    </Link>
                    <Link to="/loans" className="btn btn-hero-secondary">
                      <i className="bi bi-bookmark-check me-2"></i>Mina lån
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="btn btn-hero-primary">
                      <i className="bi bi-lock me-2"></i>Logga in
                    </Link>
                    <Link to="/register" className="btn btn-hero-secondary">
                      <i className="bi bi-person-plus me-2"></i>Skapa konto
                    </Link>
                  </>
                )}
              </div>
            </div>

            <div className="col-lg-5 d-none d-lg-flex justify-content-center">
              <div className="hero-illustration" aria-hidden="true">
                <div className="book-stack">
                  <div className="book book-1"><i className="bi bi-book-half"></i></div>
                  <div className="book book-2"><i className="bi bi-journal-text"></i></div>
                  <div className="book book-3"><i className="bi bi-book"></i></div>
                  <div className="book book-4"><i className="bi bi-journals"></i></div>
                </div>
                <div className="glow-ring" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="features-section">
        <div className="container">
          <div className="section-header text-center mb-5">
            <p className="section-eyebrow">Vad kan du göra?</p>
            <h2 className="section-title">Allt du behöver</h2>
          </div>

          <div className="row g-4">
            <FeatureCard
              icon="bi-search"
              title="Sök böcker"
              description="Bläddra bland bibliotekets samling eller sök via Open Library för att hitta exakt det du letar efter."
            />
            <FeatureCard
              icon="bi-bookmark-plus"
              title="Låna enkelt"
              description="Låna böcker direkt i systemet — utan pappersarbete. Se dina aktiva lån och återlämna när du är klar."
            />
            <FeatureCard
              icon="bi-person-check"
              title="Ditt konto"
              description="Hantera dina personuppgifter, håll koll på lånehistorik och se vilka böcker som väntar på dig."
            />
            {user?.role === 'ADMIN' && (
              <FeatureCard
                icon="bi-shield-check"
                title="Adminpanel"
                description="Lägg till böcker, hantera användare och övervaka alla lån i realtid — full kontroll i ett gränssnitt."
                highlight
              />
            )}
          </div>
        </div>
      </section>

      {/* ── CTA (only for guests) ── */}
      {!user && (
        <section className="cta-section">
          <div className="container">
            <div className="cta-card">
              <div className="row align-items-center">
                <div className="col-md-8">
                  <h3 className="cta-title">Redo att börja läsa?</h3>
                  <p className="cta-text">
                    Skapa ett gratis konto och få tillgång till hela bibliotekets samling direkt.
                  </p>
                </div>
                <div className="col-md-4 text-md-end mt-3 mt-md-0">
                  <Link to="/register" className="btn btn-cta">
                    Kom igång <i className="bi bi-arrow-right ms-1"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Footer ── */}
      <footer className="lib-footer">
        <div className="container text-center">
          <p className="footer-brand">
            <i className="bi bi-book-half me-2"></i>Biblioteket
          </p>
          <p className="footer-copy">© {new Date().getFullYear()} · Byggd med Spring Boot & React</p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description, highlight }) {
  return (
    <div className="col-sm-6 col-lg-3">
      <div className={`feature-card ${highlight ? 'feature-card--highlight' : ''}`}>
        <div className="feature-icon">
          <i className={`bi ${icon}`}></i>
        </div>
        <h5 className="feature-title">{title}</h5>
        <p className="feature-text">{description}</p>
      </div>
    </div>
  )
}
