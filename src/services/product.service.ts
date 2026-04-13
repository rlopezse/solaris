import redis from '../config/redis'
import { productRepository } from '../repositories/product.repository'

const CACHE_TTL = 60 * 60 // 1 hora en segundos
const CACHE_KEYS = {
  allProducts: 'products:all',
  product: (id: number) => `products:${id}`,
}

export const productService = {
  getAll: async () => {
    const cached = await redis.get(CACHE_KEYS.allProducts)
    if (cached) return JSON.parse(cached)

    const products = await productRepository.findAll()
    await redis.setex(
      CACHE_KEYS.allProducts,
      CACHE_TTL,
      JSON.stringify(products),
    )
    return products
  },

  getById: async (id: number) => {
    const cached = await redis.get(CACHE_KEYS.product(id))
    if (cached) return JSON.parse(cached)

    const product = await productRepository.findById(id)
    if (!product) return null

    await redis.setex(
      CACHE_KEYS.product(id),
      CACHE_TTL,
      JSON.stringify(product),
    )
    return product
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
    const product = await productRepository.create(data)
    await redis.del(CACHE_KEYS.allProducts) // invalidar caché
    return product
  },

  update: async (
    id: number,
    data: Parameters<typeof productRepository.update>[1],
  ) => {
    const product = await productRepository.update(id, data)
    await redis.del(CACHE_KEYS.allProducts)
    await redis.del(CACHE_KEYS.product(id))
    return product
  },

  delete: async (id: number) => {
    await productRepository.delete(id)
    await redis.del(CACHE_KEYS.allProducts)
    await redis.del(CACHE_KEYS.product(id))
  },
}
