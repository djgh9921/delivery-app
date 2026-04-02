import { supabase } from '../lib/supabase'
import { AppError } from '../middleware/error.middleware'

interface CreateOrderData {
    delivery_address: string
    delivery_phone: string
    notes?: string
}

type CartItem = {
    id: string;
    product_id: string;
    price: number;
    quantity: number;
    product?: {
        id: string;
        name: string;
        image_url?: string;
    }
};

export const createOrder = async (userId: string, orderData: CreateOrderData) => {
    const { data: cart, error: cartError } = await supabase
        .from('carts')
        .select(`
            *,
            restaurant:restaurants(id, delivery_cost, min_order),
            cart_items(*, product:products(*))
        `)
        .eq('user_id', userId)
        .single()

    if (cartError || !cart) {
        throw new AppError('Cart not found', 404)
    }

    if (!cart.cart_items || cart.cart_items.length === 0) {
        throw new AppError('Cart is empty', 400)
    }

    const subtotal = cart.cart_items.reduce(
        (sum: number, item: CartItem) => sum + (item.price * item.quantity),
        0
    )

    if (subtotal < cart.restaurant.min_order) {
        throw new AppError(
            `Minimum order amount is $${cart.restaurant.min_order}`,
            400
        )
    }

    const deliveryCost = cart.restaurant.delivery_cost
    const total = subtotal + deliveryCost

    const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
            user_id: userId,
            restaurant_id: cart.restaurant_id,
            delivery_address: orderData.delivery_address,
            delivery_phone: orderData.delivery_phone,
            notes: orderData.notes,
            subtotal,
            delivery_cost: deliveryCost,
            total,
            status: 'pending',
            estimated_delivery: new Date(Date.now() + 45 * 60 * 1000)
        })
        .select()
        .single()

    if (orderError) {
        console.log('order error', orderError)
        throw new AppError('Failed to create order', 500)
    }

    const orderItems = cart.cart_items.map((item: CartItem) => ({
        order_id: order.id,
        product_id: item.product_id,
        product_name: item.product?.name ?? 'Unknown',
        product_price: item.price,
        quantity: item.quantity
    }))

    const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems)

    if (itemsError) {
        await supabase.from('orders').delete().eq('id', order.id)
        console.log('itemsError', itemsError);
        throw new AppError('Failed to add items to order', 500)
    }

    await supabase.from('cart_items').delete().eq('cart_id', cart.id)
    await supabase.from('carts').delete().eq('id', cart.id)

    return order
}

export const getUserOrders = async (userId: string) => {
    const { data, error } = await supabase
        .from('orders')
        .select(`
            *,
            restaurant:restaurants(name, image_url),
            order_items(*)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

    if (error) throw new AppError('Failed to fetch orders', 500)
    return data
}

export const getOrderById = async (userId: string, orderId: string) => {
    const { data, error } = await supabase
        .from('orders')
        .select(`
            *,
            restaurant:restaurants(*),
            order_items(*)
        `)
        .eq('id', orderId)
        .eq('user_id', userId)
        .single()

    if (error || !data) {
        throw new AppError('Order not found', 404)
    }

    return data
}
