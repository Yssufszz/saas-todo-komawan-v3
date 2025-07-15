import { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import { useTask } from '../contexts/TaskContext'
import Navbar from '../components/common/Navbar'
import TaskCard from '../components/dashboard/TaskCard'
import TaskForm from '../components/dashboard/TaskForm'
import { format, isSameDay } from 'date-fns'
import { id } from 'date-fns/locale'
import { PlusIcon, CalendarIcon } from '@heroicons/react/24/outline'
import 'react-calendar/dist/Calendar.css'

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [editTask, setEditTask] = useState(null)
  const { tasks } = useTask()

  const getTasksForDate = (date) => {
    return tasks.filter(task => {
      if (!task.dueDate) return false
      return isSameDay(new Date(task.dueDate), date)
    })
  }

  const selectedDateTasks = getTasksForDate(selectedDate)

  const handleAddTask = () => {
    setEditTask(null)
    setShowTaskForm(true)
  }

  const handleEditTask = (task) => {
    setEditTask(task)
    setShowTaskForm(true)
  }

  const handleCloseForm = () => {
    setShowTaskForm(false)
    setEditTask(null)
  }

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dayTasks = getTasksForDate(date)
      if (dayTasks.length > 0) {
        const completedTasks = dayTasks.filter(task => task.completed).length
        const totalTasks = dayTasks.length
        
        return (
          <div className="flex justify-center mt-1">
            <div className={`w-2 h-2 rounded-full ${
              completedTasks === totalTasks ? 'bg-green-500' : 
              completedTasks > 0 ? 'bg-yellow-500' : 'bg-primary-500'
            }`}></div>
          </div>
        )
      }
    }
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Kalender Tugas</h1>
          <p className="mt-2 text-gray-600">
            Lihat dan kelola tugas berdasarkan tanggal
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Kalender</h2>
              
              <div className="calendar-container">
                <Calendar
                  onChange={setSelectedDate}
                  value={selectedDate}
                  tileContent={tileContent}
                  locale="id-ID"
                  className="w-full border-0 shadow-none"
                />
              </div>
              
              <div className="mt-6 flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-primary-500 rounded-full mr-2"></div>
                  <span>Ada tugas</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <span>Sebagian selesai</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span>Semua selesai</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  {format(selectedDate, 'EEEE, dd MMMM yyyy', { locale: id })}
                </h3>
                <button
                  onClick={handleAddTask}
                  className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200"
                >
                  <PlusIcon className="h-5 w-5" />
                </button>
              </div>
              
              {selectedDateTasks.length === 0 ? (
                <div className="text-center py-8">
                  <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">
                    Tidak ada tugas untuk tanggal ini
                  </p>
                  <button
                    onClick={handleAddTask}
                    className="mt-3 text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    Tambah tugas untuk tanggal ini
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedDateTasks.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onEdit={handleEditTask}
                    />
                  ))}
                </div>
              )}
            </div>
            
            <div className="card">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Ringkasan Minggu Ini</h3>
              
              <div className="space-y-3">
                {[0, 1, 2, 3, 4, 5, 6].map(dayOffset => {
                  const date = new Date()
                  date.setDate(date.getDate() + dayOffset)
                  const dayTasks = getTasksForDate(date)
                  
                  if (dayTasks.length === 0) return null
                  
                  return (
                    <div key={dayOffset} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {format(date, 'EEEE', { locale: id })}
                        </p>
                        <p className="text-xs text-gray-500">
                          {format(date, 'dd MMM', { locale: id })}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          {dayTasks.filter(t => t.completed).length}/{dayTasks.length}
                        </p>
                        <p className="text-xs text-gray-500">tugas</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <TaskForm
        isOpen={showTaskForm}
        onClose={handleCloseForm}
        editTask={editTask}
      />
      
      <style jsx>{`
        .calendar-container .react-calendar {
          width: 100%;
          background: white;
          border: none;
          font-family: inherit;
        }
        
        .calendar-container .react-calendar__tile {
          max-width: 100%;
          padding: 0.75rem 0.5rem;
          background: none;
          text-align: center;
          line-height: 16px;
          font-size: 0.875rem;
          position: relative;
        }
        
        .calendar-container .react-calendar__tile:enabled:hover,
        .calendar-container .react-calendar__tile:enabled:focus {
          background-color: #f3f4f6;
        }
        
        .calendar-container .react-calendar__tile--active {
          background: #3b82f6;
          color: white;
        }
        
        .calendar-container .react-calendar__tile--now {
          background: #fef3c7;
          color: #92400e;
        }
        
        .calendar-container .react-calendar__tile--now:enabled:hover,
        .calendar-container .react-calendar__tile--now:enabled:focus {
          background: #fde68a;
        }
        
        .calendar-container .react-calendar__navigation button {
          color: #374151;
          min-width: 44px;
          background: none;
          font-size: 1rem;
          margin-top: 8px;
        }
        
        .calendar-container .react-calendar__navigation button:enabled:hover,
        .calendar-container .react-calendar__navigation button:enabled:focus {
          background-color: #f3f4f6;
        }
      `}</style>
    </div>
  )
}

export default CalendarPage