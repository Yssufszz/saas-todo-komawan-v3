import { useAuth } from '../../contexts/AuthContext'
import { Navigate } from 'react-router-dom'
import LoadingSpinner from '../common/LoadingSpinner'

const AdminRoute = ({ children }) => {
  const { user, userRole, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (userRole !== 'admin') {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

export default AdminRoute