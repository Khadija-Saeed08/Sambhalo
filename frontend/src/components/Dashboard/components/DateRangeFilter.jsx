export default function DateRangeFilter({ startDate, endDate, onChangeStart, onChangeEnd, onClear }) {
  return (
    <div className="df-filter">
      <div className="df-field">
        <label>Start</label>
        <input type="date" value={startDate} onChange={(e) => onChangeStart(e.target.value)} />
      </div>
      <div className="df-field">
        <label>End</label>
        <input type="date" value={endDate} onChange={(e) => onChangeEnd(e.target.value)} />
      </div>
      <button className="df-clear" onClick={onClear}>Clear</button>
    </div>
  );
}
