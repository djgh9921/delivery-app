export interface Order {
    id: string
    user_id: string
    restaurant_id: string
    delivery_address: string
    delivery_phone: string
    subtotal: number
    delivery_cost: number
    total: number
    status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivering' | 'delivered' | 'cancelled'
    notes: string | null
    created_at: string
    updated_at: string
    estimated_delivery: string
}