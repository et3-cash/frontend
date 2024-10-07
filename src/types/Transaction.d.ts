export interface User {
  id: number
  phone_number: string
  date_joined: string
  is_active: boolean
}

export interface Transaction {
  id: number
  user: User
  recipient?: User
  transaction_type: 'deposit' | 'withdraw' | 'transfer'
  amount: string
  created_at: string
  description: string
}
