<template>
  <div :class="styles.formContainer">
    <h1>Send Money</h1>
    <form @submit.prevent="handlesend" :class="styles.form">
      <!-- Input for the send amount -->
      <div :class="styles.inputGroup">
        <label for="amount" :class="styles.inputLabel">Amount (EGP)</label>
        <input
          id="amount"
          type="number"
          v-model="sendAmount"
          :min="minAmount"
          :max="maxAmount"
          placeholder="Enter amount"
          required
          :class="styles.inputField"
        />
      </div>

      <div :class="styles.inputGroup">
        <label for="phone" :class="styles.inputLabel">Receipient Phone</label>
        <input
          id="phone"
          type="phone"
          v-model="phone"
          placeholder="Enter Phone number"
          required
          :class="styles.inputField"
        />
      </div>

      <!-- Display current balance -->
      <p>
        Your current balance: <strong>{{ currentBalance }} EGP</strong>
      </p>

      <!-- Error message if the validation fails -->
      <p v-if="errorMessage" :class="styles.error" id="error-sending">{{ errorMessage }}</p>

      <!-- Success message after send -->
      <p v-if="successMessage" :class="styles.success" id="success-sending">{{ successMessage }}</p>

      <!-- Submit button -->
      <button type="submit" :class="styles.submitBtn" :disabled="cannotSend">Send</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '../store/auth'
import { sendMoney } from '../services/accountService'
import styles from '../styles/fromStyles.module.css' // Import shared form styles

// Initialize reactive variables
const sendAmount = ref(0)
const phone = ref('')
const errorMessage = ref('')
const successMessage = ref('')

// Set minimum and maximum send amounts
const minAmount = 5
const maxAmount = 60000

// Auth store to get the current user's balance
const authStore = useAuthStore()

// Compute the current balance from the auth store
const currentBalance = computed(() => authStore.user?.balance || 0)

// Compute whether the send button should be disabled
const cannotSend = computed<boolean>(() => {
  return (
    currentBalance.value === 0 ||
    sendAmount.value > currentBalance.value ||
    sendAmount.value < minAmount ||
    sendAmount.value > maxAmount
  )
})

// Function to handle form submission
const handlesend = async () => {
  // Clear previous messages
  errorMessage.value = ''
  successMessage.value = ''

  // If the button should be disabled, return early
  if (cannotSend.value) return

  try {
    // Call the send service (API request)
    await sendMoney(sendAmount.value, phone.value)

    // Update the balance after a successful send
    const newBalance = currentBalance.value - sendAmount.value
    authStore.updateBalance(newBalance) // Call store action to update balance

    successMessage.value = `Successfully Sent ${sendAmount.value} EGP`
    sendAmount.value = 0 // Reset the form
  } catch (error) {
    console.error('Send failed:', error)
    errorMessage.value = 'Sending failed. Please try again later.'
  }
}
</script>
