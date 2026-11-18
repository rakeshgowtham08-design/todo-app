export default function EmptyState({ filter }) {
  const message =
    filter === 'Active'
      ? 'You’re all caught up. No active tasks.'
      : filter === 'Completed'
        ? 'No completed tasks just yet.'
        : 'Your list is clear. Add a task to get started.';

  return (
    <div className="empty-state" role="status">
      <span className="empty-icon" aria-hidden="true">
        <svg viewBox="0 0 48 48" fill="none">
          <path d="M15 10h18a3 3 0 0 1 3 3v25H12V13a3 3 0 0 1 3-3Z" />
          <path d="M19 10V8h10v2m-9 10h8m-8 6h12m-12 6h9" />
          <path d="m30 30 2 2 4-5" />
        </svg>
      </span>
      <p>{message}</p>
    </div>
  );
}
