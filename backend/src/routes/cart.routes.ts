import { Router } from 'express'
import {
    getCart,
    addToCart,
    updateItem,
    removeItem,
    clearCart
} from '../controllers/cart.controller'
import { validateAddToCart, validateUpdateItem } from '../middleware/validation'

const router = Router()

router.get('/', getCart)
router.post('/items', validateAddToCart, addToCart)
router.put('/items/:id', validateUpdateItem, updateItem)
router.delete('/items/:id', removeItem)
router.delete('/clear', clearCart)

export default router