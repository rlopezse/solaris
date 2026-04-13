import { Request, Response } from 'express'
import { userService } from '../services/user.service'

export const userController = {
  getAll: async (_req: Request, res: Response) => {
    try {
      const users = await userService.getAll()
      res.json({ data: users })
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id as string)
      const user = await userService.getById(id)
      if (!user) return res.status(404).json({ error: 'User not found' })
      res.json({ data: user })
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const user = await userService.create(req.body)
      res.status(201).json({ data: user })
    } catch (error: any) {
      if (error.message === 'Email already in use') {
        return res.status(409).json({ error: error.message })
      }
      res.status(500).json({ error: 'Internal server error' })
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id as string)
      const user = await userService.update(id, req.body)
      res.json({ data: user })
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id as string)
      await userService.delete(id)
      res.status(204).send()
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' })
    }
  },
}
