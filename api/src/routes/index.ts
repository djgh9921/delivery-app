import { Router } from 'express'
import restaurantRoutes from './restaurant.routes'

const router = Router()

router.use('/restaurants', restaurantRoutes)

export default router