import { defineStore } from 'pinia'

interface User {
  id: string
  phone_number: string
  balance: number
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: JSON.parse(localStorage.getItem('user') || 'null'), // Restore user from localStorage
    isAuthenticated: !!localStorage.getItem('access_token') // Check if access token exists
  }),

  actions: {
    // Login: set user data, authentication status, and persist them in localStorage
    login(userData: User, accessToken: string, refreshToken: string) {
      this.user = userData
      this.isAuthenticated = true

      // Save user data and tokens to localStorage
      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('access_token', accessToken)
      localStorage.setItem('refresh_token', refreshToken)
    },

    // Logout: clear user data and tokens from state and localStorage
    logout() {
      this.user = null
      this.isAuthenticated = false

      // Clear tokens and user data from localStorage
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('user')
    },

    // Restore session from localStorage if tokens exist
    restoreSession() {
      const accessToken = localStorage.getItem('access_token')
      const user = JSON.parse(localStorage.getItem('user') || 'null')

      if (accessToken && user) {
        this.user = user
        this.isAuthenticated = true
      }
    },

    // Update the user's balance in the store and persist it in localStorage
    updateBalance(newBalance: number) {
      if (this.user) {
        this.user.balance = newBalance
        localStorage.setItem('user', JSON.stringify(this.user)) // Update the user data in localStorage
      }
    }
  }
})
