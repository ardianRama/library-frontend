import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import { LoginPage, RegisterPage } from './pages/AuthPages'
import BooksPage from './pages/BooksPage'
import LoansPage from './pages/LoansPage'
import AdminPage from './pages/AdminPage'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/books" element={
            <ProtectedRoute>
              <BooksPage />
            </ProtectedRoute>
          } />
          <Route path="/loans" element={
            <ProtectedRoute>
              <LoansPage />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute adminOnly>
              <AdminPage />
            </ProtectedRoute>
          } />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  )
}
