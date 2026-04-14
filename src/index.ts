import './config/zod';
import express from 'express';
import { env } from './config/env';
import authRoutes from './routes/auth.routes';
import productRoutes from './routes/product.routes';
import userRoutes from './routes/user.routes';
import { authenticate } from './middlewares/auth.middleware';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Public routes
app.use('/api/auth', authRoutes);

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Protected routes
app.use('/api/products', authenticate, productRoutes);
app.use('/api/users', authenticate, userRoutes);

app.listen(env.port, () => {
  console.log(`🚀 Server running on port ${env.port}`);
});

export default app;
