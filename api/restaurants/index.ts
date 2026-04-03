import * as restaurantService from '../../backend/src/services/restaurant.service'
import { handleError, handleOptions, methodNotAllowed, sendRaw } from '../../backend/src/vercel/http'

export default async function handler(req: any, res: any) {
    if (handleOptions(req, res)) return
    if (req.method !== 'GET') return methodNotAllowed(res, ['GET'])

    try {
        const restaurants = await restaurantService.getRestaurants()
        return sendRaw(res, restaurants)
    } catch (error) {
        return handleError(res, error)
    }
}
