// app/products/[id]/page.tsx
"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"
import { productService } from "@/services/product-service"
import { ArrowLeft, ShoppingCart } from "lucide-react"
import type { Product, ProductImage } from "@/types"

type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addItem } = useCart()
  const { toast } = useToast()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      try {
        const productData = await productService.getProductById(params.id as string)
        if (productData) {
          setProduct(productData)
        } else {
          router.push("/products")
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load product details",
          variant: "destructive",
        })
        router.push("/products")
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchProduct()
    }
  }, [params.id, router, toast])

  const handleAddToCart = () => {
    if (product) {
      const cartItem: CartItem = {
        id: product.proId.toString(),
        name: product.proName,
        price: parseFloat(product.proPrice),
        quantity: quantity,
        image: product.images?.[0]?.imageUrl
      }
      addItem(cartItem)
      toast({
        title: "Added to Cart",
        description: `${quantity} ${quantity > 1 ? "items" : "item"} added to your cart.`,
      })
    }
  }

  if (loading || !product) {
    return <ProductDetailSkeleton />
  }

  return (
      <div className="container py-10">
        <Button
            variant="ghost"
            className="mb-6"
            onClick={() => router.push("/products")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-muted/20 rounded-lg overflow-hidden">
              {product.images?.[activeImage]?.imageUrl && (
                  <img
                      src={`${process.env.NEXT_PUBLIC_API_URL}/${product.images[activeImage].imageUrl}`}
                      alt={product.proName}
                      className="w-full h-full object-contain"
                  />
              )}
            </div>
            {product.images?.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {product.images.map((image: ProductImage, index: number) => (
                      <button
                          key={image.id}
                          className={`w-20 h-20 rounded-md overflow-hidden border-2
                    ${activeImage === index ? "border-primary" : "border-transparent"}`}
                          onClick={() => setActiveImage(index)}
                      >
                        <img
                            src={`${process.env.NEXT_PUBLIC_API_URL}/${image.imageUrl}`}
                            alt={`${product.proName} - Image ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                      </button>
                  ))}
                </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="bg-muted/50">
                Category {product.catId}
              </Badge>
              <Badge
                  variant={product.proStatus === 'in-stock' ? "outline" : "destructive"}
                  className={product.proStatus === 'in-stock' ? "bg-green-50 text-green-600" : ""}
              >
                {product.proStatus}
              </Badge>
            </div>

            <h1 className="text-3xl font-bold mb-4">{product.proName}</h1>
            <p className="text-muted-foreground mb-6">{product.proDescription}</p>
            <p className="text-2xl font-bold mb-6">${product.proPrice}</p>

            {product.proStatus === 'in-stock' ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded-md">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                    >
                      -
                    </Button>
                    <span className="w-10 text-center">{quantity}</span>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10"
                        onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                  <Button className="flex-1" onClick={handleAddToCart}>
                    <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                  </Button>
                </div>
            ) : (
                <Badge variant="destructive" className="text-base py-2 px-4">
                  Out of Stock
                </Badge>
            )}
          </div>
        </div>
      </div>
  )
}

function ProductDetailSkeleton() {
  return (
      <div className="container py-10">
        <Skeleton className="h-10 w-32 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Skeleton className="aspect-square w-full" />
            <div className="flex gap-2">
              {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="w-20 h-20" />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
  )
}