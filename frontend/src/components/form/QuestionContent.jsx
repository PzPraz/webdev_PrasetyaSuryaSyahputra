import { useState } from "react";

/* ── Star rating interactive preview ── */
function StarRatingPreview() {
  const [selected, setSelected] = useState(0);
  const [hovered, setHovered] = useState(0);

  return (
    <div className="star-rating-preview" onMouseLeave={() => setHovered(0)}>
      {[1, 2, 3, 4, 5].map((n) => (
        <div key={n} className="star-item">
          <span className="star-number">{n}</span>
          <span
            className={`star-icon ${
              n <= (hovered || selected) ? "star-filled" : "star-empty"
            }`}
            onClick={() => setSelected(n === selected ? 0 : n)}
            onMouseEnter={() => setHovered(n)}
          >
            &#9733;
          </span>
        </div>
      ))}
    </div>
  );
}



export default function QuestionContent({ question }) {
  if (question.type === "page_break") {
    return (
      <div className="page-break-content">
        <span className="page-break-line" />
        <span className="page-break-label">
          {question.title || "Page Break"}
        </span>
        <span className="page-break-line" />
      </div>
    );
  }

  if (question.type === "text_block") {
    return (
      <div className="text-block-content">
        <p className="text-block-text">{question.title}</p>
      </div>
    );
  }

  return (
    <>
      <p className="question-title">
        {question.title}
        {question.required && <span className="required-mark">*</span>}
      </p>

      {question.type === "short_answer" && (
        <div className="answer-placeholder">Jawaban singkat</div>
      )}

      {question.type === "long_answer" && (
        <textarea
          className="field-input field-textarea"
          placeholder="Jawaban panjang responden..."
          rows={4}
          disabled
          style={{
            backgroundColor: "#f9f1ec",
            cursor: "not-allowed",
            marginTop: "0.75rem",
          }}
        />
      )}

      {question.type === "multiple_choice" && question.options?.length > 0 && (
        <div className="question-options">
          {question.options.map((option, i) => (
            <p key={i} className="option-preview">
              {option}
            </p>
          ))}
        </div>
      )}

      {question.type === "multiple_choice_dropdown" &&
        question.options?.length > 0 && (
          <div className="question-options">
            <select className="dropdown-preview" disabled>
              <option value="">Pilih opsi</option>
              {question.options.map((option, i) => (
                <option key={i} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}

      {question.type === "date_picker" && (
        <div className="question-options">
          <div className="date-input-wrapper">
            <input 
              type="date"
              className="field-input date-preview"
              style={{
                backgroundColor: "#f9fafb",
                color: "#6b7280"
              }}
            />
          </div>
        </div>
      )}

      {question.type === "linear_scale" && (
        <div className="linear-scale-preview">
          <div className="rating-preview">
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n} className="rating-circle">
                {n}
              </div>
            ))}
          </div>
          {(question.labelMin || question.labelMax) && (
            <div className="scale-labels-row">
              <span className="scale-label">{question.labelMin || ""}</span>
              <span className="scale-label">{question.labelMax || ""}</span>
            </div>
          )}
        </div>
      )}

      {question.type === "star_rating" && <StarRatingPreview />}

      {question.type === "email" && (
        <div className="answer-placeholder">contoh@email.com</div>
      )}

      {question.type === "number_box" && (
        <div className="answer-placeholder">0</div>
      )}
    </>
  );
}