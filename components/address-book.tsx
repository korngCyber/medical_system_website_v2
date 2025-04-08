"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import type { Address } from "@/types"
import { Home, Briefcase, Plus, Pencil, Trash2 } from "lucide-react"

export default function AddressBook() {
  const { toast } = useToast()
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      name: "John Doe",
      type: "home",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
      isDefault: true,
    },
    {
      id: "2",
      name: "John Doe",
      type: "work",
      street: "456 Business Ave",
      city: "New York",
      state: "NY",
      zipCode: "10002",
      country: "USA",
      isDefault: false,
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null)
  const [formData, setFormData] = useState<Omit<Address, "id">>({
    name: "",
    type: "home",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    isDefault: false,
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newAddress: Address = {
        ...formData,
        id: Date.now().toString(),
      }

      // If this is the first address or marked as default, update other addresses
      if (addresses.length === 0 || formData.isDefault) {
        setAddresses((prev) => prev.map((addr) => ({ ...addr, isDefault: false })).concat(newAddress))
      } else {
        setAddresses((prev) => [...prev, newAddress])
      }

      toast({
        title: "Success",
        description: "Address added successfully",
      })

      setIsAddDialogOpen(false)
      resetForm()
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

  const handleEditAddress = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (!currentAddress) return

      const updatedAddresses = addresses.map((addr) => {
        if (addr.id === currentAddress.id) {
          return { ...formData, id: addr.id }
        }

        // If the edited address is now default, remove default from others
        if (formData.isDefault) {
          return { ...addr, isDefault: false }
        }

        return addr
      })

      setAddresses(updatedAddresses)

      toast({
        title: "Success",
        description: "Address updated successfully",
      })

      setIsEditDialogOpen(false)
      resetForm()
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

  const handleDeleteAddress = async () => {
    setIsLoading(true)

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (!currentAddress) return

      const filteredAddresses = addresses.filter((addr) => addr.id !== currentAddress.id)

      // If the deleted address was default, set a new default if addresses remain
      if (currentAddress.isDefault && filteredAddresses.length > 0) {
        filteredAddresses[0].isDefault = true
      }

      setAddresses(filteredAddresses)

      toast({
        title: "Success",
        description: "Address deleted successfully",
      })

      setIsDeleteDialogOpen(false)
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

  const openEditDialog = (address: Address) => {
    setCurrentAddress(address)
    setFormData({
      name: address.name,
      type: address.type,
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
      isDefault: address.isDefault,
    })
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (address: Address) => {
    setCurrentAddress(address)
    setIsDeleteDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      type: "home",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      isDefault: false,
    })
    setCurrentAddress(null)
  }

  const getAddressIcon = (type: string) => {
    switch (type) {
      case "home":
        return <Home className="h-5 w-5 text-primary" />
      case "work":
        return <Briefcase className="h-5 w-5 text-primary" />
      default:
        return <Home className="h-5 w-5 text-primary" />
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Saved Addresses</h3>
        <Button size="sm" onClick={() => setIsAddDialogOpen(true)} className="flex items-center gap-1">
          <Plus className="h-4 w-4" />
          Add Address
        </Button>
      </div>

      {addresses.length === 0 ? (
        <div className="text-center py-12 border rounded-md">
          <h3 className="text-xl font-medium mb-2">No addresses saved</h3>
          <p className="text-muted-foreground mb-6">Add an address to make checkout faster</p>
          <Button onClick={() => setIsAddDialogOpen(true)}>Add Address</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <Card key={address.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    {getAddressIcon(address.type)}
                    <span className="font-medium capitalize">{address.type}</span>
                    {address.isDefault && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Default</span>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(address)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(address)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="mt-3 space-y-1 text-sm">
                  <p className="font-medium">{address.name}</p>
                  <p>{address.street}</p>
                  <p>
                    {address.city}, {address.state} {address.zipCode}
                  </p>
                  <p>{address.country}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add Address Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Address</DialogTitle>
            <DialogDescription>Add a new shipping address to your account</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddAddress}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label>Address Type</Label>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <Input
                      type="radio"
                      id="home"
                      name="type"
                      value="home"
                      checked={formData.type === "home"}
                      onChange={handleChange}
                      className="h-4 w-4"
                    />
                    <Label htmlFor="home">Home</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="radio"
                      id="work"
                      name="type"
                      value="work"
                      checked={formData.type === "work"}
                      onChange={handleChange}
                      className="h-4 w-4"
                    />
                    <Label htmlFor="work">Work</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="street">Street Address</Label>
                <Input id="street" name="street" value={formData.street} onChange={handleChange} required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" value={formData.city} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State/Province</Label>
                  <Input id="state" name="state" value={formData.state} onChange={handleChange} required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                  <Input id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" name="country" value={formData.country} onChange={handleChange} required />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Input
                  type="checkbox"
                  id="isDefault"
                  name="isDefault"
                  checked={formData.isDefault}
                  onChange={handleChange}
                  className="h-4 w-4"
                />
                <Label htmlFor="isDefault">Set as default address</Label>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsAddDialogOpen(false)
                  resetForm()
                }}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Adding..." : "Add Address"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Address Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Address</DialogTitle>
            <DialogDescription>Update your shipping address details</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleEditAddress}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Full Name</Label>
                <Input id="edit-name" name="name" value={formData.name} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label>Address Type</Label>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <Input
                      type="radio"
                      id="edit-home"
                      name="type"
                      value="home"
                      checked={formData.type === "home"}
                      onChange={handleChange}
                      className="h-4 w-4"
                    />
                    <Label htmlFor="edit-home">Home</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="radio"
                      id="edit-work"
                      name="type"
                      value="work"
                      checked={formData.type === "work"}
                      onChange={handleChange}
                      className="h-4 w-4"
                    />
                    <Label htmlFor="edit-work">Work</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-street">Street Address</Label>
                <Input id="edit-street" name="street" value={formData.street} onChange={handleChange} required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-city">City</Label>
                  <Input id="edit-city" name="city" value={formData.city} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-state">State/Province</Label>
                  <Input id="edit-state" name="state" value={formData.state} onChange={handleChange} required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-zipCode">ZIP/Postal Code</Label>
                  <Input id="edit-zipCode" name="zipCode" value={formData.zipCode} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-country">Country</Label>
                  <Input id="edit-country" name="country" value={formData.country} onChange={handleChange} required />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Input
                  type="checkbox"
                  id="edit-isDefault"
                  name="isDefault"
                  checked={formData.isDefault}
                  onChange={handleChange}
                  className="h-4 w-4"
                />
                <Label htmlFor="edit-isDefault">Set as default address</Label>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditDialogOpen(false)
                  resetForm()
                }}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Address Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Address</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this address? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsDeleteDialogOpen(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteAddress} disabled={isLoading}>
              {isLoading ? "Deleting..." : "Delete Address"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
