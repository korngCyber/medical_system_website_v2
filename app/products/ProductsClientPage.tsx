// app/products/ProductsClientPage.tsx
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { Product } from "@/types"
import { productService } from "@/services/product-service"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

export default function ProductsClientPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "")
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      try {
        const data = await productService.getProducts()
        setProducts(data)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts = products.filter(product =>
      searchTerm.toLowerCase() === '' ||
      product.proName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchTerm) params.set("search", searchTerm)
    router.push(`/products${params.toString() ? `?${params.toString()}` : ""}`)
  }

  return (
      <div className="container py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Medical Products</h1>
            <p className="text-muted-foreground mt-1">Browse our comprehensive selection of quality medical supplies</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              Free Shipping on Orders Over $100
            </Badge>
            <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
              30-Day Returns
            </Badge>
          </div>
        </div>

        <div className="bg-muted/30 p-4 rounded-lg mb-8">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search products..."
                  className="pl-10 bg-background"
              />
            </div>
          </form>
        </div>

        {isLoading ? (
            <ProductsLoadingSkeleton />
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                  <div key={product.proId}
                       className="border rounded-lg overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                       onClick={() => router.push(`/products/${product.proId}`)}>
                    {product.images?.[0] && (
                        <div className="aspect-square relative">
                          <img
                              src={`${process.env.NEXT_PUBLIC_API_URL}/${product.images[0].imageUrl}`}
                              alt={product.proName}
                              className="object-cover w-full h-full"
                          />
                        </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold">{product.proName}</h3>
                      <p className="text-sm text-muted-foreground">{product.proDescription}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="font-bold">${product.proPrice}</span>
                        <Badge>{product.proStatus}</Badge>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
        )}
      </div>
  )
}

function ProductsLoadingSkeleton() {
  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
            <div key={i} className="border rounded-lg overflow-hidden shadow-sm">
              <Skeleton className="h-48 w-full" />
              <div className="p-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3 mb-4" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
        ))}
      </div>
  )
}