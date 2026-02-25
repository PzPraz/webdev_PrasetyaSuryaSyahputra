import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Button from '../components/Button.jsx'
import Input from '../components/Input.jsx'
import Spinner from '../components/Spinner.jsx'
import { getForm, updateForm, deleteForm } from '../lib/api.js'
import { validateTitle } from '../lib/validation.js'

export default function FormDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editing, setEditing] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '' })
  const [titleError, setTitleError] = useState('')
  const [draft, setDraft] = useState({
    title: '',
    description: '',
    status: 'draft',
  })

  const fetchForm = async () => {
    try {
      setLoading(true)
      const data = await getForm(id)
      setForm(data)
      setDraft({
        title: data.title || '',
        description: data.description || '',
        status: data.status || 'draft',
      })
      setError('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchForm()
  }, [id])

  const handleUpdate = async (event) => {
    event.preventDefault()
    setStatus({ type: '', message: '' })
    setTitleError('')

    // Validate title
    const titleValidation = validateTitle(draft.title)
    if (!titleValidation.valid) {
      setTitleError(titleValidation.error)
      return
    }

    try {
      setUpdating(true)
      const updated = await updateForm(id, {
        title: draft.title.trim(),
        description: draft.description.trim() || null,
        status: draft.status,
      })
      setForm(updated)
      setStatus({ type: 'success', message: 'Form berhasil diupdate.' })
      setEditing(false)
      setTitleError('')
    } catch (err) {
      setStatus({ type: 'error', message: err.message })
    } finally {
      setUpdating(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Yakin ingin menghapus form ini?')) return

    try {
      setDeleting(true)
      await deleteForm(id)
      navigate('/forms')
    } catch (err) {
      setStatus({ type: 'error', message: err.message })
    } finally {
      setDeleting(false)
    }
  }

  const labelStatus = (value) => {
    if (!value) return 'Draft'
    return value.charAt(0).toUpperCase() + value.slice(1)
  }

  const formatDate = (value) => {
    if (!value) return '-'
    const date = new Date(value)
    return Number.isNaN(date.getTime())
      ? value
      : date.toLocaleDateString('id-ID', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
  }

  if (loading) {
    return (
      <section className="page">
        <div className="loading-container">
          <Spinner size="large" />
          <span>Loading form...</span>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="page">
        <p className="form-status error">{error}</p>
        <Button onClick={() => navigate('/forms')}>Kembali ke Forms</Button>
      </section>
    )
  }

  if (!form) {
    return (
      <section className="page">
        <p className="subtext">Form tidak ditemukan.</p>
        <Button onClick={() => navigate('/forms')}>Kembali ke Forms</Button>
      </section>
    )
  }

  return (
    <section className="page">
      <div className="page-head">
        <div>
          <h1>Form Detail</h1>
          <p className="subtext">Lihat dan edit form kamu</p>
        </div>
        <div className="action-row">
          <Button onClick={() => setEditing((v) => !v)} variant="ghost" disabled={updating || deleting}>
            {editing ? 'Batal Edit' : 'Edit Form'}
          </Button>
          <Button onClick={handleDelete} variant="danger" disabled={updating || deleting}>
            {deleting ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                <Spinner size="small" /> Menghapus...
              </span>
            ) : 'Hapus Form'}
          </Button>
        </div>
      </div>

      <div className="form-header-card">
        <div className="form-header-banner" />
        <div className="form-header-body">
          {editing ? (
            <form className="stack" onSubmit={handleUpdate}>
              <Input
                label="Title"
                placeholder="Judul form"
                value={draft.title}
                onChange={(event) => {
                  setDraft((prev) => ({ ...prev, title: event.target.value }))
                  if (titleError) setTitleError('')
                }}
                error={titleError}
                disabled={updating}
                required
              />
              <label className="field">
                <span className="field-label">Description</span>
                <textarea
                  className="field-input field-textarea"
                  placeholder="Deskripsi singkat (opsional)"
                  value={draft.description}
                  onChange={(event) =>
                    setDraft((prev) => ({ ...prev, description: event.target.value }))
                  }
                  disabled={updating}
                />
              </label>
              <label className="field">
                <span className="field-label">Status</span>
                <select
                  className="field-input"
                  value={draft.status}
                  onChange={(event) =>
                    setDraft((prev) => ({ ...prev, status: event.target.value }))
                  }
                  disabled={updating}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </label>
              {status.message ? (
                <p className={`form-status ${status.type}`}>{status.message}</p>
              ) : null}
              <div className="action-row">
                <Button type="submit" disabled={updating}>
                  {updating ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                      <Spinner size="small" /> Updating...
                    </span>
                  ) : 'Update Form'}
                </Button>
                <Button variant="ghost" onClick={() => setEditing(false)} disabled={updating}>
                  Batal
                </Button>
              </div>
            </form>
          ) : (
            <div className="detail">
              <h1>{form.title}</h1>
              <p className="form-desc">{form.description || 'Tanpa deskripsi'}</p>
              <div className="detail-meta">
                <span className={`pill pill-${(form.status || 'draft').toLowerCase()}`}>
                  {labelStatus(form.status)}
                </span>
                <span className="meta">Created: {formatDate(form.createdAt)}</span>
                <span className="meta">Updated: {formatDate(form.updatedAt)}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {!editing && (
        <div className="card">
          <h3>Questions ({form.questions?.length || 0})</h3>
          {form.questions && form.questions.length > 0 ? (
            <div className="question-list" style={{ marginTop: '1rem' }}>
              {form.questions.map((question, index) => (
                <div key={question.id} className="question-card">
                  <div className="question-card-body">
                    <div className="question-header">
                      <div className="question-info">
                        <span className="question-number">{index + 1}.</span>
                        <div>
                          <div className="question-title">{question.title}</div>
                          <div className="question-meta">
                            <span className={`pill pill-${question.type}`}>
                              {question.type.replace(/_/g, ' ')}
                            </span>
                            {question.required && (
                              <span className="pill pill-required">Required</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    {question.options && question.options.length > 0 && (
                      <div className="question-options" style={{ marginTop: '0.75rem' }}>
                        {question.options.map((option, idx) => (
                          <p key={idx} className="option-preview">
                            {option}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="subtext" style={{ marginTop: '1rem' }}>
            </p>
          )}
        </div>
      )}
    </section>
  )
}
