import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// Import layouts and views
import AuthLayout from '@/layouts/AuthLayout.vue'
import AppLayout from '@/layouts/AppLayout.vue'
import NotFound from '@/views/NotFound.vue'
import LoginView from '@/views/LoginView.vue'
import SignupView from '@/views/SignupView.vue'
import OTPView from '@/views/OTPView.vue'
import HomeView from '@/views/HomeView.vue'
import WithdrawView from '@/views/WithdrawView.vue'
import DepositView from '@/views/DepositView.vue'
import SendMoneyView from '@/views/SendMoneyView.vue'
import TransactionsView from '@/views/TransactionsView.vue'
import SettingsView from '@/views/SettingsView.vue'
import LogoutView from '@/views/LogoutView.vue'

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
    meta: { requiresAuth: true }
  },

  // Catch-all route for 404
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Global route guard to protect routes
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const publicPages = ['/auth/login', '/auth/signup', '/auth/verify-otp']

  // Redirect to 404 if the route is not found
  if (!to.matched.length) {
    return next({ name: 'NotFound' })
  }

  const authRequired = !publicPages.includes(to.path)

  // Redirect to login if the user is not authenticated
  if (authRequired && !authStore.isAuthenticated) {
    return next('/auth/login')
  }

  next()
})

export default router
