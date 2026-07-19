import { useState, useEffect } from 'react'
import { getAllUsers, deleteUser } from '../../services/userService'
import AddUserModal from './AddUserModal'
import Toast from '../Toast'
import './AdminUsersTab.css'

const USERS_PER_PAGE = 10

export default function AdminUsersTab() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [showAddModal, setShowAddModal] = useState(false)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await getAllUsers()
      setUsers(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (userId, userName) => {
    if (!window.confirm(`Are you sure you want to delete ${userName}?`)) return
    try {
      await deleteUser(userId)
      setToast({ message: `${userName} has been deleted`, type: 'success' })
      fetchUsers()
    } catch (err) {
      setToast({ message: err.message, type: 'error' })
    }
  }

  const handleAddSuccess = (message, type = 'success') => {
    setShowAddModal(false)
    setToast({ message, type })
    if (type === 'success') fetchUsers()
  }

  const filteredUsers = users.filter(user =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  )

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE)
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * USERS_PER_PAGE, currentPage * USERS_PER_PAGE)

  return (
    <div className="admin-users-tab">
      <div className="admin-users-header">
        <div>
          <h2 className="admin-section-title">
            <i className="bi bi-people me-2"></i>Users
          </h2>
          <p className="admin-section-desc">Manage library users.</p>
        </div>
        <button className="btn admin-add-user-btn" onClick={() => setShowAddModal(true)}>
          <i className="bi bi-person-plus me-2"></i>Add user
        </button>
      </div>

      <div className="users-search-wrapper">
        <i className="bi bi-search users-search-icon"></i>
        <input
          type="text"
          className="users-search-input"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setCurrentPage(1) }}
        />
      </div>

      {error && (
        <div className="alert admin-alert" role="alert">
          <i className="bi bi-exclamation-circle me-2"></i>{error}
        </div>
      )}

      {loading && (
        <div className="admin-loading">
          <div className="spinner-border admin-spinner" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {!loading && filteredUsers.length === 0 && (
        <p className="text-muted">No users found.</p>
      )}

      {!loading && filteredUsers.length > 0 && (
        <>
          <div className="users-table-wrapper">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map(user => (
                  <tr key={user.id}>
                    <td>{user.firstName} {user.lastName}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`user-role-badge ${user.role === 'ADMIN' ? 'badge--admin' : 'badge--user'}`}>
                        {user.role === 'ADMIN' ? 'Admin' : 'User'}
                      </span>
                    </td>
                    <td className="text-end">
                      <button
                        className="btn admin-delete-btn"
                        onClick={() => handleDelete(user.id, `${user.firstName} ${user.lastName}`)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="admin-pagination">
              <button
                className="btn pagination-btn"
                onClick={() => setCurrentPage(p => p - 1)}
                disabled={currentPage === 1}
              >
                <i className="bi bi-chevron-left"></i>
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  className={`btn pagination-btn ${currentPage === page ? 'pagination-btn--active' : ''}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}

              <button
                className="btn pagination-btn"
                onClick={() => setCurrentPage(p => p + 1)}
                disabled={currentPage === totalPages}
              >
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          )}
        </>
      )}

      {showAddModal && (
        <AddUserModal
          onClose={() => setShowAddModal(false)}
          onSuccess={handleAddSuccess}
        />
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}