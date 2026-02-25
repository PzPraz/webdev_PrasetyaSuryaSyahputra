export default function Spinner({ size = 'medium' }) {
  const sizeMap = {
    small: '16px',
    medium: '24px',
    large: '40px',
  }

  const spinnerSize = sizeMap[size] || sizeMap.medium

  return (
    <div
      className="spinner"
      style={{
        width: spinnerSize,
        height: spinnerSize,
        border: `3px solid rgba(196, 137, 110, 0.2)`,
        borderTopColor: '#c4896e',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }}
    />
  )
}
