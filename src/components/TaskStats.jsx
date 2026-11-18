export default function TaskStats({ total, completed, pending }) {
  return (
    <div className="stats-row" aria-label="Task statistics">
      <div className="stat-item">
        <span className="stat-value">{total}</span>
        <span className="stat-label">Total</span>
      </div>
      <span className="stat-divider" aria-hidden="true" />
      <div className="stat-item">
        <span className="stat-value">{pending}</span>
        <span className="stat-label">In progress</span>
      </div>
      <span className="stat-divider" aria-hidden="true" />
      <div className="stat-item">
        <span className="stat-value">{completed}</span>
        <span className="stat-label">Completed</span>
      </div>
    </div>
  );
}
