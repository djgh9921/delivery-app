import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import routes from './routes/index'
import { errorHandler } from './middleware/errorHandler'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', routes)
app.use(errorHandler)


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    console.log(`API available at http://localhost:${PORT}/api`)
})
export default app