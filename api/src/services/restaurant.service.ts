import { supabase } from '../lib/supabase'

export const getRestaurants = async () => {
    const { data, error } = await supabase
        .from('restaurants')
        .select('*')

    if (error) throw error
    return data
}

export const getProductsByRestaurant = async (restaurantId: string) => {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('restaurant_id', restaurantId)

    if (error) throw error
    return data
}