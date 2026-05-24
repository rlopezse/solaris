import { Router } from 'express'
import { productController } from '../controllers/product.controller'
import { validate } from '../middlewares/validate.middleware'
import {
  createProductSchema,
  updateProductSchema,
} from '../schemas/product.schema'

const router = Router()
router.get('/', productController.getAll)
router.get('/:id', productController.getById)
router.post('/', validate(createProductSchema), productController.create)
router.put('/:id', validate(updateProductSchema), productController.update)
router.delete('/:id', productController.delete)

export default router
