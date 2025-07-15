import { useTask } from '../../contexts/TaskContext'
import { useEffect, useState } from 'react'
import { 
  CheckCircleIcon, 
  ClockIcon, 
  ExclamationTriangleIcon,
  CalendarIcon,
  TrophyIcon,
  FireIcon
} from '@heroicons/react/24/outline'

const TaskStats = () => {
  const { tasks } = useTask()
  const [animatedStats, setAnimatedStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    overdue: 0,
    today: 0
  })
  const [completionRate, setCompletionRate] = useState(0)

  const stats = {
    total: tasks.length,
    completed: tasks.filter(task => task.completed).length,
    pending: tasks.filter(task => !task.completed).length,
    overdue: tasks.filter(task => {
      if (task.completed || !task.dueDate) return false
      return new Date(task.dueDate) < new Date()
    }).length,
    today: tasks.filter(task => {
      if (!task.dueDate) return false
      const today = new Date().toDateString()
      return new Date(task.dueDate).toDateString() === today
    }).length
  }

  const actualCompletionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0

  useEffect(() => {
    const animateNumbers = () => {
      const duration = 1000
      const steps = 30
      const stepTime = duration / steps

      Object.keys(stats).forEach(key => {
        const target = stats[key]
        const current = animatedStats[key]
        const increment = (target - current) / steps

        let step = 0
        const timer = setInterval(() => {
          step++
          setAnimatedStats(prev => ({
            ...prev,
            [key]: Math.round(current + (increment * step))
          }))

          if (step >= steps) {
            clearInterval(timer)
            setAnimatedStats(prev => ({ ...prev, [key]: target }))
          }
        }, stepTime)
      })
    }

    const animateCompletionRate = () => {
      const duration = 1500
      const steps = 60
      const stepTime = duration / steps
      const increment = actualCompletionRate / steps

      let step = 0
      const timer = setInterval(() => {
        step++
        setCompletionRate(Math.round(increment * step))

        if (step >= steps) {
          clearInterval(timer)
          setCompletionRate(actualCompletionRate)
        }
      }, stepTime)
    }

    animateNumbers()
    animateCompletionRate()
  }, [stats.total, stats.completed, stats.pending, stats.overdue, stats.today])

  const getProgressColor = (rate) => {
    if (rate >= 80) return 'from-green-500 to-emerald-600'
    if (rate >= 60) return 'from-blue-500 to-blue-600'
    if (rate >= 40) return 'from-yellow-500 to-orange-600'
    return 'from-red-500 to-red-600'
  }

  const getProgressMessage = (rate) => {
    if (rate >= 80) return 'Luar biasa! Tetap pertahankan 🎉'
    if (rate >= 60) return 'Bagus! Terus tingkatkan 💪'
    if (rate >= 40) return 'Lumayan! Masih bisa lebih baik 🔥'
    return 'Ayo semangat! Kamu pasti bisa 💪'
  }

  const statCards = [
    {
      title: 'Total Tugas',
      value: animatedStats.total,
      icon: CalendarIcon,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      iconBg: 'bg-blue-100'
    },
    {
      title: 'Selesai',
      value: animatedStats.completed,
      icon: CheckCircleIcon,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      iconBg: 'bg-green-100'
    },
    {
      title: 'Belum Selesai',
      value: animatedStats.pending,
      icon: ClockIcon,
      color: 'from-yellow-500 to-orange-600',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-700',
      iconBg: 'bg-yellow-100'
    },
    {
      title: 'Terlambat',
      value: animatedStats.overdue,
      icon: ExclamationTriangleIcon,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700',
      iconBg: 'bg-red-100'
    }
  ]

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div 
              key={index} 
              className={`relative overflow-hidden rounded-2xl ${stat.bgColor} p-6 transition-all duration-300 hover:shadow-xl hover:scale-105 group cursor-pointer`}
              style={{
                animationDelay: `${index * 150}ms`,
              }}
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-white bg-opacity-20 rounded-full -mr-10 -mt-10 group-hover:scale-110 transition-transform duration-300"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-white bg-opacity-10 rounded-full -ml-8 -mb-8 group-hover:scale-110 transition-transform duration-300"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.iconBg} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-6 w-6 text-current" />
                  </div>
                  {stat.title === 'Selesai' && stat.value > 0 && (
                    <TrophyIcon className="h-5 w-5 text-yellow-500 animate-pulse" />
                  )}
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className={`text-3xl font-bold ${stat.textColor} tabular-nums`}>
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
              <FireIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Progress Penyelesaian</h3>
              <p className="text-sm text-gray-600">{getProgressMessage(completionRate)}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2">
              <span className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent tabular-nums">
                {completionRate}%
              </span>
              {completionRate >= 80 && (
                <TrophyIcon className="h-8 w-8 text-yellow-500 animate-bounce" />
              )}
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
            <div
              className={`bg-gradient-to-r ${getProgressColor(completionRate)} h-4 rounded-full transition-all duration-1500 ease-out relative overflow-hidden`}
              style={{ width: `${completionRate}%` }}
            >
              <div className="absolute inset-0 bg-white bg-opacity-20 animate-pulse"></div>
              <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer"></div>
            </div>
          </div>
          
          {completionRate > 0 && (
            <div className="absolute -top-8 transition-all duration-1000 ease-out" style={{ left: `${Math.min(completionRate, 95)}%` }}>
              <div className="transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded-md">
                {completionRate}%
              </div>
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800 mx-auto"></div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Selesai: {stats.completed}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <span className="text-sm text-gray-600">Total: {stats.total}</span>
            </div>
          </div>
          
          {stats.today > 0 && (
            <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
              <CalendarIcon className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-blue-600 font-medium">
                {stats.today} tugas hari ini
              </span>
            </div>
          )}
        </div>

        {stats.overdue > 0 && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-center gap-2">
              <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />
              <span className="text-sm text-red-700 font-medium">
                {stats.overdue} tugas terlambat memerlukan perhatian
              </span>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  )
}

export default TaskStats