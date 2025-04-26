import Cookies from 'js-cookie'
import { api } from './api'

const COOKIE_NAME = 'user'
const COOKIE_EXPIRY = 0.5 // 12 hours in days

type LoginCredentials = {
  email: string
  password: string
}

type RegisterData = {
  cusName: string
  cusEmail: string
  cusPhone: string
  cusAddress: string
  cusPassword: string
  cusImage?: string
  cusBio?: string
}

type ApiResponse = {
  message: string
  customer: {
    id: number
    name: string
    email: string
    role: string
  }
}

type User = {
  id: number
  name: string
  email: string
  role: string
}

export const authService = {
  register: async (data: RegisterData): Promise<{ success: boolean; user: User | null }> => {
    try {
      const registerData = {
        ...data,
        cusRole: 'customer'
      }

      const response = await api.post<ApiResponse>('/auth/register', registerData)

      if (response.message === 'Registration successful') {
        // Auto login after successful registration
        return await authService.login({
          email: data.cusEmail,
          password: data.cusPassword
        })
      }
      return { success: false, user: null }
    } catch (error) {
      console.error('Registration failed:', error)
      return { success: false, user: null }
    }
  },

  login: async (credentials: LoginCredentials): Promise<{ success: boolean; user: User | null }> => {
    try {
      const response = await api.post<ApiResponse>('/auth/login', credentials)

      if (response.message === 'Login successful') {
        Cookies.set(COOKIE_NAME, JSON.stringify(response.customer), {
          expires: COOKIE_EXPIRY,
          sameSite: 'strict'
        })
        return { success: true, user: response.customer }
      }
      return { success: false, user: null }
    } catch (error) {
      console.error('Login failed:', error)
      return { success: false, user: null }
    }
  },

  logout: (): void => {
    Cookies.remove(COOKIE_NAME)
  },

  getCurrentUser: (): User | null => {
    const userJson = Cookies.get(COOKIE_NAME)
    if (!userJson) return null

    try {
      return JSON.parse(userJson)
    } catch {
      return null
    }
  },

  isAuthenticated: (): boolean => {
    return !!Cookies.get(COOKIE_NAME)
  }
}