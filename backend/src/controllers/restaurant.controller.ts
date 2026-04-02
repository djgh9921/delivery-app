import * as service from '../services/restaurant.service'
import { asyncHandler } from '../utils/asyncHandler'


export const getRestaurants = asyncHandler(async (req, res) => {
    const data = await service.getRestaurants()
    res.json(data)
})

export const getRestaurantById = asyncHandler(async (req, res) => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id

    const data = await service.getRestaurantById(id)
    res.json(data)
})

export const getProductsByRestaurant = asyncHandler(
    async (req, res) => {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id

        const data = await service.getProductsByRestaurant(id)
        res.json(data)
    }
)
