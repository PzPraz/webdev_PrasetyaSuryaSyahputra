// Email validation
export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  if (!email || !email.trim()) {
    return { valid: false, error: 'Email wajib diisi' }
  }
  
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Format email tidak valid' }
  }
  
  return { valid: true, error: null }
}

// Password validation
export function validatePassword(password) {
  if (!password) {
    return { valid: false, error: 'Password wajib diisi' }
  }
  
  if (password.length < 8) {
    return { valid: false, error: 'Password minimal 8 karakter' }
  }
  
  return { valid: true, error: null }
}

// Name validation
export function validateName(name) {
  if (!name || !name.trim()) {
    return { valid: false, error: 'Nama wajib diisi' }
  }
  
  if (name.trim().length < 2) {
    return { valid: false, error: 'Nama minimal 2 karakter' }
  }
  
  return { valid: true, error: null }
}

// Title validation
export function validateTitle(title) {
  if (!title || !title.trim()) {
    return { valid: false, error: 'Title wajib diisi' }
  }
  
  if (title.trim().length < 3) {
    return { valid: false, error: 'Title minimal 3 karakter' }
  }
  
  return { valid: true, error: null }
}

// Required field validation
export function validateRequired(value, fieldName = 'Field') {
  if (!value || !value.toString().trim()) {
    return { valid: false, error: `${fieldName} wajib diisi` }
  }
  
  return { valid: true, error: null }
}
