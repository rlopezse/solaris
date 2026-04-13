import { prisma } from '../config/prisma'

export const userRepository = {
  findAll: async () => {
    return prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    })
  },

  findById: async (id: number) => {
    return prisma.user.findUnique({
      where: { id },
    })
  },

  findByEmail: async (email: string) => {
    return prisma.user.findUnique({
      where: { email },
    })
  },

  create: async (data: { email: string; password: string; name: string }) => {
    return prisma.user.create({ data })
  },

  update: async (
    id: number,
    data: Partial<{
      email: string
      password: string
      name: string
    }>,
  ) => {
    return prisma.user.update({
      where: { id },
      data,
    })
  },

  delete: async (id: number) => {
    return prisma.user.delete({
      where: { id },
    })
  },
}
