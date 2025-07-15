import axios from 'axios'

const COHERE_API_KEY = import.meta.env.VITE_COHERE_API_KEY
const COHERE_BASE_URL = 'https://api.cohere.ai/v1'

export const cohereClient = axios.create({
  baseURL: COHERE_BASE_URL,
  headers: {
    'Authorization': `Bearer ${COHERE_API_KEY}`,
    'Content-Type': 'application/json',
  },
})

export const generateDailyPlan = async (tasks, userPreferences = {}) => {
  try {
    const prompt = `Berikan saran rencana harian yang produktif berdasarkan tugas-tugas berikut:

${tasks.map(task => `- ${task.title} (Prioritas: ${task.priority})`).join('\n')}

Berikan respons dalam format JSON dengan struktur:
{
  "dailyPlan": "saran rencana harian dalam bahasa Indonesia",
  "motivation": "pesan motivasi singkat",
  "taskPriorities": ["tugas yang harus dikerjakan pertama", "kedua", "dst"]
}

Respons harus dalam bahasa Indonesia dan bersifat motivasional.`

    const response = await cohereClient.post('/generate', {
      model: 'command',
      prompt: prompt,
      max_tokens: 300,
      temperature: 0.7,
      stop_sequences: []
    })

    const generatedText = response.data.generations[0].text.trim()
    
    try {
      return JSON.parse(generatedText)
    } catch (e) {
      return {
        dailyPlan: "Fokus pada tugas dengan prioritas tinggi terlebih dahulu, lalu lanjutkan ke tugas prioritas sedang. Jangan lupa istirahat sejenak!",
        motivation: "Semangat! Setiap tugas yang diselesaikan membawa Anda lebih dekat ke tujuan.",
        taskPriorities: tasks.sort((a, b) => {
          const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 }
          return priorityOrder[b.priority] - priorityOrder[a.priority]
        }).map(task => task.title).slice(0, 3)
      }
    }
  } catch (error) {
    console.error('Error generating daily plan:', error)
    return {
      dailyPlan: "Mulai hari dengan tugas yang paling penting. Bagi tugas besar menjadi bagian kecil yang lebih mudah diselesaikan.",
      motivation: "Hari ini adalah kesempatan baru untuk mencapai hal-hal luar biasa!",
      taskPriorities: tasks.slice(0, 3).map(task => task.title)
    }
  }
}

export const getTaskRecommendations = async (tasks) => {
  try {
    const prompt = `Berikan rekomendasi tugas mana yang sebaiknya dikerjakan terlebih dahulu berdasarkan daftar tugas berikut:

${tasks.map((task, index) => `${index + 1}. ${task.title} (Prioritas: ${task.priority}, Deadline: ${task.dueDate || 'Tidak ada'})`).join('\n')}

Berikan respons dalam format JSON:
{
  "recommendation": "penjelasan singkat mengapa urutan ini disarankan",
  "orderedTasks": ["nama tugas 1", "nama tugas 2", "dst"],
  "reasoning": "alasan prioritas dalam bahasa Indonesia"
}

Pertimbangkan prioritas, deadline, dan kompleksitas tugas.`

    const response = await cohereClient.post('/generate', {
      model: 'command',
      prompt: prompt,
      max_tokens: 250,
      temperature: 0.6
    })

    const generatedText = response.data.generations[0].text.trim()
    
    try {
      return JSON.parse(generatedText)
    } catch (e) {
      const highPriorityTasks = tasks.filter(task => task.priority === 'high')
      const mediumPriorityTasks = tasks.filter(task => task.priority === 'medium')
      const lowPriorityTasks = tasks.filter(task => task.priority === 'low')
      
      return {
        recommendation: "Prioritaskan tugas berdasarkan tingkat kepentingan dan deadline",
        orderedTasks: [...highPriorityTasks, ...mediumPriorityTasks, ...lowPriorityTasks].map(task => task.title),
        reasoning: "Tugas dengan prioritas tinggi sebaiknya diselesaikan terlebih dahulu untuk menghindari keterlambatan dan stress"
      }
    }
  } catch (error) {
    console.error('Error getting task recommendations:', error)
    return {
      recommendation: "Mulai dengan tugas prioritas tinggi terlebih dahulu",
      orderedTasks: tasks.map(task => task.title),
      reasoning: "Fokus pada tugas penting untuk hasil yang maksimal"
    }
  }
}