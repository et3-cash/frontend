<template>
  <!-- Render the content only after the authentication check is done -->
  <router-view v-if="isAuthChecked" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from './store/auth'

const router = useRouter()
const authStore = useAuthStore()
const isAuthChecked = ref(false) // Track if the authentication check is done

onMounted(() => {
  // Restore session if tokens exist in localStorage
  authStore.restoreSession()

  // After restoring session, check if user is authenticated
  if (authStore.isAuthenticated) {
    // Redirect to the dashboard if authenticated
    router.push('/home')
  } else {
    // Redirect to the login page if not authenticated
    router.push('/auth/login')
  }

  // Mark the authentication check as completed
  isAuthChecked.value = true
})
</script>
