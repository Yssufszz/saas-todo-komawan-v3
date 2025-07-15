import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  getDocs, 
  orderBy,
  limit
} from 'firebase/firestore'
import { db } from '../config/firebase'

export const createTask = async (taskData, userId) => {
  try {
    const task = {
      ...taskData,
      userId: userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      completed: false,
      order: 0
    }
    
    const docRef = await addDoc(collection(db, 'tasks'), task)
    return { success: true, id: docRef.id }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const updateTask = async (taskId, updates) => {
  try {
    const taskRef = doc(db, 'tasks', taskId)
    await updateDoc(taskRef, {
      ...updates,
      updatedAt: new Date().toISOString()
    })
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const deleteTask = async (taskId) => {
  try {
    const taskRef = doc(db, 'tasks', taskId)
    await deleteDoc(taskRef)
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const getUserTasks = async (userId) => {
  try {
    const q = query(
      collection(db, 'tasks'),
      where('userId', '==', userId),
      orderBy('order', 'asc'),
      orderBy('createdAt', 'desc')
    )
    
    const querySnapshot = await getDocs(q)
    const tasks = []
    
    querySnapshot.forEach((doc) => {
      tasks.push({ id: doc.id, ...doc.data() })
    })
    
    return { success: true, tasks }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const getTasksByDate = async (userId, date) => {
  try {
    const startOfDay = new Date(date)
    startOfDay.setHours(0, 0, 0, 0)
    
    const endOfDay = new Date(date)
    endOfDay.setHours(23, 59, 59, 999)
    
    const q = query(
      collection(db, 'tasks'),
      where('userId', '==', userId),
      where('dueDate', '>=', startOfDay.toISOString()),
      where('dueDate', '<=', endOfDay.toISOString()),
      orderBy('dueDate', 'asc')
    )
    
    const querySnapshot = await getDocs(q)
    const tasks = []
    
    querySnapshot.forEach((doc) => {
      tasks.push({ id: doc.id, ...doc.data() })
    })
    
    return { success: true, tasks }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const getTaskStats = async (userId) => {
  try {
    const q = query(
      collection(db, 'tasks'),
      where('userId', '==', userId)
    )
    
    const querySnapshot = await getDocs(q)
    const stats = {
      total: 0,
      completed: 0,
      pending: 0,
      overdue: 0,
      today: 0
    }
    
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    querySnapshot.forEach((doc) => {
      const task = doc.data()
      stats.total++
      
      if (task.completed) {
        stats.completed++
      } else {
        stats.pending++
        
        if (task.dueDate) {
          const dueDate = new Date(task.dueDate)
          if (dueDate < today) {
            stats.overdue++
          } else if (dueDate.toDateString() === today.toDateString()) {
            stats.today++
          }
        }
      }
    })
    
    return { success: true, stats }
  } catch (error) {
    return { success: false, error: error.message }
  }
}