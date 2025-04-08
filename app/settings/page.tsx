"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)

  // Settings state
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    orderUpdates: true,
    promotions: false,
    newProducts: true,
  })

  const [privacySettings, setPrivacySettings] = useState({
    shareData: false,
    cookieConsent: true,
    savePaymentInfo: true,
  })

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "Please login to access settings",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    setIsLoading(false)
  }, [isAuthenticated, router, toast])

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handlePrivacyChange = (key: string, value: boolean) => {
    setPrivacySettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleSaveSettings = async () => {
    setIsLoading(true)

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Success",
        description: "Your settings have been saved",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

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
            <CardTitle className="text-2xl font-bold">Settings</CardTitle>
            <CardDescription>Manage your account settings and preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="notifications">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="privacy">Privacy</TabsTrigger>
              </TabsList>

              <TabsContent value="notifications" className="mt-6 space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-muted-foreground">Receive emails about your account activity</p>
                    </div>
                    <Switch
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) => handleNotificationChange("emailNotifications", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Order Updates</h3>
                      <p className="text-sm text-muted-foreground">Receive updates about your orders</p>
                    </div>
                    <Switch
                      checked={notificationSettings.orderUpdates}
                      onCheckedChange={(checked) => handleNotificationChange("orderUpdates", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Promotions and Offers</h3>
                      <p className="text-sm text-muted-foreground">Receive promotional emails and special offers</p>
                    </div>
                    <Switch
                      checked={notificationSettings.promotions}
                      onCheckedChange={(checked) => handleNotificationChange("promotions", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">New Product Announcements</h3>
                      <p className="text-sm text-muted-foreground">Be the first to know about new products</p>
                    </div>
                    <Switch
                      checked={notificationSettings.newProducts}
                      onCheckedChange={(checked) => handleNotificationChange("newProducts", checked)}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="privacy" className="mt-6 space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Data Sharing</h3>
                      <p className="text-sm text-muted-foreground">Allow us to share your data with trusted partners</p>
                    </div>
                    <Switch
                      checked={privacySettings.shareData}
                      onCheckedChange={(checked) => handlePrivacyChange("shareData", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Cookie Consent</h3>
                      <p className="text-sm text-muted-foreground">
                        Allow us to use cookies to improve your experience
                      </p>
                    </div>
                    <Switch
                      checked={privacySettings.cookieConsent}
                      onCheckedChange={(checked) => handlePrivacyChange("cookieConsent", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Save Payment Information</h3>
                      <p className="text-sm text-muted-foreground">
                        Securely save your payment details for faster checkout
                      </p>
                    </div>
                    <Switch
                      checked={privacySettings.savePaymentInfo}
                      onCheckedChange={(checked) => handlePrivacyChange("savePaymentInfo", checked)}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveSettings} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Settings"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
