import { useState, useEffect, useRef } from 'react'
import { XMarkIcon, ShieldCheckIcon, EnvelopeIcon } from '@heroicons/react/24/outline'
import { sendOTP } from '../../services/authService'
import toast from 'react-hot-toast'
import LoadingSpinner from '../common/LoadingSpinner'

const OTPModal = ({ email, displayName, onSuccess, onClose }) => {
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [sendingOTP, setSendingOTP] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const hasSentOTP = useRef(false)

  useEffect(() => {
    setIsVisible(true)
    if (!hasSentOTP.current) {
      hasSentOTP.current = true
      sendOTPCode()
    }
  }, [])

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const sendOTPCode = async () => {
    setSendingOTP(true)
    try {
      const result = await sendOTP(email, displayName)
      
      if (result.success) {
        toast.success(result.message)
        setCountdown(60)
      } else {
        toast.error(result.error || 'Gagal mengirim kode OTP')
      }
    } catch (error) {
      toast.error('Terjadi kesalahan saat mengirim OTP')
    } finally {
      setSendingOTP(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (otp.length !== 6) {
      toast.error('Kode OTP harus 6 digit')
      return
    }

    setLoading(true)
    try {
      await onSuccess(otp)
    } catch (error) {
      toast.error('Kode OTP tidak valid atau sudah kadaluarsa')
    } finally {
      setLoading(false)
    }
  }

  const handleResendOTP = () => {
    if (countdown === 0) {
      hasSentOTP.current = false
      sendOTPCode()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-md mx-4 border border-white/20 transform transition-all duration-500 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <ShieldCheckIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Verifikasi OTP
              </h3>
              <p className="text-sm text-gray-500">Keamanan akun Anda</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-all duration-200"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-6 border border-blue-100">
            <div className="flex items-center space-x-3">
              <EnvelopeIcon className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-blue-900">Kode OTP telah dikirim ke:</p>
                <p className="text-sm text-blue-700 font-mono">{email}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Masukkan kode OTP 6 digit
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="000000"
                className="w-full px-4 py-4 text-center text-2xl font-mono tracking-[0.5em] border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300 bg-gray-50 focus:bg-white"
                maxLength={6}
                required
                autoComplete="one-time-code"
              />
              
              <div className="mt-3 flex space-x-2">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 h-2 rounded-full transition-all duration-200 ${
                      i < otp.length
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                        : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              <span className="relative z-10 flex items-center justify-center">
                {loading ? (
                  <LoadingSpinner size="sm" color="white" />
                ) : (
                  'Verifikasi Kode'
                )}
              </span>
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <button
              onClick={handleResendOTP}
              disabled={countdown > 0 || sendingOTP}
              className="text-sm font-medium text-blue-600 hover:text-blue-700 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors duration-200 hover:underline"
            >
              {sendingOTP ? (
                <span className="flex items-center justify-center">
                  <LoadingSpinner size="sm" color="primary" />
                  <span className="ml-2">Mengirim...</span>
                </span>
              ) : countdown > 0 ? (
                <span className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin mr-2"></div>
                  Kirim ulang dalam {countdown}s
                </span>
              ) : (
                'Kirim ulang kode OTP'
              )}
            </button>
          </div>
          
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 text-center">
              💡 Tidak menerima email? Periksa folder spam/junk Anda
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OTPModal