import { useState, useEffect } from 'react'
import { getActivityLogs } from '../../services/adminService'
import LoadingSpinner from '../common/LoadingSpinner'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { 
  ClockIcon, 
  UserIcon,
  ComputerDesktopIcon,
  GlobeAltIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'

const ActivityLogs = () => {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterAction, setFilterAction] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [logsPerPage] = useState(20)

  useEffect(() => {
    loadLogs()
  }, [])

  const loadLogs = async () => {
    setLoading(true)
    try {
      const result = await getActivityLogs(100)
      if (result.success) {
        setLogs(result.logs)
      }
    } catch (error) {
      console.error('Error loading logs:', error)
    } finally {
      setLoading(false)
    }
  }

  const getActionIcon = (action) => {
    switch (action) {
      case 'login':
        return <UserIcon className="h-4 w-4 text-green-600" />
      case 'logout':
        return <UserIcon className="h-4 w-4 text-red-600" />
      case 'register':
        return <UserIcon className="h-4 w-4 text-blue-600" />
      case 'role_updated':
        return <UserIcon className="h-4 w-4 text-purple-600" />
      default:
        return <ClockIcon className="h-4 w-4 text-gray-600" />
    }
  }

  const getActionText = (action) => {
    switch (action) {
      case 'login':
        return 'Masuk'
      case 'logout':
        return 'Keluar'
      case 'register':
        return 'Daftar'
      case 'role_updated':
        return 'Role Diperbarui'
      default:
        return action
    }
  }

  const getActionColor = (action) => {
    switch (action) {
      case 'login':
        return 'bg-green-100 text-green-800'
      case 'logout':
        return 'bg-red-100 text-red-800'
      case 'register':
        return 'bg-blue-100 text-blue-800'
      case 'role_updated':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.details?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.userId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.ipAddress?.includes(searchTerm)
    
    const matchesAction = filterAction === 'all' || log.action === filterAction

    return matchesSearch && matchesAction
  })

  const indexOfLastLog = currentPage * logsPerPage
  const indexOfFirstLog = indexOfLastLog - logsPerPage
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog)
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage)

  const getBrowserInfo = (userAgent) => {
    if (!userAgent) return 'Unknown'
    
    if (userAgent.includes('Chrome')) return 'Chrome'
    if (userAgent.includes('Firefox')) return 'Firefox'
    if (userAgent.includes('Safari')) return 'Safari'
    if (userAgent.includes('Edge')) return 'Edge'
    return 'Other'
  }

  const getOSInfo = (userAgent) => {
    if (!userAgent) return 'Unknown'
    
    if (userAgent.includes('Windows')) return 'Windows'
    if (userAgent.includes('Mac')) return 'macOS'
    if (userAgent.includes('Linux')) return 'Linux'
    if (userAgent.includes('Android')) return 'Android'
    if (userAgent.includes('iOS')) return 'iOS'
    return 'Other'
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
        <h2 className="text-xl font-semibold text-gray-900">
          Log Aktivitas ({logs.length})
        </h2>
        
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full lg:w-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Cari email, user ID, atau IP..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <select
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
            className="block w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">Semua Aktivitas</option>
            <option value="login">Login</option>
            <option value="logout">Logout</option>
            <option value="register">Registrasi</option>
            <option value="role_updated">Role Updated</option>
          </select>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {currentLogs.map((log) => (
            <li key={log.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getActionIcon(log.action)}
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getActionColor(log.action)}`}>
                          {getActionText(log.action)}
                        </span>
                        
                        <p className="text-sm font-medium text-gray-900">
                          {log.details?.email || log.details?.displayName || 'Unknown User'}
                        </p>
                      </div>
                      
                      <div className="mt-1 flex items-center space-x-4 text-xs text-gray-500">
                        <span className="flex items-center">
                          <ClockIcon className="h-3 w-3 mr-1" />
                          {format(new Date(log.timestamp), 'dd MMM yyyy HH:mm:ss', { locale: id })}
                        </span>
                        
                        <span className="flex items-center">
                          <GlobeAltIcon className="h-3 w-3 mr-1" />
                          {log.ipAddress || 'Unknown IP'}
                        </span>
                        
                        <span className="flex items-center">
                          <ComputerDesktopIcon className="h-3 w-3 mr-1" />
                          {getBrowserInfo(log.userAgent)} / {getOSInfo(log.userAgent)}
                        </span>
                      </div>
                      
                      {log.details && Object.keys(log.details).length > 0 && (
                        <div className="mt-2 text-xs text-gray-600">
                          {Object.entries(log.details)
                            .filter(([key]) => key !== 'email' && key !== 'displayName')
                            .map(([key, value]) => (
                              <span key={key} className="mr-3">
                                {key}: {String(value)}
                              </span>
                            ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-400">
                    ID: {log.userId?.slice(0, 8)}...
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {currentLogs.length === 0 && (
        <div className="text-center py-12">
          <ClockIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500">
            {searchTerm || filterAction !== 'all' 
              ? 'Log tidak ditemukan dengan filter yang dipilih'
              : 'Belum ada log aktivitas'
            }
          </p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-b-md">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sebelumnya
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="relative ml-3 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Selanjutnya
            </button>
          </div>
          
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Menampilkan{' '}
                <span className="font-medium">{indexOfFirstLog + 1}</span>
                {' '}sampai{' '}
                <span className="font-medium">
                  {Math.min(indexOfLastLog, filteredLogs.length)}
                </span>
                {' '}dari{' '}
                <span className="font-medium">{filteredLogs.length}</span>
                {' '}hasil
              </p>
            </div>
            
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                <button
                  onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Sebelumnya
                </button>
                
                {[...Array(Math.min(totalPages, 7))].map((_, index) => {
                  let pageNumber
                  
                  if (totalPages <= 7) {
                    pageNumber = index + 1
                  } else if (currentPage <= 4) {
                    pageNumber = index + 1
                  } else if (currentPage >= totalPages - 3) {
                    pageNumber = totalPages - 6 + index
                  } else {
                    pageNumber = currentPage - 3 + index
                  }
                  
                  if (pageNumber < 1 || pageNumber > totalPages) return null
                  
                  const isCurrentPage = pageNumber === currentPage
                  
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                        isCurrentPage
                          ? 'z-10 bg-primary-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600'
                          : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  )
                })}
                
                <button
                  onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Selanjutnya
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ActivityLogs