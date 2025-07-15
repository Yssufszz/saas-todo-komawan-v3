import { createContext, useContext, useEffect, useState } from 'react'
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  sendEmailVerification,
  updateProfile
} from 'firebase/auth'
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore'
import { auth, db } from '../config/firebase'
import { logUserActivity } from '../services/adminService'
import { verifyOTP } from '../services/authService'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [userRole, setUserRole] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid))
        if (userDoc.exists()) {
          const userData = userDoc.data()
          setUser({ ...user, ...userData })
          setUserRole(userData.role || 'user')
        } else {
          setUser(user)
          setUserRole('user')
        }
      } else {
        setUser(null)
        setUserRole(null)
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const register = async (email, password, displayName, otp) => {
    try {
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
      
      await logUserActivity(user.uid, 'register', {
        email: user.email,
        displayName: displayName
      })
      
      return { success: true, user: { ...user, ...userData } }
    } catch (error) {
      console.error('Registration error:', error)
      return { success: false, error: error.message }
    }
  }

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      
      await updateDoc(doc(db, 'users', user.uid), {
        lastLogin: new Date().toISOString()
      })
      
      await logUserActivity(user.uid, 'login', {
        email: user.email
      })
      
      return { success: true, user }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: error.message }
    }
  }

  const logout = async () => {
    try {
      if (user) {
        await logUserActivity(user.uid, 'logout', {
          email: user.email
        })
      }
      await signOut(auth)
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const value = {
    user,
    userRole,
    loading,
    register,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}