"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/utils"
import type { Order } from "@/types"

export default function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // In a real app, this would be an API call
        // For now, we'll use mock data
        const mockOrders: Order[] = [
          {
            id: "ORD-1234",
            date: new Date(2023, 3, 15),
            status: "delivered",
            total: 7998,
            paymentMethod: "bank",
            items: [
              {
                id: "1",
                name: "Digital Thermometer",
                price: 1999,
                quantity: 1,
                image: "/placeholder.svg?height=80&width=80",
              },
              {
                id: "2",
                name: "Blood Pressure Monitor",
                price: 5999,
                quantity: 1,
                image: "/placeholder.svg?height=80&width=80",
              },
            ],
            shippingAddress: {
              name: "John Doe",
              street: "123 Main St",
              city: "New York",
              state: "NY",
              zipCode: "10001",
              country: "USA",
            },
          },
          {
            id: "ORD-1235",
            date: new Date(2023, 2, 28),
            status: "processing",
            total: 4998,
            paymentMethod: "cod",
            items: [
              {
                id: "5",
                name: "Stethoscope",
                price: 4998,
                quantity: 1,
                image: "/placeholder.svg?height=80&width=80",
              },
            ],
            shippingAddress: {
              name: "John Doe",
              street: "123 Main St",
              city: "New York",
              state: "NY",
              zipCode: "10001",
              country: "USA",
            },
          },
        ]

        setOrders(mockOrders)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching orders:", error)
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "processing":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
            Processing
          </Badge>
        )
      case "shipped":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
            Shipped
          </Badge>
        )
      case "delivered":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
            Delivered
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPaymentMethod = (method: string) => {
    switch (method) {
      case "cod":
        return "Cash on Delivery"
      case "bank":
        return "Bank Transfer"
      default:
        return method
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-10 bg-muted animate-pulse rounded" />
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-16 bg-muted animate-pulse rounded" />
        ))}
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">No orders yet</h3>
        <p className="text-muted-foreground mb-6">You haven&apos;t placed any orders yet</p>
        <Button variant="outline" onClick={() => (window.location.href = "/products")}>
          Browse Products
        </Button>
      </div>
    )
  }

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Order History</h3>

      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.date.toLocaleDateString()}</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell>{formatPrice(order.total)}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => setSelectedOrder(order)}>
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Order Details - {selectedOrder?.id}</DialogTitle>
            <DialogDescription>Placed on {selectedOrder?.date.toLocaleDateString()}</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">Status</h4>
                {selectedOrder && getStatusBadge(selectedOrder.status)}
              </div>
              <div>
                <h4 className="font-medium">Payment Method</h4>
                <p>{selectedOrder && getPaymentMethod(selectedOrder.paymentMethod)}</p>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Items</h4>
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead className="text-right">Subtotal</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedOrder?.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="h-10 w-10 object-cover rounded"
                            />
                            <span>{item.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{formatPrice(item.price)}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell className="text-right">{formatPrice(item.price * item.quantity)}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={3} className="text-right font-medium">
                        Total
                      </TableCell>
                      <TableCell className="text-right font-bold">
                        {selectedOrder && formatPrice(selectedOrder.total)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Shipping Address</h4>
              <div className="border rounded-md p-4">
                <p className="font-medium">{selectedOrder?.shippingAddress.name}</p>
                <p>{selectedOrder?.shippingAddress.street}</p>
                <p>
                  {selectedOrder?.shippingAddress.city}, {selectedOrder?.shippingAddress.state}{" "}
                  {selectedOrder?.shippingAddress.zipCode}
                </p>
                <p>{selectedOrder?.shippingAddress.country}</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
