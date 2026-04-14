import rateLimit from 'express-rate-limit';

export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100,
  message: {
    error: 'Demasiadas solicitudes, intenta de nuevo en 15 minutos',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, 
  message: {
    error: 'Demasiados intentos, intenta de nuevo en 15 minutos',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
