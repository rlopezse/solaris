import './config/zod'
import express from 'express'
import helmet from 'helmet'
import { env } from './config/env'
import authRoutes from './routes/auth.routes'
import productRoutes from './routes/product.routes'
import userRoutes from './routes/user.routes'
//import { authenticate } from './middlewares/auth.middleware'
import compression from 'compression'
import { globalLimiter, authLimiter } from './middlewares/rate-limit.middleware'
import cors from 'cors'

const app = express()

app.set('trust proxy', 1)

app.use(cors({
  origin: [
    'http://localhost:4200', 
    'https://proyect-nova.com',
    'https://proyect-frontier.com',
    'https://proyect-proxima.com',
  ]
}));

app.use(globalLimiter)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Security
app.use(helmet())
app.use(compression())

// Public routes
app.use('/api/auth', authLimiter, authRoutes)

// Greeting route
app.get('/', (_req, res) => {
  res.json({ status: 'Qué bueno verte por acá!' })
})

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Protected routes
app.use('/api/products', productRoutes)

app.use('/api/users', userRoutes)

app.listen(env.port, () => {
  console.log(`🚀 Server running on port ${env.port}`)
})

export default app
