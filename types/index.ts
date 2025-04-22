// types/index.ts
export type Product = {
  proId: number
  proName: string
  proDescription: string
  proPrice: string
  proStatus: string
  catId: number
  images: ProductImage[]
}

export type ProductImage = {
  id: number
  imageUrl: string
}

export type ProductResponse = {
  totalItems: number
  totalPages: number
  currentPage: number
  products: Product[]
}