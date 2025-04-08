"use client"

import type React from "react"

import { Suspense, useState } from "react"
import ProductList from "@/components/product-list"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

export default function ProductsClientPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "")
  const category = searchParams.get("category")

  // Handle search form submission
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Build the query string
    const params = new URLSearchParams()
    if (searchTerm) params.set("search", searchTerm)
    if (category) params.set("category", category)

    // Navigate to the new URL
    router.push(`/products${params.toString() ? `?${params.toString()}` : ""}`)
  }

  // Handle category selection
  const handleCategoryClick = (selectedCategory: string | null) => {
    const params = new URLSearchParams()
    if (searchTerm) params.set("search", searchTerm)
    if (selectedCategory) params.set("category", selectedCategory)

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

      {/* Search and filter bar */}
      <div className="bg-muted/30 p-4 rounded-lg mb-8">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="pl-10 bg-background"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            <Button
              type="button"
              variant={!category ? "default" : "outline"}
              className="whitespace-nowrap"
              onClick={() => handleCategoryClick(null)}
            >
              All Products
            </Button>
            <Button
              type="button"
              variant={category === "diagnostic" ? "default" : "outline"}
              className="whitespace-nowrap"
              onClick={() => handleCategoryClick("diagnostic")}
            >
              Diagnostic
            </Button>
            <Button
              type="button"
              variant={category === "protection" ? "default" : "outline"}
              className="whitespace-nowrap"
              onClick={() => handleCategoryClick("protection")}
            >
              Protection
            </Button>
            <Button
              type="button"
              variant={category === "emergency" ? "default" : "outline"}
              className="whitespace-nowrap"
              onClick={() => handleCategoryClick("emergency")}
            >
              Emergency
            </Button>
            <Button
              type="button"
              variant={category === "mobility" ? "default" : "outline"}
              className="whitespace-nowrap"
              onClick={() => handleCategoryClick("mobility")}
            >
              Mobility
            </Button>
          </div>
        </form>
      </div>

      <Suspense fallback={<ProductsLoadingSkeleton />}>
        <ProductList />
      </Suspense>
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
