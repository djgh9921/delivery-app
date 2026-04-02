import { supabase } from '../lib/supabase'
import { AppError } from '../middleware/error.middleware'

export const getCart = async (userId: string) => {
    const { data, error } = await supabase
        .from('carts')
        .select(`
            *,
            restaurant:restaurants(*),
            cart_items(
                *,
                product:products(*)
            )
        `)
        .eq('user_id', userId)
        .maybeSingle()

    // PGRST116 = no rows found
    if (error && error.code !== 'PGRST116') {
        throw new AppError('Failed to fetch cart', 500)
    }

    return data || null
}

export const addToCart = async (userId: string, body: any) => {
    // 1. Validate product exists
    const { data: product, error: productError } = await supabase
        .from('products')
        .select('*, restaurant_id')
        .eq('id', body.product_id)
        .single()

    if (productError || !product) {
        throw new AppError('Product not found', 404)
    }

    if (!product.is_available) {
        throw new AppError('Product is not available', 400)
    }

    // 2. Get or create cart
    let { data: cart } = await supabase
        .from('carts')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle() // Use maybeSingle instead of single to avoid error

    if (!cart) {
        const { data: newCart, error: cartError } = await supabase
            .from('carts')
            .insert({
                user_id: userId,
                restaurant_id: product.restaurant_id
            })
            .select()
            .single()

        if (cartError) {
            throw new AppError('Failed to create cart', 500)
        }
        cart = newCart
    }

    // 3. Check if cart is from same restaurant
    if (cart.restaurant_id !== product.restaurant_id) {
        throw new AppError(
            'Cannot add items from different restaurants. Please clear your cart first.',
            400
        )
    }

    // 4. Check if item already exists in cart
    const { data: existingItem } = await supabase
        .from('cart_items')
        .select('*')
        .eq('cart_id', cart.id)
        .eq('product_id', body.product_id)
        .maybeSingle()

    if (existingItem) {
        // Update quantity
        const { data, error } = await supabase
            .from('cart_items')
            .update({
                quantity: existingItem.quantity + (body.quantity || 1)
            })
            .eq('id', existingItem.id)
            .select()
            .single()

        if (error) {
            throw new AppError('Failed to update cart item', 500)
        }
        return data
    }

    // 5. Add new item
    const { data, error } = await supabase
        .from('cart_items')
        .insert({
            cart_id: cart.id,
            product_id: body.product_id,
            quantity: body.quantity || 1,
            price: product.price
        })
        .select()
        .single()

    if (error) {
        throw new AppError('Failed to add item to cart', 500)
    }

    return data
}

export const updateItem = async (itemId: string, quantity: number) => {
    if (quantity < 1) {
        throw new AppError('Quantity must be at least 1', 400)
    }

    const { data, error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('id', itemId)
        .select()
        .single()

    if (error) {
        throw new AppError('Failed to update item', 500)
    }

    if (!data) {
        throw new AppError('Item not found', 404)
    }

    return data
}

export const removeItem = async (itemId: string) => {
    const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId)

    if (error) {
        throw new AppError('Failed to remove item', 500)
    }

    return { success: true, message: 'Item removed from cart' }
}

export const clearCart = async (userId: string) => {
    // Get user's cart
    const { data: cart } = await supabase
        .from('carts')
        .select('id')
        .eq('user_id', userId)
        .maybeSingle()

    if (!cart) {
        return { success: true, message: 'Cart is already empty' }
    }

    const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('cart_id', cart.id)

    if (error) {
        throw new AppError('Failed to clear cart', 500)
    }

    // Optionally delete the cart itself
    await supabase
        .from('carts')
        .delete()
        .eq('id', cart.id)

    return { success: true, message: 'Cart cleared successfully' }
}