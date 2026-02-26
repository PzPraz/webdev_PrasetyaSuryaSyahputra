import { useEffect } from "react";

/**
 * Snackbar notification with optional action button (e.g. Undo).
 *
 * Props:
 *  - message      : string – text to display
 *  - open         : bool   – whether the snackbar is visible
 *  - onClose      : fn     – called when snackbar should close
 *  - actionLabel  : string – optional action button label (e.g. "Undo")
 *  - onAction     : fn     – called when action button is clicked
 *  - duration     : number – auto-dismiss ms (default 5000, 0 = no auto)
 *  - variant      : "default" | "success" | "error"
 */
export default function Snackbar({
  message,
  open,
  onClose,
  actionLabel,
  onAction,
  duration = 5000,
  variant = "default",
}) {
  useEffect(() => {
    if (!open || duration === 0) return;
    const timer = setTimeout(() => onClose(), duration);
    return () => clearTimeout(timer);
  }, [open, duration, onClose]);

  if (!open) return null;

  return (
    <div className={`snackbar snackbar-${variant}`}>
      <span className="snackbar-message">{message}</span>
      <div className="snackbar-actions">
        {actionLabel && onAction && (
          <button
            type="button"
            className="snackbar-action-btn"
            onClick={() => {
              onAction();
              onClose();
            }}
          >
            {actionLabel}
          </button>
        )}
        <button
          type="button"
          className="snackbar-close-btn"
          onClick={onClose}
          aria-label="Tutup"
        >
          &times;
        </button>
      </div>
    </div>
  );
}
