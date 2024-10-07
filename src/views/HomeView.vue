<template>
  <div class="user-card">
    <div class="user-info">
      <h2>Account Info</h2>

      <!-- Display the user's phone number -->
      <p class="info-item">
        <strong>Phone Number:</strong>
        <span>{{ userPhoneNumber }}</span>
      </p>

      <!-- Display the user's balance -->
      <p class="info-item">
        <strong>Balance:</strong>
        <span>{{ userBalance }} EGP</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '../store/auth' // Import your auth store

// Access the auth store to get the user data
const authStore = useAuthStore()

// Compute the user's phone number and balance from the auth store
const userPhoneNumber = computed(() => authStore.user?.phone_number || 'N/A')
const userBalance = computed(() => authStore.user?.balance || 0)
</script>

<style scoped>
/* Styling for the user card */
.user-card {
  background-color: #fff; /* White background */
  border-radius: 10px; /* Rounded corners */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  padding: 20px; /* Padding inside the card */
  max-width: 400px; /* Max width for the card */
  margin: 20px auto; /* Center the card */
  text-align: center; /* Center align the text */
  font-family: 'Arial', sans-serif; /* Set a font family */
  transition: transform 0.2s ease-in-out; /* Animation for hover */
}

/* Styling for the title */
.user-card h2 {
  color: #4caf50; /* Theme color */
  font-size: 24px;
  margin-bottom: 20px;
}

/* Styling for each piece of info */
.info-item {
  margin-bottom: 15px;
  font-size: 18px;
  color: #333;
}

/* Styling for responsive design */
@media (max-width: 600px) {
  .user-card {
    padding: 15px; /* Adjust padding on smaller screens */
    max-width: 90%; /* Full width on smaller screens */
  }

  .user-card h2 {
    font-size: 20px;
  }

  .info-item {
    font-size: 16px;
  }
}
</style>
