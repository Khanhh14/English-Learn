import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
});

// Tự động gắn token nếu có đăng nhập
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
    || localStorage.getItem('access_token')
    || sessionStorage.getItem('token')
    || sessionStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;