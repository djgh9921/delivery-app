import {useProducts} from '../hooks/useProducts'
import {useCartStore} from '../store/useCartStore'
import {useEffect, useState, useMemo, useCallback} from 'react'

type Props = {
    id: string
}

export function RestaurantDetailsPage({id}: Props) {
    const {products = [], loading, error} = useProducts(id)
    const {addToCart, fetchCart, getTotalItems} = useCartStore()
    const [selectedCategory, setSelectedCategory] = useState('all')

    useEffect(() => {
        fetchCart()
    }, [fetchCart])

    const handleAddToCart = useCallback(
        async (productId: string) => {
            try {
                await addToCart(productId, 1)
            } catch (err) {
                console.error(err)
            }
        },
        [addToCart]
    )

    const categories = useMemo(() => {
        const catMap = new Map<string, string>()
        products.forEach(p => {
            const id = p.category_id ?? 'other'
            const name = p.category_name ?? 'Other'
            if (!catMap.has(id)) catMap.set(id, name)
        })
        return [{ id: 'all', name: 'All' }, ...Array.from(catMap, ([id, name]) => ({ id, name }))]
    }, [products])
    const filteredProducts = useMemo(() => {
        if (selectedCategory === 'all') return products
        return products.filter(p => (p.category_id ?? 'other') === selectedCategory)
    }, [products, selectedCategory])

    const grouped = useMemo(() => {
        return filteredProducts.reduce((acc, product) => {
            const key = product.category_id ?? 'other'
            if (!acc[key]) acc[key] = []
            acc[key].push(product)
            return acc
        }, {} as Record<string, typeof products>)
    }, [filteredProducts])

    if (loading) return <div>Loading...</div>
    if (error) return <div className="text-red-500">{error}</div>

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-10">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Menu</h1>
                <div className="bg-black text-white px-4 py-2 rounded-full">
                    Cart: {getTotalItems()} items
                </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">
                <select
                    value={selectedCategory}
                    onChange={e => setSelectedCategory(e.target.value)}
                    className="border px-3 py-1 rounded"
                >
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>

            {Object.entries(grouped).map(([categoryId, items]) => (
                <div key={categoryId} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-6">
                        {items.map(p => (
                            <div
                                key={p.id}
                                className="flex gap-4 bg-white rounded-2xl shadow p-4 hover:shadow-lg transition"
                            >
                                <img
                                    src={p.image_url}
                                    alt={p.name}
                                    className="w-28 h-28 object-cover rounded-xl"
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://placehold.co/150x150?text=No+Image'
                                    }}
                                />
                                <div className="flex flex-col justify-between w-full">
                                    <div>
                                        <h3 className="font-semibold text-lg">{p.name}</h3>
                                        <p className="text-sm text-gray-500 line-clamp-2">
                                            {p.description}
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">{p.weight}</p>
                                    </div>
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="font-bold text-lg">${p.price}</span>
                                        <button
                                            onClick={() => handleAddToCart(p.id)}
                                            disabled={!p.is_available}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium ${
                                                p.is_available
                                                    ? 'bg-black text-white hover:bg-gray-800'
                                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            }`}
                                        >
                                            {p.is_available ? 'Add to Cart' : 'Unavailable'}
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