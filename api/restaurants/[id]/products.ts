import * as restaurantService from '../../../backend/src/services/restaurant.service'
import { getQueryParam, handleError, handleOptions, methodNotAllowed, sendRaw } from '../../../backend/src/vercel/http'

export default async function handler(req: any, res: any) {
    if (handleOptions(req, res)) return
    if (req.method !== 'GET') return methodNotAllowed(res, ['GET'])

    try {
        const id = getQueryParam(req, 'id')
        const products = await restaurantService.getProductsByRestaurant(id || '')
        return sendRaw(res, products)
    } catch (error) {
        return handleError(res, error)
    }
}
