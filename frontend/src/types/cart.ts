import type { Product } from './product'

export interface CartItem {
    id: string
    cart_id: string
    product_id: string
    quantity: number
    price: number
    product?: Product
}

export interface Cart {
    id: string
    user_id: string
    restaurant_id: string
    cart_items: CartItem[]
    created_at: string
}