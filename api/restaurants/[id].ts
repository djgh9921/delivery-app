import * as restaurantService from '../../backend/src/services/restaurant.service'
import { getQueryParam, handleError, handleOptions, methodNotAllowed, sendRaw } from '../../backend/src/vercel/http'

export default async function handler(req: any, res: any) {
    if (handleOptions(req, res)) return
    if (req.method !== 'GET') return methodNotAllowed(res, ['GET'])

    try {
        const id = getQueryParam(req, 'id')
        const restaurant = await restaurantService.getRestaurantById(id || '')
        return sendRaw(res, restaurant)
    } catch (error) {
        return handleError(res, error)
    }
}
