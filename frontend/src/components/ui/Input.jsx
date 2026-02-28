export default function Input({ 
  label, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  helper, 
  error,
  disabled = false,
  required = false 
}) {
  return (
    <label className="field">
      {label && (
        <span className="field-label">
          {label}
          {required && <span style={{ color: '#d32f2f' }}> *</span>}
        </span>
      )}
      <input
        type={type}
        className={`field-input ${error ? 'field-input-error' : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
      />
      {error && <span className="field-error">{error}</span>}
      {!error && helper && <span className="field-helper">{helper}</span>}
    </label>
  )
}
