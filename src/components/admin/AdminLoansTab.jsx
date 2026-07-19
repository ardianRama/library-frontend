import { useState, useEffect } from 'react'
import { getAllLoans } from '../../services/loanService'
import Toast from '../Toast'
import './AdminLoansTab.css'

const LOANS_PER_PAGE = 10

export default function AdminLoansTab() {
  const [loans, setLoans] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('active')
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    fetchLoans()
  }, [])

  const fetchLoans = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await getAllLoans()
      setLoans(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return '—'
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter)
    setCurrentPage(1)
  }

  const filteredLoans = filter === 'active'
    ? loans.filter(loan => !loan.returnedAt)
    : loans.filter(loan => loan.returnedAt)

  const searchedLoans = filteredLoans.filter(loan =>
    loan.bookTitle.toLowerCase().includes(search.toLowerCase()) ||
    loan.email.toLowerCase().includes(search.toLowerCase())
  )

  const totalPages = Math.ceil(searchedLoans.length / LOANS_PER_PAGE)
  const paginatedLoans = searchedLoans.slice((currentPage - 1) * LOANS_PER_PAGE, currentPage * LOANS_PER_PAGE)

  return (
    <div className="admin-loans-tab">
      <div className="admin-loans-header">
        <div>
          <h2 className="admin-section-title">
            <i className="bi bi-bookmark-check me-2"></i>Loans
          </h2>
          <p className="admin-section-desc">Overview of all loans in the library.</p>
        </div>
        <div className="loans-filter">
          <button
            className={`btn loans-filter-btn ${filter === 'active' ? 'loans-filter-btn--active' : ''}`}
            onClick={() => handleFilterChange('active')}
          >
            Active
          </button>
          <button
            className={`btn loans-filter-btn ${filter === 'returned' ? 'loans-filter-btn--active' : ''}`}
            onClick={() => handleFilterChange('returned')}
          >
            Returned
          </button>
        </div>
      </div>

      <div className="loans-search-wrapper">
        <i className="bi bi-search loans-search-icon"></i>
        <input
          type="text"
          className="loans-search-input"
          placeholder="Search by book or email..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setCurrentPage(1) }}
        />
      </div>

      {error && (
        <div className="alert admin-alert" role="alert">
          <i className="bi bi-exclamation-circle me-2"></i>{error}
        </div>
      )}

      {loading && (
        <div className="admin-loading">
          <div className="spinner-border admin-spinner" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {!loading && searchedLoans.length === 0 && (
        <p className="text-muted">No {filter} loans found.</p>
      )}

      {!loading && searchedLoans.length > 0 && (
        <>
          <div className="loans-table-wrapper">
            <table className="loans-table">
              <thead>
                <tr>
                  <th>Book</th>
                  <th>User</th>
                  <th>Borrowed</th>
                  <th>Returned</th>
                </tr>
              </thead>
              <tbody>
                {paginatedLoans.map(loan => (
                  <tr key={loan.id}>
                    <td className="loans-table-book">{loan.bookTitle}</td>
                    <td className="loans-table-email">{loan.email}</td>
                    <td>{formatDate(loan.borrowedAt)}</td>
                    <td>
                      {loan.returnedAt
                        ? formatDate(loan.returnedAt)
                        : <span className="loan-active-badge">Active</span>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="admin-pagination">
              <button
                className="btn pagination-btn"
                onClick={() => setCurrentPage(p => p - 1)}
                disabled={currentPage === 1}
              >
                <i className="bi bi-chevron-left"></i>
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  className={`btn pagination-btn ${currentPage === page ? 'pagination-btn--active' : ''}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}

              <button
                className="btn pagination-btn"
                onClick={() => setCurrentPage(p => p + 1)}
                disabled={currentPage === totalPages}
              >
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          )}
        </>
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}