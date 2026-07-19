import { useState, useEffect } from 'react'
import { getAllLoans, returnBook } from '../services/loanService'
import { useAuth } from '../context/AuthContext'
import Toast from '../components/Toast'
import LoanModal from '../components/LoanModal'
import './LoansPage.css'

export default function LoansPage() {
  const { user } = useAuth()
  const [loans, setLoans] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedLoan, setSelectedLoan] = useState(null)
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

  const handleReturn = async (bookId, bookTitle) => {
    try {
      await returnBook(bookId)
      setSelectedLoan(null)
      setToast({ message: `"${bookTitle}" has been returned successfully`, type: 'success' })
      fetchLoans()
    } catch (err) {
      setToast({ message: err.message, type: 'error' })
    }
  }

  const isAdmin = user?.role === 'ROLE_ADMIN'
  const myLoans = isAdmin ? loans.filter(loan => loan.email === user.sub) : loans
  const activeLoans = myLoans.filter(loan => !loan.returnedAt)
  const returnedLoans = myLoans.filter(loan => loan.returnedAt)

  return (
    <div className="loans-page">
      <div className="container">

        <div className="loans-header">
          <h1 className="loans-title">My loans</h1>
          <p className="loans-subtitle">
            {activeLoans.length} active {activeLoans.length === 1 ? 'loan' : 'loans'}
          </p>
        </div>

        {error && (
          <div className="alert loans-alert" role="alert">
            <i className="bi bi-exclamation-circle me-2"></i>{error}
          </div>
        )}

        {loading && (
          <div className="loans-loading">
            <div className="spinner-border loans-spinner" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p>Loading loans...</p>
          </div>
        )}

        {!loading && !error && loans.length === 0 && (
          <div className="loans-empty">
            <i className="bi bi-bookmark-x loans-empty-icon"></i>
            <h4>No loans found</h4>
            <p>You haven't borrowed any books yet.</p>
          </div>
        )}

        {!loading && !error && activeLoans.length > 0 && (
          <>
            <h2 className="loans-section-title">Active loans</h2>
            <div className="loans-grid">
              {activeLoans.map(loan => (
                <LoanCard
                  key={loan.id}
                  loan={loan}
                  onView={() => setSelectedLoan(loan)}
                />
              ))}
            </div>
          </>
        )}

        {!loading && !error && isAdmin && returnedLoans.length > 0 && (
          <>
            <h2 className="loans-section-title">Returned loans</h2>
            <div className="loans-grid">
              {returnedLoans.map(loan => (
                <LoanCard
                  key={loan.id}
                  loan={loan}
                  onView={() => setSelectedLoan(loan)}
                />
              ))}
            </div>
          </>
        )}

      </div>

      {selectedLoan && (
        <LoanModal
          loan={selectedLoan}
          onClose={() => setSelectedLoan(null)}
          onReturn={handleReturn}
        />
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

function LoanCard({ loan, onView }) {
  const isActive = !loan.returnedAt

  return (
    <div className="loan-card">
      <div className="loan-card-body">
        <h6 className="loan-card-title">{loan.bookTitle}</h6>
        <span className={`loan-card-badge ${isActive ? 'badge--active' : 'badge--returned'}`}>
          {isActive ? 'Active' : 'Returned'}
        </span>
      </div>
      <button className="btn loan-card-btn" onClick={onView}>
        View loan <i className="bi bi-arrow-right ms-1"></i>
      </button>
    </div>
  )
}