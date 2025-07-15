import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  CheckCircleIcon, 
  SparklesIcon, 
  CalendarIcon,
  BoltIcon,
  UserGroupIcon,
  ChartBarIcon,
  ArrowRightIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline'

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [currentFeature, setCurrentFeature] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentFeature(prev => (prev + 1) % 3)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      icon: SparklesIcon,
      title: "AI Assistant",
      description: "Dapatkan saran rencana harian dan motivasi dari AI",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: CalendarIcon,
      title: "Calendar View",
      description: "Kelola tugas dengan tampilan kalender yang interaktif",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: BoltIcon,
      title: "Drag & Drop",
      description: "Atur ulang prioritas tugas dengan mudah",
      color: "from-yellow-500 to-orange-500"
    }
  ]

  const stats = [
    { label: "Tugas Diselesaikan", value: "1K+", icon: CheckCircleIcon },
    { label: "Pengguna Aktif", value: "100+", icon: UserGroupIcon },
    { label: "Produktivitas Meningkat", value: "93%", icon: ChartBarIcon }
  ]

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    setMobileMenuOpen(false)
  }

  const handleLogin = () => {
    navigate('/login')
  }

  const handleRegister = () => {
    navigate('/register')
  }

  const handleGetStarted = () => {
    navigate('/register')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  KerjainWoy
                </h1>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <button onClick={() => scrollToSection('features')} className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Fitur
                </button>
                <button onClick={() => scrollToSection('about')} className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Tentang
                </button>
                <button onClick={handleLogin} className="text-blue-600 hover:text-blue-700 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Masuk
                </button>
                <button onClick={handleRegister} className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                  Daftar Gratis
                </button>
              </div>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-600 hover:text-gray-900 p-2"
              >
                {mobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
              </button>
            </div>
          </div>
          
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <button onClick={() => scrollToSection('features')} className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 w-full text-left">
                  Fitur
                </button>
                <button onClick={() => scrollToSection('about')} className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 w-full text-left">
                  Tentang
                </button>
                <button onClick={handleLogin} className="block px-3 py-2 text-base font-medium text-blue-600 hover:text-blue-700 w-full text-left">
                  Masuk
                </button>
                <button onClick={handleRegister} className="block px-3 py-2 text-base font-medium bg-blue-600 text-white rounded-lg mx-3">
                  Daftar Gratis
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      <section className="relative overflow-hidden pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className={`sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="flex items-center justify-center lg:justify-start mb-6">
                <span className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium relative overflow-hidden">
                  <span className="relative z-10">✨ Produktivitas dengan AI</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-purple-200 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </span>
              </div>
              
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl xl:text-6xl">
                <span className="block">Kelola Tugas</span>
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Lebih Produktif
                </span>
              </h1>
              
              <p className="mt-6 text-lg text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                KerjainWoy adalah aplikasi to-do list modern dengan AI Assistant yang membantu Anda mengatur aktivitas harian, meningkatkan produktivitas, dan mencapai tujuan lebih efisien.
              </p>
              
              <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-4">
                <button onClick={handleGetStarted} className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg text-lg inline-flex items-center justify-center group hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl">
                  Mulai Gratis
                  <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              
              <div className="mt-8 flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  Gratis selamanya
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  Tanpa kartu kredit
                </div>
              </div>
            </div>
            
            <div className={`mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="relative mx-auto w-full rounded-lg lg:max-w-md">
                <div className="relative bg-white rounded-xl shadow-2xl p-6 border border-gray-100">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Tugas Hari Ini</h3>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        3 tugas
                      </span>
                    </div>
                    
                    {[
                      { title: "Review proposal project", completed: true, priority: "high" },
                      { title: "Meeting dengan tim design", completed: false, priority: "medium" },
                      { title: "Backup data database", completed: false, priority: "low" }
                    ].map((task, index) => (
                      <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transform transition-all duration-300 hover:scale-105 cursor-pointer`}>
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${task.completed ? 'bg-green-500 border-green-500' : 'border-gray-300 hover:border-green-400'}`}>
                          {task.completed && <CheckCircleIcon className="h-3 w-3 text-white" />}
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                            {task.title}
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          task.priority === 'high' ? 'bg-red-100 text-red-800' :
                          task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {task.priority === 'high' ? 'Tinggi' : task.priority === 'medium' ? 'Sedang' : 'Rendah'}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                    <div className="flex items-center">
                      <SparklesIcon className="h-5 w-5 text-blue-600 mr-2" />
                      <span className="text-sm font-medium text-blue-900">AI Suggestion</span>
                    </div>
                    <p className="mt-1 text-sm text-blue-800">
                      Fokus pada meeting tim design terlebih dahulu untuk hasil maksimal!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute -bottom-32 left-40 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>
      </section>

      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Fitur yang <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Powerful</span>
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Semua yang Anda butuhkan untuk produktivitas maksimal
            </p>
          </div>
          
          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div 
                    key={index}
                    className={`relative p-8 bg-white rounded-2xl border-2 transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 cursor-pointer group ${
                      currentFeature === index ? 'border-blue-300 shadow-xl scale-105' : 'border-gray-200 hover:border-blue-200'
                    }`}
                  >
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} transition-all duration-500 group-hover:scale-110`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="mt-6 text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
                    <p className="mt-3 text-gray-600 leading-relaxed">{feature.description}</p>
                    
                    {currentFeature === index && (
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 pointer-events-none animate-pulse"></div>
                    )}
                    
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </div>
                )
              })}
            </div>
          </div>
          
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Real-time Sync", desc: "Sinkronisasi otomatis di semua perangkat" },
              { title: "Drag & Drop", desc: "Interface yang intuitif dan mudah digunakan" },
              { title: "Mobile Ready", desc: "Responsif sempurna di semua ukuran layar" }
            ].map((item, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <CheckCircleIcon className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-4">
              Dipercaya oleh Ribuan Pengguna
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Bergabunglah dengan komunitas yang terus berkembang dan rasakan perbedaannya
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6 group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="text-5xl font-bold text-white mb-3 group-hover:scale-110 transition-transform duration-300">{stat.value}</div>
                  <div className="text-xl text-blue-100">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
        
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/5 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/10 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
      </section>

      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Apa Kata Pengguna Kami?
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Dengarkan pengalaman mereka yang sudah merasakan manfaat KerjainWoy
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Ica",
                role: "Product Manager",
                content: "KerjainWoy benar-benar mengubah cara saya bekerja. AI Assistant-nya sangat membantu dalam merencanakan hari.",
                avatar: "SP"
              },
              {
                name: "Robby Kurniawan",
                role: "Software Developer", 
                content: "Fitur drag & drop dan calendar view membuat saya lebih terorganisir. Productivity meningkat 200%!",
                avatar: "AR"
              },
              {
                name: "Lucinta",
                role: "Marketing Director",
                content: "Interface yang clean dan fitur yang lengkap. Tim saya jadi lebih produktif sejak pakai KerjainWoy.",
                avatar: "MS"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic leading-relaxed">"{testimonial.content}"</p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-5 h-5 text-yellow-400">⭐</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-gray-900 to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl mb-6">
            Siap untuk menjadi lebih produktif?
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
            Bergabunglah dengan ribuan pengguna yang sudah merasakan manfaat KerjainWoy. Mulai perjalanan produktivitas Anda hari ini!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button onClick={handleGetStarted} className="bg-white text-blue-600 font-bold py-4 px-10 rounded-xl text-lg inline-flex items-center justify-center group hover:scale-105 transform transition-all duration-200 shadow-2xl hover:shadow-white/25">
              Mulai Sekarang
              <ArrowRightIcon className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={handleLogin} className="border-2 border-white text-white font-medium py-4 px-10 rounded-xl text-lg hover:bg-white hover:text-blue-600 transition-all duration-200 transform hover:scale-105">
              Sudah Punya Akun?
            </button>
          </div>
          
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-blue-200">
            <div className="flex items-center">
              <CheckCircleIcon className="h-5 w-5 mr-2" />
              Setup dalam 30 detik
            </div>
            <div className="flex items-center">
              <CheckCircleIcon className="h-5 w-5 mr-2" />
              Gratis selamanya
            </div>
            <div className="flex items-center">
              <CheckCircleIcon className="h-5 w-5 mr-2" />
              Tanpa kartu kredit
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-3xl font-bold text-white mb-4">KerjainWoy</h3>
              <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
                Aplikasi to-do list modern dengan AI Assistant yang membantu Anda mencapai produktivitas maksimal setiap hari.
              </p>
              <div className="flex space-x-4">
                {['📧', '📱', '💬'].map((emoji, index) => (
                  <button key={index} className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors">
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Halaman</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors">Fitur</button></li>
                <li><button onClick={handleRegister} className="hover:text-white transition-colors">Daftar</button></li>
                <li><button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors">Tentang</button></li>
                <li><button onClick={handleLogin} className="hover:text-white transition-colors">Masuk</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button 
                    onClick={() => navigate('/help')} 
                    className="hover:text-white transition-colors text-left"
                  >
                    Help Center
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('/privacy')} 
                    className="hover:text-white transition-colors text-left"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('/contact')} 
                    className="hover:text-white transition-colors text-left"
                  >
                    Contact
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => navigate('/thanks')} 
                    className="hover:text-white transition-colors text-left"
                  >
                    Thanks To
                  </button>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 KerjainWoy. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-4 md:mt-0">
              Made By Tim KerjainWoy
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage