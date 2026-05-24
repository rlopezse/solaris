import './config/zod'
import express from 'express'
import helmet from 'helmet'
import { env } from './config/env'
import authRoutes from './routes/auth.routes'
import productRoutes from './routes/product.routes'
//import userRoutes from './routes/user.routes'
//import { authenticate } from './middlewares/auth.middleware'
import compression from 'compression'
import { globalLimiter, authLimiter } from './middlewares/rate-limit.middleware'
import cors from 'cors'

const app = express()

app.set('trust proxy', 1)

app.use(cors({
  origin: [env.CORS_ORIGIN]
}));

app.use(globalLimiter)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Security
app.use(helmet())
app.use(compression())

// User routes
app.use('/user', authRoutes)

// Greeting route
app.get('/', (_req, res) => {
  res.json({ status: 'Qué bueno verte por acá!' })
})

app.use('/api/products', productRoutes)

app.listen(env.port, () => {
  console.log(`🚀 Server running on port ${env.port}`)
})

export default app
