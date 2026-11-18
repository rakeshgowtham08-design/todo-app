import EmptyState from './EmptyState.jsx';
import TaskItem from './TaskItem.jsx';

export default function TaskList({ tasks, filter, onToggle, onDelete }) {
  if (tasks.length === 0) return <EmptyState filter={filter} />;

  return (
    <ul className="task-list" aria-label="Tasks">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
}
