export const getPriorityValue = (priority) => {
  const priorities = {
    'high': 3,
    'medium': 2,
    'low': 1
  }
  return priorities[priority] || 1
}

export const sortTasksByPriority = (tasks) => {
  return [...tasks].sort((a, b) => {
    return getPriorityValue(b.priority) - getPriorityValue(a.priority)
  })
}

export const sortTasksByDueDate = (tasks) => {
  return [...tasks].sort((a, b) => {
    if (!a.dueDate && !b.dueDate) return 0
    if (!a.dueDate) return 1
    if (!b.dueDate) return -1
    return new Date(a.dueDate) - new Date(b.dueDate)
  })
}

export const groupTasksByStatus = (tasks) => {
  return tasks.reduce((groups, task) => {
    const status = task.completed ? 'completed' : 'pending'
    if (!groups[status]) {
      groups[status] = []
    }
    groups[status].push(task)
    return groups
  }, {})
}

export const groupTasksByPriority = (tasks) => {
  return tasks.reduce((groups, task) => {
    const priority = task.priority || 'low'
    if (!groups[priority]) {
      groups[priority] = []
    }
    groups[priority].push(task)
    return groups
  }, {})
}

export const groupTasksByDate = (tasks) => {
  return tasks.reduce((groups, task) => {
    let dateKey = 'no-date'
    
    if (task.dueDate) {
      const date = new Date(task.dueDate)
      dateKey = date.toDateString()
    }
    
    if (!groups[dateKey]) {
      groups[dateKey] = []
    }
    groups[dateKey].push(task)
    return groups
  }, {})
}

export const filterTasksByDateRange = (tasks, startDate, endDate) => {
  return tasks.filter(task => {
    if (!task.dueDate) return false
    
    const taskDate = new Date(task.dueDate)
    return taskDate >= startDate && taskDate <= endDate
  })
}

export const getTaskStats = (tasks) => {
  const total = tasks.length
  const completed = tasks.filter(task => task.completed).length
  const pending = total - completed
  
  const overdue = tasks.filter(task => {
    if (task.completed || !task.dueDate) return false
    return new Date(task.dueDate) < new Date()
  }).length
  
  const today = tasks.filter(task => {
    if (!task.dueDate) return false
    const today = new Date().toDateString()
    return new Date(task.dueDate).toDateString() === today
  }).length
  
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0
  
  return {
    total,
    completed,
    pending,
    overdue,
    today,
    completionRate
  }
}

export const getTasksByCategory = (tasks) => {
  return tasks.reduce((categories, task) => {
    const category = task.category || 'Tanpa Kategori'
    if (!categories[category]) {
      categories[category] = []
    }
    categories[category].push(task)
    return categories
  }, {})
}