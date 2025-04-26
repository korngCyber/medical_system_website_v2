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