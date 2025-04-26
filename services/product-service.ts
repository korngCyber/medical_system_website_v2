// services/product-service.ts
import type { Product, ProductResponse } from "@/types"
import { api } from "@/services/api"

export const productService = {
  getProducts: async (): Promise<Product[]> => {
    try {
      const response = await api.get<ProductResponse>("/product")
      return response.products.map(product => ({
        ...product,
        proPrice: parseFloat(product.proPrice).toFixed(2)
      }))
    } catch (error) {
      console.error("Failed to fetch products:", error)
      return []
    }
  },

  getProductById: async (id: string): Promise<Product | null> => {
    try {
      const response = await api.get<Product>(`/product/${id}`)
      return {
        ...response,
        proPrice: parseFloat(response.proPrice).toFixed(2)
      }
    } catch (error) {
      console.error(`Failed to fetch product with ID ${id}:`, error)
      return null
    }
  }
}
export const getImageUrl = (imagePath: string | undefined | null): string => {
  if (!imagePath) return '/placeholder-image.jpg'; // A default placeholder
  
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';
  
  // For API endpoints, we'd use ${baseUrl}/api/v1/...
  // But for static assets like images, we just use the base URL
  
  // Ensure we don't double up on slashes
  if (imagePath.startsWith('/')) {
    return `${baseUrl}${imagePath}`;
  }
  
  return `${baseUrl}/${imagePath}`;
};