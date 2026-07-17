import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onToggleStatus, onEdit, onDelete }) => {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="task-list-empty">
        <div className="empty-icon-container">
          <svg
            className="empty-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
        </div>
        <h3>No tasks yet</h3>
        <p>Get started by adding a task in the form to organize your day.</p>
      </div>
    );
  }

  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <h2>Your Tasks ({tasks.length})</h2>
      </div>
      <div className="task-list">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleStatus={onToggleStatus}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
