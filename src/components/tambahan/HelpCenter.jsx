import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  QuestionMarkCircleIcon, 
  ChatBubbleLeftRightIcon, 
  BookOpenIcon,
  PlayIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline'

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [openFAQ, setOpenFAQ] = useState(null)
  const navigate = useNavigate()

  const faqs = [
    {
      question: "Bagaimana cara membuat tugas baru?",
      answer: "Klik tombol 'Tambah Tugas' di dashboard, isi detail tugas seperti judul, deskripsi, prioritas, dan tanggal deadline. Kemudian klik 'Simpan' untuk menyimpan tugas."
    },
    {
      question: "Apa itu AI Assistant dan bagaimana cara menggunakannya?",
      answer: "AI Assistant adalah fitur yang memberikan saran dan rekomendasi untuk meningkatkan produktivitas Anda. Anda dapat mengakses AI Assistant melalui panel sebelah kanan di dashboard dan menanyakan bantuan tentang perencanaan tugas."
    },
    {
      question: "Bagaimana cara mengubah prioritas tugas?",
      answer: "Buka tugas yang ingin diubah, klik tombol 'Edit', pilih tingkat prioritas baru (Tinggi, Sedang, atau Rendah), lalu klik 'Perbarui' untuk menyimpan perubahan."
    },
    {
      question: "Apakah data saya aman?",
      answer: "Ya, kami menggunakan enkripsi tingkat enterprise untuk melindungi data Anda. Semua data disimpan dengan aman dan tidak akan dibagikan kepada pihak ketiga tanpa izin Anda."
    },
    {
      question: "Bagaimana cara menggunakan fitur kalender?",
      answer: "Buka halaman Kalender dari menu navigasi. Anda dapat melihat tugas berdasarkan tanggal, klik pada tanggal tertentu untuk melihat tugas di hari itu, dan tambah tugas baru langsung dari kalender."
    },
    {
      question: "Bisakah saya mengakses KerjainWoy di mobile?",
      answer: "Ya, KerjainWoy fully responsive dan dapat diakses melalui browser mobile. Kami juga sedang mengembangkan aplikasi mobile native untuk pengalaman yang lebih baik."
    }
  ]

  const categories = [
    {
      title: "Memulai",
      icon: PlayIcon,
      description: "Panduan dasar untuk memulai menggunakan KerjainWoy",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Fitur Utama",
      icon: BookOpenIcon,
      description: "Pelajari semua fitur yang tersedia",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Troubleshooting",
      icon: QuestionMarkCircleIcon,
      description: "Solusi untuk masalah umum",
      color: "from-yellow-500 to-orange-500"
    },
    {
      title: "Bantuan Lainnya",
      icon: ChatBubbleLeftRightIcon,
      description: "Hubungi tim support kami",
      color: "from-green-500 to-emerald-500"
    }
  ]

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-4 mb-6">
            <button 
              onClick={() => navigate('/')}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ArrowLeftIcon className="h-6 w-6" />
            </button>
            <h1 className="text-4xl font-bold">Help Center</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-2xl">
            Temukan jawaban untuk pertanyaan Anda atau hubungi tim support kami
          </p>
          
          <div className="mt-8 max-w-2xl relative">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari bantuan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 text-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-r ${category.color} mb-4`}>
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{category.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{category.description}</p>
              </div>
            )
          })}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <ChevronDownIcon className={`h-5 w-5 text-gray-500 transition-transform ${openFAQ === index ? 'rotate-180' : ''}`} />
                </button>
                {openFAQ === index && (
                  <div className="px-6 py-4 bg-white border-t border-gray-100">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <QuestionMarkCircleIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Tidak ada hasil yang ditemukan untuk "{searchQuery}"</p>
              <p className="text-gray-400 text-sm mt-2">Coba gunakan kata kunci yang berbeda</p>
            </div>
          )}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <ChatBubbleLeftRightIcon className="h-16 w-16 mx-auto mb-4 opacity-90" />
          <h3 className="text-2xl font-bold mb-4">Masih butuh bantuan?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Tim support kami siap membantu Anda 24/7. Jangan ragu untuk menghubungi kami!
          </p>
          <button 
            onClick={() => navigate('/contact')}
            className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-xl hover:bg-blue-50 transition-colors"
          >
            Hubungi Support
          </button>
        </div>
      </div>
    </div>
  )
}

export default HelpCenter