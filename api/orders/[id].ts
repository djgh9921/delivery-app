import * as orderService from '../../backend/src/services/order.service'
import { getQueryParam, getUserId, handleError, handleOptions, methodNotAllowed, sendData } from '../../backend/src/vercel/http'

export default async function handler(req: any, res: any) {
    if (handleOptions(req, res)) return
    if (req.method !== 'GET') return methodNotAllowed(res, ['GET'])

    try {
        const userId = getUserId(req)
        const orderId = getQueryParam(req, 'id') || ''
        const order = await orderService.getOrderById(userId, orderId)
        return sendData(res, order)
    } catch (error) {
        return handleError(res, error)
    }
}
