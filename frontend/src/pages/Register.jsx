import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Button from '../components/Button.jsx'
import Input from '../components/Input.jsx'
import Spinner from '../components/Spinner.jsx'
import { registerUser, storeToken } from '../lib/api.js'
import { validateEmail, validatePassword, validateName } from '../lib/validation.js'

export default function Register() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState({ type: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({ name: '', email: '', password: '' })

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus({ type: '', message: '' })
    setErrors({ name: '', email: '', password: '' })

    // Validate inputs
    const nameValidation = validateName(name)
    const emailValidation = validateEmail(email)
    const passwordValidation = validatePassword(password)

    if (!nameValidation.valid || !emailValidation.valid || !passwordValidation.valid) {
      setErrors({
        name: nameValidation.error || '',
        email: emailValidation.error || '',
        password: passwordValidation.error || '',
      })
      return
    }

    try {
      setLoading(true)
      const result = await registerUser({ name, email, password })
      storeToken(result.token)
      setStatus({ type: 'success', message: 'Register berhasil. Redirecting...' })
      setTimeout(() => navigate('/forms'), 500)
    } catch (error) {
      setStatus({ type: 'error', message: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Buat Akun</h2>
        <p className="subtext">Buat akun baru untuk mulai menyusun form</p>
        <form className="stack" onSubmit={handleSubmit}>
          <Input
            label="Nama lengkap"
            placeholder="Nama kamu"
            value={name}
            onChange={(event) => {
              setName(event.target.value)
              if (errors.name) setErrors(prev => ({ ...prev, name: '' }))
            }}
            error={errors.name}
            disabled={loading}
            required
          />
          <Input
            label="Email"
            type="email"
            placeholder="nama@email.com"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)
              if (errors.email) setErrors(prev => ({ ...prev, email: '' }))
            }}
            error={errors.email}
            disabled={loading}
            required
          />
          <Input
            label="Password"
            type="password"
            placeholder="Minimal 8 karakter"
            helper="Gunakan kombinasi huruf dan angka."
            value={password}
            onChange={(event) => {
              setPassword(event.target.value)
              if (errors.password) setErrors(prev => ({ ...prev, password: '' }))
            }}
            error={errors.password}
            disabled={loading}
            required
          />
          {status.message ? (
            <p className={`form-status ${status.type}`}>{status.message}</p>
          ) : null}
          <Button type="submit" disabled={loading}>
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                <Spinner size="small" /> Registering...
              </span>
            ) : 'Daftar'}
          </Button>
          <div className="divider">atau</div>
          <Button variant="ghost" type="button" disabled={loading}>
            Register with Google (mock)
          </Button>
        </form>
      </div>
      <p className="subtext" style={{ textAlign: 'center' }}>
        Sudah punya akun? <Link to="/login" className="link">Masuk</Link>
      </p>
    </div>
  )
}
