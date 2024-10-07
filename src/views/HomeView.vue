<template>
  <div>
    <!-- Display the user's balance -->
    <h1>
      Your current balance is: <strong>{{ userBalance }} EGP</strong>
    </h1>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '../store/auth' // Import your auth store

// Access the auth store to get the user data
const authStore = useAuthStore()

// Compute the balance from the user's account
const userBalance = computed(() => authStore.user?.balance || 0)
</script>
