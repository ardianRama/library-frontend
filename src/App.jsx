import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import { LoginPage, RegisterPage } from './pages/AuthPages'
import BooksPage from './pages/BooksPage'
import Footer from './components/Footer'
import LoansPage from './pages/LoansPage'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/loans" element={<LoansPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  )
}
