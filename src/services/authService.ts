import axiosInstance from './axios' // Import the configured Axios instance

import { useAuthStore } from '../store/auth'

// Login API call
export const login = async (phone: string, password: string) => {
  const authStore = useAuthStore() // Get the auth store

  try {
    // Make the login API request
    const response = await axiosInstance.post('/login/', {
      phone_number: phone,
      password: password
    })

    // Extract the tokens and account data from the response
    const { access, refresh, account } = response.data

    // Save tokens to localStorage
    localStorage.setItem('access_token', access)
    localStorage.setItem('refresh_token', refresh)

    // Save account info to the store
    authStore.login({
      id: account.id,
      phone_number: account.user.phone_number,
      balance: parseFloat(account.balance) // Convert string balance to number
    })
  } catch (error) {
    console.error('Login failed:', error)
    throw error // Rethrow the error to handle it in the component
  }
}

// Logout: Clear tokens from localStorage
export const logout = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
}

export const signup = async (phone_number: string, password: string): Promise<void> => {
  await axiosInstance.post('/register/', {
    phone_number,
    password
  })
}

export const verifyOTP = async (phone_number: string, otp: string): Promise<void> => {
  await axiosInstance.post('/verify-otp/', {
    phone_number,
    otp
  })
}
