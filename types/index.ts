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