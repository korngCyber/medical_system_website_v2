"use client"

import { createContext, useState, useEffect, type ReactNode } from "react"
import type { User } from "@/types"

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  signIn: (user: User) => Promise<void>
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  signIn: async () => {},
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in (from localStorage in this demo)
    const storedUser = localStorage.getItem("medicare_user")
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
        setIsAuthenticated(true)
      } catch (error) {
        console.error("Failed to parse stored user:", error)
        localStorage.removeItem("medicare_user")
      }
    }
    setIsLoading(false)
  }, [])

  const signIn = async (userData: User) => {
    // In a real app, this would validate with a backend
    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem("medicare_user", JSON.stringify(userData))
  }

  const signOut = async () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("medicare_user")
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {!isLoading && children}
    </AuthContext.Provider>
  )
}
