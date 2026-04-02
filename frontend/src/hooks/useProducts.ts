import { useState, useEffect } from 'react'
import { productsAPI } from '../api/products'
import type { Product } from '../types/product'

export const useProducts = (restaurantId: string | undefined) => {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!restaurantId) return

        const fetchProducts = async () => {
            try {
                setLoading(true)
                const data = await productsAPI.getByRestaurant(restaurantId)
                setProducts(data)
            } catch (err) {
                setError('Failed to load products')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [restaurantId])

    return { products, loading, error }
}