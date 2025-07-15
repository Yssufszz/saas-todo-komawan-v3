import { generateDailyPlan, getTaskRecommendations } from '../config/cohere'

export const getDailyPlanAndMotivation = async (tasks, userPreferences = {}) => {
  try {
    const incompleteTasks = tasks.filter(task => !task.completed)
    const result = await generateDailyPlan(incompleteTasks, userPreferences)
    
    return {
      success: true,
      dailyPlan: result.dailyPlan,
      motivation: result.motivation,
      taskPriorities: result.taskPriorities
    }
  } catch (error) {
    return {
      success: false,
      error: error.message,
      dailyPlan: "Mulai hari dengan tugas yang paling penting dan jangan lupa istirahat!",
      motivation: "Setiap langkah kecil membawa Anda lebih dekat ke tujuan besar!",
      taskPriorities: tasks.slice(0, 3).map(task => task.title)
    }
  }
}

export const getAITaskRecommendations = async (tasks) => {
  try {
    const incompleteTasks = tasks.filter(task => !task.completed)
    const result = await getTaskRecommendations(incompleteTasks)
    
    return {
      success: true,
      recommendation: result.recommendation,
      orderedTasks: result.orderedTasks,
      reasoning: result.reasoning
    }
  } catch (error) {
    return {
      success: false,
      error: error.message,
      recommendation: "Prioritaskan tugas berdasarkan tingkat kepentingan",
      orderedTasks: tasks.map(task => task.title),
      reasoning: "Fokus pada tugas penting untuk hasil maksimal"
    }
  }
}

export const generateTaskSuggestions = async (completedTasks, userGoals = []) => {
  try {
    const prompt = `Berdasarkan tugas yang telah diselesaikan user berikut:
${completedTasks.map(task => `- ${task.title}`).join('\n')}

Berikan 3 saran tugas produktif yang bisa dilakukan selanjutnya dalam format JSON:
{
  "suggestions": [
    {
      "title": "nama tugas",
      "description": "deskripsi singkat",
      "priority": "high/medium/low",
      "category": "kategori tugas"
    }
  ]
}

Saran harus dalam bahasa Indonesia dan relevan dengan pola aktivitas user.`

    const response = await cohereClient.post('/generate', {
      model: 'command',
      prompt: prompt,
      max_tokens: 200,
      temperature: 0.8
    })

    const generatedText = response.data.generations[0].text.trim()
    
    try {
      const result = JSON.parse(generatedText)
      return { success: true, suggestions: result.suggestions }
    } catch (e) {
      return {
        success: false,
        suggestions: [
          {
            title: "Review dan evaluasi progress",
            description: "Tinjau pencapaian hari ini dan rencanakan esok hari",
            priority: "medium",
            category: "planning"
          }
        ]
      }
    }
  } catch (error) {
    return {
      success: false,
      error: error.message,
      suggestions: []
    }
  }
}