import { supabase } from '../../../backend/src/lib/supabase'
import { AppError } from '../../../backend/src/middleware/error.middleware'
import { getQueryParam, getUserId, handleError, handleOptions, methodNotAllowed, sendData } from '../../../backend/src/vercel/http'

export default async function handler(req: any, res: any) {
    if (handleOptions(req, res)) return
    if (req.method !== 'PATCH') return methodNotAllowed(res, ['PATCH'])

    try {
        const userId = getUserId(req)
        const orderId = getQueryParam(req, 'id') || ''

        const { data, error } = await supabase
            .from('orders')
            .update({ status: 'cancelled' })
            .eq('id', orderId)
            .eq('user_id', userId)
            .select()
            .single()

        if (error || !data) {
            throw new AppError('Order not found', 404)
        }

        return sendData(res, data)
    } catch (error) {
        return handleError(res, error)
    }
}
