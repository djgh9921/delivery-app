import * as cartService from '../../backend/src/services/cart.service'
import { getUserId, handleError, handleOptions, methodNotAllowed, sendData } from '../../backend/src/vercel/http'

export default async function handler(req: any, res: any) {
    if (handleOptions(req, res)) return
    if (req.method !== 'GET') return methodNotAllowed(res, ['GET'])

    try {
        const userId = getUserId(req)
        const cart = await cartService.getCart(userId)
        return sendData(res, cart)
    } catch (error) {
        return handleError(res, error)
    }
}
