<template>
  <!-- Render the content only after the authentication check is done -->
  <router-view v-if="isAuthChecked" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAuthStore } from './store/auth'

const authStore = useAuthStore()
const isAuthChecked = ref(false) // Track if the authentication check is done

onMounted(() => {
  // Restore session if tokens exist in localStorage
  authStore.restoreSession()

  // Once the session is restored, we mark the authentication check as done
  isAuthChecked.value = true
})
</script>
