import { Request, Response } from 'express'
import * as service from '../services/order.service'
import { asyncHandler } from '../utils/asyncHandler'

const getUserId = (req: Request) => {
    return req.headers['x-user-id'] as string
}

export const createOrder = asyncHandler(async (req: Request, res: Response) => {
    const userId = getUserId(req)

    const data = await service.createOrder(userId, req.body)
    res.status(201).json({
        success: true,
        data
    })
})

export const getUserOrders = asyncHandler(async (req: Request, res: Response) => {
    const userId = getUserId(req)

    const data = await service.getUserOrders(userId)
    res.json({
        success: true,
        data
    })
})

export const getOrderById = asyncHandler(async (req: Request, res: Response) => {
    const userId = getUserId(req)
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id

    const data = await service.getOrderById(userId, id)
    res.json({
        success: true,
        data
    })
})
