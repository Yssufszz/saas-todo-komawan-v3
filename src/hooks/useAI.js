import { useState } from 'react'
import { getDailyPlanAndMotivation, getAITaskRecommendations } from '../services/aiService'

export const useAI = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const generateDailyPlan = async (tasks, userPreferences = {}) => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await getDailyPlanAndMotivation(tasks, userPreferences)
      return result
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const generateRecommendations = async (tasks) => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await getAITaskRecommendations(tasks)
      return result
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    generateDailyPlan,
    generateRecommendations
  }
}