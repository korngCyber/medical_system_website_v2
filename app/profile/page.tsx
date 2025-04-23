// app/profile/page.tsx
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import ProfileInfo from "@/components/profile-info"

export default function ProfilePage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "Please login to access your profile",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    setIsLoading(false)
  }, [isAuthenticated, router, toast])

  if (isLoading) {
    return (
        <div className="container py-12 flex justify-center">
          <div className="w-full max-w-3xl">
            <Card>
              <CardHeader className="space-y-1">
                <div className="h-8 bg-muted animate-pulse rounded w-1/3 mb-2" />
                <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-12 bg-muted animate-pulse rounded" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
    )
  }

  return (
      <div className="container py-12">
        <div className="w-full max-w-3xl mx-auto">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">My Profile</CardTitle>
              <CardDescription>Manage your account information</CardDescription>
            </CardHeader>
            <CardContent>
              <ProfileInfo user={user} />
            </CardContent>
          </Card>
        </div>
      </div>
  )
}