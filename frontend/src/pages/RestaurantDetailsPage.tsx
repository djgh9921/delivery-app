// import { useParams } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'
// import { useState } from 'react'


type Props = {
    id: string
}

export function RestaurantDetailsPage({ id }: Props) {
    const { products, loading, error } = useProducts(id)

    if (loading) return <div>Loading...</div>
    if (error) return <div className="text-red-500">{error}</div>

    const grouped = products.reduce((acc, product) => {
        if (!acc[product.category_id]) acc[product.category_id] = []
        acc[product.category_id].push(product)
        return acc
    }, {} as Record<string, typeof products>)

    return (
        <div className="space-y-10">
            <h1 className="text-3xl font-bold">Menu</h1>

            {Object.entries(grouped).map(([categoryId, items]) => (
                <div key={categoryId}>
                    <h2 className="text-2xl font-semibold mb-4">
                        Category
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        {items.map(p => (
                            <div
                                key={p.id}
                                className="flex gap-4 bg-white rounded-2xl shadow p-4"
                            >
                                <img
                                    src={p.image_url}
                                    alt={p.name}
                                    className="w-28 h-28 object-cover rounded-xl"
                                />

                                <div className="flex flex-col justify-between w-full">
                                    <div>
                                        <h3 className="font-semibold text-lg">
                                            {p.name}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {p.description}
                                        </p>
                                    </div>

                                    <div className="flex justify-between items-center mt-2">
                                        <span className="font-bold text-lg">
                                            ${p.price}
                                        </span>

                                        <button className="bg-black text-white px-3 py-1 rounded-lg text-sm">
                                            Add
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}