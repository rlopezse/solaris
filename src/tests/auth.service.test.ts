/*import { describe, it, expect, vi, beforeEach } from 'vitest'
import { authService } from '../services/auth.service'
import { userRepository } from '../repositories/user.repository'
import bcrypt from 'bcryptjs'

vi.mock('../repositories/user.repository')
vi.mock('../config/redis')

const mockUser = {
  id: 1,
  email: 'test@test.com',
  password: await bcrypt.hash('123456', 10),
  name: 'Test User',
  createdAt: new Date(),
  updatedAt: new Date(),
}

describe('authService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('register', () => {
    it('debe crear un usuario y retornar sin password', async () => {
      vi.mocked(userRepository.findByEmail).mockResolvedValue(null)
      vi.mocked(userRepository.create).mockResolvedValue(mockUser)

      const result = await authService.register({
        email: 'test@test.com',
        password: '123456',
        name: 'Test User',
      })

      expect(result).not.toHaveProperty('password')
      expect(result.email).toBe('test@test.com')
    })

    it('debe lanzar error si el email ya existe', async () => {
      vi.mocked(userRepository.findByEmail).mockResolvedValue(mockUser)

      await expect(
        authService.register({
          email: 'test@test.com',
          password: '123456',
          name: 'Test User',
        }),
      ).rejects.toThrow('Email already in use')
    })
  })

  describe('login', () => {
    it('debe retornar token y usuario sin password', async () => {
      vi.mocked(userRepository.findByEmail).mockResolvedValue(mockUser)

      const result = await authService.login({
        email: 'test@test.com',
        password: '123456',
      })

      expect(result).toHaveProperty('token')
      expect(result.user).not.toHaveProperty('password')
    })

    it('debe lanzar error si el usuario no existe', async () => {
      vi.mocked(userRepository.findByEmail).mockResolvedValue(null)

      await expect(
        authService.login({
          email: 'noexiste@test.com',
          password: '123456',
        }),
      ).rejects.toThrow('Invalid credentials')
    })

    it('debe lanzar error si la contraseña es incorrecta', async () => {
      vi.mocked(userRepository.findByEmail).mockResolvedValue(mockUser)

      await expect(
        authService.login({
          email: 'test@test.com',
          password: 'wrongpassword',
        }),
      ).rejects.toThrow('Invalid credentials')
    })
  })
})*/
