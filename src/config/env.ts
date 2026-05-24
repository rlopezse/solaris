import dotenv from 'dotenv'

dotenv.config()

export const env = {
  port: process.env.PORT || 3000,
  databaseUrl: process.env.DATABASE_URL || '',
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
  jwtSecret: process.env.JWT_SECRET || 'secret',
  jwtExpiresIn: parseInt(process.env.JWT_EXPIRES_IN || '3600'),
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
}
