import { useState, useEffect } from 'react'
import { useRestaurants } from "../hooks/useRestaurants"
import { RestaurantDetailsPage } from './RestaurantDetailsPage'

export function RestaurantsPage() {
    const { restaurants, loading, error } = useRestaurants()
    const [selectedId, setSelectedId] = useState<string | null>(null)

    useEffect(() => {
        if (restaurants.length && !selectedId) {
            setSelectedId(restaurants[0].id)
        }
    }, [restaurants, selectedId])

    if (loading) return <div>Loading...</div>
    if (error) return <div className="text-red-500">{error}</div>

    return (
        <div className="max-w-7xl mx-auto grid lg:grid-cols-4 gap-6">
            <div className="col-span-1 space-y-2">
                {restaurants.map(r => (
                    <div
                        key={r.id}
                        onClick={() => setSelectedId(r.id)}
                        className={`p-4 rounded-xl shadow cursor-pointer transition
                            ${selectedId === r.id
                            ? 'bg-black text-white'
                            : 'bg-white hover:shadow-lg'
                        }`}
                    >
                        {r.name}
                    </div>
                ))}
            </div>

            <div className="col-span-3">
                {selectedId ? (
                    <RestaurantDetailsPage id={selectedId} />
                ) : (
                    <p className="text-gray-500">
                        Виберіть ресторан
                    </p>
                )}
            </div>
        </div>
    )
}