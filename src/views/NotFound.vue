<template>
  <div class="not-found-container">
    <h1>404 - Page Not Found</h1>
    <p>Oops! The page you are looking for does not exist.</p>
    <RouterLink to="/" class="back-home-link">Go back to Home</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.not-found-container {
  text-align: center;
  margin-top: 50px;
}

.not-found-container h1 {
  font-size: 48px;
  margin-bottom: 20px;
}

.not-found-container p {
  font-size: 18px;
  color: #666;
}

.back-home-link {
  margin-top: 20px;
  display: inline-block;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.back-home-link:hover {
  background-color: #45a049;
}
</style>
