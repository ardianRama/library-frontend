const API_URL = 'http://localhost:8080/api/books'

const getAuthHeader = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('library_token')}`
})

export async function getAllBooks() {
  const response = await fetch(API_URL, {
    headers: getAuthHeader()
  })

  if (!response.ok) {
    throw new Error('Failed to fetch books')
  }

  return response.json()
}

export async function searchBooks(query) {
  const response = await fetch(`${API_URL}/search?q=${encodeURIComponent(query)}`, {
    headers: getAuthHeader()
  })

  if (!response.ok) {
    throw new Error('Failed to search books')
  }

  return response.json()
}