import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.produto.findMany();
  console.log(users);
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
