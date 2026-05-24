import { Router } from 'express'
import { userController } from '../controllers/user.controller'
import { validate } from '../middlewares/validate.middleware'
import { createUserSchema, updateUserSchema } from '../schemas/user.schema'

const router = Router()
router.get('/', userController.getAll)
router.get('/:id', userController.getById)
router.post('/', validate(createUserSchema), userController.create)
router.put('/:id', validate(updateUserSchema), userController.update)
router.delete('/:id', userController.delete)

export default router
