import { useState, useEffect } from 'react'
import { getSystemStats } from '../../services/adminService'
import LoadingSpinner from '../common/LoadingSpinner'
import { 
  UsersIcon, 
  DocumentTextIcon, 
  CheckCircleIcon,
  ClockIcon,
  ChartBarIcon,
  CalendarIcon
} from '@heroicons/react/24/outline'

const AdminStats = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    setLoading(true)
    try {
      const result = await getSystemStats()
      if (result.success) {
        setStats(result.stats)
      }
    } catch (error) {
      console.error('Error loading stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Gagal memuat statistik</p>
        <button
          onClick={loadStats}
          className="mt-4 btn-primary"
        >
          Coba Lagi
        </button>
      </div>
    )
  }

  const statCards = [
    {
      title: 'Total Pengguna',
      value: stats.totalUsers,
      icon: UsersIcon,
      color: 'bg-blue-50 text-blue-600 border-blue-200'
    },
    {
      title: 'Total Tugas',
      value: stats.totalTasks,
      icon: DocumentTextIcon,
      color: 'bg-purple-50 text-purple-600 border-purple-200'
    },
    {
      title: 'Tugas Selesai',
      value: stats.completedTasks,
      icon: CheckCircleIcon,
      color: 'bg-green-50 text-green-600 border-green-200'
    },
    {
      title: 'Login Hari Ini',
      value: stats.todayLogins,
      icon: ChartBarIcon,
      color: 'bg-yellow-50 text-yellow-600 border-yellow-200'
    },
    {
      title: 'Tugas Hari Ini',
      value: stats.todayTasks,
      icon: CalendarIcon,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200'
    },
    {
      title: 'Total Aktivitas',
      value: stats.totalActivities,
      icon: ClockIcon,
      color: 'bg-gray-50 text-gray-600 border-gray-200'
    }
  ]

  const completionRate = stats.totalTasks > 0 
    ? Math.round((stats.completedTasks / stats.totalTasks) * 100) 
    : 0

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className={`p-6 rounded-lg border ${stat.color}`}>
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-white">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium opacity-80">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value.toLocaleString()}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Tingkat Penyelesaian Tugas
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Progress Keseluruhan</span>
              <span className="text-2xl font-bold text-primary-600">{completionRate}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${completionRate}%` }}
              ></div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Selesai</p>
                <p className="font-medium text-green-600">{stats.completedTasks}</p>
              </div>
              <div>
                <p className="text-gray-500">Belum Selesai</p>
                <p className="font-medium text-yellow-600">
                  {stats.totalTasks - stats.completedTasks}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Aktivitas Hari Ini
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <ChartBarIcon className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-sm text-gray-600">Login Pengguna</span>
              </div>
              <span className="font-medium">{stats.todayLogins}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <DocumentTextIcon className="h-5 w-5 text-purple-500 mr-2" />
                <span className="text-sm text-gray-600">Tugas Dibuat</span>
              </div>
              <span className="font-medium">{stats.todayTasks}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <UsersIcon className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-sm text-gray-600">Pengguna Aktif</span>
              </div>
              <span className="font-medium">{Math.ceil(stats.todayLogins * 0.8)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminStats