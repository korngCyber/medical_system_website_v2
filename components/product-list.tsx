"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useSearchParams, useRouter } from "next/navigation"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"
import type { Product } from "@/types"
import { formatPrice } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Star, Eye } from "lucide-react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function ProductList() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { addItem } = useCart()
  const { toast } = useToast()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const category = searchParams.get("category")
  const sort = searchParams.get("sort")
  const search = searchParams.get("search")

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)

      try {
        // In a real app, this would be an API call with filters
        // For now, we'll use mock data
        const mockProducts: Product[] = [
          {
            id: "1",
            name: "Digital Thermometer",
            description: "Accurate digital thermometer for temperature measurement with fast reading and fever alert",
            price: 1999,
            category: "Diagnostic",
            image: "/placeholder.svg?height=300&width=300",
            featured: true,
            inStock: true,
          },
          {
            id: "2",
            name: "Blood Pressure Monitor",
            description: "Automatic blood pressure monitor for home use with large display and memory function",
            price: 5999,
            category: "Diagnostic",
            image: "/placeholder.svg?height=300&width=300",
            featured: true,
            inStock: true,
          },
          {
            id: "3",
            name: "Pulse Oximeter",
            description: "Fingertip pulse oximeter for SpO2 measurement with OLED display and auto power-off",
            price: 2499,
            category: "Diagnostic",
            image: "/placeholder.svg?height=300&width=300",
            featured: true,
            inStock: true,
          },
          {
            id: "4",
            name: "First Aid Kit",
            description: "Comprehensive first aid kit for emergencies with 100+ medical supplies and guide",
            price: 3499,
            category: "Emergency",
            image: "/placeholder.svg?height=300&width=300",
            featured: true,
            inStock: true,
          },
          {
            id: "5",
            name: "Stethoscope",
            description: "Professional stethoscope for medical examination with dual-head chest piece",
            price: 4999,
            category: "Diagnostic",
            image: "/placeholder.svg?height=300&width=300",
            featured: true,
            inStock: true,
          },
          {
            id: "6",
            name: "Surgical Masks (50 pcs)",
            description: "Disposable 3-ply surgical masks with melt-blown filter layer and adjustable nose clip",
            price: 1499,
            category: "Protection",
            image: "/placeholder.svg?height=300&width=300",
            featured: true,
            inStock: true,
          },
          {
            id: "7",
            name: "Hand Sanitizer (500ml)",
            description: "Alcohol-based hand sanitizer with moisturizing formula and quick-dry technology",
            price: 899,
            category: "Protection",
            image: "/placeholder.svg?height=300&width=300",
            featured: false,
            inStock: true,
          },
          {
            id: "8",
            name: "Disposable Gloves (100 pcs)",
            description: "Latex-free disposable examination gloves with powder-free design and textured fingertips",
            price: 1999,
            category: "Protection",
            image: "/placeholder.svg?height=300&width=300",
            featured: false,
            inStock: true,
          },
          {
            id: "9",
            name: "Glucose Monitor",
            description: "Blood glucose monitoring system with fast results and large memory storage",
            price: 6999,
            category: "Diagnostic",
            image: "/placeholder.svg?height=300&width=300",
            featured: false,
            inStock: true,
          },
          {
            id: "10",
            name: "Wheelchair",
            description: "Foldable wheelchair for mobility assistance with padded armrests and adjustable footrests",
            price: 29999,
            category: "Mobility",
            image: "/placeholder.svg?height=300&width=300",
            featured: false,
            inStock: true,
          },
          {
            id: "11",
            name: "Walking Cane",
            description: "Adjustable walking cane with ergonomic handle and non-slip rubber tip",
            price: 2499,
            category: "Mobility",
            image: "/placeholder.svg?height=300&width=300",
            featured: false,
            inStock: true,
          },
          {
            id: "12",
            name: "Nebulizer",
            description:
              "Portable nebulizer for respiratory treatment with quiet operation and quick medication delivery",
            price: 4999,
            category: "Respiratory",
            image: "/placeholder.svg?height=300&width=300",
            featured: false,
            inStock: true,
          },
        ]

        // Filter by category if provided
        let filteredProducts = category
          ? mockProducts.filter((p) => p.category.toLowerCase() === category.toLowerCase())
          : mockProducts

        // Filter by search term if provided
        if (search) {
          const searchLower = search.toLowerCase()
          filteredProducts = filteredProducts.filter(
            (p) => p.name.toLowerCase().includes(searchLower) || p.description.toLowerCase().includes(searchLower),
          )
        }

        // Sort products
        if (sort) {
          switch (sort) {
            case "price-asc":
              filteredProducts.sort((a, b) => a.price - b.price)
              break
            case "price-desc":
              filteredProducts.sort((a, b) => b.price - a.price)
              break
            case "name-asc":
              filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
              break
            case "name-desc":
              filteredProducts.sort((a, b) => b.name.localeCompare(a.name))
              break
            default:
              break
          }
        }

        setTotalPages(Math.ceil(filteredProducts.length / 8))

        // Paginate results
        const startIndex = (currentPage - 1) * 8
        const paginatedProducts = filteredProducts.slice(startIndex, startIndex + 8)

        setProducts(paginatedProducts)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching products:", error)
        setLoading(false)
      }
    }

    fetchProducts()
  }, [category, sort, search, currentPage])

  const handleAddToCart = (product: Product) => {
    addItem(product)
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const viewProductDetails = (productId: string) => {
    router.push(`/products/${productId}`)
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="overflow-hidden shadow-md border-none">
            <div className="aspect-square bg-muted animate-pulse" />
            <CardContent className="p-4">
              <div className="h-4 bg-muted animate-pulse rounded mb-2" />
              <div className="h-4 bg-muted animate-pulse rounded w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12 border rounded-md bg-muted/20">
        <h3 className="text-xl font-medium mb-2">No products found</h3>
        <p className="text-muted-foreground mb-6">Try adjusting your filters or search term</p>
        <Button variant="outline" onClick={() => router.push("/products")}>
          Clear Filters
        </Button>
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card
            key={product.id}
            className="overflow-hidden flex flex-col group shadow-md border-none hover:shadow-lg transition-all duration-300 cursor-pointer"
            onClick={() => viewProductDetails(product.id)}
          >
            <div className="aspect-square relative overflow-hidden bg-muted/20">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
              <div className="absolute top-2 right-2">
                <Button
                  variant="secondary"
                  size="icon"
                  className="bg-background/80 backdrop-blur-sm hover:bg-background shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  onClick={(e) => {
                    e.stopPropagation()
                    viewProductDetails(product.id)
                  }}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
              {product.featured && (
                <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">Featured</Badge>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <Button
                  className="w-full"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleAddToCart(product)
                  }}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
              </div>
            </div>
            <CardContent className="p-4 flex-grow">
              <div className="flex items-center mb-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-3 w-3 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-muted"}`} />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground ml-2">(24)</span>
              </div>
              <h3 className="font-medium text-lg mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                {product.name}
              </h3>
              <p className="text-muted-foreground text-sm line-clamp-2 mb-2">{product.description}</p>
              <p className="font-bold text-lg">{formatPrice(product.price)}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage > 1) setCurrentPage(currentPage - 1)
                }}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    setCurrentPage(i + 1)
                  }}
                  isActive={currentPage === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                }}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}
