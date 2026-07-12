import { z } from 'zod'

export const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
  name: z.string().min(1),
})

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
})

export const googleLoginSchema = z.object({
  idToken: z.string().min(1),
})

export const googleIdTokenPayloadSchema = z.object({
  iss: z.url(), 
  sub: z.string(),
  aud: z.string(), 
  azp: z.string().optional(), 
  email: z.email(),
  email_verified: z.boolean(),
  at_hash: z.string().optional(),
  name: z.string(),
  picture: z.url(),
  given_name: z.string(),
  family_name: z.string(),
  locale: z.string().optional(),
  iat: z.number(),
  exp: z.number(),
});
