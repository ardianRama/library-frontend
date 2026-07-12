import './Footer.css'

export default function Footer() {
  return (
    <footer className="lib-footer">
      <div className="container text-center">
        <p className="footer-brand">
          <i className="bi bi-book-half me-2"></i>The Library
        </p>
        <p className="footer-copy">© {new Date().getFullYear()} · Built by Ardian Rama</p>
      </div>
    </footer>
  )
}