import api from './api'

export async function borrowBook(bookId) {
  try {
    const response = await api.post('/loans/borrow', { bookId })
    return response.data
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to borrow book. Please try again.')
  }
}

export async function getAllLoans() {
  try {
    const response = await api.get('/loans')
    return response.data
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to fetch loans')
  }
}

export async function returnBook(bookId) {
  try {
    const response = await api.post('/loans/return', { bookId })
    return response.data
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to return book. Please try again.')
  }
}