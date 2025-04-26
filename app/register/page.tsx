"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Camera, UserCircle } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { authService } from "@/services/auth-service"
import { useAuth } from "@/hooks/use-auth"

export default function RegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { setUser } = useAuth()

  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>("")
  const [formData, setFormData] = useState({
    cusName: "",
    cusEmail: "",
    cusPhone: "",
    cusAddress: "",
    cusPassword: "",
    confirmPassword: "",
    cusImage: "",
    cusBio: "",
    acceptTerms: false
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      setFormData({ ...formData, cusImage: url })
    }
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.cusName || !formData.cusEmail || !formData.cusPhone ||
        !formData.cusAddress || !formData.cusPassword || !formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    if (formData.cusPassword !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      })
      return
    }

    if (!formData.acceptTerms) {
      toast({
        title: "Error",
        description: "You must accept the terms and conditions",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const registerData = {
        cusName: formData.cusName,
        cusEmail: formData.cusEmail,
        cusPhone: formData.cusPhone,
        cusAddress: formData.cusAddress,
        cusPassword: formData.cusPassword,
        cusImage: formData.cusImage,
        cusBio: formData.cusBio
      }

      const { success, user } = await authService.register(registerData)

      if (success && user) {
        setUser(user)
        toast({
          title: "Success",
          description: "Your account has been created and you're now logged in",
        })
        router.push("/")
      } else {
        toast({
          title: "Error",
          description: "Registration failed. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Rest of the JSX remains the same...

  return (
      <div className="container max-w-2xl py-8 px-4">
        <Card className="shadow-md">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-semibold">Create an account</CardTitle>
            <CardDescription>Enter your information to create an account</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <div className="relative">
                  <input
                      type="file"
                      id="cusImage"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                  />
                  <label htmlFor="cusImage" className="cursor-pointer">
                    <div className="h-28 w-28 rounded-full overflow-hidden border-2 border-primary/20 hover:border-primary transition-colors">
                      {previewUrl ? (
                          <img
                              src={previewUrl}
                              alt="Profile"
                              className="h-full w-full object-cover"
                          />
                      ) : (
                          <div className="h-full w-full bg-muted flex flex-col items-center justify-center">
                            <UserCircle className="h-12 w-12 text-muted-foreground" />
                          </div>
                      )}
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Camera className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cusName">Full Name</Label>
                    <Input
                        id="cusName"
                        placeholder="John Doe"
                        value={formData.cusName}
                        onChange={handleChange}
                        required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cusEmail">Email</Label>
                    <Input
                        id="cusEmail"
                        type="email"
                        placeholder="name@example.com"
                        value={formData.cusEmail}
                        onChange={handleChange}
                        required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cusPhone">Phone Number</Label>
                    <Input
                        id="cusPhone"
                        type="tel"
                        placeholder="123-456-7890"
                        value={formData.cusPhone}
                        onChange={handleChange}
                        required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cusAddress">Address</Label>
                    <Input
                        id="cusAddress"
                        placeholder="Your address"
                        value={formData.cusAddress}
                        onChange={handleChange}
                        required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cusBio">Bio (Optional)</Label>
                  <Textarea
                      id="cusBio"
                      placeholder="Tell us about yourself"
                      value={formData.cusBio}
                      onChange={handleChange}
                      className="resize-none h-20"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cusPassword">Password</Label>
                    <Input
                        id="cusPassword"
                        type="password"
                        value={formData.cusPassword}
                        onChange={handleChange}
                        required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                        id="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                      id="acceptTerms"
                      checked={formData.acceptTerms}
                      onCheckedChange={(checked) => setFormData({...formData, acceptTerms: checked === true})}
                  />
                  <Label htmlFor="acceptTerms" className="text-sm">
                    I agree to the{" "}
                    <Link href="/terms" className="text-primary hover:underline">
                      terms and conditions
                    </Link>
                  </Label>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4 border-t pt-6">
              <Button type="submit" className="w-full sm:w-[200px] mx-auto" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Register"}
              </Button>
              <p className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Login
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
  )
}