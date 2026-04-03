import { AppError } from '../middleware/error.middleware'

type RequestLike = {
    method?: string
    query?: Record<string, string | string[] | undefined>
    body?: any
    headers?: Record<string, string | string[] | undefined>
}

type ResponseLike = {
    status: (code: number) => ResponseLike
    json: (body: unknown) => void
    setHeader: (name: string, value: string) => void
}

export const setCorsHeaders = (res: ResponseLike) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-user-id')
}

export const handleOptions = (req: RequestLike, res: ResponseLike) => {
    if (req.method === 'OPTIONS') {
        setCorsHeaders(res)
        res.status(204).json({})
        return true
    }

    return false
}

export const getQueryParam = (req: RequestLike, key: string) => {
    const value = req.query?.[key]
    return Array.isArray(value) ? value[0] : value
}

export const getUserId = (req: RequestLike) => {
    const value = req.headers?.['x-user-id']
    const userId = Array.isArray(value) ? value[0] : value

    if (!userId) {
        throw new AppError('x-user-id header is required', 400)
    }

    return userId
}

export const methodNotAllowed = (res: ResponseLike, allowed: string[]) => {
    setCorsHeaders(res)
    res.setHeader('Allow', allowed.join(', '))
    return res.status(405).json({
        message: `Method not allowed. Use ${allowed.join(', ')}`
    })
}

export const sendData = (res: ResponseLike, data: unknown, statusCode = 200) => {
    setCorsHeaders(res)
    return res.status(statusCode).json({ success: true, data })
}

export const sendRaw = (res: ResponseLike, data: unknown, statusCode = 200) => {
    setCorsHeaders(res)
    return res.status(statusCode).json(data)
}

export const handleError = (res: ResponseLike, error: unknown) => {
    setCorsHeaders(res)
    console.error(error)

    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            message: error.message
        })
    }

    if (error instanceof Error) {
        return res.status(400).json({
            message: error.message
        })
    }

    return res.status(500).json({
        message: 'Internal Server Error'
    })
}
