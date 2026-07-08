import { createContext, useContext, useState } from 'react'
import { jwtDecode } from 'jwt-decode'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('library_token')
    if (!token) return null
    try {
      return jwtDecode(token)
    } catch {
      return null
    }
  })

  const login = (token) => {
    localStorage.setItem('library_token', token)
    const decoded = jwtDecode(token)
    setUser(decoded)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('library_token')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin: user?.role === 'ADMIN' }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)