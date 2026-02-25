export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>© {year} Prasetya Surya Syahputra</div>
        <div>A Form Builder</div>
      </div>
    </footer>
  )
}
