'use server';

import { prisma } from "../../prisma/lib/prisma";

export async function listTransactionsByAccount(accountId: number) {
  return await prisma.transaction.findMany({
    where: { accountId },
  });
}
  