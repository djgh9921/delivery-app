import { Request, Response } from 'express'
import * as service from '../services/cart.service'
import { asyncHandler } from '../utils/asyncHandler'

const USER_ID = 'demo-user-test-123' // TODO: Replace with real auth

export const getCart = asyncHandler(async (req: Request, res: Response) => {
    const data = await service.getCart(USER_ID)
    res.json({
        success: true,
        data
    })
})

export const addToCart = asyncHandler(async (req: Request, res: Response) => {
    const data = await service.addToCart(USER_ID, req.body)
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
    const data = await service.clearCart(USER_ID)
    res.json({
        success: true,
        data
    })
})