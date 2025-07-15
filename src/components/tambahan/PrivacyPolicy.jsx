import { useNavigate } from 'react-router-dom'
import { 
  ShieldCheckIcon, 
  ArrowLeftIcon,
  EyeIcon,
  LockClosedIcon,
  UserGroupIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline'

const PrivacyPolicy = () => {
  const navigate = useNavigate()

  const sections = [
    {
      title: "Informasi yang Kami Kumpulkan",
      icon: DocumentTextIcon,
      content: [
        "Data akun: nama, email, dan password terenkripsi",
        "Data tugas: judul, deskripsi, prioritas, dan tanggal deadline",
        "Data penggunaan: aktivitas dalam aplikasi untuk meningkatkan layanan",
        "Data teknis: alamat IP, browser, dan perangkat yang digunakan"
      ]
    },
    {
      title: "Bagaimana Kami Menggunakan Data",
      icon: EyeIcon,
      content: [
        "Menyediakan dan meningkatkan layanan KerjainWoy",
        "Memberikan rekomendasi melalui AI Assistant",
        "Mengirim notifikasi terkait tugas dan deadline",
        "Menganalisis penggunaan untuk pengembangan fitur baru",
        "Mencegah penyalahgunaan dan aktivitas berbahaya"
      ]
    },
    {
      title: "Keamanan Data",
      icon: LockClosedIcon,
      content: [
        "Enkripsi end-to-end untuk semua data sensitif",
        "Server aman dengan sertifikat SSL/TLS",
        "Backup otomatis dan perlindungan dari kehilangan data",
        "Akses terbatas hanya untuk tim yang berwenang",
        "Monitoring keamanan 24/7"
      ]
    },
    {
      title: "Berbagi Data dengan Pihak Ketiga",
      icon: UserGroupIcon,
      content: [
        "Kami TIDAK menjual data personal Anda kepada siapapun",
        "Data hanya dibagikan dengan persetujuan eksplisit Anda",
        "Integrasi dengan layanan pihak ketiga hanya untuk fungsi aplikasi",
        "Analitik anonim untuk meningkatkan performa aplikasi",
        "Kepatuhan terhadap permintaan hukum yang sah"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-4 mb-6">
            <button 
              onClick={() => navigate('/')}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ArrowLeftIcon className="h-6 w-6" />
            </button>
            <ShieldCheckIcon className="h-8 w-8" />
            <h1 className="text-4xl font-bold">Privacy Policy</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-2xl">
            Privasi Anda adalah prioritas utama kami. Pelajari bagaimana kami melindungi dan menggunakan data Anda.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
              <ShieldCheckIcon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Komitmen Privasi Kami</h2>
              <p className="text-gray-600">Terakhir diupdate: 15 Juli 2025</p>
            </div>
          </div>
          
          <div className="prose prose-lg text-gray-700 leading-relaxed">
            <p className="mb-4">
              Di KerjainWoy, kami berkomitmen untuk melindungi privasi dan keamanan data pribadi Anda. 
              Kebijakan privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi 
              informasi Anda saat menggunakan layanan kami.
            </p>
            <p className="mb-4">
              Dengan menggunakan KerjainWoy, Anda menyetujui praktik yang dijelaskan dalam kebijakan ini. 
              Jika Anda tidak setuju dengan kebijakan ini, mohon untuk tidak menggunakan layanan kami.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {sections.map((section, index) => {
            const Icon = section.icon
            return (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{section.title}</h3>
                </div>
                
                <ul className="space-y-4">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-6 text-center">Hak-Hak Anda</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <span>Akses data pribadi Anda</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <span>Memperbaiki data yang tidak akurat</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <span>Menghapus akun dan data</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <span>Mengunduh data Anda</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <span>Membatasi pemrosesan data</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <span>Memindahkan data ke layanan lain</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Punya Pertanyaan?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Jika Anda memiliki pertanyaan tentang kebijakan privasi ini atau ingin menggunakan hak-hak Anda, 
            jangan ragu untuk menghubungi tim kami.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/contact')}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 px-8 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105"
            >
              Hubungi Kami
            </button>
            <button 
              onClick={() => navigate('/help')}
              className="border-2 border-blue-500 text-blue-500 font-semibold py-3 px-8 rounded-xl hover:bg-blue-50 transition-colors"
            >
              Help Center
            </button>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>
            Kebijakan privasi ini dapat berubah sewaktu-waktu. Kami akan memberitahu Anda tentang 
            perubahan signifikan melalui email atau notifikasi dalam aplikasi.
          </p>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy