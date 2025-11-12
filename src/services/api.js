import axios from 'axios';

// URL base del backend
const api = axios.create({
  baseURL: 'http://localhost:4000/api',
});

// Interceptor para incluir token si existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
