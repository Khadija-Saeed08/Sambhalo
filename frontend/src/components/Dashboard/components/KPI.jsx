function normalize(value) {
  if (typeof value === "number") return `$${value.toFixed(2)}`;
  return value;
}

export default function KPI({ title, value, variant = "neutral" }) {
  return (
    <div className={`kpi-card kpi-${variant}`}>
      <div className="kpi-title">{title}</div>
      <div className="kpi-value">{normalize(value)}</div>
    </div>
  );
}
