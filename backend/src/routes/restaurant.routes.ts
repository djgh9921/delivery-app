import { Router } from 'express'
import {
    getRestaurants,
    getRestaurantById,
    getProductsByRestaurant
} from '../controllers/restaurant.controller'

const router = Router()

router.get('/', getRestaurants)
router.get('/:id', getRestaurantById)
router.get('/:id/products', getProductsByRestaurant)

export default router
