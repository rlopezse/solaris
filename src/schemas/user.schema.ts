import { z } from 'zod'

export const createUserSchema = z.object({
  email: z.email({ message: 'Invalid email' }),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(1, 'Name is required'),
});

export const updateUserSchema = createUserSchema.partial();

export type CreateUserDto = z.infer<typeof createUserSchema>
export type UpdateUserDto = z.infer<typeof updateUserSchema>
