import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { env } from '../config/env'
import { userRepository } from '../repositories/user.repository'

export const authService = {
  register: async (data: { email: string; password: string; name: string }) => {
    const exists = await userRepository.findByEmail(data.email)
    if (exists) throw new Error('Email already in use')

    const hashedPassword = await bcrypt.hash(data.password, 10)
    const user = await userRepository.create({
      ...data,
      password: hashedPassword,
    })

    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  },

  login: async (data: { email: string; password: string }) => {
    const user = await userRepository.findByEmail(data.email)
    if (!user) throw new Error('Invalid credentials')

    const isValid = await bcrypt.compare(data.password, user.password)
    if (!isValid) throw new Error('Invalid credentials')

    const token = jwt.sign({ id: user.id, email: user.email }, env.jwtSecret, {
      expiresIn: env.jwtExpiresIn,
    })

    const { password: _, ...userWithoutPassword } = user
    return { token, user: userWithoutPassword }
  },
}
