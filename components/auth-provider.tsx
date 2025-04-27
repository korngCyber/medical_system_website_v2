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
  login: (email: string, password: string) => Promise<{ success: boolean; user: User | null }>
  logout: () => void
  setUser: (user: User | null) => void
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const currentUser = authService.getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    const result = await authService.login({ email, password })
    if (result.success && result.user) {
      setUser(result.user)
    }
    return result
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
        logout,
        setUser
      }}>
        {children}
      </AuthContext.Provider>
  )
}


////