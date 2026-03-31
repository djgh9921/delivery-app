import { Request, Response, NextFunction } from 'express'
import { AppError } from './error.middleware'

export const validateAddToCart = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { product_id, quantity } = req.body

    if (!product_id) {
        throw new AppError('product_id is required', 400)
    }

    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(product_id)) {
        throw new AppError('Invalid product_id format', 400)
    }

    if (quantity !== undefined) {
        if (typeof quantity !== 'number' || quantity < 1 || quantity > 99) {
            throw new AppError('quantity must be between 1 and 99', 400)
        }
    }

    next()
}

export const validateUpdateItem = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { quantity } = req.body

    if (!quantity || typeof quantity !== 'number' || quantity < 1 || quantity > 99) {
        throw new AppError('quantity must be a number between 1 and 99', 400)
    }

    next()
}