import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as {prisma: PrismaClient};

const prisma = globalForPrisma.prisma || new PrismaClient();

if(process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;

//const prisma = new PrismaClient()

//async function main() {
  // ... you will write your Prisma Client queries here
//}

//main()
//  .then(async () => {
//    await prisma.$disconnect()
//  })
//  .catch(async (e) => {
//    console.error(e)
//   await prisma.$disconnect()
//    process.exit(1)
//  })