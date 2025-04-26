// types/index.ts

type Product = {
  proId: string | number;
  proName: string;
  proPrice: string | number;
  proDescription: string;
  proStatus: string;
  catId: string | number;
  images?: ProductImage[];
  // other fields...
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
// types/index.ts
export type User = {
  id: number
  name: string
  email: string
  role: string
}

export type Customer = {
  cusId: number
  cusName: string
  cusEmail: string
  cusPhone: string
  cusAddress: string
  cusStatus: boolean
  cusPassword: string
  cusRole: string
  cusImage: string | null
  cusBio: string | null
  created_at: string
  updated_at: string
  deleted_at: string | null
}