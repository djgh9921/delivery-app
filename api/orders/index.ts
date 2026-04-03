import * as orderService from '../../backend/src/services/order.service'
import { getUserId, handleError, handleOptions, methodNotAllowed, sendData } from '../../backend/src/vercel/http'

export default async function handler(req: any, res: any) {
    if (handleOptions(req, res)) return

    try {
        const userId = getUserId(req)

        if (req.method === 'GET') {
            const orders = await orderService.getUserOrders(userId)
            return sendData(res, orders)
        }

        if (req.method === 'POST') {
            const order = await orderService.createOrder(userId, req.body)
            return sendData(res, order, 201)
        }

        return methodNotAllowed(res, ['GET', 'POST'])
    } catch (error) {
        return handleError(res, error)
    }
}
