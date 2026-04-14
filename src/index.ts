import './config/zod';
import express from 'express';
import helmet from 'helmet';
import { env } from './config/env';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import authRoutes from './routes/auth.routes';
import productRoutes from './routes/product.routes';
import userRoutes from './routes/user.routes';
import { authenticate } from './middlewares/auth.middleware';
import compression from 'compression';
import { globalLimiter, authLimiter } from './middlewares/rate-limit.middleware';

const app = express();

app.use(globalLimiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security
app.use(helmet());
app.use(compression());

// Swagger
app.use('/api/docs', 
  helmet({ contentSecurityPolicy: false }),
  swaggerUi.serve, 
  swaggerUi.setup(swaggerSpec)
);

// Public routes
app.use('/api/auth', authLimiter, authRoutes);

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
