<template>
  <div :class="styles.appLayout">
    <!-- Sidebar -->
    <nav :class="styles.sidebar">
      <ul>
        <li v-for="item in navItems" :key="item.name" :class="styles.navItem">
          <RouterLink :to="item.path" :class="styles.navLink">
            <span :class="styles.navIcon">{{ item.icon }}</span>
            <!-- Placeholder for icon -->
            <span :class="styles.navText">{{ item.name }}</span>
          </RouterLink>
        </li>
      </ul>
    </nav>

    <!-- Main Content Area -->
    <div :class="styles.mainContent">
      <!-- Header -->
      <header :class="styles.header">
        <h1>Dashboard</h1>
      </header>

      <!-- Page Content (This will render the selected route) -->
      <main>
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import styles from '../styles/appLayout.module.css' // Import the CSS module for layout

// Define navigation items
const navItems = [
  { name: 'Home', path: '/home', icon: '🏠' }, // Example icon placeholders (replace with real ones)
  { name: 'Withdraw', path: '/withdraw', icon: '💸' },
  { name: 'Deposit', path: '/deposit', icon: '💰' },
  { name: 'Send Money', path: '/send-money', icon: '📤' },
  { name: 'Transactions', path: '/transactions', icon: '📜' },
  { name: 'Settings', path: '/settings', icon: '⚙️' },
  { name: 'Logout', path: '/logout', icon: '🚪' }
]
</script>

<style scoped>
/* Define layout for the app */

.appLayout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

/* Sidebar styling */
.sidebar {
  background-color: #2c3e50; /* Dark background */
  width: 240px;
  padding: 20px;
  box-sizing: border-box;
}

.navItem {
  margin-bottom: 20px;
}

.navLink {
  display: flex;
  align-items: center;
  color: #ecf0f1;
  font-size: 18px;
  text-decoration: none;
  padding: 10px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.navLink:hover {
  background-color: #34495e;
}

/* Icon and text styling */
.navIcon {
  font-size: 20px;
  margin-right: 10px;
}

.navText {
  font-size: 16px;
}

/* Main content area (includes header and page content) */
.mainContent {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

/* Header styling */
.header {
  padding: 20px;
  background: linear-gradient(90deg, #4caf50, #81c784);
  color: white;
  font-size: 24px;
  text-align: center;
}

/* Content area */
main {
  padding: 20px;
  flex-grow: 1;
  overflow-y: auto;
}
</style>
