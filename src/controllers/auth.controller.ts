import { Request, Response } from 'express'
import { authService } from '../services/auth.service'

export const authController = {
  register: async (req: Request, res: Response) => {
    try {
      const user = await authService.register(req.body)
      res.status(201).json({ data: user })
    } catch (error: any) {
      if (error.message === 'Email already in use') {
        return res.status(409).json({ error: error.message })
      }
      res.status(500).json({ error: 'Internal server error' })
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const result = await authService.login(req.body)
      res.json({ data: result })
    } catch (error: any) {
      if (error.message === 'Invalid credentials') {
        return res.status(401).json({ error: error.message })
      }
      res.status(500).json({ error: 'Internal server error' })
    }
  },
}
