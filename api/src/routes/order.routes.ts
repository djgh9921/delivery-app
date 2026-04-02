import { Router } from 'express'
import {
    createOrder,
    getUserOrders,
    getOrderById,
} from '../controllers/order.controller'

const router = Router()

router.post('/', createOrder)
router.get('/', getUserOrders)
router.get('/:id', getOrderById)

export default router