import { useState, useEffect } from 'react'
import {
  searchExternalBooks,
  importBook,
  getAllDetailedBooks,
  updateCopies,
  deleteBook
} from '../../services/bookService'
import Toast from '../Toast'
import ExternalBookCard from './ExternalBookCard'
import LibraryBookRow from './LibraryBookRow'
import './AdminBooksTab.css'

const BOOKS_PER_PAGE = 10
const EXTERNAL_PER_PAGE = 10

export default function AdminBooksTab() {
  const [externalQuery, setExternalQuery] = useState('')
  const [externalResults, setExternalResults] = useState([])
  const [externalLoading, setExternalLoading] = useState(false)
  const [externalError, setExternalError] = useState('')
  const [externalPage, setExternalPage] = useState(1)

  const [books, setBooks] = useState([])
  const [booksLoading, setBooksLoading] = useState(true)
  const [booksError, setBooksError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [bookSearch, setBookSearch] = useState('')

  const [toast, setToast] = useState(null)

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    setBooksLoading(true)
    setBooksError('')
    try {
      const data = await getAllDetailedBooks()
      setBooks(data)
    } catch (err) {
      setBooksError(err.message)
    } finally {
      setBooksLoading(false)
    }
  }

  const handleExternalSearch = async (e) => {
    e.preventDefault()
    if (!externalQuery.trim()) return
    setExternalLoading(true)
    setExternalError('')
    setExternalResults([])
    setExternalPage(1)
    try {
      const data = await searchExternalBooks(externalQuery)
      setExternalResults(data)
    } catch (err) {
      setExternalError(err.message)
    } finally {
      setExternalLoading(false)
    }
  }

  const handleImport = async (book, totalCopies) => {
    try {
      await importBook(book, totalCopies)
      setToast({ message: `"${book.title}" has been added to the library`, type: 'success' })
      fetchBooks()
    } catch (err) {
      setToast({ message: err.message, type: 'error' })
    }
  }

  const handleUpdateCopies = async (bookId, totalCopies) => {
    try {
      await updateCopies(bookId, totalCopies)
      setToast({ message: 'Copies updated successfully', type: 'success' })
      fetchBooks()
    } catch (err) {
      setToast({ message: err.message, type: 'error' })
    }
  }

  const handleDelete = async (bookId, bookTitle) => {
    if (!window.confirm(`Are you sure you want to delete "${bookTitle}"?`)) return
    try {
      await deleteBook(bookId)
      setToast({ message: `"${bookTitle}" has been deleted`, type: 'success' })
      fetchBooks()
    } catch (err) {
      setToast({ message: err.message, type: 'error' })
    }
  }

  const totalExternalPages = Math.ceil(externalResults.length / EXTERNAL_PER_PAGE)
  const paginatedExternal = externalResults.slice((externalPage - 1) * EXTERNAL_PER_PAGE, externalPage * EXTERNAL_PER_PAGE)

  const searchedBooks = books.filter(book =>
    book.title.toLowerCase().includes(bookSearch.toLowerCase()) ||
    book.author.toLowerCase().includes(bookSearch.toLowerCase())
  )

  const totalPages = Math.ceil(searchedBooks.length / BOOKS_PER_PAGE)
  const paginatedBooks = searchedBooks.slice((currentPage - 1) * BOOKS_PER_PAGE, currentPage * BOOKS_PER_PAGE)

  return (
    <div className="admin-books-tab">

      {/* External search */}
      <div className="admin-section">
        <h2 className="admin-section-title">
          <i className="bi bi-search me-2"></i>Search Open Library
        </h2>
        <p className="admin-section-desc">Search for books externally and import them to the library.</p>

        <form onSubmit={handleExternalSearch} className="admin-search-form">
          <input
            type="text"
            className="admin-search-input"
            placeholder="Search by title or author..."
            value={externalQuery}
            onChange={(e) => setExternalQuery(e.target.value)}
          />
          <button type="submit" className="btn admin-search-btn" disabled={externalLoading}>
            {externalLoading
              ? <><i className="bi bi-hourglass-split me-1"></i>Searching...</>
              : <><i className="bi bi-search me-1"></i>Search</>
            }
          </button>
        </form>

        {externalError && (
          <div className="alert admin-alert mt-3" role="alert">
            <i className="bi bi-exclamation-circle me-2"></i>{externalError}
          </div>
        )}

        {externalResults.length > 0 && (
          <>
            <div className="external-results">
              {paginatedExternal.map(book => (
                <ExternalBookCard
                  key={book.externalId}
                  book={book}
                  onImport={handleImport}
                />
              ))}
            </div>

            {totalExternalPages > 1 && (
              <div className="admin-pagination">
                <button
                  className="btn pagination-btn"
                  onClick={() => setExternalPage(p => p - 1)}
                  disabled={externalPage === 1}
                >
                  <i className="bi bi-chevron-left"></i>
                </button>

                {Array.from({ length: totalExternalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    className={`btn pagination-btn ${externalPage === page ? 'pagination-btn--active' : ''}`}
                    onClick={() => setExternalPage(page)}
                  >
                    {page}
                  </button>
                ))}

                <button
                  className="btn pagination-btn"
                  onClick={() => setExternalPage(p => p + 1)}
                  disabled={externalPage === totalExternalPages}
                >
                  <i className="bi bi-chevron-right"></i>
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <hr className="admin-divider" />

      {/* Library books */}
      <div className="admin-section">
        <h2 className="admin-section-title">
          <i className="bi bi-collection me-2"></i>Library books
        </h2>
        <p className="admin-section-desc">Manage books currently in the library.</p>

        <div className="books-search-wrapper">
          <i className="bi bi-search books-search-icon"></i>
          <input
            type="text"
            className="books-search-input-filter"
            placeholder="Search by title or author..."
            value={bookSearch}
            onChange={(e) => { setBookSearch(e.target.value); setCurrentPage(1) }}
          />
        </div>

        {booksError && (
          <div className="alert admin-alert" role="alert">
            <i className="bi bi-exclamation-circle me-2"></i>{booksError}
          </div>
        )}

        {booksLoading && (
          <div className="admin-loading">
            <div className="spinner-border admin-spinner" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {!booksLoading && searchedBooks.length === 0 && (
          <p className="text-muted">No books found.</p>
        )}

        {!booksLoading && searchedBooks.length > 0 && (
          <>
            <div className="library-books-list">
              {paginatedBooks.map(book => (
                <LibraryBookRow
                  key={book.id}
                  book={book}
                  onUpdateCopies={handleUpdateCopies}
                  onDelete={handleDelete}
                />
              ))}
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
      </div>

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