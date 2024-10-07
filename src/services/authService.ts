import axiosInstance from './axios' // Import the configured Axios instance

interface LoginResponse {
  token: string
  user: {
    id: string
    phone_number: string
    balance: number
  }
}

export const login = async (phone_number: string, password: string): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>('/login/', {
    phone_number,
    password
  })
  return response.data
}

export const signup = async (phone_number: string, password: string): Promise<void> => {
  await axiosInstance.post('/register/', {
    phone_number,
    password
  })
}

export const verifyOTP = async (phone_number: string, otp: string): Promise<void> => {
  await axiosInstance.post('/verify-otp/', {
    phone_number,
    otp
  })
}
