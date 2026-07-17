import React from 'react';

const TaskItem = ({ task, onToggleStatus, onEdit, onDelete }) => {
  const isCompleted = task.status === 'Completed';

  return (
    <div className={`task-item ${isCompleted ? 'task-completed' : ''}`}>
      <div className="task-item-checkbox-container">
        <button
          type="button"
          className={`checkbox-btn ${isCompleted ? 'checked' : ''}`}
          onClick={() => onToggleStatus(task)}
          aria-label={isCompleted ? 'Mark task as pending' : 'Mark task as completed'}
        >
          {isCompleted && (
            <svg
              className="check-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </button>
      </div>

      <div className="task-item-content">
        <h3 className="task-title">{task.title}</h3>
        {task.description && <p className="task-description">{task.description}</p>}
        <span className={`status-badge ${isCompleted ? 'badge-completed' : 'badge-pending'}`}>
          {task.status}
        </span>
      </div>

      <div className="task-item-actions">
        <button
          onClick={() => onEdit(task)}
          className="icon-btn edit-btn"
          title="Edit Task"
          aria-label="Edit task"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4z" />
          </svg>
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="icon-btn delete-btn"
          title="Delete Task"
          aria-label="Delete task"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
