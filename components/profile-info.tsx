"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { customerService } from "@/services/customer-service"
import type { User, Customer } from "@/types"
import { Skeleton } from "./ui/skeleton"

interface ProfileInfoProps {
  user: User | null
}

export default function ProfileInfo({ user }: ProfileInfoProps) {
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [customerData, setCustomerData] = useState<Customer | null>(null)

  useEffect(() => {
    const fetchCustomerData = async () => {
      if (user?.id) {
        const data = await customerService.getCustomerById(user.id)
        if (data) {
          setCustomerData(data)
        }
      }
      setIsLoading(false)
    }

    fetchCustomerData()
  }, [user?.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Update profile functionality will be implemented later
    setIsEditing(false)
  }

  if (isLoading) {
    return (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-20 w-20 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-12" />
            ))}
          </div>
        </div>
    )
  }

  if (!customerData) {
    return (
        <div className="text-center p-4">
          <p className="text-muted-foreground">Failed to load profile data</p>
        </div>
    )
  }

  return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage
                src={customerData.cusImage || "/placeholder.svg?height=80&width=80"}
                alt={customerData.cusName}
            />
            <AvatarFallback>{customerData.cusName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-xl font-medium">{customerData.cusName}</h3>
            <p className="text-muted-foreground">{customerData.cusEmail}</p>
          </div>
        </div>

        {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                      id="name"
                      name="name"
                      defaultValue={customerData.cusName}
                      disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                      id="email"
                      name="email"
                      type="email"
                      defaultValue={customerData.cusEmail}
                      disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      defaultValue={customerData.cusPhone}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                      id="address"
                      name="address"
                      defaultValue={customerData.cusAddress}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                    id="bio"
                    name="bio"
                    defaultValue={customerData.cusBio || ""}
                    rows={4}
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit">Save Changes</Button>
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
        ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Phone Number</h4>
                  <p>{customerData.cusPhone}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Address</h4>
                  <p>{customerData.cusAddress}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Member Since</h4>
                  <p>{new Date(customerData.created_at).toLocaleDateString()}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Last Updated</h4>
                  <p>{new Date(customerData.updated_at).toLocaleDateString()}</p>
                </div>
              </div>
              {customerData.cusBio && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Bio</h4>
                    <p className="whitespace-pre-wrap">{customerData.cusBio}</p>
                  </div>
              )}
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            </div>
        )}
      </div>
  )
}