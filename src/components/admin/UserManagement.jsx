import { useState, useEffect } from 'react'
import { getAllUsers, updateUserRole, deleteUser } from '../../services/adminService'
import LoadingSpinner from '../common/LoadingSpinner'
import ConfirmDialog from '../common/ConfirmDialog'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { 
  UserIcon, 
  PencilIcon, 
  TrashIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

const UserManagement = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [deleteUser, setDeleteUser] = useState(null)
  const [editingRole, setEditingRole] = useState(null)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    setLoading(true)
    try {
      const result = await getAllUsers()
      if (result.success) {
        setUsers(result.users)
      }
    } catch (error) {
      console.error('Error loading users:', error)
      toast.error('Gagal memuat data pengguna')
    } finally {
      setLoading(false)
    }
  }

  const handleRoleUpdate = async (userId, newRole) => {
    try {
      const result = await updateUserRole(userId, newRole)
      if (result.success) {
        setUsers(users.map(user => 
          user.id === userId ? { ...user, role: newRole } : user
        ))
        toast.success('Role pengguna berhasil diperbarui')
      } else {
        toast.error('Gagal memperbarui role pengguna')
      }
    } catch (error) {
      toast.error('Terjadi kesalahan saat memperbarui role')
    }
    setEditingRole(null)
  }

  const handleDeleteUser = async (userId) => {
    try {
      const result = await deleteUser(userId)
      if (result.success) {
        setUsers(users.filter(user => user.id !== userId))
        toast.success('Pengguna berhasil dihapus')
      } else {
        toast.error('Gagal menghapus pengguna')
      }
    } catch (error) {
      toast.error('Terjadi kesalahan saat menghapus pengguna')
    }
  }

  const filteredUsers = users.filter(user =>
    user.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h2 className="text-xl font-semibold text-gray-900">
          Manajemen Pengguna ({users.length})
        </h2>
        
        <div className="relative w-full sm:w-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Cari pengguna..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredUsers.map((user) => (
            <li key={user.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <UserIcon className="h-10 w-10 text-gray-400" />
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center">
                        <p className="text-sm font-medium text-gray-900">
                          {user.displayName || 'Tidak ada nama'}
                        </p>
                        <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.role === 'admin' 
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.role === 'admin' ? 'Admin' : 'User'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{user.email}</p>
                      <p className="text-xs text-gray-400">
                        Bergabung: {format(new Date(user.createdAt), 'dd MMM yyyy', { locale: id })}
                      </p>
                      {user.lastLogin && (
                        <p className="text-xs text-gray-400">
                          Login terakhir: {format(new Date(user.lastLogin), 'dd MMM yyyy HH:mm', { locale: id })}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {editingRole === user.id ? (
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleUpdate(user.id, e.target.value)}
                        onBlur={() => setEditingRole(null)}
                        className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary-500"
                        autoFocus
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    ) : (
                      <button
                        onClick={() => setEditingRole(user.id)}
                        className="p-1 text-gray-400 hover:text-blue-600 transition-colors duration-200"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                    )}
                    
                    <button
                      onClick={() => setDeleteUser(user)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors duration-200"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <UserIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500">
            {searchTerm ? 'Pengguna tidak ditemukan' : 'Belum ada pengguna'}
          </p>
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deleteUser}
        onClose={() => setDeleteUser(null)}
        onConfirm={() => {
          handleDeleteUser(deleteUser.id)
          setDeleteUser(null)
        }}
        title="Hapus Pengguna"
        message={`Apakah Anda yakin ingin menghapus pengguna "${deleteUser?.displayName || deleteUser?.email}"? Semua tugas pengguna ini juga akan dihapus.`}
        confirmText="Hapus"
        type="danger"
      />
    </div>
  )
}

export default UserManagement