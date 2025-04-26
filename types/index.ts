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
export type OrderProduct = {
  proId: number
  quantity: number
  price: number
}

export type OrderCreate = {
  orderDate: string
  orderStatus: string
  orderTotalAmount: number
  orderPaymentMethod: string
  orderShipping: string
  cusId: number
  products: OrderProduct[]
}

export type OrderResponse = {
  orderPaymentStatus: string
  orderId: number
  orderDate: string
  orderStatus: string
  orderTotalAmount: string
  orderPaymentMethod: string
  orderShipping: string
  cusId: number
  updated_at: string
  created_at: string
  deleted_at: string | null
}