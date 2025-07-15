import { useState, useEffect } from 'react'
import { useTask } from '../../contexts/TaskContext'
import Modal from '../common/Modal'
import LoadingSpinner from '../common/LoadingSpinner'
import toast from 'react-hot-toast'

const TaskForm = ({ isOpen, onClose, editTask = null }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    estimatedTime: '',
    category: ''
  })
  const [loading, setLoading] = useState(false)
  const [focusedField, setFocusedField] = useState(null)
  const { addTask, updateTask } = useTask()

  useEffect(() => {
    if (editTask) {
      setFormData({
        title: editTask.title || '',
        description: editTask.description || '',
        priority: editTask.priority || 'medium',
        dueDate: editTask.dueDate ? editTask.dueDate.split('T')[0] : '',
        estimatedTime: editTask.estimatedTime || '',
        category: editTask.category || ''
      })
    } else {
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: '',
        estimatedTime: '',
        category: ''
      })
    }
  }, [editTask, isOpen])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const taskData = {
        ...formData,
        dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null,
        estimatedTime: formData.estimatedTime ? parseInt(formData.estimatedTime) : null
      }

      let result
      if (editTask) {
        result = await updateTask(editTask.id, taskData)
      } else {
        result = await addTask(taskData)
      }

      if (result.success) {
        onClose()
      }
    } catch (error) {
      toast.error('Terjadi kesalahan saat menyimpan tugas')
    } finally {
      setLoading(false)
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-red-300 bg-red-50 text-red-700'
      case 'medium': return 'border-yellow-300 bg-yellow-50 text-yellow-700'
      case 'low': return 'border-green-300 bg-green-50 text-green-700'
      default: return 'border-gray-300 bg-gray-50 text-gray-700'
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editTask ? 'Edit Tugas' : 'Tambah Tugas Baru'}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1">
          <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
            Judul Tugas *
          </label>
          <div className="relative">
            <input
              type="text"
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              onFocus={() => setFocusedField('title')}
              onBlur={() => setFocusedField(null)}
              className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 ease-in-out
                ${focusedField === 'title' 
                  ? 'border-blue-500 bg-blue-50 shadow-lg transform scale-[1.02]' 
                  : 'border-gray-200 bg-white hover:border-gray-300'
                }
                focus:outline-none focus:ring-0`}
              placeholder="Masukkan judul tugas"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
            Deskripsi
          </label>
          <div className="relative">
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              onFocus={() => setFocusedField('description')}
              onBlur={() => setFocusedField(null)}
              className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 ease-in-out resize-none
                ${focusedField === 'description' 
                  ? 'border-blue-500 bg-blue-50 shadow-lg transform scale-[1.02]' 
                  : 'border-gray-200 bg-white hover:border-gray-300'
                }
                focus:outline-none focus:ring-0`}
              placeholder="Deskripsi tugas (opsional)"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label htmlFor="priority" className="block text-sm font-semibold text-gray-700 mb-2">
              Prioritas
            </label>
            <div className="relative">
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                onFocus={() => setFocusedField('priority')}
                onBlur={() => setFocusedField(null)}
                className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 ease-in-out appearance-none cursor-pointer
                  ${focusedField === 'priority' 
                    ? 'border-blue-500 bg-blue-50 shadow-lg transform scale-[1.02]' 
                    : 'border-gray-200 bg-white hover:border-gray-300'
                  }
                  focus:outline-none focus:ring-0`}
              >
                <option value="low">🟢 Rendah</option>
                <option value="medium">🟡 Sedang</option>
                <option value="high">🔴 Tinggi</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
              Kategori
            </label>
            <div className="relative">
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                onFocus={() => setFocusedField('category')}
                onBlur={() => setFocusedField(null)}
                className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 ease-in-out
                  ${focusedField === 'category' 
                    ? 'border-blue-500 bg-blue-50 shadow-lg transform scale-[1.02]' 
                    : 'border-gray-200 bg-white hover:border-gray-300'
                  }
                  focus:outline-none focus:ring-0`}
                placeholder="Kategori tugas"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label htmlFor="dueDate" className="block text-sm font-semibold text-gray-700 mb-2">
              Tenggat Waktu
            </label>
            <div className="relative">
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                onFocus={() => setFocusedField('dueDate')}
                onBlur={() => setFocusedField(null)}
                className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 ease-in-out
                  ${focusedField === 'dueDate' 
                    ? 'border-blue-500 bg-blue-50 shadow-lg transform scale-[1.02]' 
                    : 'border-gray-200 bg-white hover:border-gray-300'
                  }
                  focus:outline-none focus:ring-0`}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="estimatedTime" className="block text-sm font-semibold text-gray-700 mb-2">
              Estimasi Waktu (menit)
            </label>
            <div className="relative">
              <input
                type="number"
                id="estimatedTime"
                name="estimatedTime"
                min="1"
                value={formData.estimatedTime}
                onChange={handleChange}
                onFocus={() => setFocusedField('estimatedTime')}
                onBlur={() => setFocusedField(null)}
                className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 ease-in-out
                  ${focusedField === 'estimatedTime' 
                    ? 'border-blue-500 bg-blue-50 shadow-lg transform scale-[1.02]' 
                    : 'border-gray-200 bg-white hover:border-gray-300'
                  }
                  focus:outline-none focus:ring-0`}
                placeholder="60"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all duration-200 hover:scale-105 active:scale-95"
            disabled={loading}
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed min-w-[100px]"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <LoadingSpinner size="sm" color="white" />
              </div>
            ) : (
              editTask ? 'Perbarui' : 'Simpan'
            )}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default TaskForm