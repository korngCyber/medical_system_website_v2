"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Trash2, Plus, Minus } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/hooks/use-cart"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { orderService } from "@/services/order-service"

export default function CartPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { items, removeItem, updateQuantity, clearCart } = useCart()
  const { toast } = useToast()
  const [paymentMethod, setPaymentMethod] = useState("cod")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push('/login')
      toast({
        title: "Authentication Required",
        description: "Please login to access your cart",
        variant: "destructive",
      })
    }
  }, [user, router, toast])

  const subtotal = items.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)

  const shippingCost = subtotal > 10000 ? 0 : 1000
  const total = subtotal + shippingCost

  const handleCheckout = async () => {
    if (!user?.id) {
      toast({
        title: "Authentication Required",
        description: "Please login to checkout",
        variant: "destructive",
      })
      router.push('/login')
      return
    }

    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add items to your cart before checking out",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const orderData = {
        orderDate: new Date().toISOString().split('T')[0],
        orderStatus: "pending",
        orderTotalAmount: Number(total),
        orderPaymentMethod: "credit_card", // Fixed value as per API
        orderShipping: "standard",
        cusId: Number(user.id),
        products: items.map(item => ({
          proId: Number(item.id),
          quantity: Number(item.quantity),
          price: Number(item.price)
        }))
      }

      console.log("Sending order:", orderData)

      const response = await orderService.createOrder(orderData)
      console.log("Order response:", response)

      if (response.orderId) {
        toast({
          title: "Order Placed Successfully",
          description: `Order #${response.orderId} has been created.`,
        })
        clearCart()
        router.push(`/order-success?orderId=${response.orderId}`)
      }
    } catch (error: any) {
      console.error("Checkout failed:", error)
      toast({
        title: "Checkout Failed",
        description: error.message || "Failed to process order",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Cart Items ({items.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 py-4 border-b last:border-0">
                        <div className="h-20 w-20 bg-muted rounded overflow-hidden">
                          {item.image && (
                              <img
                                  src={`http://localhost:3002/${item.image}`}
                                  alt={item.name}
                                  className="h-full w-full object-cover"
                              />
                          )}
                        </div>

                        <div className="flex-grow">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">Category: {item.category}</p>
                          <p className="font-bold mt-1">{formatPrice(item.price)}</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <Input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => {
                                const value = parseInt(e.target.value)
                                if (!isNaN(value)) {
                                  updateQuantity(item.id, value)
                                }
                              }}
                              className="w-14 h-8 text-center"
                          />
                          <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={clearCart}>
                  Clear Cart
                </Button>
                <Link href="/products">
                  <Button variant="outline">Continue Shopping</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? "Free" : formatPrice(shippingCost)}</span>
                </div>
                <div className="border-t pt-4 flex justify-between font-bold">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>

                <div className="mt-6">
                  <h3 className="font-medium mb-2">Payment Method</h3>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod">Cash on Delivery</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="bank" id="bank" />
                      <Label htmlFor="bank">Bank Transfer</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                    className="w-full"
                    onClick={handleCheckout}
                    disabled={isLoading || !user}
                >
                  {isLoading
                      ? "Processing..."
                      : !user
                          ? "Login to Checkout"
                          : `Checkout • ${formatPrice(total)}`}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
  )
}