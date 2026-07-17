import axios from 'axios';

const API_URL = 'http://localhost:8080/api/tasks';

const taskService = {
  // Fetch all tasks
  getAllTasks: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  // Add a new task
  createTask: async (taskData) => {
    // Expected taskData: { title, description, status: 'Pending' | 'Completed' }
    const response = await axios.post(API_URL, taskData);
    return response.data;
  },

  // Update an existing task
  updateTask: async (id, taskData) => {
    // Expected taskData: { title, description, status }
    const response = await axios.put(`${API_URL}/${id}`, taskData);
    return response.data;
  },

  // Delete a task
  deleteTask: async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  }
};

export default taskService;
