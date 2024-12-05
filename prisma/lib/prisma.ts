import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient();
export const getPrismaConnection = () => prisma;
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});