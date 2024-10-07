<template>
  <div>
    <h2>Logging Out...</h2>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

onMounted(() => {
  authStore.logout() // Log out the user
  router.push('/auth/login') // Redirect to login page
})
</script>
