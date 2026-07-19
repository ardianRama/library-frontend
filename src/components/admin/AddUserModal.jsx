import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { registerUser } from '../../services/authService'
import './AddUserModal.css'

const addUserSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters').max(20, 'First name must be at most 20 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters').max(20, 'Last name must be at most 20 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(5, 'Password must be at least 5 characters').max(20, 'Password must be at most 20 characters')
})

export default function AddUserModal({ onClose, onSuccess }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(addUserSchema),
    mode: 'onBlur'
  })

  const onSubmit = async (data) => {
    try {
      await registerUser(data.email, data.password, data.firstName, data.lastName)
      onSuccess(`${data.firstName} ${data.lastName} has been added successfully`)
    } catch (err) {
      onSuccess(err.message, 'error')
    }
  }

  return (
    <div className="add-user-modal-overlay" onClick={onClose}>
      <div className="add-user-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="add-user-modal-header">
          <h5 className="add-user-modal-title">Add user</h5>
          <button className="add-user-modal-close" onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
        <div className="add-user-modal-body">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="row g-3 mb-3">
              <div className="col-6">
                <label className="auth-label">First name</label>
                <input
                  type="text"
                  className={`form-control auth-input ${errors.firstName ? 'auth-input--error' : ''}`}
                  placeholder="John"
                  {...register('firstName')}
                />
                {errors.firstName && (
                  <small className="auth-error">{errors.firstName.message}</small>
                )}
              </div>
              <div className="col-6">
                <label className="auth-label">Last name</label>
                <input
                  type="text"
                  className={`form-control auth-input ${errors.lastName ? 'auth-input--error' : ''}`}
                  placeholder="Doe"
                  {...register('lastName')}
                />
                {errors.lastName && (
                  <small className="auth-error">{errors.lastName.message}</small>
                )}
              </div>
            </div>
            <div className="mb-3">
              <label className="auth-label">Email</label>
              <input
                type="email"
                className={`form-control auth-input ${errors.email ? 'auth-input--error' : ''}`}
                placeholder="your@email.com"
                {...register('email')}
              />
              {errors.email && (
                <small className="auth-error">{errors.email.message}</small>
              )}
            </div>
            <div className="mb-4">
              <label className="auth-label">Password</label>
              <input
                type="password"
                className={`form-control auth-input ${errors.password ? 'auth-input--error' : ''}`}
                placeholder="••••••••"
                {...register('password')}
              />
              {errors.password
                ? <small className="auth-error">{errors.password.message}</small>
                : <small className="auth-hint">Between 5 and 20 characters</small>
              }
            </div>
            <div className="add-user-modal-footer">
              <button type="button" className="btn add-user-modal-btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn add-user-modal-btn-primary" disabled={isSubmitting}>
                {isSubmitting
                  ? <><i className="bi bi-hourglass-split me-2"></i>Adding...</>
                  : <><i className="bi bi-person-plus me-2"></i>Add user</>
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}