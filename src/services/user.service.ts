import redis from '../config/redis'
import { userRepository } from '../repositories/user.repository'

const CACHE_TTL = 60 * 60
const CACHE_KEYS = {
  allUsers: 'users:all',
  user: (id: number) => `users:${id}`,
}

export const userService = {
  getAll: async () => {
    const cached = await redis.get(CACHE_KEYS.allUsers)
    if (cached) return JSON.parse(cached)

    const users = await userRepository.findAll()
    await redis.setex(CACHE_KEYS.allUsers, CACHE_TTL, JSON.stringify(users))
    return users
  },

  getById: async (id: number) => {
    const cached = await redis.get(CACHE_KEYS.user(id))
    if (cached) return JSON.parse(cached)

    const user = await userRepository.findById(id)
    if (!user) return null

    await redis.setex(CACHE_KEYS.user(id), CACHE_TTL, JSON.stringify(user))
    return user
  },

  create: async (data: { email: string; password: string; name: string }) => {
    const exists = await userRepository.findByEmail(data.email)
    if (exists) throw new Error('Email already in use')

    const user = await userRepository.create(data)
    await redis.del(CACHE_KEYS.allUsers)
    return user
  },

  update: async (
    id: number,
    data: Parameters<typeof userRepository.update>[1],
  ) => {
    const user = await userRepository.update(id, data)
    await redis.del(CACHE_KEYS.allUsers)
    await redis.del(CACHE_KEYS.user(id))
    return user
  },

  delete: async (id: number) => {
    await userRepository.delete(id)
    await redis.del(CACHE_KEYS.allUsers)
    await redis.del(CACHE_KEYS.user(id))
  },
}
