import api from './api'

export async function getAllBooks() {
  try {
    const response = await api.get('/books')
    return response.data
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to fetch books')
  }
}

export async function searchBooks(query) {
  try {
    const response = await api.get(`/books/search?q=${encodeURIComponent(query)}`)
    return response.data
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to search books')
  }
}

export async function getAllDetailedBooks() {
  try {
    const response = await api.get('/books/detailed')
    return response.data
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to fetch books')
  }
}

export async function searchExternalBooks(query) {
  try {
    const response = await api.get(`/books/search/external?q=${encodeURIComponent(query)}`)
    return response.data
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to search external books')
  }
}

export async function importBook(book, totalCopies) {
  try {
    const response = await api.post('/books/import', { book, totalCopies })
    return response.data
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to import book')
  }
}

export async function updateCopies(bookId, totalCopies) {
  try {
    const response = await api.patch(`/books/${bookId}/copies`, { totalCopies })
    return response.data
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to update copies')
  }
}

export async function deleteBook(bookId) {
  try {
    await api.delete(`/books/${bookId}`)
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to delete book')
  }
}