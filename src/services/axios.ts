import axios from 'axios'

// Create an Axios instance with the base URL from the environment variable
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Access the API URL from .env
  headers: {
    'Content-Type': 'application/json'
  }
})

// Optional: Add interceptors for request or response if needed
// axiosInstance.interceptors.request.use(config => {
//   // Modify config (e.g., add authentication tokens) if necessary
//   return config;
// });

export default axiosInstance
