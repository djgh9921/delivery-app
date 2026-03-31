import * as service from '../services/restaurant.service'
import { asyncHandler } from '../utils/asyncHandler'


export const getRestaurants = asyncHandler(async (req, res) => {
    const data = await service.getRestaurants()
    res.json(data)
})

export const getProductsByRestaurant = asyncHandler(
    async (req, res) => {
        const data = await service.getProductsByRestaurant(req.params.id)
        res.json(data)
    }
)