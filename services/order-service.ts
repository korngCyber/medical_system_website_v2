import { api } from "@/lib/axios"
import type { OrderCreate, OrderResponse } from "@/types"

export const orderService = {
    async createOrder(orderData: OrderCreate): Promise<OrderResponse> {
        try {
            const response = await api.post<OrderResponse>("/order", orderData)
            return response.data
        } catch (error: any) {
            throw error
        }
    }
}