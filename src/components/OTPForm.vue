<template>
  <div :class="styles.formContainer">
    <div :class="styles.form">
      <h2 :class="styles.formHeading">Enter OTP</h2>
      <form @submit.prevent="submitForm">
        <div :class="styles.formGroup">
          <label for="otp">OTP</label>
          <input
            v-model="otp"
            id="otp"
            type="text"
            placeholder="Enter the OTP sent to your phone"
          />
        </div>

        <!-- Error message if OTP verification fails -->
        <p v-if="otpError" :class="styles.errorMessage">{{ otpError }}</p>

        <button type="submit" :class="styles.submitBtn">Verify OTP</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import styles from '../styles/form.module.css' // Use the shared styles

const otp = ref('')
const otpError = ref('')

// Define emit function to emit OTP and phone number to parent
const emit = defineEmits<{
  (e: 'submitOtp', payload: { otp: string }): void
}>()

const submitForm = () => {
  otpError.value = '' // Reset error message before submission

  if (!otp.value) {
    otpError.value = 'Please enter the OTP.'
    return
  }

  // Emit the OTP to the parent for further handling
  emit('submitOtp', { otp: otp.value })
}
</script>
