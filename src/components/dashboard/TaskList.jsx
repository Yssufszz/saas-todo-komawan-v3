import { useState } from 'react'
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useTask } from '../../contexts/TaskContext'
import TaskCard from './TaskCard'
import SortableTaskCard from './SortableTaskCard'
import EmptyState from '../common/EmptyState'
import { PlusIcon, DocumentTextIcon, SparklesIcon } from '@heroicons/react/24/outline'

const TaskList = ({ onAddTask, onEditTask, filter = 'all' }) => {
  const { tasks, reorderTasks } = useTask()
  const [activeId, setActiveId] = useState(null)
  const [isReordering, setIsReordering] = useState(false)
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'completed':
        return task.completed
      case 'pending':
        return !task.completed
      case 'today':
        if (!task.dueDate) return false
        const today = new Date().toDateString()
        return new Date(task.dueDate).toDateString() === today
      case 'overdue':
        if (!task.dueDate || task.completed) return false
        const now = new Date()
        return new Date(task.dueDate) < now
      default:
        return true
    }
  }).sort((a, b) => (a.order || 0) - (b.order || 0))

  const handleDragStart = (event) => {
    setActiveId(event.active.id)
    setIsReordering(true)
  }

  const handleDragEnd = async (event) => {
    const { active, over } = event
    setActiveId(null)
    setIsReordering(false)

    if (!over || active.id === over.id) {
      return
    }

    const oldIndex = filteredTasks.findIndex(task => task.id === active.id)
    const newIndex = filteredTasks.findIndex(task => task.id === over.id)
    
    if (oldIndex !== -1 && newIndex !== -1) {
      const newOrder = arrayMove(filteredTasks, oldIndex, newIndex)
      
      const reorderedTasks = newOrder.map((task, index) => ({
        ...task,
        order: index
      }))
      
      try {
        await reorderTasks(reorderedTasks)
      } catch (error) {
        console.error('Error reordering tasks:', error)
      }
    }
  }

  const activeTask = activeId ? filteredTasks.find(task => task.id === activeId) : null

  const getFilterEmoji = (filter) => {
    switch (filter) {
      case 'completed': return '✅'
      case 'pending': return '⏳'
      case 'today': return '📅'
      case 'overdue': return '⚠️'
      default: return '📋'
    }
  }

  const getFilterDescription = (filter) => {
    switch (filter) {
      case 'completed': return 'Semua tugas sudah diselesaikan dengan baik!'
      case 'pending': return 'Belum ada tugas yang perlu dikerjakan'
      case 'today': return 'Tidak ada tugas yang jatuh tempo hari ini'
      case 'overdue': return 'Tidak ada tugas yang terlambat'
      default: return 'Mulai tambahkan tugas pertama Anda untuk meningkatkan produktivitas'
    }
  }

  if (filteredTasks.length === 0) {
    return (
      <div className="relative">
        <div className="absolute -top-2 -left-2 w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full animate-pulse delay-300"></div>
        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-pink-500 rounded-full animate-pulse delay-500"></div>
        
        <EmptyState
          icon={DocumentTextIcon}
          title={
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl">{getFilterEmoji(filter)}</span>
              <span>
                {filter === 'all' ? 'Belum ada tugas' : `Tidak ada tugas ${filter}`}
              </span>
            </div>
          }
          description={getFilterDescription(filter)}
          action={
            filter === 'all' && (
              <button
                onClick={onAddTask}
                className="group inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              >
                <PlusIcon className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                <SparklesIcon className="h-4 w-4 mr-1 opacity-70" />
                Tambah Tugas
              </button>
            )
          }
        />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {filteredTasks.length > 0 && (
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">{getFilterEmoji(filter)}</span>
              <span className="text-sm font-medium text-gray-600">
                {filteredTasks.length} tugas
              </span>
            </div>
            {isReordering && (
              <div className="flex items-center gap-2 text-xs text-blue-600 bg-blue-50 px-3 py-1 rounded-full animate-pulse">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                Mengatur ulang...
              </div>
            )}
          </div>
        </div>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={filteredTasks.map(task => task.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            {filteredTasks.map((task, index) => (
              <div
                key={task.id}
                className="transform transition-all duration-300 hover:scale-[1.02]"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <SortableTaskCard
                  task={task}
                  onEdit={onEditTask}
                />
              </div>
            ))}
          </div>
        </SortableContext>
        
        <DragOverlay>
          {activeTask ? (
            <div className="transform rotate-3 scale-105 shadow-2xl">
              <TaskCard task={activeTask} onEdit={onEditTask} isDragging={true} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {filteredTasks.length > 5 && (
        <div className="flex justify-center pt-4">
          <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 px-4 py-2 rounded-full">
            <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse"></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse delay-200"></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse delay-400"></div>
            <span className="ml-2">Seret untuk mengatur ulang</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default TaskList