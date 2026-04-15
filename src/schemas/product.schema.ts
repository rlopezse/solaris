import { z } from 'zod'

export const createProductSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  style: z.string().optional(),
  sku: z.string().min(1, 'SKU is required'),
  price: z.number().positive('Price must be positive'),
  currencyId: z.string().default('CLP'),
  currencyFormat: z.string().default('$'),
  installments: z.number().int().positive().default(1),
  isFreeShipping: z.boolean().default(false),
  availableSizes: z.string().default(''),
})

export const updateProductSchema = createProductSchema.partial()

export type CreateProductDto = z.infer<typeof createProductSchema>
export type UpdateProductDto = z.infer<typeof updateProductSchema>
