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
    throw new Error('Failed to borrow book')
  }

  return response.json()
}