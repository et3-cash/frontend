<template>
  <h1 class="auth-title">Login to Your Wallet</h1>
  <LoginForm @login="handleLogin" />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../services/authService'
import LoginForm from '../components/LoginForm.vue'

onMounted(() => {
  document.title = 'Login - My Wallet App'
})

const router = useRouter()

const handleLogin = async (payload: { phone: string; password: string }) => {
  try {
    login(payload.phone, payload.password)
    router.push('/home')
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
