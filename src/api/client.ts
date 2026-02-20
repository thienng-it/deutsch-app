import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
  // Short timeout so pages don't hang forever on Vercel where backend doesn't exist
  timeout: 5000,
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle errors gracefully — don't redirect on 404 (no backend on Vercel)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    // Return empty data instead of throwing so pages render gracefully
    return Promise.reject(err);
  }
);

export default api;
