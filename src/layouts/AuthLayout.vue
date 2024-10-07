<template>
  <div class="auth-layout">
    <header class="auth-header">
      <img src="../assets/logo.svg" alt="App Logo" class="auth-logo" />
    </header>

    <main class="auth-content">
      <h1 class="auth-title"><slot name="title" /></h1>
      <!-- Slot for title -->
      <slot />
      <!-- Slot for the form content (Login, Signup, etc.) -->
    </main>

    <footer class="auth-footer">
      <p>&copy; 2024 My Wallet App</p>
      <!-- Example footer -->
    </footer>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
/* Responsive Auth Layout */
.auth-layout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
}

.auth-header {
  margin-bottom: 20px;
}

.auth-logo {
  height: 80px;
}

.auth-content {
  width: 100%;
  max-width: 400px;
  padding: 40px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
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
</style>
