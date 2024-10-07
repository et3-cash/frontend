<template>
  <div :class="styles.formContainer">
    <div :class="styles.from">
      <h2>Login</h2>
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
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" :class="styles.submitBtn">Login</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import styles from '../styles/form.module.css'
import { ref } from 'vue'

// Declare `emit` using `defineEmits`
const emit = defineEmits<{
  (e: 'login', payload: { phone: string; password: string }): void
}>()

// Reactive data
const phone = ref<string>('')
const password = ref<string>('')

// Function to submit the form
const submitForm = () => {
  if (phone.value && password.value) {
    // Use `emit` to send the login event with the payload
    emit('login', { phone: phone.value, password: password.value })
  } else {
    alert('Please fill in all fields.')
  }
}
</script>
