import { useEffect } from 'react'
import './Toast.css'

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className={`toast-notification toast-notification--${type}`}>
      <i className={`bi ${type === 'success' ? 'bi-check-circle' : 'bi-exclamation-circle'} me-2`}></i>
      {message}
    </div>
  )
}