import { useState } from 'react'

export default function LibraryBookRow({ book, onUpdateCopies, onDelete }) {
  const [copies, setCopies] = useState(book.totalCopies)
  const [editing, setEditing] = useState(false)

  const handleSave = async () => {
    await onUpdateCopies(book.id, copies)
    setEditing(false)
  }

  return (
    <div className="library-book-row">
      {book.coverUrl ? (
        <img src={book.coverUrl} alt={book.title} className="library-book-cover" />
      ) : (
        <div className="library-book-no-cover">
          <i className="bi bi-book"></i>
        </div>
      )}
      <div className="library-book-info">
        <h6 className="library-book-title">{book.title}</h6>
        <p className="library-book-author">{book.author}</p>
      </div>
      <div className="library-book-copies">
        {editing ? (
          <div className="copies-edit">
            <input
              type="number"
              className="copies-input"
              value={copies}
              min={1}
              onChange={(e) => setCopies(parseInt(e.target.value))}
            />
            <button className="btn admin-save-btn" onClick={handleSave}>
              <i className="bi bi-check-lg"></i>
            </button>
            <button
              className="btn admin-cancel-btn"
              onClick={() => { setCopies(book.totalCopies); setEditing(false) }}
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
        ) : (
          <div className="copies-display">
            <span className="copies-text">{book.availableCopies}/{book.totalCopies} available</span>
            <button className="btn admin-edit-btn" onClick={() => setEditing(true)}>
              <i className="bi bi-pencil"></i>
            </button>
          </div>
        )}
      </div>
      <button
        className="btn admin-delete-btn"
        onClick={() => onDelete(book.id, book.title)}
      >
        <i className="bi bi-trash"></i>
      </button>
    </div>
  )
}