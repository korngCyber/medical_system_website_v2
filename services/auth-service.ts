// services/auth-service.ts
import Cookies from 'js-cookie'
import { api } from './api'

const COOKIE_NAME = 'user'
const COOKIE_EXPIRY = 0.5 // 12 hours in days

type LoginCredentials = {
  email: string
  password: string
}

type User = {
  id: number
  name: string
  email: string
  role: string
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      const response = await api.post('/auth/login', credentials)

      if (response.message === 'Login successful') {
        // Save user data in cookie
        Cookies.set(COOKIE_NAME, JSON.stringify(response.customer), {
          expires: COOKIE_EXPIRY,
          sameSite: 'strict'
        })
        return true
      }
      return false
    } catch (error) {
      console.error('Login failed:', error)
      return false
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