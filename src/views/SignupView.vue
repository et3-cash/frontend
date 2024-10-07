<template>
  <AuthLayout>
    <!-- Slot for the title -->
    <template #title> Create Your Account </template>

    <!-- SignupForm component -->
    <SignupForm @signup="handleSignup" />
  </AuthLayout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import SignupForm from '../components/SignupForm.vue' // Import the signup form component
import { signup } from '../services/authService' // Import the signup service
import AuthLayout from '../layouts/AuthLayout.vue' // Reuse AuthLayout for consistency

const router = useRouter() // Use Vue Router to navigate after signup

// Function to handle signup form submission
const handleSignup = async (payload: { phone: string; password: string }) => {
  try {
    // Call signup service (API) with phone and password
    await signup(payload.phone, payload.password)

    // On successful signup, redirect to the OTP verification page (or wherever needed)
    router.push({
      path: '/verify-otp',
      query: { phone: payload.phone } // Append phone number to the URL as query parameter
    })
  } catch (error) {
    console.error('Signup failed:', error)
    alert('Signup failed. Please try again.')
  }
}
</script>
