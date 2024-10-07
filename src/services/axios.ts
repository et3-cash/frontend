import axios from 'axios'

// Create an Axios instance with the base URL from the environment variable
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Access the API URL from .env
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add a request interceptor to include the Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve the access token from localStorage
    const token = localStorage.getItem('access_token')

    // If the token exists, set the Authorization header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    // Handle the error if the request fails before reaching the server
    return Promise.reject(error)
  }
)

export default axiosInstance
