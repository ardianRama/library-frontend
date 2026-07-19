import api from './api'

export async function loginUser(email, password) {
  try {
    const response = await api.post('/auth/login', { email, password })
    return response.data
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Invalid email or password')
  }
}

export async function registerUser(email, password, firstName, lastName) {
  try {
    await api.post('/auth/register', { email, password, firstName, lastName })
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Registration failed. Please try again.')
  }
}