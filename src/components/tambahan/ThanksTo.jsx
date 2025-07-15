import { useNavigate } from 'react-router-dom'
import { 
  HeartIcon, 
  ArrowLeftIcon,
  StarIcon,
  CodeBracketIcon,
  AcademicCapIcon,
  CpuChipIcon,
  GlobeAltIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'

const ThanksTo = () => {
  const navigate = useNavigate()

const contributors = [
    {
      name: "Tim Developer KerjainWoy",
      role: "Core Development Team",
      description: "Tim developer yang berdedikasi membangun KerjainWoy dari awal hingga menjadi aplikasi yang powerful",
      icon: CodeBracketIcon,
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "Dosen Terkait",
      role: "Pembimbing Akademik",
      description: "Memberikan arahan, koreksi, dan masukan yang berharga dalam proses pengembangan aplikasi ini",
      icon: AcademicCapIcon, 
      color: "from-purple-500 to-indigo-500"
    },
    {
      name: "Firebase",
      role: "Backend Platform",
      description: "Menyediakan autentikasi, database realtime, dan infrastruktur cloud untuk mendukung KerjainWoy",
      icon: CpuChipIcon,
      color: "from-orange-500 to-red-500"
    },
    {
      name: "Cohere AI",
      role: "AI Technology Provider",
      description: "Menyediakan teknologi AI gratis yang memungkinkan fitur AI Assistant yang intelligent yang penting gratis ehehe",
      icon: CpuChipIcon,
      color: "from-green-500 to-emerald-500"
    },
    {
      name: "React Community",
      role: "Frontend Framework",
      description: "Framework React yang memungkinkan pengembangan interface yang responsive dan modern",
      icon: GlobeAltIcon,
      color: "from-yellow-500 to-orange-500"
    },
    {
      name: "Si Pendek",
      role: "Special Motivation",
      description: "Thanks dah nemenin ngebuild tugas ini ahahahay",
      icon: HeartIcon,
      color: "from-pink-500 to-rose-500"
    }
  ]

  const openSourceLibraries = [
    { name: "React", description: "Frontend framework utama" },
    { name: "Tailwind CSS", description: "Utility-first CSS framework" },
    { name: "React Router", description: "Client-side routing" },
    { name: "Heroicons", description: "Beautiful SVG icons" },
    { name: "Lucide React", description: "Icon library alternative for Heroicons" },
    { name: "React Calendar", description: "Calendar component" },
    { name: "React Hot Toast", description: "Toast notifications" },
    { name: "DND Kit", description: "Drag and drop functionality" },
    { name: "Framer Motion", description: "Animation library for React" },
    { name: "Date-fns", description: "Date utility library" },
    { name: "Axios", description: "Promise-based HTTP client" },
    { name: "EmailJS", description: "Send emails directly from JavaScript" },
    { name: "Firebase", description: "Backend platform for auth, database, and storage" },
    { name: "Node.js", description: "JavaScript runtime" },
    { name: "Vite", description: "Build tool and dev server" },
    { name: "PostCSS", description: "Tool for transforming CSS with JavaScript" },
    { name: "Autoprefixer", description: "Parse CSS and add vendor prefixes automatically" },
    { name: "ESLint", description: "Pluggable JavaScript linter" },
    { name: "Headless UI", description: "Unstyled UI components for Tailwind CSS" },
    { name: "Vite Bundle Analyzer", description: "Visualize size of your Vite bundle" },
    { name: "GitHub", description: "Version control and code collaboration platform" },
    { name: "Cloudflare", description: "Platform for deployment and CDN optimization" },
    { name: "Cohere AI", description: "AI assistant for intelligent task recommendations" }
  ]


  const specialThanks = [
    {
      title: "Beta Testers",
      description: "Pengguna awal yang memberikan feedback berharga untuk perbaikan aplikasi",
      icon: UserGroupIcon
    },
    {
      title: "Community Contributors",
      description: "Kontributor yang memberikan saran fitur dan melaporkan bug",
      icon: HeartIcon
    },
    {
      title: "Stack Overflow",
      description: "Platform yang membantu developer mengatasi berbagai tantangan teknis",
      icon: CodeBracketIcon
    },
    {
      title: "GitHub & CloudFlare",
      description: "Platform hosting program gratis yang mendukung pengembangan KerjainWoy",
      icon: GlobeAltIcon
    }
  ]

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
            <HeartIcon className="h-8 w-8 text-red-300" />
            <h1 className="text-4xl font-bold">Thanks To</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-2xl">
            Apresiasi untuk semua pihak yang telah mendukung dan berkontribusi dalam pengembangan KerjainWoy
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Kontributor Utama
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Terima kasih kepada individu dan organisasi yang telah membuat KerjainWoy menjadi kenyataan
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {contributors.map((contributor, index) => {
            const Icon = contributor.icon
            return (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-4 rounded-2xl bg-gradient-to-r ${contributor.color}`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{contributor.name}</h3>
                    <p className="text-blue-600 font-medium">{contributor.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">{contributor.description}</p>
              </div>
            )
          })}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Open Source Libraries
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              KerjainWoy dibangun dengan dukungan berbagai library open source yang luar biasa
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {openSourceLibraries.map((library, index) => (
              <div key={index} className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl hover:from-blue-50 hover:to-purple-50 transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                  <h3 className="font-bold text-gray-900">{library.name}</h3>
                </div>
                <p className="text-sm text-gray-600">{library.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {specialThanks.map((thanks, index) => {
            const Icon = thanks.icon
            return (
              <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{thanks.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{thanks.description}</p>
              </div>
            )
          })}
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center mb-16">
          <div className="max-w-3xl mx-auto">
            <UserGroupIcon className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl font-bold mb-4">Untuk Komunitas</h2>
            <p className="text-xl text-blue-100 mb-6 leading-relaxed">
              Terima kasih kepada semua pengguna KerjainWoy yang telah mempercayai aplikasi ini 
              sebagai partner produktivitas harian. Feedback dan dukungan kalian sangat berarti untuk perkembangan KerjainWoy.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-blue-200">
              <div className="flex items-center gap-2">
                <StarIcon className="h-5 w-5" />
                <span>100+ Pengguna Aktif</span>
              </div>
              <div className="flex items-center gap-2">
                <HeartIcon className="h-5 w-5" />
                <span>100+ Feedback</span>
              </div>
              <div className="flex items-center gap-2">
                <CodeBracketIcon className="h-5 w-5" />
                <span>40+ Bug Reports</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Visi Kedepan
          </h2>
          <p className="text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            KerjainWoy akan terus berkembang dengan dukungan komunitas yang luar biasa. 
            Kami berkomitmen untuk terus berinovasi dan memberikan pengalaman terbaik 
            untuk meningkatkan produktivitas pengguna.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <CpuChipIcon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">AI Enhancement</h3>
              <p className="text-sm text-gray-600">Peningkatan fitur AI untuk produktivitas yang lebih pintar</p>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <UserGroupIcon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Team Collaboration</h3>
              <p className="text-sm text-gray-600">Fitur kolaborasi tim untuk produktivitas bersama</p>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <GlobeAltIcon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Global Reach</h3>
              <p className="text-sm text-gray-600">Ekspansi fitur untuk pengguna di seluruh dunia</p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 text-2xl font-bold text-gray-900 mb-4">
            <span></span>
          </div>
          <p className="text-gray-600 text-lg">
            Terima kasih telah menjadi bagian dari perjalanan KerjainWoy!
          </p>
        </div>
      </div>
    </div>
  )
}

export default ThanksTo