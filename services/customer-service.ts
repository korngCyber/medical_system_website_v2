import { api } from './api'

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

export const customerService = {
    getCustomerById: async (id: number): Promise<Customer | null> => {
        try {
            const response = await api.get<Customer>(`/customer/${id}`)
            return response
        } catch (error) {
            console.error('Failed to fetch customer:', error)
            return null
        }
    }
}