import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
});

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('ara_token');
      localStorage.removeItem('ara_user');
      delete api.defaults.headers.common['Authorization'];
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default api;

// Auth
export const authService = {
  login: (data) => api.post('/api/auth/login', data),
};

// Customers
export const customerService = {
  getAll: () => api.get('/api/customers'),
  getById: (id) => api.get(`/api/customers/${id}`),
  create: (data) => api.post('/api/customers', data),
  update: (id, data) => api.put(`/api/customers/${id}`, data),
  delete: (id) => api.delete(`/api/customers/${id}`),
};

// Vehicles
export const vehicleService = {
  getAll: () => api.get('/api/vehicles'),
  getById: (id) => api.get(`/api/vehicles/${id}`),
  create: (data) => api.post('/api/vehicles', data),
  update: (id, data) => api.put(`/api/vehicles/${id}`, data),
  delete: (id) => api.delete(`/api/vehicles/${id}`),
};

// Jobs
export const jobService = {
  getAll: () => api.get('/api/jobs'),
  getById: (id) => api.get(`/api/jobs/${id}`),
  analyze: (data) => api.post('/api/jobs/analyze', data, { timeout: 90000 }),
  start: (id) => api.post(`/api/jobs/${id}/start`),
  pause: (id, data) => api.post(`/api/jobs/${id}/pause`, data),
  resume: (id) => api.post(`/api/jobs/${id}/resume`),
  complete: (id, data) => api.post(`/api/jobs/${id}/complete`, data),
  update: (id, data) => api.put(`/api/jobs/${id}`, data),
  delete: (id) => api.delete(`/api/jobs/${id}`),
};

// Dashboards
export const dashboardService = {
  admin: () => api.get('/api/dashboard/admin'),
  jobAdvisor: () => api.get('/api/dashboard/job-advisor'),
  department: () => api.get('/api/dashboard/department'),
  customer: () => api.get('/api/dashboard/customer'),
};

// Admin - Users
export const userService = {
  getAll: () => api.get('/api/admin/users'),
  getById: (id) => api.get(`/api/admin/users/${id}`),
  create: (data) => api.post('/api/admin/users', data),
  update: (id, data) => api.put(`/api/admin/users/${id}`, data),
  activate: (id) => api.patch(`/api/admin/users/${id}/activate`),
  deactivate: (id) => api.patch(`/api/admin/users/${id}/deactivate`),
  delete: (id) => api.delete(`/api/admin/users/${id}`),
};

// Admin - Departments
export const departmentService = {
  getAll: () => api.get('/api/admin/departments'),
  create: (data) => api.post('/api/admin/departments', data),
  update: (id, data) => api.put(`/api/admin/departments/${id}`, data),
  delete: (id) => api.delete(`/api/admin/departments/${id}`),
};
