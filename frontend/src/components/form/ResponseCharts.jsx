import { useState } from "react";

/* ── Chart helpers for response visualization ── */
const CHART_COLORS = [
  "#7c5cfc",
  "#3ecfb2",
  "#f59e42",
  "#e84393",
  "#00b894",
  "#6c5ce7",
  "#fd79a8",
  "#0984e3",
  "#fdcb6e",
  "#e17055",
];

function BarChart({ data, total }) {
  if (!data || data.length === 0)
    return <p className="subtext">Belum ada data.</p>;
  
  const max = Math.max(...data.map((d) => d.count), 1);
  const mid = Math.round(max / 2); 

  return (
    <div
      className="chart-horizontal-wrapper"
      style={{
        marginTop: "1.5rem",
        marginBottom: "1.5rem",
        fontFamily: "sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", position: "relative" }}>
        
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            paddingRight: "12px",
            width: "140px",
            flexShrink: 0,
            borderRight: "2px solid #e5e7eb",
            zIndex: 2,
            paddingTop: "10px",
            paddingBottom: "10px",
          }}
        >
          {data.map((item) => (
            <div
              key={`label-${item.label}`}
              style={{
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                fontSize: "0.8rem",
                fontWeight: "500",
                color: "#4b5563",
                textAlign: "right",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              title={item.label}
            >
              {item.label}
            </div>
          ))}
        </div>

        <div
          style={{
            flex: 1,
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            paddingTop: "10px",
            paddingBottom: "10px",
          }}
        >
          <div style={{ position: "absolute", top: 0, bottom: 0, left: "50%", borderLeft: "1px dashed #e5e7eb", zIndex: 0 }} />
          <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, borderRight: "1px dashed #e5e7eb", zIndex: 0 }} />

          {data.map((item, i) => {
            const widthPct = (item.count / max) * 100;
            return (
              <div
                key={`bar-${item.label}`}
                style={{
                  position: "relative",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  zIndex: 1,
                }}
              >
                <div
                  style={{
                    height: "22px",
                    width: `${widthPct}%`,
                    minWidth: item.count > 0 ? "4px" : "0px",
                    backgroundColor: CHART_COLORS[i % CHART_COLORS.length],
                    borderRadius: "0 4px 4px 0",
                    transition: "width 0.3s ease",
                  }}
                />
                
                <span
                  style={{
                    marginLeft: "8px",
                    fontSize: "0.75rem",
                    color: "#6b7280",
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.count}{" "}
                  <span style={{ fontWeight: "normal", opacity: 0.8 }}>
                    ({total ? Math.round((item.count / total) * 100) : 0}%)
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ display: "flex", marginTop: "4px" }}>
        <div style={{ width: "140px", flexShrink: 0, paddingRight: "12px" }}></div>
                <div style={{ flex: 1, position: "relative", height: "20px" }}>
          <span style={{ position: "absolute", left: "0", transform: "translateX(-50%)", fontSize: "0.7rem", color: "#9ca3af" }}>0</span>
          {mid > 0 && mid !== max && (
            <span style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", fontSize: "0.7rem", color: "#9ca3af" }}>{mid}</span>
          )}
          <span style={{ position: "absolute", right: "0", transform: "translateX(50%)", fontSize: "0.7rem", color: "#9ca3af" }}>{max}</span>
        </div>
      </div>
      
    </div>
  );
}


function VerticalBarChart({ data, total }) {
  if (!data || data.length === 0)
    return <p className="subtext">Belum ada data.</p>;
  
  const max = Math.max(...data.map((d) => d.count), 1);
  const mid = Math.round(max / 2);
  return (
    <div
      className="chart-vertical-wrapper"
      style={{
        display: "flex",
        height: "260px",
        marginTop: "2rem",
        marginBottom: "1rem",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          paddingRight: "12px",
          paddingBottom: "24px",
          color: "#9ca3af",
          fontSize: "0.75rem",
          textAlign: "right",
          minWidth: "30px",
        }}
      >
        <span>{max}</span>
        <span>{mid > 0 && mid !== max ? mid : ""}</span>
        <span>0</span>
      </div>

      <div
        style={{
          flex: 1,
          position: "relative",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-around",
          borderBottom: "2px solid #e5e7eb",
          paddingBottom: "0",
          marginBottom: "24px", 
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            borderTop: "1px dashed #e5e7eb",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            borderTop: "1px dashed #e5e7eb",
            zIndex: 0,
          }}
        />

        {data.map((item, i) => {
          const heightPct = (item.count / max) * 100;
          return (
            <div
              key={item.label}
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-end",
                height: "100%",
                flex: 1,
                maxWidth: "60px",
                margin: "0 4px",
                zIndex: 1,
              }}
            >
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "#6b7280",
                  marginBottom: "6px",
                  fontWeight: "600",
                }}
              >
                {item.count}
              </span>

              <div
                style={{
                  width: "100%",
                  height: `${heightPct}%`,
                  backgroundColor: CHART_COLORS[i % CHART_COLORS.length],
                  borderRadius: "4px 4px 0 0",
                  transition: "height 0.3s ease",
                }}
              />

              <span
                style={{
                  position: "absolute",
                  bottom: "-24px",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  color: "#374151",
                  textAlign: "center",
                  width: "100%",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                title={item.label}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
function StarChart({ data, total }) {
  if (!data || data.length === 0)
    return <p className="subtext">Belum ada data.</p>;
  const avg =
    total > 0
      ? (data.reduce((s, d) => s + d.label * d.count, 0) / total).toFixed(1)
      : 0;
  return (
    <div>
      <p className="chart-avg">
        Rata-rata: <strong>{avg}</strong> / 5
      </p>
      {/* Menggunakan Vertical Chart */}
      <VerticalBarChart data={data} total={total} />
    </div>
  );
}

function LinearScaleChart({ data, total, labelMin, labelMax }) {
  if (!data || data.length === 0)
    return <p className="subtext">Belum ada data.</p>;
  const avg =
    total > 0
      ? (
          data.reduce((s, d) => s + Number(d.label) * d.count, 0) / total
        ).toFixed(1)
      : 0;
  return (
    <div>
      <p className="chart-avg">
        Rata-rata: <strong>{avg}</strong>
      </p>
      {(labelMin || labelMax) && (
        <div
          style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", marginBottom: "0.5rem", color: "#6b7280" }}
        >
          <span>{labelMin || ""}</span>
          <span>{labelMax || ""}</span>
        </div>
      )}
      <VerticalBarChart data={data} total={total} />
    </div>
  );
}

function TextResponseList({ values }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const LIMIT = 10;

  if (!values || values.length === 0)
    return <p className="subtext">Belum ada jawaban.</p>;

  const hasMore = values.length > LIMIT;
  
  const displayedValues = isExpanded ? values : values.slice(0, LIMIT);

  return (
    <div className="text-response-wrapper">
      <div className="text-response-list">
        {displayedValues.map((v, i) => (
          <div key={i} className="text-response-item">
            {v || <span className="subtext">—</span>}
          </div>
        ))}
      </div>
      
      {hasMore && (
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            marginTop: "0.75rem",
            fontSize: "0.85rem",
            color: "#d97706",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontWeight: "600",
            padding: "0",
            display: "inline-block",
          }}
        >
          {isExpanded 
            ? "Tampilkan lebih sedikit" 
            : `Tampilkan ${values.length - LIMIT} jawaban lainnya...`
          }
        </button>
      )}
    </div>
  );
}

function DateResponseList({ values }) {
  if (!values || values.length === 0)
    return <p className="subtext">Belum ada jawaban.</p>;
    
  return <TextResponseList values={values} />;
}


function buildChartData(question, allResponses) {
  const answers = allResponses
    .flatMap((r) => r.answers)
    .filter((a) => a.questionId === question.id);

  const type = question.type;

  if (type === "short_answer" || type === "long_answer") {
    return {
      type: "text",
      values: answers.map((a) => a.value).filter(Boolean),
    };
  }

  if (type === "date_picker") {
    return {
      type: "date",
      values: answers.map((a) => a.value).filter(Boolean),
    };
  }

  if (type === "multiple_choice" || type === "multiple_choice_dropdown") {
    const counts = {};
    (question.options || []).forEach((opt) => {
      counts[opt] = 0;
    });
    answers.forEach((a) => {
      if (a.values && a.values.length > 0) {
        a.values.forEach((v) => {
          counts[v] = (counts[v] || 0) + 1;
        });
      } else if (a.value) {
        counts[a.value] = (counts[a.value] || 0) + 1;
      }
    });
    const data = Object.entries(counts).map(([label, count]) => ({
      label,
      count,
    }));
    const total = answers.length;
    return { type: "bar", data, total };
  }

  if (type === "star_rating") {
    const counts = {};
    for (let i = 1; i <= 5; i++) counts[i] = 0;
    answers.forEach((a) => {
      const v = parseInt(a.value, 10);
      if (v >= 1 && v <= 5) counts[v] = (counts[v] || 0) + 1;
    });
    const data = Object.entries(counts).map(([label, count]) => ({
      label: Number(label),
      count,
    }));
    return { type: "star", data, total: answers.length };
  }

  if (type === "linear_scale") {
    const counts = {};
    for (let i = 1; i <= 10; i++) counts[i] = 0;
    answers.forEach((a) => {
      const v = parseInt(a.value, 10);
      if (v >= 1 && v <= 10) counts[v] = (counts[v] || 0) + 1;
    });
    const data = Object.entries(counts)
      .map(([label, count]) => ({ label: Number(label), count }))
      .filter((d) => d.count > 0 || d.label <= 5);
    return {
      type: "linear",
      data,
      total: answers.length,
      labelMin: question.labelMin,
      labelMax: question.labelMax,
    };
  }

  return { type: "none" };
}

export default function ResponseCharts({ questions, responses }) {
  const answerable = questions.filter(
    (q) => q.type !== "page_break" && q.type !== "text_block",
  );

  if (responses.length === 0) {
    return (
      <div className="card" style={{ textAlign: "center", padding: "2rem" }}>
        <p className="subtext">Belum ada response untuk form ini.</p>
      </div>
    );
  }

  return (
    <div className="response-charts">
      <div className="card" style={{ marginBottom: "1rem" }}>
        <p style={{ fontSize: "1.1rem" }}>
          <strong>{responses.length}</strong> response diterima
        </p>
      </div>
      {answerable.map((q) => {
        const chart = buildChartData(q, responses);
        return (
          <div key={q.id} className="card response-chart-card">
            <h4 className="response-chart-title">
              {q.title}
              {q.required && <span className="required-star"> *</span>}
            </h4>
            <p
              className="subtext"
              style={{ fontSize: "0.75rem", marginBottom: "0.75rem" }}
            >
              {q.type.replace(/_/g, " ")}
            </p>
            {chart.type === "bar" && (
              <BarChart data={chart.data} total={chart.total} />
            )}
            {chart.type === "star" && (
              <StarChart data={chart.data} total={chart.total} />
            )}
            {chart.type === "linear" && (
              <LinearScaleChart
                data={chart.data}
                total={chart.total}
                labelMin={chart.labelMin}
                labelMax={chart.labelMax}
              />
            )}
            {chart.type === "text" && (
              <TextResponseList values={chart.values} />
            )}
            {chart.type === "date" && (
              <DateResponseList values={chart.values} />
            )}
            {chart.type === "none" && (
              <p className="subtext">Tidak ada visualisasi untuk tipe ini.</p>
            )}
          </div>
        );
      })}
    </div>
  );
}