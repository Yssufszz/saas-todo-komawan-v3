export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password) => {
  const errors = []
  
  if (password.length < 6) {
    errors.push('Password minimal 6 karakter')
  }
  
  if (!/[A-Za-z]/.test(password)) {
    errors.push('Password harus mengandung huruf')
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password harus mengandung angka')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

export const validateTaskForm = (taskData) => {
  const errors = {}
  
  if (!taskData.title || taskData.title.trim().length === 0) {
    errors.title = 'Judul tugas wajib diisi'
  }
  
  if (taskData.title && taskData.title.length > 100) {
    errors.title = 'Judul tugas maksimal 100 karakter'
  }
  
  if (taskData.description && taskData.description.length > 500) {
    errors.description = 'Deskripsi maksimal 500 karakter'
  }
  
  if (taskData.estimatedTime && (taskData.estimatedTime < 1 || taskData.estimatedTime > 1440)) {
    errors.estimatedTime = 'Estimasi waktu harus antara 1-1440 menit'
  }
  
  if (taskData.dueDate) {
    const dueDate = new Date(taskData.dueDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (dueDate < today) {
      errors.dueDate = 'Tanggal deadline tidak boleh di masa lalu'
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

export const validateRegisterForm = (formData) => {
  const errors = {}
  
  if (!formData.displayName || formData.displayName.trim().length === 0) {
    errors.displayName = 'Nama lengkap wajib diisi'
  }
  
  if (formData.displayName && formData.displayName.length < 2) {
    errors.displayName = 'Nama lengkap minimal 2 karakter'
  }
  
  if (!formData.email || !validateEmail(formData.email)) {
    errors.email = 'Email tidak valid'
  }
  
  const passwordValidation = validatePassword(formData.password)
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.errors[0]
  }
  
  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Konfirmasi password tidak cocok'
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input
  
  return input
    .trim()
    .replace(/[<>]/g, '') 
    .substring(0, 1000)
}