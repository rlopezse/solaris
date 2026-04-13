import { Request, Response } from 'express'
import { productService } from '../services/product.service'

export const productController = {
  getAll: async (_req: Request, res: Response) => {
    try {
      const products = await productService.getAll()
      res.json({ data: products })
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id as string)
      const product = await productService.getById(id)
      if (!product) return res.status(404).json({ error: 'Product not found' })
      res.json({ data: product })
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const product = await productService.create(req.body)
      res.status(201).json({ data: product })
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id as string)
      const product = await productService.update(id, req.body)
      res.json({ data: product })
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id as string)
      await productService.delete(id)
      res.status(204).send()
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  },
}
