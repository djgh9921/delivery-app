import * as cartService from '../../../backend/src/services/cart.service'
import { getUserId, handleError, handleOptions, methodNotAllowed, sendData } from '../../../backend/src/vercel/http'

export default async function handler(req: any, res: any) {
    if (handleOptions(req, res)) return
    if (req.method !== 'POST') return methodNotAllowed(res, ['POST'])

    try {
        const userId = getUserId(req)
        const item = await cartService.addToCart(userId, req.body)
        return sendData(res, item, 201)
    } catch (error) {
        return handleError(res, error)
    }
}
