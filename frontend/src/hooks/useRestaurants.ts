import { useState, useEffect } from 'react'
import { restaurantsAPI } from '../api/restaurants'
// import { Restaurant } from './types'
import type { Restaurant } from "../types/restaurant.ts";

export const useRestaurants = () => {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let isMounted = true

        const fetchRestaurants = async () => {
            try {
                const data = await restaurantsAPI.getAll()
                if (isMounted) setRestaurants(data)
            } catch {
                if (isMounted) setError('Failed to load restaurants')
            } finally {
                if (isMounted) setLoading(false)
            }
        }

        fetchRestaurants()

        return () => {
            isMounted = false
        }
    }, [])

    return { restaurants, loading, error }
}