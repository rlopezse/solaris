import { Router } from 'express'
import { authController } from '../controllers/auth.controller'
import { validate } from '../middlewares/validate.middleware'
import { registerSchema, loginSchema, googleLoginSchema } from '../schemas/auth.schema'

const router = Router()
router.post('/register', validate(registerSchema), authController.register)
router.post('/login-google', validate(googleLoginSchema), authController.loginGoogle)
router.post('/login', validate(loginSchema), authController.login)

export default router
