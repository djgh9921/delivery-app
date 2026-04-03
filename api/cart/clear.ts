import * as cartService from '../../backend/src/services/cart.service'
import { getUserId, handleError, handleOptions, methodNotAllowed, sendData } from '../../backend/src/vercel/http'

export default async function handler(req: any, res: any) {
    if (handleOptions(req, res)) return
    if (req.method !== 'DELETE') return methodNotAllowed(res, ['DELETE'])

    try {
        const userId = getUserId(req)
        const result = await cartService.clearCart(userId)
        return sendData(res, result)
    } catch (error) {
        return handleError(res, error)
    }
}
