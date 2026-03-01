export default function Button({ children, variant = 'primary', type = 'button', onClick, disabled }) {
  const className = variant === 'ghost'
    ? 'btn btn-ghost'
    : variant === 'danger'
    ? 'btn btn-danger'
    : variant === 'canFloat'
    ? 'btn btn-primary add-form-btn'
    : 'btn btn-primary'

  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
