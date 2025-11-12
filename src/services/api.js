import axios from 'axios';

// URL base del backend
const api = axios.create({
  baseURL: 'http://localhost:4000/api',
});

export default api;
