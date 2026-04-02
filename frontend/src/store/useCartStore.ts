import { create } from 'zustand'
import { cartAPI } from '../api/cart'
import type { Cart } from '../types/cart'

interface CartStore {
    cart: Cart | null
    loading: boolean
    fetchCart: () => Promise<void>
    addToCart: (productId: string, quantity?: number) => Promise<void>
    updateQuantity: (itemId: string, quantity: number) => Promise<void>
    removeFromCart: (itemId: string) => Promise<void>
    clearCart: () => Promise<void>
    getTotalItems: () => number
    getTotalPrice: () => number
}

export const useCartStore = create<CartStore>((set, get) => ({
    cart: null,
    loading: false,

    fetchCart: async () => {
        set({ loading: true })
        try {
            const cart = await cartAPI.get()
            set({ cart })
        } catch (error) {
            console.log('error', error);
            console.error('Failed to fetch cart:', error)
        } finally {
            set({ loading: false })
        }
    },

    addToCart: async (productId: string, quantity = 1) => {
        try {
            await cartAPI.addItem(productId, quantity)
            await get().fetchCart()
        } catch (error) {
            console.error('Failed to add to cart:', error)
            throw error
        }
    },

    updateQuantity: async (itemId: string, quantity: number) => {
        try {
            await cartAPI.updateItem(itemId, quantity)
            await get().fetchCart()
        } catch (error) {
            console.error('Failed to update quantity:', error)
        }
    },

    removeFromCart: async (itemId: string) => {
        try {
            await cartAPI.removeItem(itemId)
            await get().fetchCart()
        } catch (error) {
            console.error('Failed to remove from cart:', error)
        }
    },

    clearCart: async () => {
        try {
            await cartAPI.clear()
            set({ cart: null })
        } catch (error) {
            console.error('Failed to clear cart:', error)
        }
    },

    getTotalItems: () => {
        const { cart } = get()
        if (!cart?.cart_items) return 0
        return cart.cart_items.reduce((sum, item) => sum + item.quantity, 0)
    },

    getTotalPrice: () => {
        const { cart } = get()
        if (!cart?.cart_items) return 0
        return cart.cart_items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    }
}))