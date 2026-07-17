import { useState, useEffect } from 'react';
import taskService from './services/taskService';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [feedback, setFeedback] = useState(null); // { text, type: 'success' | 'error' }

  // Load tasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await taskService.getAllTasks();
      // Ensure data is an array
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Could not connect to the backend server. Please verify it is running at http://localhost:8080.');
    } finally {
      setLoading(false);
    }
  };

  const showFeedback = (text, type = 'success') => {
    setFeedback({ text, type });
    // Auto clear after 3 seconds
    const timer = setTimeout(() => {
      setFeedback(null);
    }, 3000);
    return () => clearTimeout(timer);
  };

  const handleCreateOrUpdateTask = async (taskData) => {
    try {
      if (editingTask) {
        // Update operation
        await taskService.updateTask(editingTask.id, taskData);
        showFeedback('Task updated successfully!', 'success');
        setEditingTask(null);
      } else {
        // Create operation
        // New tasks default to 'Pending' if not specified
        const newTask = { ...taskData, status: taskData.status || 'Pending' };
        await taskService.createTask(newTask);
        showFeedback('Task created successfully!', 'success');
      }
      fetchTasks();
    } catch (err) {
      console.error('Error saving task:', err);
      showFeedback('Failed to save the task. Please try again.', 'error');
    }
  };

  const handleToggleStatus = async (task) => {
    const nextStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
    const updatedTask = {
      title: task.title,
      description: task.description,
      status: nextStatus
    };

    try {
      await taskService.updateTask(task.id, updatedTask);
      showFeedback(`Task marked as ${nextStatus}!`, 'success');
      fetchTasks();
    } catch (err) {
      console.error('Error toggling status:', err);
      showFeedback('Failed to update task status.', 'error');
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskService.deleteTask(id);
        showFeedback('Task deleted successfully!', 'success');
        
        // If we are currently editing the deleted task, cancel edit mode
        if (editingTask && editingTask.id === id) {
          setEditingTask(null);
        }
        
        fetchTasks();
      } catch (err) {
        console.error('Error deleting task:', err);
        showFeedback('Failed to delete the task.', 'error');
      }
    }
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    // Smooth scroll to the form container on mobile devices
    const formElement = document.querySelector('.task-form-container');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  // Stats calculation
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
  const pendingTasks = tasks.filter((t) => t.status === 'Pending').length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="app-container">
      {/* Feedback Toast Notification */}
      {feedback && (
        <div className={`toast-notification toast-${feedback.type}`}>
          <div className="toast-content">
            <span className="toast-icon">
              {feedback.type === 'success' ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="toast-svg"><circle cx="12" cy="12" r="10"></circle><polyline points="12 8 8 12 12 16"></polyline><line x1="16" y1="12" x2="8" y2="12"></line></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="toast-svg"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              )}
            </span>
            <span className="toast-text">{feedback.text}</span>
          </div>
          <button className="toast-close" onClick={() => setFeedback(null)}>&times;</button>
        </div>
      )}

      {/* Main Header / Stats Section */}
      <header className="app-header">
        <div className="header-brand">
          <h1>TaskFlow</h1>
          <p className="subtitle">Manage your daily tasks and productivity</p>
        </div>

        <div className="stats-dashboard">
          <div className="stat-card">
            <span className="stat-value">{totalTasks}</span>
            <span className="stat-label">Total Tasks</span>
          </div>
          <div className="stat-card">
            <span className="stat-value text-blue">{pendingTasks}</span>
            <span className="stat-label">Pending</span>
          </div>
          <div className="stat-card">
            <span className="stat-value text-green">{completedTasks}</span>
            <span className="stat-label">Completed</span>
          </div>
          <div className="stat-card completion-progress-card">
            <div className="progress-circle-container">
              <span className="stat-value">{completionPercentage}%</span>
            </div>
            <span className="stat-label">Progress</span>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="app-main">
        {error ? (
          <div className="error-banner">
            <div className="error-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            </div>
            <div className="error-message">
              <h3>Connection Error</h3>
              <p>{error}</p>
            </div>
            <button className="btn btn-error" onClick={fetchTasks}>
              Retry Connection
            </button>
          </div>
        ) : (
          <div className="dashboard-grid">
            <div className="grid-sidebar">
              <TaskForm
                onSubmitTask={handleCreateOrUpdateTask}
                editingTask={editingTask}
                onCancelEdit={handleCancelEdit}
              />
            </div>
            <div className="grid-content">
              {loading && tasks.length === 0 ? (
                <div className="loading-container">
                  <div className="spinner"></div>
                  <p>Syncing with database...</p>
                </div>
              ) : (
                <TaskList
                  tasks={tasks}
                  onToggleStatus={handleToggleStatus}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteTask}
                />
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} TaskFlow Dashboard. Built with React & Spring Boot.</p>
      </footer>
    </div>
  );
}

export default App;
