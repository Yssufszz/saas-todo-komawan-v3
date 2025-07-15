import { 
  collection, 
  addDoc, 
  query, 
  getDocs, 
  orderBy, 
  limit,
  where,
  updateDoc,
  deleteDoc,
  doc
} from 'firebase/firestore'
import { db } from '../config/firebase'

export const logUserActivity = async (userId, action, details = {}) => {
  try {
    const userAgent = navigator.userAgent
    const ipAddress = await fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => data.ip)
      .catch(() => 'Unknown')

    const activityLog = {
      userId: userId,
      action: action,
      details: details,
      timestamp: new Date().toISOString(),
      userAgent: userAgent,
      ipAddress: ipAddress
    }

    await addDoc(collection(db, 'activityLogs'), activityLog)
    return { success: true }
  } catch (error) {
    console.error('Error logging user activity:', error)
    return { success: false, error: error.message }
  }
}

export const getAllUsers = async () => {
  try {
    const q = query(
      collection(db, 'users'),
      orderBy('createdAt', 'desc')
    )
    
    const querySnapshot = await getDocs(q)
    const users = []
    
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() })
    })
    
    return { success: true, users }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const getAllTasks = async () => {
  try {
    const q = query(
      collection(db, 'tasks'),
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

export const getActivityLogs = async (limitCount = 100) => {
  try {
    const q = query(
      collection(db, 'activityLogs'),
      orderBy('timestamp', 'desc'),
      limit(limitCount)
    )
    
    const querySnapshot = await getDocs(q)
    const logs = []
    
    querySnapshot.forEach((doc) => {
      logs.push({ id: doc.id, ...doc.data() })
    })
    
    return { success: true, logs }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const updateUserRole = async (userId, newRole) => {
  try {
    const userRef = doc(db, 'users', userId)
    await updateDoc(userRef, {
      role: newRole,
      updatedAt: new Date().toISOString()
    })
    
    await logUserActivity(userId, 'role_updated', { newRole })
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const deleteUser = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId)
    await deleteDoc(userRef)
    
    const userTasksQuery = query(
      collection(db, 'tasks'),
      where('userId', '==', userId)
    )
    const userTasksSnapshot = await getDocs(userTasksQuery)
    
    const deletePromises = userTasksSnapshot.docs.map(doc => 
      deleteDoc(doc.ref)
    )
    await Promise.all(deletePromises)
    
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const getSystemStats = async () => {
  try {
    const usersQuery = query(collection(db, 'users'))
    const tasksQuery = query(collection(db, 'tasks'))
    const logsQuery = query(collection(db, 'activityLogs'))
    
    const [usersSnapshot, tasksSnapshot, logsSnapshot] = await Promise.all([
      getDocs(usersQuery),
      getDocs(tasksQuery),
      getDocs(logsQuery)
    ])
    
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    let completedTasks = 0
    let todayTasks = 0
    
    tasksSnapshot.forEach((doc) => {
      const task = doc.data()
      if (task.completed) completedTasks++
      if (task.createdAt && new Date(task.createdAt) >= today) todayTasks++
    })
    
    let todayLogins = 0
    logsSnapshot.forEach((doc) => {
      const log = doc.data()
      if (log.action === 'login' && new Date(log.timestamp) >= today) {
        todayLogins++
      }
    })
    
    return {
      success: true,
      stats: {
        totalUsers: usersSnapshot.size,
        totalTasks: tasksSnapshot.size,
        completedTasks: completedTasks,
        todayTasks: todayTasks,
        todayLogins: todayLogins,
        totalActivities: logsSnapshot.size
      }
    }
  } catch (error) {
    return { success: false, error: error.message }
  }
}