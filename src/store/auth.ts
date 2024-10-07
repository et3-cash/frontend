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
    user: null,
    isAuthenticated: false
  }),

  actions: {
    login(userData: User) {
      this.user = userData
      this.isAuthenticated = true
    },

    // Handle logout
    logout() {
      this.user = null
      this.isAuthenticated = false
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
    },

    // Restore session from localStorage if tokens exist
    restoreSession() {
      const accessToken = localStorage.getItem('access_token')
      const refreshToken = localStorage.getItem('refresh_token')

      // Check if tokens exist and are valid (we assume the presence of tokens is enough for now)
      if (accessToken && refreshToken) {
        // You may add more sophisticated token validation here
        this.isAuthenticated = true

        // Optionally, fetch user data with access token to restore user details
        // For now, we'll assume the user data is still valid and keep the session active
      }
    }
  }
})
