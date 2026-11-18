import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import TaskInput from './components/TaskInput.jsx';
import TaskList from './components/TaskList.jsx';
import TaskStats from './components/TaskStats.jsx';
import './App.css';

const STORAGE_KEY = 'daylight-tasks';
const FILTERS = ['All', 'Active', 'Completed'];

export function loadTasks() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === null) return { tasks: [], error: '' };

    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) {
      return { tasks: [], error: 'Saved tasks were invalid, so your list was reset.' };
    }

    const tasks = parsed.filter(
      (task) =>
        task &&
        typeof task.id === 'string' &&
        typeof task.text === 'string' &&
        task.text.trim().length > 0 &&
        typeof task.completed === 'boolean',
    );
    const error =
      tasks.length !== parsed.length
        ? 'Some saved tasks could not be restored and were skipped.'
        : '';
    return { tasks, error };
  } catch {
    return { tasks: [], error: 'Saved tasks could not be read. You can start a fresh list.' };
  }
}

function createTaskId() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export default function App() {
  const [stored, setStored] = useState(loadTasks);
  const [filter, setFilter] = useState('All');
  const [storageError, setStorageError] = useState(stored.error);
  const tasks = stored.tasks;

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      setStorageError('');
    } catch {
      setStorageError('Your changes could not be saved in this browser.');
    }
  }, [tasks]);

  const completedCount = tasks.filter((task) => task.completed).length;
  const pendingCount = tasks.length - completedCount;
  const visibleTasks = useMemo(
    () =>
      tasks.filter((task) => {
        if (filter === 'Active') return !task.completed;
        if (filter === 'Completed') return task.completed;
        return true;
      }),
    [filter, tasks],
  );

  function addTask(text) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setStored((current) => ({
      ...current,
      tasks: [
        { id: createTaskId(), text: trimmed, completed: false, createdAt: new Date().toISOString() },
        ...current.tasks,
      ],
    }));
  }

  function toggleTask(id) {
    setStored((current) => ({
      ...current,
      tasks: current.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    }));
  }

  function deleteTask(id) {
    setStored((current) => ({
      ...current,
      tasks: current.tasks.filter((task) => task.id !== id),
    }));
  }

  function clearCompleted() {
    setStored((current) => ({
      ...current,
      tasks: current.tasks.filter((task) => !task.completed),
    }));
  }

  return (
    <main className="page-shell">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <section className="todo-app" aria-label="Daily task manager">
        <Header />
        <div className="dashboard-card">
          <div className="card-heading">
            <div>
              <p className="eyebrow">YOUR SPACE</p>
              <h2>Make today count.</h2>
              <p className="card-subtitle">A little progress adds up to a lot.</p>
            </div>
            <div className="day-badge" aria-label={`${pendingCount} tasks left`}>
              <span className="day-badge-number">{pendingCount}</span>
              <span className="day-badge-label">left to do</span>
            </div>
          </div>

          <TaskInput onAddTask={addTask} />
          <TaskStats
            total={tasks.length}
            completed={completedCount}
            pending={pendingCount}
          />

          <div className="list-toolbar">
            <div className="filter-tabs" role="group" aria-label="Filter tasks">
              {FILTERS.map((item) => (
                <button
                  className={`filter-tab${filter === item ? ' is-selected' : ''}`}
                  key={item}
                  type="button"
                  aria-pressed={filter === item}
                  onClick={() => setFilter(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            {completedCount > 0 && (
              <button className="clear-button" type="button" onClick={clearCompleted}>
                Clear completed
              </button>
            )}
          </div>

          {storageError && (
            <p className="storage-message" role="status">
              {storageError}
            </p>
          )}

          <TaskList
            tasks={visibleTasks}
            filter={filter}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        </div>
        <footer className="page-footer">
          <span>One thing at a time.</span>
          <span className="footer-dot" aria-hidden="true" />
          <span>You’ve got this.</span>
        </footer>
      </section>
    </main>
  );
}
