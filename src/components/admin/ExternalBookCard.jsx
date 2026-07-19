import { useState } from 'react'

export default function ExternalBookCard({ book, onImport }) {
  const [copies, setCopies] = useState(1)
  const [importing, setImporting] = useState(false)

  const handleImport = async () => {
    setImporting(true)
    await onImport(book, copies)
    setImporting(false)
  }

  return (
    <div className="external-book-card">
      {book.coverUrl ? (
        <img src={book.coverUrl} alt={book.title} className="external-book-cover" />
      ) : (
        <div className="external-book-no-cover">
          <i className="bi bi-book"></i>
        </div>
      )}
      <div className="external-book-info">
        <h6 className="external-book-title">{book.title}</h6>
        <p className="external-book-author">{book.author}</p>
        {book.firstPublishYear && (
          <p className="external-book-year">{book.firstPublishYear}</p>
        )}
      </div>
      <div className="external-book-actions">
        <div className="copies-input-wrapper">
          <label className="copies-label">Copies</label>
          <input
            type="number"
            className="copies-input"
            value={copies}
            min={1}
            onChange={(e) => setCopies(parseInt(e.target.value))}
          />
        </div>
        <button
          className="btn admin-import-btn"
          onClick={handleImport}
          disabled={importing}
        >
          {importing
            ? <i className="bi bi-hourglass-split"></i>
            : <><i className="bi bi-plus-lg me-1"></i>Import</>
          }
        </button>
      </div>
    </div>
  )
}