const API_URL = 'http://localhost:8080/api/users'

const getAuthHeader = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('library_token')}`
})

export async function getAllUsers() {
  const response = await fetch(`${API_URL}/detailed`, {
    headers: getAuthHeader()
  })

  if (!response.ok) {
    throw new Error('Failed to fetch users')
  }

  return response.json()
}

export async function deleteUser(userId) {
  const response = await fetch(`${API_URL}/${userId}`, {
    method: 'DELETE',
    headers: getAuthHeader()
  })

  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.message || 'Failed to delete user')
  }
}