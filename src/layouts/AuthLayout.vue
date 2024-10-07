<template>
  <div class="auth-layout">
    <header class="auth-header">
      <img src="../assets/logo.svg" alt="App Logo" class="auth-logo" />
    </header>

    <main class="auth-content">
      <!-- Render the child component based on the current route -->
      <RouterView />
    </main>

    <footer class="auth-footer">
      <p>&copy; 2024 My Wallet App</p>
      <!-- Example footer -->
    </footer>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<style scoped>
/* Auth Layout Styling */
.auth-layout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
}

/* Header Styling */
.auth-header {
  margin-bottom: 20px;
}

.auth-logo {
  height: 80px;
}

/* Auth Content Box */
.auth-content {
  width: 100%;
  max-width: 30vw;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  border: 1px solid #ddd; /* Added subtle border */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1); /* Stronger shadow for depth */
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

/* Title Styling */
.auth-title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

/* Footer Styling */
.auth-footer {
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
  color: #777;
}

/* Footer links for privacy and terms */
.auth-footer a {
  color: #777;
  margin: 0 5px;
  text-decoration: none;
}

.auth-footer a:hover {
  text-decoration: underline;
}

/* Mobile Styles */
@media (max-width: 768px) {
  .auth-content {
    padding: 30px;
    max-width: 90%;
  }

  .auth-title {
    font-size: 22px;
  }

  .auth-logo {
    height: 60px;
  }
}

/* Very small screen (below 480px) */
@media (max-width: 480px) {
  .auth-content {
    padding: 20px;
    max-width: 100%;
  }

  .auth-title {
    font-size: 20px;
  }

  .auth-logo {
    height: 50px;
  }
}

/* Extra small screen (below 320px) */
@media (max-width: 320px) {
  .auth-content {
    padding: 15px;
  }

  .auth-title {
    font-size: 18px;
  }

  .auth-logo {
    height: 40px;
  }
}

/* Dark Mode Support */
[data-theme='dark'] .auth-layout {
  background-color: #1e1e1e;
  color: #f0f0f0;
}

[data-theme='dark'] .auth-content {
  background-color: #333;
  border: 1px solid #444;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
}

[data-theme='dark'] .auth-title {
  color: #f0f0f0;
}

[data-theme='dark'] .auth-footer {
  color: #bbb;
}

[data-theme='dark'] .auth-footer a {
  color: #bbb;
}
</style>
