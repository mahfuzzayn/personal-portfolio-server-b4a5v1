import express, { Application } from 'express'
import cors from 'cors'
import router from './app/routes'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
const app: Application = express()

// Parsers
app.use(express.json())
app.use(
    cors({
        origin: ['http://localhost:3000'],
        credentials: true,
    }),
)

// Application Routes
app.use('/api/v1', router)

// Global Error Handler
app.use(globalErrorHandler)

export default app;