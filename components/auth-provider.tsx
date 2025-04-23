// components/auth-provider.tsx
"use client"

import { createContext, useEffect, useState } from "react"
import { authService } from "@/services/auth-service"

type User = {
  id: number
  name: string
  email: string
  role: string
}

type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const currentUser = authService.getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    const success = await authService.login({ email, password })
    if (success) {
      const user = authService.getCurrentUser()
      setUser(user)
    }
    return success
  }

  const logout = () => {
    authService.logout()
    setUser(null)
  }

  if (isLoading) {
    return null
  }

  return (
      <AuthContext.Provider value={{
        user,
        isAuthenticated: !!user,
        login,
        logout
      }}>
        {children}
      </AuthContext.Provider>
  )
}