import { Router } from 'express'
import restaurantRoutes from './restaurant.routes'
import cartRoutes from './cart.routes'
import orderRoutes from './order.routes'

const router = Router()

router.use('/restaurants', restaurantRoutes)
router.use('/cart', cartRoutes)
router.use('/orders', orderRoutes)

export default router