import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { EyeIcon, EyeSlashIcon, ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import LoadingSpinner from '../common/LoadingSpinner'
import OTPModal from './OTPModal'

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showOTPModal, setShowOTPModal] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const { register } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const validateForm = () => {
    if (!formData.displayName.trim()) {
      toast.error('Nama lengkap wajib diisi')
      return false
    }
    
    if (!formData.email.trim()) {
      toast.error('Email wajib diisi')
      return false
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast.error('Format email tidak valid')
      return false
    }
    
    if (formData.password.length < 6) {
      toast.error('Password minimal 6 karakter')
      return false
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Password dan konfirmasi password tidak cocok')
      return false
    }
    
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setCurrentStep(2)
    setShowOTPModal(true)
  }

  const handleOTPSuccess = async (otp) => {
    setLoading(true)
    setCurrentStep(3)
    
    try {
      const result = await register(formData.email, formData.password, formData.displayName, otp)
      
      if (result.success) {
        toast.success('Pendaftaran berhasil! Selamat datang di KerjainWoy')
        navigate('/login')
      } else {
        toast.error(result.error || 'Gagal mendaftar. Silakan coba lagi')
        setCurrentStep(2)
      }
    } catch (error) {
      toast.error('Terjadi kesalahan. Silakan coba lagi')
      console.error('Registration error:', error)
      setCurrentStep(2)
    } finally {
      setLoading(false)
      setShowOTPModal(false)
    }
  }

  const handleBack = () => {
    navigate('/')
  }

  const getPasswordStrength = (password) => {
    let strength = 0
    if (password.length >= 6) strength += 1
    if (password.match(/[a-z]/)) strength += 1
    if (password.match(/[A-Z]/)) strength += 1
    if (password.match(/[0-9]/)) strength += 1
    if (password.match(/[^a-zA-Z0-9]/)) strength += 1
    return strength
  }

  const passwordStrength = getPasswordStrength(formData.password)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-60 left-20 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-40 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`max-w-md w-full space-y-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex justify-start">
            <button
              onClick={handleBack}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200 hover:bg-white hover:text-gray-900 hover:border-gray-300 transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md group"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
              Kembali ke Home
            </button>
          </div>

          <div className="flex justify-center space-x-4 mb-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  currentStep >= step 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 border-transparent text-white' 
                    : 'border-gray-300 text-gray-400'
                }`}>
                  {currentStep > step ? (
                    <CheckIcon className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-medium">{step}</span>
                  )}
                </div>
                {step < 3 && (
                  <div className={`w-12 h-1 mx-2 rounded transition-all duration-300 ${
                    currentStep > step ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-8 hover:shadow-3xl transition-all duration-300">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl mb-4 transform hover:scale-110 transition-transform duration-300">
                <span className="text-2xl text-white font-bold">K</span>
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900">
                Daftar <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">KerjainWoy</span>
              </h2>
              <p className="mt-2 text-gray-600">
                Mulai perjalanan produktif Anda bersama kami
              </p>
            </div>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div className="group">
                  <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-purple-600 transition-colors">
                    Nama Lengkap
                  </label>
                  <div className="relative">
                    <input
                      id="displayName"
                      name="displayName"
                      type="text"
                      required
                      value={formData.displayName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 bg-gray-50 focus:bg-white"
                      placeholder="Masukkan nama lengkap Anda"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
                  </div>
                </div>
                
                <div className="group">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-purple-600 transition-colors">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 bg-gray-50 focus:bg-white"
                      placeholder="Masukkan email Anda"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
                  </div>
                </div>
                
                <div className="group">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-purple-600 transition-colors">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 bg-gray-50 focus:bg-white"
                      placeholder="Masukkan password (min. 6 karakter)"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
                  </div>
                  
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`h-1 flex-1 rounded transition-all duration-200 ${
                              i < passwordStrength
                                ? passwordStrength <= 2
                                  ? 'bg-red-400'
                                  : passwordStrength <= 3
                                  ? 'bg-yellow-400'
                                  : 'bg-green-400'
                                : 'bg-gray-200'
                            }`}
                          ></div>
                        ))}
                      </div>
                      <p className={`text-xs mt-1 ${
                        passwordStrength <= 2 ? 'text-red-500' : passwordStrength <= 3 ? 'text-yellow-500' : 'text-green-500'
                      }`}>
                        {passwordStrength <= 2 ? 'Password lemah' : passwordStrength <= 3 ? 'Password sedang' : 'Password kuat'}
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="group">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-purple-600 transition-colors">
                    Konfirmasi Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 pr-12 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 bg-gray-50 focus:bg-white ${
                        formData.confirmPassword && formData.password !== formData.confirmPassword
                          ? 'border-red-300 focus:ring-red-500'
                          : 'border-gray-300'
                      }`}
                      placeholder="Ulangi password Anda"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
                  </div>
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-xs text-red-500 mt-1">Password tidak cocok</p>
                  )}
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  <span className="relative z-10 flex items-center justify-center">
                    {loading ? (
                      <LoadingSpinner size="sm" color="white" />
                    ) : (
                      'Daftar'
                    )}
                  </span>
                </button>
              </div>

              <div className="text-center pt-4">
                <span className="text-sm text-gray-600">
                  Sudah punya akun?{' '}
                  <Link 
                    to="/login" 
                    className="font-semibold text-purple-600 hover:text-purple-700 transition-colors duration-200 hover:underline"
                  >
                    Masuk di sini
                  </Link>
                </span>
              </div>
            </form>
          </div>

          <div className="text-center text-sm text-gray-500">
            <p>Dengan mendaftar, Anda menyetujui syarat dan ketentuan kami</p>
          </div>
        </div>
      </div>
      
      {showOTPModal && (
        <OTPModal
          email={formData.email}
          displayName={formData.displayName}
          onSuccess={handleOTPSuccess}
          onClose={() => {
            setShowOTPModal(false)
            setCurrentStep(1)
          }}
        />
      )}
    </div>
  )
}

export default RegisterForm