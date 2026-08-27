import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api', 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  // If using strictly token-based auth (Bearer token), you can often remove withCredentials
  withCredentials: true, 
});

// Add an interceptor to inject the token before every request
apiClient.interceptors.request.use((config) => {
  // Retrieve the token exactly as you saved it during login/registration
  // Update 'auth_token' if you named the key something else in localStorage
  const token = localStorage.getItem('auth_token'); 
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiClient;