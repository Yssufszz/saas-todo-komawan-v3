import { createContext, useContext, useEffect, useState } from 'react'
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  orderBy,
  writeBatch
} from 'firebase/firestore'
import { db } from '../config/firebase'
import { useAuth } from './AuthContext'
import toast from 'react-hot-toast'

const TaskContext = createContext()

export const useTask = () => {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider')
  }
  return context
}

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      setTasks([])
      setLoading(false)
      return
    }

    const q = query(
      collection(db, 'tasks'),
      where('userId', '==', user.uid)
    )

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasksData = []
      querySnapshot.forEach((doc) => {
        tasksData.push({ id: doc.id, ...doc.data() })
      })
      
      tasksData.sort((a, b) => {
        if (a.order !== undefined && b.order !== undefined) {
          return a.order - b.order
        }
        return new Date(b.createdAt) - new Date(a.createdAt)
      })
      
      setTasks(tasksData)
      setLoading(false)
    }, (error) => {
      console.error('Error fetching tasks:', error)
      setLoading(false)
    })

    return unsubscribe
  }, [user])

  const addTask = async (taskData) => {
    if (!user) {
      toast.error('Anda harus login terlebih dahulu')
      return { success: false, error: 'User not authenticated' }
    }

    try {
      const task = {
        ...taskData,
        userId: user.uid,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        completed: false,
        order: tasks.length
      }
      
      await addDoc(collection(db, 'tasks'), task)
      toast.success('Tugas berhasil ditambahkan')
      return { success: true }
    } catch (error) {
      console.error('Error adding task:', error)
      toast.error('Gagal menambahkan tugas')
      return { success: false, error: error.message }
    }
  }

  const updateTask = async (taskId, updates) => {
    try {
      const taskRef = doc(db, 'tasks', taskId)
      await updateDoc(taskRef, {
        ...updates,
        updatedAt: new Date().toISOString()
      })
      toast.success('Tugas berhasil diperbarui')
      return { success: true }
    } catch (error) {
      console.error('Error updating task:', error)
      toast.error('Gagal memperbarui tugas')
      return { success: false, error: error.message }
    }
  }

  const deleteTask = async (taskId) => {
    try {
      const taskRef = doc(db, 'tasks', taskId)
      await deleteDoc(taskRef)
      toast.success('Tugas berhasil dihapus')
      return { success: true }
    } catch (error) {
      console.error('Error deleting task:', error)
      toast.error('Gagal menghapus tugas')
      return { success: false, error: error.message }
    }
  }

  const toggleTaskComplete = async (taskId) => {
    try {
      const task = tasks.find(t => t.id === taskId)
      if (!task) {
        toast.error('Tugas tidak ditemukan')
        return { success: false, error: 'Task not found' }
      }

      const taskRef = doc(db, 'tasks', taskId)
      const newCompletedState = !task.completed
      
      await updateDoc(taskRef, {
        completed: newCompletedState,
        completedAt: newCompletedState ? new Date().toISOString() : null,
        updatedAt: new Date().toISOString()
      })
      
      toast.success(newCompletedState ? 'Tugas selesai! 🎉' : 'Tugas dibuka kembali')
      return { success: true }
    } catch (error) {
      console.error('Error toggling task completion:', error)
      toast.error('Gagal mengubah status tugas')
      return { success: false, error: error.message }
    }
  }

  const reorderTasks = async (reorderedTasks) => {
    try {
      const batch = writeBatch(db)
      
      reorderedTasks.forEach((task, index) => {
        const taskRef = doc(db, 'tasks', task.id)
        batch.update(taskRef, { 
          order: index,
          updatedAt: new Date().toISOString()
        })
      })
      
      await batch.commit()
      return { success: true }
    } catch (error) {
      console.error('Error reordering tasks:', error)
      toast.error('Gagal mengubah urutan tugas')
      return { success: false, error: error.message }
    }
  }

  const value = {
    tasks,
    loading,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    reorderTasks
  }

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  )
}