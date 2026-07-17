import { useState, useEffect } from 'react';

const TaskForm = ({ onSubmitTask, editingTask, onCancelEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');
  const [validationError, setValidationError] = useState('');

  // Sync with editingTask prop when it changes
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || '');
      setDescription(editingTask.description || '');
      setStatus(editingTask.status || 'Pending');
      setValidationError('');
    } else {
      // Reset form if editing is cleared
      setTitle('');
      setDescription('');
      setStatus('Pending');
      setValidationError('');
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setValidationError('Task title is required.');
      return;
    }

    const taskData = {
      title: title.trim(),
      description: description.trim(),
      status: status
    };

    onSubmitTask(taskData);

    // Only reset if we are not editing (or let App handle clearing editingTask)
    if (!editingTask) {
      setTitle('');
      setDescription('');
      setStatus('Pending');
      setValidationError('');
    }
  };

  return (
    <div className="task-form-container">
      <h2>{editingTask ? 'Edit Task' : 'Create New Task'}</h2>
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor="task-title">Title <span className="required">*</span></label>
          <input
            type="text"
            id="task-title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (e.target.value.trim()) setValidationError('');
            }}
            placeholder="What needs to be done?"
            className={validationError ? 'input-error' : ''}
          />
          {validationError && <span className="error-text">{validationError}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="task-desc">Description</label>
          <textarea
            id="task-desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add some details about this task..."
            rows="4"
          />
        </div>

        {editingTask && (
          <div className="form-group">
            <label htmlFor="task-status">Status</label>
            <select
              id="task-status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="status-select"
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        )}

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingTask ? 'Update Task' : 'Add Task'}
          </button>
          
          {editingTask && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancelEdit}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
