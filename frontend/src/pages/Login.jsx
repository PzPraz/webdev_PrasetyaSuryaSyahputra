import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Button from '../components/Button.jsx'
import Input from '../components/Input.jsx'
import Spinner from '../components/Spinner.jsx'
import { loginUser, storeToken } from '../lib/api.js'
import { validateEmail, validatePassword } from '../lib/validation.js'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState({ type: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({ email: '', password: '' })

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus({ type: '', message: '' })
    setErrors({ email: '', password: '' })

    // Validate inputs
    const emailValidation = validateEmail(email)
    const passwordValidation = validatePassword(password)

    if (!emailValidation.valid || !passwordValidation.valid) {
      setErrors({
        email: emailValidation.error || '',
        password: passwordValidation.error || '',
      })
      return
    }

    try {
      setLoading(true)
      const result = await loginUser({ email, password })
      storeToken(result.token)
      setStatus({ type: 'success', message: 'Login berhasil. Redirecting...' })
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
        <h2>Masuk</h2>
        <p className="subtext">Masuk untuk mengelola form kamu</p>
        <form className="stack" onSubmit={handleSubmit}>
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
                <Spinner size="small" /> Logging in...
              </span>
            ) : 'Login'}
          </Button>
          <div className="divider">atau</div>
          <Button variant="ghost" type="button" disabled={loading}>
            Login with Google (mock)
          </Button>
        </form>
      </div>
      <p className="subtext" style={{ textAlign: 'center' }}>
        Belum punya akun? <Link to="/register" className="link">Daftar</Link>
      </p>
    </div>
  )
}
