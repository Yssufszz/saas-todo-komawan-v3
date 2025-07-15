import { useState, useEffect } from 'react'
import Navbar from '../components/common/Navbar'
import AdminStats from '../components/admin/AdminStats'
import UserManagement from '../components/admin/UserManagement'
import TaskManagement from '../components/admin/TaskManagement'
import ActivityLogs from '../components/admin/ActivityLogs'
import { 
  UsersIcon, 
  DocumentTextIcon, 
  ChartBarIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

const Admin = () => {
  const [activeTab, setActiveTab] = useState('stats')

  const tabs = [
    { id: 'stats', name: 'Statistik', icon: ChartBarIcon },
    { id: 'users', name: 'Pengguna', icon: UsersIcon },
    { id: 'tasks', name: 'Tugas', icon: DocumentTextIcon },
    { id: 'logs', name: 'Log Aktivitas', icon: ClockIcon }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'stats':
        return <AdminStats />
      case 'users':
        return <UserManagement />
      case 'tasks':
        return <TaskManagement />
      case 'logs':
        return <ActivityLogs />
      default:
        return <AdminStats />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Panel Admin</h1>
          <p className="mt-2 text-gray-600">
            Kelola pengguna, tugas, dan monitor aktivitas sistem
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <Icon className="h-5 w-5 mr-2" />
                      {tab.name}
                    </div>
                  </button>
                )
              })}
            </nav>
          </div>
          
          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin