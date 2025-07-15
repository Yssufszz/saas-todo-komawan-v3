import emailjs from '@emailjs/browser'

const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID

export const initEmailJS = () => {
  if (EMAILJS_PUBLIC_KEY) {
    emailjs.init(EMAILJS_PUBLIC_KEY)
    console.log('EmailJS initialized successfully')
  } else {
    console.warn('EmailJS public key not found in environment variables')
  }
}

export const sendOTPEmail = async (email, otp, userName = '') => {
  try {
    if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
      throw new Error('EmailJS configuration incomplete. Check your environment variables.')
    }

    const templateParams = {
      to_email: email,
      user_name: userName || email.split('@')[0],
      otp_code: otp,
      app_name: 'KerjainWoy'
    }

    console.log('Sending email with params:', {
      to: email,
      userName: templateParams.user_name,
      otp: otp
    })

    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    )

    console.log('Email sent successfully:', result)
    return { success: true, messageId: result.text }
  } catch (error) {
    console.error('Email sending failed:', error)
    return { success: false, error: error.message }
  }
}