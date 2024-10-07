<template>
  <h1 class="auth-title">Verify Your OTP</h1>
  <OTPForm @submitOtp="handleOtpSubmit" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import OTPForm from '../components/OTPForm.vue' // Import the OTP form component
import { verifyOTP } from '../services/authService' // Import the OTP verification service

const phone = ref('') // Store the phone number
const router = useRouter() // Use Vue Router to navigate after successful verification
const route = useRoute() // Use Vue Router's useRoute to read the query params

// Fetch the phone number from the query parameters on mount
onMounted(() => {
  phone.value = (route.query.phone as string) || '' // Retrieve the phone number from query
  if (!phone.value) {
    alert('Phone number is missing. Please try again.')
  }
})

// Handle the OTP submission from the form
const handleOtpSubmit = async (payload: { otp: string }) => {
  try {
    // Call the OTP verification service with the phone number and OTP
    await verifyOTP(phone.value, payload.otp)

    // Navigate to the dashboard if successful
    router.push('/dashboard')
  } catch (error) {
    console.error('OTP verification failed:', error)
    alert('Invalid OTP. Please try again.')
  }
}
</script>
