import { Router } from 'express'
import restaurantRoutes from './restaurant.routes'
import cartRoutes from './cart.routes'

const router = Router()

router.use('/restaurants', restaurantRoutes)
router.use('/cart', cartRoutes)

export default router