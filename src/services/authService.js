const API_URL = 'http://localhost:8080/api/auth'

export async function loginUser(email, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })

  if (!response.ok) {
    throw new Error('Invalid email or password')
  }

  return response.json()
}