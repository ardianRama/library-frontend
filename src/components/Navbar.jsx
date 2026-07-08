import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="lib-navbar navbar navbar-expand-lg">
      <div className="container">
        <Link to="/" className="navbar-brand lib-brand">
          <i className="bi bi-book-half lib-brand-icon"></i>
          <span className="lib-brand-text">The Library</span>
        </Link>

        <button
          className="navbar-toggler lib-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="bi bi-list"></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {user && (
              <>
                <li className="nav-item">
                  <Link to="/books" className="nav-link lib-nav-link">
                    <i className="bi bi-search me-1"></i>Browse books
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/loans" className="nav-link lib-nav-link">
                    <i className="bi bi-bookmark-check me-1"></i>My loans
                  </Link>
                </li>
                {user.role === 'ROLE_ADMIN' && (
                  <li className="nav-item">
                    <Link to="/admin" className="nav-link lib-nav-link">
                      <i className="bi bi-shield-check me-1"></i>Admin
                    </Link>
                  </li>
                )}
              </>
            )}
          </ul>

          <div className="lib-nav-actions d-flex align-items-center gap-2">
            {user ? (
              <>
                <span className="lib-user-badge">
                  <i className="bi bi-person-circle me-1"></i>
                  {user.sub}
                  {user.role === 'ROLE_ADMIN' && (
                    <span className="lib-admin-tag ms-1">Admin</span>
                  )}
                </span>
                <button onClick={handleLogout} className="btn lib-btn-outline-light">
                  <i className="bi bi-box-arrow-right me-1"></i>Log out
                </button>
              </>
            ) : (
                <Link to="/login" className="btn lib-btn-ghost">
                  <i className="bi bi-lock me-1"></i>Log in
                </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
