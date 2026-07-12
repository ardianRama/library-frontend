import { useState, useEffect } from 'react'
import { getAllBooks, searchBooks } from '../services/bookService'
import './BooksPage.css'

const BOOKS_PER_PAGE = 20

export default function BooksPage() {
  const [books, setBooks] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await getAllBooks()
      setBooks(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    setCurrentPage(1)
    setLoading(true)
    setError('')
    try {
      const data = query.trim()
        ? await searchBooks(query)
        : await getAllBooks()
      setBooks(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleClear = async () => {
    setQuery('')
    setCurrentPage(1)
    setLoading(true)
    try {
      const data = await getAllBooks()
      setBooks(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const totalPages = Math.ceil(books.length / BOOKS_PER_PAGE)
  const paginatedBooks = books.slice(
    (currentPage - 1) * BOOKS_PER_PAGE,
    currentPage * BOOKS_PER_PAGE
  )

  return (
    <div className="books-page">
      <div className="container">

        <div className="books-header">
          <h1 className="books-title">Browse books</h1>
          <p className="books-subtitle">
            {books.length} {books.length === 1 ? 'book' : 'books'} available
          </p>
        </div>

        <form onSubmit={handleSearch} className="books-search-form">
          <div className="books-search-wrapper">
            <i className="bi bi-search books-search-icon"></i>
            <input
              type="text"
              className="books-search-input"
              placeholder="Search by title or author..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button
                type="button"
                className="books-search-clear"
                onClick={handleClear}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            )}
          </div>
          <button type="submit" className="btn books-search-btn">
            Search
          </button>
        </form>

        {error && (
          <div className="alert books-alert" role="alert">
            <i className="bi bi-exclamation-circle me-2"></i>{error}
          </div>
        )}

        {loading && (
          <div className="books-loading">
            <div className="spinner-border books-spinner" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p>Loading books...</p>
          </div>
        )}

        {!loading && !error && books.length === 0 && (
          <div className="books-empty">
            <i className="bi bi-search books-empty-icon"></i>
            <h4>No books found</h4>
            <p>Try searching for something else.</p>
          </div>
        )}

        {!loading && !error && books.length > 0 && (
          <>
            <div className="books-grid">
              {paginatedBooks.map(book => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="books-pagination">
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
    </div>
  )
}

function BookCard({ book }) {
  const available = book.availableCopies > 0

  return (
    <div className="book-card">
      <div className="book-card-cover">
        {book.coverUrl ? (
          <img src={book.coverUrl} alt={book.title} className="book-card-img" />
        ) : (
          <div className="book-card-no-cover">
            <i className="bi bi-book"></i>
          </div>
        )}
        <span className={`book-card-badge ${available ? 'badge--available' : 'badge--unavailable'}`}>
          {available ? 'Available' : 'Unavailable'}
        </span>
      </div>
      <div className="book-card-body">
        <h6 className="book-card-title">{book.title}</h6>
        <p className="book-card-author">{book.author}</p>
        {book.firstPublishYear && (
          <p className="book-card-year">{book.firstPublishYear}</p>
        )}
      </div>
    </div>
  )
}