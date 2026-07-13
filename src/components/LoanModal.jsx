import './LoanModal.css'

export default function LoanModal({ loan, onClose, onReturn }) {
  const isActive = !loan.returnedAt

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="loan-modal-overlay" onClick={onClose}>
      <div className="loan-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="loan-modal-header">
          <h5 className="loan-modal-title">Loan details</h5>
          <button className="loan-modal-close" onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
        <div className="loan-modal-body">
          <div className="loan-modal-book-title">
            <i className="bi bi-book me-2"></i>{loan.bookTitle}
          </div>

          <div className="loan-modal-detail">
            <span className="loan-modal-detail-label">Status</span>
            <span className={`loan-card-badge ${isActive ? 'badge--active' : 'badge--returned'}`}>
              {isActive ? 'Active' : 'Returned'}
            </span>
          </div>

          <div className="loan-modal-detail">
            <span className="loan-modal-detail-label">Borrowed</span>
            <span className="loan-modal-detail-value">{formatDate(loan.borrowedAt)}</span>
          </div>

          {loan.returnedAt && (
            <div className="loan-modal-detail">
              <span className="loan-modal-detail-label">Returned</span>
              <span className="loan-modal-detail-value">{formatDate(loan.returnedAt)}</span>
            </div>
          )}

          {loan.email && (
            <div className="loan-modal-detail">
              <span className="loan-modal-detail-label">User</span>
              <span className="loan-modal-detail-value">{loan.email}</span>
            </div>
          )}
        </div>

        <div className="loan-modal-footer">
          <button className="btn loan-modal-btn-secondary" onClick={onClose}>
            Close
          </button>
          {isActive && (
            <button
              className="btn loan-modal-btn-primary"
              onClick={() => onReturn(loan.bookId, loan.bookTitle)}
            >
              <i className="bi bi-arrow-return-left me-2"></i>Return book
            </button>
          )}
        </div>
      </div>
    </div>
  )
}