import { api } from './axiosInstance'
import type { Restaurant } from '../types/restaurant.ts'

export const restaurantsAPI = {
    getAll: async (): Promise<Restaurant[]> => {
        const { data } = await api.get('/restaurants')
        return data
    },

    getById: async (id: string): Promise<Restaurant> => {
        const { data } = await api.get(`/restaurants/${id}`)
        return data
    }
}