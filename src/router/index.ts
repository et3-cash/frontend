import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// Auth layout
import AuthLayout from '@/layouts/AuthLayout.vue'

// Auth views
import LoginView from '@/views/LoginView.vue'
import SignupView from '@/views/SignupView.vue'
import OTPView from '@/views/OTPView.vue'

// Authenticated layout
import AppLayout from '@/layouts/AppLayout.vue'

// Account views
import HomeView from '@/views/HomeView.vue'
import WithdrawView from '@/views/WithdrawView.vue'
import DepositView from '@/views/DepositView.vue'
import SendMoneyView from '@/views/SendMoneyView.vue'
import TransactionsView from '@/views/TransactionsView.vue'
import SettingsView from '@/views/SettingsView.vue'
import LogoutView from '@/views/LogoutView.vue'

// Auth store
import { useAuthStore } from '@/store/auth'

const routes: Array<RouteRecordRaw> = [
  // Public routes (Login, Signup, OTP)
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      { path: 'login', component: LoginView },
      { path: 'signup', component: SignupView },
      { path: 'verify-otp', component: OTPView }
    ]
  },

  // Authenticated routes using AppLayout
  {
    path: '/',
    component: AppLayout,
    children: [
      { path: 'home', component: HomeView },
      { path: 'withdraw', component: WithdrawView },
      { path: 'deposit', component: DepositView },
      { path: 'send-money', component: SendMoneyView },
      { path: 'transactions', component: TransactionsView },
      { path: 'settings', component: SettingsView },
      { path: 'logout', component: LogoutView }
    ],
    meta: { requiresAuth: true } // Mark these routes as protected
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Global route guard to protect routes
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore() // Access the auth store
  const publicPages = ['/auth/login', '/auth/signup', '/auth/verify-otp'] // Public pages that don't require authentication
  const authRequired = !publicPages.includes(to.path) // Check if the route requires authentication

  // If authentication is required and user is not authenticated, redirect to login
  if (authRequired && !authStore.isAuthenticated) {
    return next('/auth/login')
  }

  next() // Allow navigation if authenticated or if accessing a public page
})

export default router
