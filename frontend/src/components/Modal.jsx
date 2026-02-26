/**
 * Reusable styled confirmation modal with overlay.
 *
 * Props:
 *  - open           : bool   – whether the modal is visible
 *  - title          : string – modal heading
 *  - message        : string – body text
 *  - confirmLabel   : string – confirm button text (default "Hapus")
 *  - cancelLabel    : string – cancel button text (default "Batal")
 *  - variant        : "danger" | "default" – styles the confirm button
 *  - onConfirm      : fn     – called when confirm is clicked
 *  - onCancel       : fn     – called when cancel / overlay is clicked
 */
export default function Modal({
  open,
  title = "Konfirmasi",
  message,
  confirmLabel = "Hapus",
  cancelLabel = "Batal",
  variant = "danger",
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">{title}</h3>
        <p className="modal-message">{message}</p>
        <div className="modal-actions">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={onCancel}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            className={`btn ${variant === "danger" ? "btn-danger" : "btn-primary"}`}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
