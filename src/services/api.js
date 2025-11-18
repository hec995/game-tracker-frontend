import axios from 'axios';

// URL base del backend
const api = axios.create({
  baseURL: 'https://game-tracker-backend-k7cd.onrender.com/api',
});

// Interceptor para incluir token si existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// errores 401 (sesión expirada)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);


export default api;
