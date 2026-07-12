import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { env } from '../config/env'
import { userRepository } from '../repositories/user.repository'
import { OAuth2Client } from 'google-auth-library'
import { googleIdTokenPayloadSchema } from '../schemas/auth.schema'
import { get } from 'node:http'

export const authService = {
  register: async (data: { email: string; password: string; name: string, googleId: null}) => {
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

  loginGoogle: async (data: { idToken: string }) => {
    // hay que ordenar esto, pero por ahora funciona
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

    const ticket = await client.verifyIdToken({
      idToken: data.idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    })

    const payload = ticket.getPayload()
    const result = googleIdTokenPayloadSchema.safeParse(payload)

    if(!result.success) {
      throw new Error('Invalid Google token')
    }

    const user = result.data

    const getEmail = await userRepository.findByEmail(user.email)

    if(!getEmail) {
      const newUser = await userRepository.create({
        email: user.email,
        name: user.name,
        password: null,
        googleId: user.sub
      })

      const token = jwt.sign({ email: user.email }, env.jwtSecret, {
        expiresIn: env.jwtExpiresIn,
      })

      const { password: _, googleId: __, ...userLoginGoogle } = newUser
      return { token, user: userLoginGoogle }
    }

    const token = jwt.sign({ email: user.email }, env.jwtSecret, {
      expiresIn: env.jwtExpiresIn,
    })

    const { password: _, googleId: __, ...userLoginGoogle } = getEmail
    return { token, user: userLoginGoogle }
  },

  login: async (data: { email: string; password: string }) => {
    if(!data.email || !data.password) throw new Error('Email and password are required')

    const user = await userRepository.findByEmail(data.email)

    if (!user) throw new Error('Invalid credentials')

    if(!user.password) throw new Error('User has no password set')


    const isValid = await bcrypt.compare(data.password, user.password)
    if (!isValid) throw new Error('Invalid credentials')

    const token = jwt.sign({ id: user.id, email: user.email }, env.jwtSecret, {
      expiresIn: env.jwtExpiresIn,
    })

    const { password: _, ...userWithoutPassword } = user
    return { token, user: userWithoutPassword }
  },
}
