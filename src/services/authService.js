import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth'
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs,
  deleteDoc
} from 'firebase/firestore'
import { auth, db } from '../config/firebase'
import { sendOTPEmail } from './emailService'

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export const sendOTP = async (email, displayName = '') => {
  try {
    const otp = generateOTP()
    
    const otpDoc = await addDoc(collection(db, 'otpCodes'), {
      email: email,
      otp: otp,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
      used: false
    })
    
    console.log('OTP saved to Firestore:', otpDoc.id)
    
    const emailResult = await sendOTPEmail(email, otp, displayName)
    
    if (!emailResult.success) {
      console.error('Email failed, cleaning up OTP doc')
      await deleteDoc(doc(db, 'otpCodes', otpDoc.id))
      throw new Error(emailResult.error || 'Gagal mengirim email OTP')
    }
    
    return { 
      success: true, 
      otpId: otpDoc.id,
      message: 'OTP berhasil dikirim ke email Anda' 
    }
  } catch (error) {
    console.error('Error sending OTP:', error)
    return { success: false, error: error.message }
  }
}

export const verifyOTP = async (email, otp) => {
  try {
    console.log('Verifying OTP:', { email, otp })
    
    const otpQuery = query(
      collection(db, 'otpCodes'),
      where('email', '==', email),
      where('used', '==', false)
    )
    
    const otpSnapshot = await getDocs(otpQuery)
    console.log('Found OTP documents:', otpSnapshot.docs.length)
    
    if (otpSnapshot.empty) {
      return { success: false, error: 'Tidak ada kode OTP yang valid untuk email ini' }
    }
    
    let validOTP = null
    let validOTPDoc = null
    
    otpSnapshot.docs.forEach(doc => {
      const data = doc.data()
      console.log('Checking OTP doc:', { 
        docOTP: data.otp, 
        inputOTP: otp, 
        expired: new Date() > new Date(data.expiresAt) 
      })
      
      if (data.otp === otp && new Date() <= new Date(data.expiresAt)) {
        validOTP = data
        validOTPDoc = doc
      }
    })
    
    if (!validOTP || !validOTPDoc) {
      return { success: false, error: 'Kode OTP tidak valid atau sudah kadaluarsa' }
    }
    
    await updateDoc(validOTPDoc.ref, { 
      used: true,
      usedAt: new Date().toISOString()
    })
    
    console.log('OTP verified successfully')
    return { success: true }
  } catch (error) {
    console.error('Error verifying OTP:', error)
    return { success: false, error: 'Gagal memverifikasi OTP. Silakan coba lagi.' }
  }
}

export const cleanupExpiredOTPs = async () => {
  try {
    const allOTPQuery = query(collection(db, 'otpCodes'))
    const allOTPSnapshot = await getDocs(allOTPQuery)
    
    const expiredDocs = []
    const now = new Date()
    
    allOTPSnapshot.docs.forEach(doc => {
      const data = doc.data()
      if (new Date(data.expiresAt) < now) {
        expiredDocs.push(doc.ref)
      }
    })
    
    const deletePromises = expiredDocs.map(docRef => deleteDoc(docRef))
    await Promise.all(deletePromises)
    
    console.log(`Cleaned up ${expiredDocs.length} expired OTP codes`)
  } catch (error) {
    console.error('Error cleaning up expired OTPs:', error)
  }
}

export const registerUser = async (email, password, displayName, otp) => {
  try {
    console.log('Starting registration for:', email)
    
    const otpResult = await verifyOTP(email, otp)
    if (!otpResult.success) {
      return otpResult
    }
    
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    
    await updateProfile(user, { displayName })
    
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: displayName,
      role: 'user',
      createdAt: new Date().toISOString(),
      emailVerified: false,
      lastLogin: new Date().toISOString()
    }
    
    await setDoc(doc(db, 'users', user.uid), userData)
    
    cleanupExpiredOTPs()
    
    console.log('Registration completed successfully')
    return { success: true, user: { ...user, ...userData } }
  } catch (error) {
    console.error('Registration error:', error)
    
    let errorMessage = 'Gagal mendaftar. Silakan coba lagi.'
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = 'Email sudah terdaftar. Silakan gunakan email lain atau login.'
    } else if (error.code === 'auth/weak-password') {
      errorMessage = 'Password terlalu lemah. Gunakan minimal 6 karakter.'
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Format email tidak valid.'
    }
    
    return { success: false, error: errorMessage }
  }
}

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    
    await updateDoc(doc(db, 'users', user.uid), {
      lastLogin: new Date().toISOString()
    })
    
    return { success: true, user }
  } catch (error) {
    console.error('Login error:', error)
    
    let errorMessage = 'Gagal masuk. Periksa email dan password Anda.'
    if (error.code === 'auth/user-not-found') {
      errorMessage = 'Email tidak terdaftar. Silakan daftar terlebih dahulu.'
    } else if (error.code === 'auth/wrong-password') {
      errorMessage = 'Password salah. Silakan coba lagi.'
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Format email tidak valid.'
    } else if (error.code === 'auth/too-many-requests') {
      errorMessage = 'Terlalu banyak percobaan login. Silakan coba lagi nanti.'
    }
    
    return { success: false, error: errorMessage }
  }
}

export const logoutUser = async () => {
  try {
    await signOut(auth)
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email)
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}