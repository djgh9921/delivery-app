import { api } from './axiosInstance'
import type { Product } from '../types/product'

export const productsAPI = {
    getByRestaurant: async (restaurantId: string): Promise<Product[]> => {
        const { data } = await api.get(`/restaurants/${restaurantId}/products`)
        return data
    }
}