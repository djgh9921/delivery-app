import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ordersAPI } from '../api/order'

export function OrderSuccessPage() {
    const { orderId } = useParams<{ orderId: string }>()
    const [order, setOrder] = useState<any>(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (!orderId) return

        const fetchOrder = async () => {
            try {
                const data = await ordersAPI.getById(orderId)
                setOrder(data)
            } catch (err) {
                console.error(err)
            }
        }

        fetchOrder()
    }, [orderId])

    if (!order) return <div>Loading...</div>

    return (
        <div className="max-w-2xl mx-auto p-6 text-center">
            <h1 className="text-3xl font-bold mb-4">Order Successful!</h1>
            <p className="text-gray-600 mb-4">
                Thank you for your order. Your order ID is <strong>{order.id}</strong>.
            </p>

            <div className="space-y-2 mb-6">
                {order.order_items.map((item: any) => (
                    <div key={item.id} className="flex justify-between px-4 py-2 border rounded-lg">
                        <span>{item.product_name} x {item.quantity}</span>
                        <span>${item.product_price.toFixed(2)}</span>
                    </div>
                ))}
            </div>

            <p className="text-gray-600 mb-4">Delivery cost: <strong>${order.delivery_cost.toFixed(2)}</strong></p>
            <p className="text-gray-600 mb-4">Total: <strong>${order.total.toFixed(2)}</strong></p>

            <button
                onClick={() => navigate('/')}
                className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
            >
                Back to Home
            </button>
        </div>
    )
}