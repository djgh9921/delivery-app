import * as cartService from '../../../backend/src/services/cart.service'
import { getQueryParam, handleError, handleOptions, methodNotAllowed, sendData } from '../../../backend/src/vercel/http'

export default async function handler(req: any, res: any) {
    if (handleOptions(req, res)) return

    try {
        const itemId = getQueryParam(req, 'id') || ''

        if (req.method === 'PUT') {
            const item = await cartService.updateItem(itemId, req.body.quantity)
            return sendData(res, item)
        }

        if (req.method === 'DELETE') {
            const result = await cartService.removeItem(itemId)
            return sendData(res, result)
        }

        return methodNotAllowed(res, ['PUT', 'DELETE'])
    } catch (error) {
        return handleError(res, error)
    }
}
