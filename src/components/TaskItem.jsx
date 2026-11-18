function formatCreatedAt(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('en', { hour: 'numeric', minute: '2-digit' }).format(date);
}

export default function TaskItem({ task, onToggle, onDelete }) {
  const createdAt = formatCreatedAt(task.createdAt);

  return (
    <li className={`task-item${task.completed ? ' is-completed' : ''}`}>
      <label className="task-check-wrap">
        <input
          className="task-checkbox"
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          aria-label={`${task.completed ? 'Mark' : 'Complete'} ${task.text}`}
        />
        <span className="custom-check" aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="none">
            <path d="m3.5 8 3 3 6-6" />
          </svg>
        </span>
      </label>
      <div className="task-copy">
        <span className="task-text">{task.text}</span>
        {createdAt && <span className="task-time">Added at {createdAt}</span>}
      </div>
      <button
        className="delete-button"
        type="button"
        onClick={() => onDelete(task.id)}
        aria-label={`Delete ${task.text}`}
        title="Delete task"
      >
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M4.5 6h11m-9.5 0 .6 9.2c.1.8.7 1.3 1.5 1.3h3.8c.8 0 1.4-.5 1.5-1.3l.6-9.2M8 6V4.5c0-.6.4-1 1-1h2c.6 0 1 .4 1 1V6m-3 3v4m3-4v4" />
        </svg>
      </button>
    </li>
  );
}
