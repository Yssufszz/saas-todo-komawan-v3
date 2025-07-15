import { useState } from 'react'
import { 
  CheckIcon, 
  PencilIcon, 
  TrashIcon,
  ClockIcon,
  CalendarIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline'
import { useTask } from '../../contexts/TaskContext'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import ConfirmDialog from '../common/ConfirmDialog'

const TaskCard = ({ task, onEdit, isDragging = false }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const { toggleTaskComplete, deleteTask } = useTask()

  const handleToggleComplete = async (e) => {
    e.stopPropagation()
    await toggleTaskComplete(task.id)
  }

  const handleEdit = (e) => {
    e.stopPropagation()
    onEdit(task)
  }

  const handleDelete = async () => {
    await deleteTask(task.id)
  }

  const handleDeleteClick = (e) => {
    e.stopPropagation()
    setShowDeleteDialog(true)
  }

  const getPriorityConfig = (priority) => {
    switch (priority) {
      case 'high':
        return {
          color: 'text-red-600 bg-red-50 border-red-200',
          dot: 'bg-red-500',
          text: 'Tinggi',
          icon: ExclamationCircleIcon
        }
      case 'medium':
        return {
          color: 'text-yellow-600 bg-yellow-50 border-yellow-200',
          dot: 'bg-yellow-500',
          text: 'Sedang',
          icon: ClockIcon
        }
      case 'low':
        return {
          color: 'text-green-600 bg-green-50 border-green-200',
          dot: 'bg-green-500',
          text: 'Rendah',
          icon: CheckIcon
        }
      default:
        return {
          color: 'text-gray-600 bg-gray-50 border-gray-200',
          dot: 'bg-gray-500',
          text: 'Normal',
          icon: ClockIcon
        }
    }
  }

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed
  const priorityConfig = getPriorityConfig(task.priority)

  return (
    <>
      <div 
        className={`group relative bg-white/90 backdrop-blur-sm rounded-xl border transition-all duration-300 hover:shadow-lg ${
          task.completed ? 'opacity-70 border-gray-200' : 'border-gray-200 hover:border-gray-300'
        } ${isDragging ? 'rotate-2 scale-105 shadow-2xl z-50' : ''} ${
          isOverdue ? 'border-l-4 border-l-red-500' : `border-l-4 border-l-${priorityConfig.dot.split('-')[1]}-500`
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`absolute top-2 right-2 w-3 h-3 rounded-full ${priorityConfig.dot} ${task.completed ? 'opacity-50' : ''}`}></div>

        <div className="p-4">
          <div className="flex items-start space-x-3">
            <button
              onClick={handleToggleComplete}
              className={`mt-1 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 hover:scale-110 ${
                task.completed
                  ? 'bg-green-500 border-green-500 text-white shadow-md'
                  : 'border-gray-300 hover:border-green-500 hover:bg-green-50'
              }`}
            >
              {task.completed && <CheckIcon className="h-4 w-4" />}
            </button>
            
            <div className="flex-1 min-w-0">
              <h3 className={`font-semibold transition-all duration-200 ${
                task.completed ? 'line-through text-gray-500' : 'text-gray-900 group-hover:text-gray-700'
              }`}>
                {task.title}
              </h3>
              
              {task.description && (
                <p className={`mt-1 text-sm ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                  {task.description}
                </p>
              )}
              
              <div className="mt-3 flex items-center flex-wrap gap-3 text-xs">
                <span className={`inline-flex items-center px-2 py-1 rounded-full border font-medium ${priorityConfig.color}`}>
                  <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${priorityConfig.dot}`}></span>
                  {priorityConfig.text}
                </span>
                
                {task.dueDate && (
                  <div className={`flex items-center ${isOverdue ? 'text-red-600' : 'text-gray-500'}`}>
                    <CalendarIcon className="h-3 w-3 mr-1" />
                    {format(new Date(task.dueDate), 'dd MMM yyyy', { locale: id })}
                    {isOverdue && <span className="ml-1 text-red-500 font-medium">• Terlambat</span>}
                  </div>
                )}
                
                {task.estimatedTime && (
                  <div className="flex items-center text-gray-500">
                    <ClockIcon className="h-3 w-3 mr-1" />
                    {task.estimatedTime} menit
                  </div>
                )}

                {task.category && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">
                    {task.category}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className={`absolute top-4 right-8 flex items-center space-x-1 transition-all duration-200 ${
            isHovered || isDragging ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
          }`}>
            <button
              onClick={handleEdit}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:scale-110"
              title="Edit tugas"
            >
              <PencilIcon className="h-4 w-4" />
            </button>
            <button
              onClick={handleDeleteClick}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-110"
              title="Hapus tugas"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl pointer-events-none transition-opacity duration-200 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}></div>
      </div>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title="Hapus Tugas"
        message={`Apakah Anda yakin ingin menghapus tugas "${task.title}"?`}
        confirmText="Hapus"
        type="danger"
      />
    </>
  )
}

export default TaskCard