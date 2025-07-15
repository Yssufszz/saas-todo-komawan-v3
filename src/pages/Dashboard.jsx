import { useState, useEffect } from 'react'
import Navbar from '../components/common/Navbar'
import TaskStats from '../components/dashboard/TaskStats'
import TaskList from '../components/dashboard/TaskList'
import TaskForm from '../components/dashboard/TaskForm'
import AIAssistant from '../components/dashboard/AIAssistant'
import { PlusIcon, FunnelIcon, SparklesIcon, RocketLaunchIcon } from '@heroicons/react/24/outline'

const Dashboard = () => {
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [editTask, setEditTask] = useState(null)
  const [taskFilter, setTaskFilter] = useState('all')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

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

  const filterOptions = [
    { value: 'all', label: '📋 Semua Tugas', color: 'from-blue-500 to-blue-600' },
    { value: 'pending', label: '⏳ Belum Selesai', color: 'from-yellow-500 to-orange-600' },
    { value: 'completed', label: '✅ Selesai', color: 'from-green-500 to-emerald-600' },
    { value: 'today', label: '📅 Hari Ini', color: 'from-purple-500 to-pink-600' },
    { value: 'overdue', label: '⚠️ Terlambat', color: 'from-red-500 to-red-600' }
  ]

  const getCurrentFilter = () => {
    return filterOptions.find(option => option.value === taskFilter)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`mb-8 text-center transform transition-all duration-700 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-30 animate-pulse"></div>
              <div className="relative p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
                <RocketLaunchIcon className="h-8 w-8 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Dashboard
              </h1>
              <p className="text-gray-600 text-lg">
                Kelola tugas harian Anda dengan mudah dan efisien
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className={`transform transition-all duration-700 delay-200 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <TaskStats />
            </div>
            
            <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 p-8 transform transition-all duration-700 delay-400 hover:shadow-xl hover:scale-[1.01] ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl">
                    <SparklesIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Daftar Tugas</h2>
                    <p className="text-sm text-gray-600">
                      {getCurrentFilter().label.replace(/[^\w\s]/gi, '')}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                  <div className="relative group">
                    <select
                      value={taskFilter}
                      onChange={(e) => setTaskFilter(e.target.value)}
                      className="appearance-none bg-white border-2 border-gray-200 rounded-xl px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-0 focus:border-blue-500 transition-all duration-300 hover:border-gray-300 cursor-pointer min-w-[160px]"
                    >
                      {filterOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <FunnelIcon className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" />
                    </div>
                  </div>
                  
                  <button
                    onClick={handleAddTask}
                    className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl font-medium"
                  >
                    <PlusIcon className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
                    <span>Tambah Tugas</span>
                  </button>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-10 animate-pulse"></div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-pink-500 to-red-600 rounded-full opacity-10 animate-pulse delay-300"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-r from-green-500 to-blue-600 rounded-full opacity-10 animate-pulse delay-500"></div>
                
                <TaskList
                  onAddTask={handleAddTask}
                  onEditTask={handleEditTask}
                  filter={taskFilter}
                />
              </div>
            </div>
          </div>
          
          <div className={`space-y-6 transform transition-all duration-700 delay-600 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-20 animate-pulse"></div>
              <div className="relative bg-white rounded-2xl shadow-lg border border-gray-100 transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                <AIAssistant />
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl">
                  <SparklesIcon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Tips Produktivitas</h3>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                  <h4 className="font-semibold text-blue-900 mb-2">🎯 Fokus pada Prioritas</h4>
                  <p className="text-sm text-blue-800">
                    Selesaikan tugas dengan prioritas tinggi terlebih dahulu untuk hasil maksimal
                  </p>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                  <h4 className="font-semibold text-green-900 mb-2">⏰ Gunakan Teknik Pomodoro</h4>
                  <p className="text-sm text-green-800">
                    Bekerja dalam blok 25 menit dengan istirahat 5 menit untuk meningkatkan fokus
                  </p>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                  <h4 className="font-semibold text-purple-900 mb-2">📅 Rencanakan Hari Ini</h4>
                  <p className="text-sm text-purple-800">
                    Buat daftar tugas harian setiap pagi untuk memulai hari dengan tujuan yang jelas
                  </p>
                </div>
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
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes shimmer {
          0% { background-position: -468px 0; }
          100% { background-position: 468px 0; }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
          background: linear-gradient(90deg, #f0f0f0 0px, #e0e0e0 40px, #f0f0f0 80px);
          background-size: 468px 104px;
        }
      `}</style>
    </div>
  )
}

export default Dashboard