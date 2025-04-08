export interface User {
  id: string
  name: string
  email: string
  image?: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  image?: string
  featured?: boolean
  inStock?: boolean
}

export interface CartItem extends Product {
  quantity: number
}

export interface Address {
  id: string
  name: string
  type: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  isDefault: boolean
}

export interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
}

export interface Order {
  id: string
  date: Date
  status: string
  total: number
  paymentMethod: string
  items: OrderItem[]
  shippingAddress: {
    name: string
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
}
