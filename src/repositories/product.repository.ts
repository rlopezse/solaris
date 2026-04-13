import { prisma } from '../config/prisma'

export const productRepository = {
  findAll: async () => {
    return prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    })
  },

  findById: async (id: number) => {
    return prisma.product.findUnique({
      where: { id },
    })
  },

  create: async (data: {
    title: string
    description?: string
    style?: string
    sku: string
    price: number
    currencyId?: string
    currencyFormat?: string
    installments?: number
    isFreeShipping?: boolean
    availableSizes?: string
  }) => {
    return prisma.product.create({ data })
  },

  update: async (
    id: number,
    data: Partial<{
      title: string
      description: string
      style: string
      price: number
      currencyId: string
      currencyFormat: string
      installments: number
      isFreeShipping: boolean
      availableSizes: string
    }>,
  ) => {
    return prisma.product.update({
      where: { id },
      data,
    })
  },

  delete: async (id: number) => {
    return prisma.product.delete({
      where: { id },
    })
  },
}
