import { Router } from 'express'
import {
    getRestaurants,
    getProductsByRestaurant
} from '../controllers/restaurant.controller'

const router = Router()

router.get('/', getRestaurants)
router.get('/:id/products', getProductsByRestaurant)

export default router