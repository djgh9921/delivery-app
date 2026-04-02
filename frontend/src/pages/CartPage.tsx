import {useEffect, useState, useMemo} from 'react'
import {useCartStore} from '../store/useCartStore'
import {ordersAPI} from '../api/order'
import {useNavigate} from 'react-router-dom'
import {Trash2, Plus, Minus} from 'lucide-react'

export function CartPage() {
    const {
        cart,
        fetchCart,
        updateQuantity,
        removeFromCart,
        getTotalPrice
    } = useCartStore()

    const [loading, setLoading] = useState(false)
    const [showCheckout, setShowCheckout] = useState(false)
    const [formData, setFormData] = useState({
        delivery_address: '',
        delivery_phone: '',
        notes: ''
    })

    const navigate = useNavigate()

    useEffect(() => {
        fetchCart()
    }, [fetchCart])

    const handleQuantityChange = async (itemId: string, newQuantity: number) => {
        if (newQuantity < 1) return
        await updateQuantity(itemId, newQuantity)
    }

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const order = await ordersAPI.create(formData)
            setShowCheckout(false)
            navigate(`/orders/success/${order.id}`)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    if (!cart || !cart.cart_items || cart.cart_items.length === 0) {
        return (
            <div className="max-w-2xl mx-auto p-6 text-center">
                <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
                <p className="text-gray-600 mb-6">Add some delicious items to get started!</p>
                <button
                    onClick={() => navigate('/')}
                    className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
                >
                    Browse Restaurants
                </button>
            </div>
        )
    }

    const deliveryCost = 0
    const subtotal = useMemo(() => getTotalPrice(), [cart.cart_items])
    const total = useMemo(() => subtotal + deliveryCost, [subtotal, deliveryCost])

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

            <div className="space-y-4 mb-8">
                {cart.cart_items.map(item => (
                    <div
                        key={item.id}
                        className="flex gap-4 bg-white p-4 rounded-lg shadow"
                    >
                        <img
                            src={item.product?.image_url}
                            alt={item.product?.name}
                            className="w-24 h-24 object-cover rounded-lg"
                        />

                        <div className="flex-1">
                            <h3 className="font-semibold text-lg">{item.product?.name}</h3>
                            <p className="text-gray-600">${item.price}</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                className="p-1 hover:bg-gray-100 rounded"
                            >
                                <Minus size={16}/>
                            </button>

                            <span className="w-8 text-center font-semibold">
                                {item.quantity}
                            </span>

                            <button
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                className="p-1 hover:bg-gray-100 rounded"
                            >
                                <Plus size={16}/>
                            </button>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                            <span className="font-bold">
                                ${(item.price * item.quantity).toFixed(2)}
                            </span>
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                <Trash2 size={20}/>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-gray-50 p-6 rounded-lg space-y-3 mb-6">
                <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Delivery:</span>
                    <span className="font-semibold">${deliveryCost.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-xl font-bold">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                </div>
            </div>

            {!showCheckout ? (
                <button
                    onClick={() => setShowCheckout(true)}
                    className="w-full bg-black text-white py-4 rounded-lg text-lg font-semibold hover:bg-gray-800"
                >
                    Proceed to Checkout
                </button>
            ) : (
                <form onSubmit={handleCheckout} className="space-y-4">
                    <div>
                        <label className="block mb-2 font-medium">Delivery Address</label>
                        <input
                            type="text"
                            required
                            value={formData.delivery_address}
                            onChange={e => setFormData({...formData, delivery_address: e.target.value})}
                            className="w-full border rounded-lg px-4 py-2"
                            placeholder="123 Main St, Apt 4B"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">Phone Number</label>
                        <input
                            type="tel"
                            required
                            value={formData.delivery_phone}
                            onChange={e => setFormData({...formData, delivery_phone: e.target.value})}
                            className="w-full border rounded-lg px-4 py-2"
                            placeholder="+1 234 567 8900"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">Notes (Optional)</label>
                        <textarea
                            value={formData.notes}
                            onChange={e => setFormData({...formData, notes: e.target.value})}
                            className="w-full border rounded-lg px-4 py-2"
                            rows={3}
                            placeholder="Any special instructions..."
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-green-700 disabled:bg-gray-400"
                    >
                        {loading ? 'Placing Order...' : 'Place Order'}
                    </button>
                </form>
            )}
        </div>
    )
}