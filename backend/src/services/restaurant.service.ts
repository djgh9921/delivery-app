import {supabase} from '../lib/supabase'
import { AppError } from '../middleware/error.middleware'

export const getRestaurants = async () => {
    const {data, error} = await supabase
        .from('restaurants')
        .select('*')

    if (error) throw error
    return data
}

export const getRestaurantById = async (restaurantId: string) => {
    const { data, error } = await supabase
        .from('restaurants')
        .select('*')
        .eq('id', restaurantId)
        .maybeSingle()

    if (error) {
        throw new AppError('Failed to fetch restaurant', 500)
    }

    if (!data) {
        throw new AppError('Restaurant not found', 404)
    }

    return data
}

export const getProductsByRestaurant = async (restaurantId: string) => {
    const {data, error} = await supabase
        .from('products')
        .select(`
            *,
            categories!inner(name)
        `)
        .eq('restaurant_id', restaurantId)

    if (error) throw error
    return data.map(p => ({
        ...p,
        category_name: p.categories?.name ?? 'Other'
    }))
}
