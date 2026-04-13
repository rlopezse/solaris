import express from 'express'
import { env } from './config/env'
import productRoutes from './routes/product.routes'
import userRoutes from './routes/user.routes'

const app = express()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.listen(env.port, () => {
  console.log(`🚀 Server running on port ${env.port}`)
})

export default app
