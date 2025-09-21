export default function SavingsProgress({ items = [] }) {
  if (!items.length) {
    return <div className="fd-empty">No savings goals added yet.</div>;
  }

  return (
    <div className="sp-wrap">
      {items.map((s, idx) => {
        const goal = parseFloat(s.amount || 0);
        const saved = parseFloat(s.amountSaved || 0);
        const pct = goal > 0 ? Math.min(100, Math.round((saved / goal) * 100)) : 0;

        return (
          <div key={idx} className="sp-item">
            <div className="sp-head">
              <div className="sp-title">{s.goal}</div>
              <div className="sp-amount">${saved.toFixed(2)} / ${goal.toFixed(2)} ({pct}%)</div>
            </div>
            <div className="sp-bar">
              <div className="sp-fill" style={{ width: `${pct}%` }} />
            </div>
            <div className="sp-dates">
              <span>Start: {s.startDate}</span>
              <span>End: {s.endDate}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
