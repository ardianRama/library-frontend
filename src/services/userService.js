import api from './api'

export async function getAllUsers() {
  try {
    const response = await api.get('/users/detailed')
    return response.data
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to fetch users')
  }
}

export async function deleteUser(userId) {
  try {
    await api.delete(`/users/${userId}`)
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to delete user')
  }
}