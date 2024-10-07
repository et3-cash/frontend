import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import SignupView from '@/views/SignupView.vue'
import DashboardView from '@/views/DashboardView.vue'
import OTPView from '@/views/OTPView.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/login', component: LoginView },
  { path: '/signup', component: SignupView },
  { path: '/dashboard', component: DashboardView },
  { path: '/verify-otp', component: OTPView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
