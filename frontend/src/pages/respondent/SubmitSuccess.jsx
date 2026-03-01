import { useParams, Link } from "react-router-dom";

export default function SubmitSuccess() {
  const { id } = useParams();

  return (
    <div className="respond-container">
      <div className="success-card">
        <img src="/success.png" alt="success" style={{ width: '100%', maxWidth: '500px',}} />
        <h1 className="success-title">Jawaban Anda telah dikirim!</h1>
        <p className="success-message">
          Terima kasih telah mengisi formulir ini. Jawaban Anda telah tersimpan.
        </p>
        <div className="success-actions">
          <Link to={`/respond/${id}`} className="btn btn-ghost">
            Kirim jawaban lain
          </Link>
        </div>
      </div>
    </div>
  );
}
