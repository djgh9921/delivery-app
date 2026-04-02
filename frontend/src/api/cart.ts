import { api } from './axiosInstance'
import type { Cart, CartItem } from '../types/cart'

export const cartAPI = {
    get: async (): Promise<Cart | null> => {
        const { data } = await api.get('/cart')
        return data.data
    },

    addItem: async (product_id: string, quantity: number = 1): Promise<CartItem> => {
        const { data } = await api.post('/cart/items', { product_id, quantity })
        return data.data
    },

    updateItem: async (itemId: string, quantity: number): Promise<CartItem> => {
        const { data } = await api.put(`/cart/items/${itemId}`, { quantity })
        return data.data
    },

    removeItem: async (itemId: string): Promise<void> => {
        await api.delete(`/cart/items/${itemId}`)
    },

    clear: async (): Promise<void> => {
        await api.delete('/cart/clear')
    }
}