"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"
import { formatPrice } from "@/lib/utils"
import { ShoppingCart, ArrowLeft, Star, Check, Truck, Shield, Clock, AlertTriangle } from "lucide-react"
import type { Product } from "@/types"

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
        // In a real app, this would be an API call
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
            details: {
              features: [
                "Fast 1-second reading",
                "Fever alert with color-coded display",
                "Memory recall of last 10 readings",
                "Waterproof tip for easy cleaning",
                "Automatic shut-off to conserve battery",
              ],
              specifications: {
                "Measurement Range": "32.0°C to 42.9°C (89.6°F to 109.2°F)",
                Accuracy: "±0.1°C (±0.2°F)",
                Battery: "CR2032 lithium (included)",
                Display: "LCD digital display with backlight",
                Dimensions: "12.9 x 2.8 x 1.3 cm",
                Weight: "18g (without battery)",
                Warranty: "1 year",
              },
              images: [
                "/placeholder.svg?height=600&width=600",
                "/placeholder.svg?height=600&width=600&text=Image+2",
                "/placeholder.svg?height=600&width=600&text=Image+3",
              ],
            },
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
            details: {
              features: [
                "Fully automatic operation",
                "Large LCD display with backlight",
                "Irregular heartbeat detection",
                "2-user memory with 60 readings each",
                "Average of last 3 readings",
                "Date and time stamp",
              ],
              specifications: {
                "Measurement Method": "Oscillometric",
                "Pressure Range": "0-299 mmHg",
                "Pulse Range": "40-180 beats/min",
                Accuracy: "Pressure: ±3 mmHg, Pulse: ±5%",
                "Power Source": "4 AA batteries or AC adapter (included)",
                "Cuff Size": "22-42 cm (standard)",
                Dimensions: "13.5 x 10.5 x 6.5 cm",
                Weight: "385g (without batteries)",
                Warranty: "2 years",
              },
              images: [
                "/placeholder.svg?height=600&width=600",
                "/placeholder.svg?height=600&width=600&text=Image+2",
                "/placeholder.svg?height=600&width=600&text=Image+3",
              ],
            },
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
            details: {
              features: [
                "Fast and accurate SpO2 and pulse rate measurement",
                "OLED display with 6 display modes",
                "Rotatable display orientation",
                "Low power consumption",
                "Auto power-off after 8 seconds",
                "Battery level indicator",
              ],
              specifications: {
                "SpO2 Range": "70% - 99%",
                "SpO2 Accuracy": "±2%",
                "Pulse Rate Range": "30 - 240 bpm",
                "Pulse Rate Accuracy": "±1 bpm",
                Power: "2 AAA batteries (included)",
                "Battery Life": "Approximately 30 hours of continuous use",
                Dimensions: "5.8 x 3.5 x 3.5 cm",
                Weight: "50g (including batteries)",
                Warranty: "1 year",
              },
              images: [
                "/placeholder.svg?height=600&width=600",
                "/placeholder.svg?height=600&width=600&text=Image+2",
                "/placeholder.svg?height=600&width=600&text=Image+3",
              ],
            },
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
            details: {
              features: [
                "100+ essential first aid items",
                "Durable, water-resistant case",
                "Organized interior compartments",
                "Comprehensive first aid guide included",
                "Ideal for home, office, car, or outdoor activities",
                "Meets OSHA guidelines for workplace safety",
              ],
              specifications: {
                Contents:
                  "Bandages, gauze pads, antiseptic wipes, scissors, tweezers, gloves, emergency blanket, and more",
                "Case Material": "High-density polyethylene",
                Dimensions: "22 x 16 x 6.5 cm",
                Weight: "680g",
                Certification: "FDA registered",
                Warranty: "Lifetime guarantee",
              },
              images: [
                "/placeholder.svg?height=600&width=600",
                "/placeholder.svg?height=600&width=600&text=Image+2",
                "/placeholder.svg?height=600&width=600&text=Image+3",
              ],
            },
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
            details: {
              features: [
                "Dual-head chest piece (diaphragm and bell)",
                "Tunable diaphragm technology",
                "Anatomically designed headset",
                "High-quality acoustic performance",
                "Durable stainless steel construction",
                "Non-chill rim and diaphragm",
              ],
              specifications: {
                "Chest Piece Material": "Stainless steel",
                "Tube Length": "27 inches (69 cm)",
                "Tube Material": "PVC, latex-free",
                Weight: "150g",
                "Included Accessories": "Extra ear tips, diaphragm",
                Warranty: "5 years",
              },
              images: [
                "/placeholder.svg?height=600&width=600",
                "/placeholder.svg?height=600&width=600&text=Image+2",
                "/placeholder.svg?height=600&width=600&text=Image+3",
              ],
            },
          },
        ]

        const foundProduct = mockProducts.find((p) => p.id === params.id)

        if (foundProduct) {
          setProduct(foundProduct)
        } else {
          router.push("/products")
        }

        setLoading(false)
      } catch (error) {
        console.error("Error fetching product:", error)
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params.id, router])

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addItem(product)
      }
      toast({
        title: "Added to Cart",
        description: `${quantity} ${quantity > 1 ? "items" : "item"} added to your cart.`,
      })
    }
  }

  if (loading || !product) {
    return (
      <div className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="aspect-square bg-muted animate-pulse rounded-lg" />
          <div className="space-y-4">
            <div className="h-8 bg-muted animate-pulse rounded w-3/4" />
            <div className="h-6 bg-muted animate-pulse rounded w-1/2" />
            <div className="h-24 bg-muted animate-pulse rounded w-full" />
            <div className="h-10 bg-muted animate-pulse rounded w-1/3" />
            <div className="h-12 bg-muted animate-pulse rounded w-full" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <Button variant="ghost" className="mb-6 flex items-center gap-2" onClick={() => router.push("/products")}>
        <ArrowLeft className="h-4 w-4" /> Back to Products
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-muted/20 rounded-lg overflow-hidden">
            <img
              src={product.details?.images?.[activeImage] || product.image}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>
          {product.details?.images && product.details.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.details.images.map((image, index) => (
                <button
                  key={index}
                  className={`w-20 h-20 rounded-md overflow-hidden border-2 ${
                    activeImage === index ? "border-primary" : "border-transparent"
                  }`}
                  onClick={() => setActiveImage(index)}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} - Image ${index + 1}`}
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
              {product.category}
            </Badge>
            {product.featured && <Badge className="bg-primary text-primary-foreground">Featured</Badge>}
            {product.inStock ? (
              <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                In Stock
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                Out of Stock
              </Badge>
            )}
          </div>

          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-muted"}`} />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">4.0 (24 reviews)</span>
          </div>

          <p className="text-2xl font-bold mb-4">{formatPrice(product.price)}</p>

          <p className="text-muted-foreground mb-6">{product.description}</p>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-none"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </Button>
              <span className="w-10 text-center">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-none"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Button>
            </div>
            <Button className="flex-1" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card className="p-3 flex items-center gap-2 bg-muted/20 border-none">
              <Truck className="h-5 w-5 text-primary" />
              <div className="text-sm">
                <p className="font-medium">Free Shipping</p>
                <p className="text-muted-foreground">On orders over $100</p>
              </div>
            </Card>
            <Card className="p-3 flex items-center gap-2 bg-muted/20 border-none">
              <Shield className="h-5 w-5 text-primary" />
              <div className="text-sm">
                <p className="font-medium">Warranty</p>
                <p className="text-muted-foreground">{product.details?.specifications?.Warranty || "1 year"}</p>
              </div>
            </Card>
            <Card className="p-3 flex items-center gap-2 bg-muted/20 border-none">
              <Clock className="h-5 w-5 text-primary" />
              <div className="text-sm">
                <p className="font-medium">Fast Delivery</p>
                <p className="text-muted-foreground">2-3 business days</p>
              </div>
            </Card>
            <Card className="p-3 flex items-center gap-2 bg-muted/20 border-none">
              <AlertTriangle className="h-5 w-5 text-primary" />
              <div className="text-sm">
                <p className="font-medium">30-Day Returns</p>
                <p className="text-muted-foreground">Hassle-free returns</p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="features">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="features" className="p-4 border rounded-md mt-4">
            <h3 className="text-lg font-medium mb-4">Key Features</h3>
            <ul className="space-y-2">
              {product.details?.features?.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="specifications" className="p-4 border rounded-md mt-4">
            <h3 className="text-lg font-medium mb-4">Technical Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.details?.specifications &&
                Object.entries(product.details.specifications).map(([key, value], index) => (
                  <div key={index} className="flex justify-between border-b pb-2">
                    <span className="font-medium">{key}</span>
                    <span className="text-muted-foreground">{value}</span>
                  </div>
                ))}
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="p-4 border rounded-md mt-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium">Customer Reviews</h3>
              <Button variant="outline">Write a Review</Button>
            </div>
            <div className="space-y-6">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="border-b pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-muted"}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium">John D.</span>
                    <span className="text-xs text-muted-foreground">Verified Purchase</span>
                  </div>
                  <p className="mb-2">
                    {index === 0
                      ? "Great product! Exactly what I needed for my home medical kit. Easy to use and very accurate."
                      : index === 1
                        ? "Good quality for the price. Delivery was fast and the product works as described."
                        : "Works well but the instructions could be clearer. Overall satisfied with my purchase."}
                  </p>
                  <p className="text-xs text-muted-foreground">Posted on {new Date().toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, index) => (
            <Card
              key={index}
              className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => router.push(`/products/${index + 1}`)}
            >
              <div className="aspect-square bg-muted/20">
                <img
                  src="/placeholder.svg?height=200&width=200"
                  alt="Related Product"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="font-medium line-clamp-1">Related Medical Product {index + 1}</h3>
                <p className="text-sm text-muted-foreground line-clamp-1">Brief product description</p>
                <p className="font-bold mt-1">{formatPrice(1999 + index * 1000)}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
