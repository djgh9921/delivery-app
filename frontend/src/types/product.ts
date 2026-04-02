export interface Product {
    id: string
    restaurant_id: string
    category_id: string | null
    category_name: string,
    name: string
    description: string
    price: number
    image_url: string
    is_available: boolean
    weight: string
    created_at: string
}