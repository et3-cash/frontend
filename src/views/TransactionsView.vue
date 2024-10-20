<template>
  <div class="transactions-container">
    <h1>Transactions</h1>

    <table class="transactions-table">
      <thead>
        <tr>
          <th>Transaction Type</th>
          <th>Amount (EGP)</th>
          <th v-if="hasTransfers">Recipient</th>
          <th>Description</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="transaction in transactions" :key="transaction.id">
          <td>{{ transaction.transaction_type }}</td>
          <td>{{ transaction.amount }}</td>
          <!-- Conditionally show the recipient's phone number if it's a transfer -->
          <td>
            {{ transaction?.description?.includes('Transfer') ? transaction?.description?.split(' ')[2] : 'N/A' }}
          </td>
          <td>{{ transaction.description }}</td>
          <td>{{ formatDate(transaction.created_at) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getUserTransactions } from '../services/accountService'

// Define the Transaction and User interfaces
interface User {
  id: number
  phone_number: string
  date_joined: string
  is_active: boolean
}

interface Transaction {
  id: number
  user: User
  recipient?: User // Optional recipient field for transfers
  transaction_type: 'deposit' | 'withdraw' | 'transfer'
  amount: string
  created_at: string
  description: string
}

// Transaction data storage with type annotation
const transactions = ref<Transaction[]>([])

// Check if there are transfers (to conditionally render the recipient column)
const hasTransfers = ref(false)

// Fetch transactions on component mount
onMounted(async () => {
  try {
    const data = await getUserTransactions()
    transactions.value = data

    // Check if any of the transactions are transfers to show the recipient column
    hasTransfers.value = data.some(
      (transaction: Transaction) => transaction.transaction_type === 'transfer'
    )
  } catch (error) {
    console.error('Error fetching transactions:', error)
    alert('Failed to load transactions.')
  }
})

// Helper function to format the date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleString() // Adjust the format as needed
}
</script>

<style scoped>
.transactions-container {
  padding: 20px;
  text-align: center;
}

.transactions-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.transactions-table th,
.transactions-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.transactions-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.transactions-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.transactions-table tr:hover {
  background-color: #f1f1f1;
}
</style>
