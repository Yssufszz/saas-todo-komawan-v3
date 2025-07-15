import { format, formatDistanceToNow, isToday, isTomorrow, isYesterday } from 'date-fns'
import { id } from 'date-fns/locale'

export const formatDate = (date, formatString = 'dd MMM yyyy') => {
  if (!date) return ''
  return format(new Date(date), formatString, { locale: id })
}

export const formatDateTime = (date) => {
  if (!date) return ''
  return format(new Date(date), 'dd MMM yyyy HH:mm', { locale: id })
}

export const formatRelativeTime = (date) => {
  if (!date) return ''
  
  const dateObj = new Date(date)
  
  if (isToday(dateObj)) {
    return 'Hari ini'
  } else if (isTomorrow(dateObj)) {
    return 'Besok'
  } else if (isYesterday(dateObj)) {
    return 'Kemarin'
  } else {
    return formatDistanceToNow(dateObj, { addSuffix: true, locale: id })
  }
}

export const isOverdue = (dueDate) => {
  if (!dueDate) return false
  return new Date(dueDate) < new Date() && !isToday(new Date(dueDate))
}

export const getDaysUntilDue = (dueDate) => {
  if (!dueDate) return null
  
  const today = new Date()
  const due = new Date(dueDate)
  const diffTime = due - today
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  return diffDays
}

export const getWeekDates = (date = new Date()) => {
  const week = []
  const startDate = new Date(date)
  const day = startDate.getDay()
  const diff = startDate.getDate() - day + (day === 0 ? -6 : 1)
  
  startDate.setDate(diff)
  
  for (let i = 0; i < 7; i++) {
    week.push(new Date(startDate))
    startDate.setDate(startDate.getDate() + 1)
  }
  
  return week
}

export const getMonthDates = (date = new Date()) => {
  const year = date.getFullYear()
  const month = date.getMonth()
  
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  
  return { firstDay, lastDay }
}