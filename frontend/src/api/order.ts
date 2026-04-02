import { api } from './axiosInstance'
import type { Order } from '../types/order'

export const ordersAPI = {
    create: async (data: {
        delivery_address: string
        delivery_phone: string
        notes?: string
    }): Promise<Order> => {
        const response = await api.post('/orders', data)
        return response.data.data
    },

    getAll: async (): Promise<Order[]> => {
        const response = await api.get('/orders')
        return response.data.data
    },

    getById: async (id: string): Promise<Order> => {
        const response = await api.get(`/orders/${id}`)
        return response.data.data
    },

    cancel: async (id: string): Promise<Order> => {
        const response = await api.patch(`/orders/${id}/cancel`)
        return response.data.data
    }
}