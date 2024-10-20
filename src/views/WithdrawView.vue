<template>
  <div :class="styles.formContainer">
    <h1>Withdraw</h1>
    <form @submit.prevent="handleWithdraw" :class="styles.form">
      <!-- Input for the withdrawal amount -->
      <div :class="styles.inputGroup">
        <label for="amount" :class="styles.inputLabel">Withdrawal Amount (EGP)</label>
        <input
          id="amount"
          type="number"
          v-model="withdrawAmount"
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
      <p v-if="errorMessage" :class="styles.error" id="error-withdraw">{{ errorMessage }}</p>

      <!-- Submit button -->
      <button type="submit" :class="styles.submitBtn" :disabled="cannotWithdraw">Withdraw</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '../store/auth'
import { withdraw } from '../services/accountService'
import styles from '../styles/fromStyles.module.css' // Import the CSS module

// Initialize reactive variables
const withdrawAmount = ref(0)
const errorMessage = ref('')

// Set minimum and maximum withdrawal amounts
const minAmount = 5
const maxAmount = 60000

// Auth store to get the current user's balance
const authStore = useAuthStore()

// Compute the current balance from the auth store
const currentBalance = computed(() => authStore.user?.balance || 0)

// Compute whether the withdraw button should be disabled
const cannotWithdraw = computed<boolean>(() => {
  return (
    currentBalance.value === 0 ||
    withdrawAmount.value < minAmount ||
    withdrawAmount.value > maxAmount
  )
})

// Function to handle form submission
const handleWithdraw = async () => {
  if (cannotWithdraw.value) return

  try {
    // Call the withdraw service (API request)
    await withdraw(withdrawAmount.value)

    // Update the balance after a successful withdrawal
    const newBalance = currentBalance.value - withdrawAmount.value
    authStore.updateBalance(newBalance) // Call store action to update balance

    alert(`Successfully withdrew ${withdrawAmount.value} EGP`)
    withdrawAmount.value = 0 // Reset the form
    errorMessage.value = '' // Clear any previous errors
  } catch (error) {
    console.error('Withdraw failed:', error)
    errorMessage.value = 'Withdrawal failed. Please try again later.'
  }
}
</script>
