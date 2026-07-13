const API_URL = 'http://localhost:8080/api/loans'

const getAuthHeader = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('library_token')}`
})

export async function borrowBook(bookId) {
  const response = await fetch(`${API_URL}/borrow`, {
    method: 'POST',
    headers: getAuthHeader(),
    body: JSON.stringify({ bookId })
  })

  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.message || 'Failed to borrow book. Please try again.')
  }

  return response.json()
}

export async function getAllLoans() {
  const response = await fetch(API_URL, {
    headers: getAuthHeader()
  })

  if (!response.ok) {
    throw new Error('Failed to fetch loans')
  }

  return response.json()
}

export async function returnBook(bookId) {
  const response = await fetch(`${API_URL}/return`, {
    method: 'POST',
    headers: getAuthHeader(),
    body: JSON.stringify({ bookId })
  })

  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.message || 'Failed to return book. Please try again.')
  }

  return response.json()
}