import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ChatBubbleLeftRightIcon, 
  ArrowLeftIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  PaperAirplaneIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

const Contact = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const contactMethods = [
    {
      icon: EnvelopeIcon,
      title: "Email",
      description: "kelompoksaas@gmail.com",
      detail: "Respon dalam 24 jam",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: PhoneIcon,
      title: "Telepon",
      description: "+62 857-2349-4016",
      detail: "Kontak Langsung Aja",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: MapPinIcon,
      title: "Alamat",
      description: "Jln. Dipatiukur",
      detail: "Bandung, Jawa Barat",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: ClockIcon,
      title: "Jam Kerja",
      description: "Senin - Jumat",
      detail: "09:00 - 17:00 WIB",
      color: "from-yellow-500 to-orange-500"
    }
  ]

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
      setIsSubmitted(false)
    }, 3000)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircleIcon className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Pesan Terkirim!</h2>
          <p className="text-gray-600 mb-6">
            Terima kasih telah menghubungi kami. Tim support akan merespons dalam 24 jam.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 px-8 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    )
  }

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
            <ChatBubbleLeftRightIcon className="h-8 w-8" />
            <h1 className="text-4xl font-bold">Hubungi Kami</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-2xl">
            Kalo punya pertanyaan, saran, butuh bantuan, atau mau report bug, hubungi aja kontak itu yak! (masih dalam tahap pengembangan, jadi kalo nemu bug kontak ysuf2303@gmail.com nanti ini di apus)
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactMethods.map((method, index) => {
            const Icon = method.icon
            return (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${method.color} mb-4`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{method.title}</h3>
                <p className="text-gray-700 font-medium mb-1">{method.description}</p>
                <p className="text-gray-500 text-sm">{method.detail}</p>
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Kirim Pesan</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="Masukkan nama lengkap Anda"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="nama@email.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                  Subjek *
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                >
                  <option value="">Pilih subjek pesan</option>
                  <option value="bug">Laporkan Bug</option>
                  <option value="feature">Saran Fitur</option>
                  <option value="help">Bantuan Penggunaan</option>
                  <option value="account">Masalah Akun</option>
                  <option value="other">Lainnya</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Pesan *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors resize-none"
                  placeholder="Jelaskan pertanyaan atau masalah Anda secara detail..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-4 px-8 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Mengirim Pesan...
                  </>
                ) : (
                  <>
                    <PaperAirplaneIcon className="h-5 w-5" />
                    Kirim Pesan
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Pertanyaan Umum</h2>
              
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Apakah KerjainWoy gratis?</h3>
                  <p className="text-gray-600 text-sm">
                    Ya, KerjainWoy gratis selamanya untuk fitur dasar. Kami juga menyediakan fitur premium untuk kebutuhan advanced.
                  </p>
                </div>
                
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Bagaimana cara menggunakan AI Assistant?</h3>
                  <p className="text-gray-600 text-sm">
                    AI Assistant tersedia di panel kanan dashboard. Anda bisa bertanya tentang perencanaan tugas dan produktivitas.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Apakah data saya aman?</h3>
                  <p className="text-gray-600 text-sm">
                    Sangat aman! Kami menggunakan enkripsi tingkat enterprise dan tidak membagikan data Anda kepada pihak ketiga.
                  </p>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <button 
                  onClick={() => navigate('/help')}
                  className="w-full bg-gray-100 text-gray-700 font-medium py-3 px-4 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Lihat Semua FAQ
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <ClockIcon className="h-8 w-8" />
                <h3 className="text-xl font-bold">Waktu Respon</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Email Support</span>
                  <span className="font-semibold"> 24 jam</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Chat</span>
                  <span className="font-semibold"> 1 jam</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Telepon</span>
                  <span className="font-semibold">Langsung</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Bantuan Lainnya</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Kalo Butuh Bantuan Lainya cek aja halaman Help Center.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button 
              onClick={() => navigate('/help')}
              className="p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200">
                <ChatBubbleLeftRightIcon className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Help Center</h4>
              <p className="text-sm text-gray-600">Temukan jawaban cepat untuk pertanyaan umum</p>
            </button>
            
            <button 
              onClick={() => navigate('/privacy')}
              className="p-6 border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all group"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200">
                <EnvelopeIcon className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Privacy Policy</h4>
              <p className="text-sm text-gray-600">Pelajari bagaimana kami melindungi data Anda</p>
            </button>
            
            <button 
              onClick={() => navigate('/thanks')}
              className="p-6 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all group"
            >
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200">
                <CheckCircleIcon className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Thanks To</h4>
              <p className="text-sm text-gray-600">Apresiasi untuk yang mendukung KerjainWoy</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact