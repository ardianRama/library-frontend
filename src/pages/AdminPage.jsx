import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'
import AdminBooksTab from '../components/admin/AdminBooksTab'
import AdminUsersTab from '../components/admin/AdminUsersTab'
import './AdminPage.css'
import AdminLoansTab from '../components/admin/AdminLoansTab'

export default function AdminPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('books')

  if (user?.role !== 'ROLE_ADMIN') {
    return <Navigate to="/" />
  }

  return (
    <div className="admin-page">
      <div className="container">
        <div className="admin-header">
          <h1 className="admin-title">Admin panel</h1>
          <p className="admin-subtitle">Manage books, users and loans</p>
        </div>

        <div className="admin-tabs">
          <button
            className={`admin-tab ${activeTab === 'books' ? 'admin-tab--active' : ''}`}
            onClick={() => setActiveTab('books')}
          >
            <i className="bi bi-book me-2"></i>Books
          </button>
          <button
            className={`admin-tab ${activeTab === 'users' ? 'admin-tab--active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <i className="bi bi-people me-2"></i>Users
          </button>
          <button
            className={`admin-tab ${activeTab === 'loans' ? 'admin-tab--active' : ''}`}
            onClick={() => setActiveTab('loans')}
          >
            <i className="bi bi-bookmark-check me-2"></i>Loans
          </button>
        </div>

        <div className="admin-content">
          {activeTab === 'books' && <AdminBooksTab />}
          {activeTab === 'users' && <AdminUsersTab />}
          {activeTab === 'loans' && <AdminLoansTab />}
        </div>
      </div>
    </div>
  )
}