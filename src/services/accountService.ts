import axiosInstance from './axios' // Import the configured Axios instance

export const withdraw = async (amount: number) => {
  try {
    const response = await axiosInstance.post('/withdraw/', {
      amount: amount
    })
    return response.data
  } catch (error) {
    throw new Error('Failed to withdraw')
  }
}

export const deposit = async (amount: number) => {
  try {
    const response = await axiosInstance.post('/deposit/', {
      amount: amount
    })
    return response.data // Return data from the API response
  } catch (error) {
    throw new Error('Failed to deposit. Please try again later.')
  }
}

export const sendMoney = async (amount: number, phone_number: string) => {
  try {
    const response = await axiosInstance.post('/send-money/', {
      amount,
      phone_number
    })
    return response.data // Return data from the API response
  } catch (error) {
    throw new Error('Failed to deposit. Please try again later.')
  }
}

export const getUserTransactions = async () => {
  try {
    const response = await axiosInstance.get('/transaction-history/')
    return response.data
  } catch (error) {
    throw new Error('Failed to get your transactions')
  }
}
