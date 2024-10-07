<template>
  <AuthLayout>
    <template #title> Login to Your Wallet </template>
    <LoginForm @login="handleLogin" />
  </AuthLayout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import LoginForm from '../components/LoginForm.vue'
import { login } from '../services/authService'
import { useAuthStore } from '../store/auth'
import AuthLayout from '../layouts/AuthLayout.vue'

const router = useRouter()
const authStore = useAuthStore()

const handleLogin = async (payload: { phone: string; password: string }) => {
  try {
    const response = await login(payload.phone, payload.password)
    authStore.login(response.user)
    router.push('/dashboard')
  } catch (error) {
    console.error('Login failed:', error)
    alert('Login failed. Please check your credentials and try again.')
  }
}
</script>

<style scoped>
.login-view {
  text-align: center;
}
</style>
