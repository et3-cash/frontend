<template>
  <div :class="styles.formContainer">
    <div :class="styles.from">
      <h2>Sign up</h2>
      <form @submit.prevent="submitForm">
        <div :class="styles.formGroup">
          <label for="phone">Phone Number</label>
          <input v-model="phone" id="phone" type="text" placeholder="Enter your phone number" />
        </div>

        <div :class="styles.formGroup">
          <label for="password">Password</label>
          <input
            v-model="password"
            id="password"
            type="password"
            placeholder="Create your password"
          />
        </div>

        <div :class="styles.formGroup">
          <label for="confirmPassword">Confirm Password</label>
          <input
            v-model="confirmPassword"
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
          />
        </div>

        <!-- Display an error message if passwords don't match -->
        <p v-if="passwordsMismatch" :class="styles.errorMessage">Passwords do not match</p>

        <button type="submit" :disabled="passwordsMismatch" :class="styles.submitBtn">
          Sign Up
        </button>
      </form>
      <!-- Link to the Login page -->
      <p :class="styles.link">
        Already have a wallet?
        <RouterLink to="/auth/login" :class="styles.signupLink">Login</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import styles from '../styles/form.module.css'
const phone = ref('')
const password = ref('')
const confirmPassword = ref('')
const emit = defineEmits<{
  (e: 'signup', payload: { phone: string; password: string }): void
}>()

// Computed property to check if passwords match
const passwordsMismatch = computed(() => password.value !== confirmPassword.value)

// Emit signup event if passwords match
const submitForm = () => {
  if (!phone.value || !password.value || !confirmPassword.value) {
    alert('Please fill in all fields.')
    return
  }

  if (passwordsMismatch.value) {
    alert('Passwords do not match.')
    return
  }

  // Emit signup event with phone number and password
  emit('signup', { phone: phone.value, password: password.value })
}
</script>
