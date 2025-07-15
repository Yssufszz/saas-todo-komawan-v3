import { useState, useEffect } from 'react'
import { getAllTasks } from '../../services/adminService'
import { deleteTask } from '../../services/taskService'
import LoadingSpinner from '../common/LoadingSpinner'
import ConfirmDialog from '../common/ConfirmDialog'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { 
  DocumentTextIcon, 
  TrashIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

const TaskManagement = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')
  const [deleteTaskId, setDeleteTaskId] = useState(null)

  useEffect(() => {
    loadTasks()
  }, [])

  const loadTasks = async () => {
    setLoading(true)
    try {
      const result = await getAllTasks()
      if (result.success) {
        setTasks(result.tasks)
      }
    } catch (error) {
      console.error('Error loading tasks:', error)
      toast.error('Gagal memuat data tugas')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteTask = async (taskId) => {
    try {
      const result = await deleteTask(taskId)
      if (result.success) {
        setTasks(tasks.filter(task => task.id !== taskId))
        toast.success('Tugas berhasil dihapus')
      } else {
        toast.error('Gagal menghapus tugas')
      }
    } catch (error) {
      toast.error('Terjadi kesalahan saat menghapus tugas')
    }
  }

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'completed' && task.completed) ||
                         (filterStatus === 'pending' && !task.completed)
    
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority

    return matchesSearch && matchesStatus && matchesPriority
  })

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'high':
        return 'Tinggi'
      case 'medium':
        return 'Sedang'
      case 'low':
        return 'Rendah'
      default:
        return 'Normal'
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
        <h2 className="text-xl font-semibold text-gray-900">
          Manajemen Tugas ({tasks.length})
        </h2>
        
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full lg:w-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Cari tugas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="block w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">Semua Status</option>
            <option value="pending">Belum Selesai</option>
            <option value="completed">Selesai</option>
          </select>
          
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="block w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">Semua Prioritas</option>
            <option value="high">Tinggi</option>
            <option value="medium">Sedang</option>
            <option value="low">Rendah</option>
          </select>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredTasks.map((task) => (
            <li key={task.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        task.completed ? 'bg-green-500' : 'bg-gray-300'
                      }`}></div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <p className={`text-sm font-medium ${
                            task.completed ? 'line-through text-gray-500' : 'text-gray-900'
                          }`}>
                            {task.title}
                          </p>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                            {getPriorityText(task.priority)}
                          </span>
                          {task.completed && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Selesai
                            </span>
                          )}
                        </div>
                        
                        {task.description && (
                          <p className="mt-1 text-sm text-gray-600 truncate">
                            {task.description}
                          </p>
                        )}
                        
                        <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                          <span>
                            Dibuat: {format(new Date(task.createdAt), 'dd MMM yyyy HH:mm', { locale: id })}
                          </span>
                          {task.dueDate && (
                            <span>
                              Deadline: {format(new Date(task.dueDate), 'dd MMM yyyy', { locale: id })}
                            </span>
                          )}
                          {task.category && (
                            <span>Kategori: {task.category}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => setDeleteTaskId(task.id)}
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

      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <DocumentTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500">
            {searchTerm || filterStatus !== 'all' || filterPriority !== 'all' 
              ? 'Tugas tidak ditemukan dengan filter yang dipilih'
              : 'Belum ada tugas'
            }
          </p>
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deleteTaskId}
        onClose={() => setDeleteTaskId(null)}
        onConfirm={() => {
          handleDeleteTask(deleteTaskId)
          setDeleteTaskId(null)
        }}
        title="Hapus Tugas"
        message="Apakah Anda yakin ingin menghapus tugas ini? Tindakan ini tidak dapat dibatalkan."
        confirmText="Hapus"
        type="danger"
      />
    </div>
  )
}

export default TaskManagement