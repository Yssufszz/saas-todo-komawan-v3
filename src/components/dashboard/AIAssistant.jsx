import { useState, useEffect } from 'react'
import { useTask } from '../../contexts/TaskContext'
import { useAuth } from '../../contexts/AuthContext'
import { getDailyPlanAndMotivation, getAITaskRecommendations } from '../../services/aiService'
import { 
  SparklesIcon, 
  LightBulbIcon, 
  ArrowPathIcon,
  RocketLaunchIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline'
import LoadingSpinner from '../common/LoadingSpinner'

const AIAssistant = () => {
  const [dailyPlan, setDailyPlan] = useState(null)
  const [recommendations, setRecommendations] = useState(null)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('plan')
  const [isVisible, setIsVisible] = useState(false)
  const { tasks } = useTask()
  const { user } = useAuth()

  useEffect(() => {
    setIsVisible(true)
    if (tasks.length > 0) {
      generateDailyPlan()
    }
  }, [tasks])

  const generateDailyPlan = async () => {
    setLoading(true)
    try {
      const planResult = await getDailyPlanAndMotivation(tasks)
      setDailyPlan(planResult)
    } catch (error) {
      console.error('Error generating daily plan:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateRecommendations = async () => {
    setLoading(true)
    try {
      const recResult = await getAITaskRecommendations(tasks.filter(task => !task.completed))
      setRecommendations(recResult)
    } catch (error) {
      console.error('Error generating recommendations:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    if (tab === 'recommendations' && !recommendations) {
      generateRecommendations()
    }
  }

  return (
    <div className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center group hover:scale-110 transition-transform duration-300">
            <SparklesIcon className="h-6 w-6 text-white group-hover:rotate-12 transition-transform duration-300" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">AI Assistant</h3>
            <p className="text-sm text-gray-500">Asisten pintar untuk produktivitas</p>
          </div>
        </div>
        <button
          onClick={activeTab === 'plan' ? generateDailyPlan : generateRecommendations}
          disabled={loading}
          className="p-3 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-200 hover:scale-110 group"
          title="Refresh AI suggestions"
        >
          <ArrowPathIcon className={`h-5 w-5 ${loading ? 'animate-spin' : 'group-hover:rotate-180'} transition-transform duration-300`} />
        </button>
      </div>

      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          <button
            onClick={() => handleTabChange('plan')}
            className={`py-3 px-1 border-b-2 font-semibold text-sm transition-all duration-200 relative group ${
              activeTab === 'plan'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center space-x-2">
              <RocketLaunchIcon className="h-4 w-4" />
              <span>Rencana Harian</span>
            </div>
            {activeTab === 'plan' && (
              <div className="absolute inset-0 bg-purple-50 rounded-lg opacity-20 -z-10"></div>
            )}
          </button>
          <button
            onClick={() => handleTabChange('recommendations')}
            className={`py-3 px-1 border-b-2 font-semibold text-sm transition-all duration-200 relative group ${
              activeTab === 'recommendations'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center space-x-2">
              <ChatBubbleLeftRightIcon className="h-4 w-4" />
              <span>Rekomendasi</span>
            </div>
            {activeTab === 'recommendations' && (
              <div className="absolute inset-0 bg-purple-50 rounded-lg opacity-20 -z-10"></div>
            )}
          </button>
        </nav>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <LoadingSpinner size="lg" color="purple" />
          <p className="text-sm text-gray-500 mt-4">AI sedang berpikir...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {activeTab === 'plan' && dailyPlan && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50 p-6 rounded-xl border border-purple-200 relative overflow-hidden group hover:shadow-md transition-shadow duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full opacity-10 transform translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform duration-500"></div>
                <div className="relative z-10">
                  <h4 className="font-bold text-purple-900 mb-2 flex items-center">
                    <span className="text-2xl mr-2">👋</span>
                    Selamat datang, {user?.displayName || 'Pengguna'}!
                  </h4>
                  <p className="text-purple-800 leading-relaxed">{dailyPlan.motivation}</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                  <LightBulbIcon className="h-5 w-5 mr-2 text-yellow-500" />
                  Rencana Hari Ini
                </h4>
                <p className="text-gray-700 leading-relaxed">{dailyPlan.dailyPlan}</p>
              </div>

              {dailyPlan.taskPriorities && dailyPlan.taskPriorities.length > 0 && (
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                    <span className="text-lg mr-2">🎯</span>
                    Prioritas Tugas
                  </h4>
                  <ul className="space-y-3">
                    {dailyPlan.taskPriorities.slice(0, 3).map((task, index) => (
                      <li key={index} className="flex items-center group hover:bg-white hover:shadow-sm rounded-lg p-3 transition-all duration-200">
                        <span className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 group-hover:scale-110 transition-transform duration-200">
                          {index + 1}
                        </span>
                        <span className="flex-1 text-gray-700 group-hover:text-gray-900 transition-colors duration-200">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {activeTab === 'recommendations' && recommendations && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                  <span className="text-lg mr-2">🤖</span>
                  Rekomendasi AI
                </h4>
                <p className="text-gray-700 leading-relaxed mb-3">
                  {recommendations.recommendation}
                </p>
                <p className="text-gray-600 text-sm italic">{recommendations.reasoning}</p>
              </div>

              {recommendations.orderedTasks && recommendations.orderedTasks.length > 0 && (
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                    <span className="text-lg mr-2">📋</span>
                    Urutan Pengerjaan Disarankan
                  </h4>
                  <ol className="space-y-3">
                    {recommendations.orderedTasks.slice(0, 5).map((task, index) => (
                      <li key={index} className="flex items-start group hover:bg-white hover:shadow-sm rounded-lg p-3 transition-all duration-200">
                        <span className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                          {index + 1}
                        </span>
                        <span className="flex-1 text-gray-700 group-hover:text-gray-900 transition-colors duration-200">{task}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          )}

          {((activeTab === 'plan' && !dailyPlan) || (activeTab === 'recommendations' && !recommendations)) && !loading && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group hover:scale-110 transition-transform duration-300">
                <SparklesIcon className="h-10 w-10 text-gray-400 group-hover:text-gray-500 transition-colors duration-300" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                {tasks.length === 0 ? 'Belum Ada Tugas' : 'Siap Memberikan Saran'}
              </h4>
              <p className="text-gray-500 max-w-sm mx-auto leading-relaxed">
                {tasks.length === 0 
                  ? 'Tambahkan tugas pertama Anda untuk mendapatkan saran AI yang personal'
                  : 'Klik tombol refresh untuk mendapatkan saran terbaru dari AI'
                }
              </p>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-400 text-center">
          ✨ Powered by AI untuk produktivitas maksimal
        </p>
      </div>
    </div>
  )
}

export default AIAssistant