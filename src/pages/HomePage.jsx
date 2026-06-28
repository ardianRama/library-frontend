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
              <h1 className="hero-title">
                Find your next<br />
                <span className="hero-title-accent">favourite book</span>
              </h1>
              <p className="hero-lead">
                Search, borrow and manage books with ease — all in one place. Welcome to a modern library without the queues.
              </p>

              <div className="hero-actions">
                {user ? (
                  <>
                    <Link to="/books" className="btn btn-hero-primary">
                      <i className="bi bi-search me-2"></i>Browse books
                    </Link>
                    <Link to="/loans" className="btn btn-hero-secondary">
                      <i className="bi bi-bookmark-check me-2"></i>My loans
                    </Link>
                  </>
                ) : (
                    <Link to="/register" className="btn btn-hero-secondary">
                      <i className="bi bi-person-plus me-2"></i>Create account
                    </Link>
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
            <p className="section-eyebrow">What can you do?</p>
            <h2 className="section-title">Everything you need</h2>
          </div>

          <div className="row g-4 justify-content-center">
            <FeatureCard
              icon="bi-search"
              title="Search books"
              description="Browse the library's collection and find your next great read."
            />
            <FeatureCard
              icon="bi-bookmark-plus"
              title="Borrow with ease"
              description="Borrow books directly in the system — no paperwork. View your active loans and return them when you're done."
            />
            <FeatureCard
              icon="bi-person-check"
              title="Your account"
              description="Sign up for free and get instant access to the library's full collection."
            />
            {user?.role === 'ADMIN' && (
              <FeatureCard
                icon="bi-shield-check"
                title="Admin panel"
                description="Add books, manage users and monitor all loans in real time — full control in one interface."
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
                  <h3 className="cta-title">Ready to start reading?</h3>
                  <p className="cta-text">
                    Create a free account and get access to the library's full collection right away.
                  </p>
                </div>
                <div className="col-md-4 text-md-end mt-3 mt-md-0">
                  <Link to="/register" className="btn btn-cta">
                    Get started <i className="bi bi-arrow-right ms-1"></i>
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
            <i className="bi bi-book-half me-2"></i>The Library
          </p>
          <p className="footer-copy">© {new Date().getFullYear()} Built by Ardian Rama</p>
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
