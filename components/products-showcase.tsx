"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { useRouter } from "next/navigation"
import type { Product } from "@/types"
import { formatPrice } from "@/lib/utils"

export default function ProductsShowcase() {
  const { addItem } = useCart()
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Fetch featured products
    const fetchProducts = async () => {
      try {
        // In a real app, this would be an API call
        // For now, we'll use mock data
        const mockProducts: Product[] = [
          {
            id: "1",
            name: "Digital Thermometer",
            description: "Accurate digital thermometer for temperature measurement",
            price: 1999,
            category: "Diagnostic",
            image: "/placeholder.svg?height=300&width=300",
            featured: true,
            inStock: true,
          },
          {
            id: "2",
            name: "Blood Pressure Monitor",
            description: "Automatic blood pressure monitor for home use",
            price: 5999,
            category: "Diagnostic",
            image: "/placeholder.svg?height=300&width=300",
            featured: true,
            inStock: true,
          },
          {
            id: "3",
            name: "Pulse Oximeter",
            description: "Fingertip pulse oximeter for SpO2 measurement",
            price: 2499,
            category: "Diagnostic",
            image: "/placeholder.svg?height=300&width=300",
            featured: true,
            inStock: true,
          },
          {
            id: "4",
            name: "First Aid Kit",
            description: "Comprehensive first aid kit for emergencies",
            price: 3499,
            category: "Emergency",
            image: "/placeholder.svg?height=300&width=300",
            featured: true,
            inStock: true,
          },
          {
            id: "5",
            name: "Stethoscope",
            description: "Professional stethoscope for medical examination",
            price: 4999,
            category: "Diagnostic",
            image: "/placeholder.svg?height=300&width=300",
            featured: true,
            inStock: true,
          },
          {
            id: "6",
            name: "Surgical Masks (50 pcs)",
            description: "Disposable 3-ply surgical masks",
            price: 1499,
            category: "Protection",
            image: "/placeholder.svg?height=300&width=300",
            featured: true,
            inStock: true,
          },
        ]

        setProducts(mockProducts)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching products:", error)
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current: container } = scrollContainerRef
      const scrollAmount = direction === "left" ? -container.clientWidth : container.clientWidth
      container.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  const viewProductDetails = (productId: string) => {
    router.push(`/products/${productId}`)
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <div className="aspect-square bg-muted animate-pulse" />
            <CardContent className="p-4">
              <div className="h-4 bg-muted animate-pulse rounded mb-2" />
              <div className="h-4 bg-muted animate-pulse rounded w-2/3" />
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <div className="h-10 bg-muted animate-pulse rounded w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-background shadow-sm border hidden md:flex"
        onClick={() => scroll("left")}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <div ref={scrollContainerRef} className="flex overflow-x-auto gap-6 pb-4 snap-x scrollbar-hide">
        {products.map((product) => (
          <div key={product.id} className="min-w-[280px] max-w-[280px] snap-start">
            <Card
              className="h-full flex flex-col cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => viewProductDetails(product.id)}
            >
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="object-cover w-full h-full transition-transform hover:scale-105"
                />
              </div>
              <CardContent className="p-4 flex-grow">
                <h3 className="font-medium text-lg mb-1 line-clamp-1">{product.name}</h3>
                <p className="text-muted-foreground text-sm line-clamp-2">{product.description}</p>
                <p className="font-bold mt-2">{formatPrice(product.price)}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation()
                    addItem(product)
                  }}
                >
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-background shadow-sm border hidden md:flex"
        onClick={() => scroll("right")}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  )
}
