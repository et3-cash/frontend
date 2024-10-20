<template>
  <div :class="styles.formContainer">
    <h1>Deposit</h1>
    <form @submit.prevent="handleDeposit" :class="styles.form">
      <!-- Input for the deposit amount -->
      <div :class="styles.inputGroup">
        <label for="amount" :class="styles.inputLabel">Deposit Amount (EGP)</label>
        <input
          id="amount"
          type="number"
          v-model="depositAmount"
          :min="minAmount"
          :max="maxAmount"
          placeholder="Enter amount"
          required
          :class="styles.inputField"
        />
      </div>

      <!-- Display current balance -->
      <p>
        Your current balance: <strong>{{ currentBalance }} EGP</strong>
      </p>

      <!-- Error message if the validation fails -->
      <p v-if="errorMessage" :class="styles.error" id="error-deposit">{{ errorMessage }}</p>

      <!-- Success message after deposit -->
      <p v-if="successMessage" :class="styles.success" id="success-deposit">{{ successMessage }}</p>

      <!-- Submit button -->
      <button type="submit" :class="styles.submitBtn" :disabled="cannotDeposit">Deposit</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '../store/auth'
import { deposit } from '../services/accountService'
import styles from '../styles/fromStyles.module.css' // Import shared form styles

// Initialize reactive variables
const depositAmount = ref(0)
const errorMessage = ref('')
const successMessage = ref('')

// Set minimum and maximum deposit amounts
const minAmount = 5
const maxAmount = 60000

// Auth store to get the current user's balance
const authStore = useAuthStore()

// Compute the current balance from the auth store
const currentBalance = computed(() => authStore.user?.balance || 0)

// Compute whether the deposit button should be disabled
const cannotDeposit = computed<boolean>(() => {
  return depositAmount.value < minAmount || depositAmount.value > maxAmount
})

// Function to handle form submission
const handleDeposit = async () => {
  // Clear previous messages
  errorMessage.value = ''
  successMessage.value = ''

  // If the button should be disabled, return early
  if (cannotDeposit.value) return

  try {
    // Call the deposit service (API request)
    await deposit(depositAmount.value)

    // Update the balance after a successful deposit
    const newBalance = currentBalance.value + depositAmount.value
    authStore.updateBalance(newBalance) // Call store action to update balance

    successMessage.value = `Successfully deposited ${depositAmount.value} EGP`
    depositAmount.value = 0 // Reset the form
  } catch (error) {
    console.error('Deposit failed:', error)
    errorMessage.value = 'Deposit failed. Please try again later.'
  }
}
</script>
