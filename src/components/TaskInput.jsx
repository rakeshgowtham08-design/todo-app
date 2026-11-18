import { useState } from 'react';

export default function TaskInput({ onAddTask }) {
  const [text, setText] = useState('');
  const [showValidation, setShowValidation] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    if (!text.trim()) {
      setShowValidation(true);
      return;
    }
    onAddTask(text);
    setText('');
    setShowValidation(false);
  }

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <label className="sr-only" htmlFor="new-task">
        Add a task
      </label>
      <div className={`input-wrap${showValidation ? ' has-error' : ''}`}>
        <svg className="input-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 5v14M5 12h14" />
        </svg>
        <input
          id="new-task"
          type="text"
          value={text}
          onChange={(event) => {
            setText(event.target.value);
            if (showValidation) setShowValidation(false);
          }}
          placeholder="What needs your attention?"
          aria-invalid={showValidation}
          aria-describedby={showValidation ? 'task-validation' : undefined}
          autoComplete="off"
        />
        <button className="add-button" type="submit">
          <span>Add task</span>
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 10h12m-5-5 5 5-5 5" />
          </svg>
        </button>
      </div>
      {showValidation && (
        <p className="validation-message" id="task-validation" role="alert">
          Please enter a task before adding it.
        </p>
      )}
    </form>
  );
}
