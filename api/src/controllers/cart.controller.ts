import {Request, Response} from 'express'
import * as service from '../services/cart.service'
import {asyncHandler} from '../utils/asyncHandler'

const getUserId = (req: Request) => {
    return req.headers['x-user-id'] as string
}

export const getCart = asyncHandler(async (req: Request, res: Response) => {
    const userId = getUserId(req)
    const data = await service.getCart(userId)
    res.json({
        success: true,
        data
    })
})

export const addToCart = asyncHandler(async (req: Request, res: Response) => {
    const userId = getUserId(req)
    const data = await service.addToCart(userId, req.body)
    res.status(201).json({
        success: true,
        data
    })
})

export const updateItem = asyncHandler(async (req: Request, res: Response) => {
    const data = await service.updateItem(req.params.id, req.body.quantity)
    res.json({
        success: true,
        data
    })
})

export const removeItem = asyncHandler(async (req: Request, res: Response) => {
    const data = await service.removeItem(req.params.id)
    res.json({
        success: true,
        data
    })
})

export const clearCart = asyncHandler(async (req: Request, res: Response) => {
    const userId = getUserId(req)
    const data = await service.clearCart(userId)
    res.json({
        success: true,
        data
    })
})