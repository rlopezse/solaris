import { PrismaClient } from '@prisma/client'
import productsJson from '../data/products.json'

const prisma = new PrismaClient()

async function main() {

  await prisma.product.createMany({
    data: productsJson.products,
    skipDuplicates: true,
  })
  console.log(`✅ ${productsJson.products.length} productos insertados`);
}

main()
  .catch((e) => {
    console.error(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
