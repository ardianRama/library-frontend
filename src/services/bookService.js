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

export async function getAllDetailedBooks() {
  const response = await fetch(`${API_URL}/detailed`, {
    headers: getAuthHeader()
  })

  if (!response.ok) {
    throw new Error('Failed to fetch books')
  }

  return response.json()
}

export async function searchExternalBooks(query) {
  const response = await fetch(`${API_URL}/search/external?q=${encodeURIComponent(query)}`, {
    headers: getAuthHeader()
  })

  if (!response.ok) {
    throw new Error('Failed to search external books')
  }

  return response.json()
}

export async function importBook(book, totalCopies) {
  const response = await fetch(`${API_URL}/import`, {
    method: 'POST',
    headers: getAuthHeader(),
    body: JSON.stringify({ book, totalCopies })
  })

  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.message || 'Failed to import book')
  }

  return response.json()
}

export async function updateCopies(bookId, totalCopies) {
  const response = await fetch(`${API_URL}/${bookId}/copies`, {
    method: 'PATCH',
    headers: getAuthHeader(),
    body: JSON.stringify({ totalCopies })
  })

  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.message || 'Failed to update copies')
  }

  return response.json()
}

export async function deleteBook(bookId) {
  const response = await fetch(`${API_URL}/${bookId}`, {
    method: 'DELETE',
    headers: getAuthHeader()
  })

  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.message || 'Failed to delete book')
  }
}