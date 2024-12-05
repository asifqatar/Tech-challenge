'use server';

import { revalidatePath } from "next/cache";
import { prisma } from "../../prisma/lib/prisma";

export const createTransaction = async (value: FormData) => {
    const type = value.get('type') as string;
    const amount = roundToTwoDecimalPlaces(parseFloat(value.get('amount') as string));
    const iban = value.get('iban') as string;
  
    try {
      const account = await prisma.account.findUnique({ where: { id: 1 } });
      if (!account) {
        return { error: 'Account not found' };
      }
  
      if (type === 'withdraw' && Number(account.balance ) <  Number(amount)) {
        return { error: 'Insufficient funds' };
      }
  

      const newBalance =
      type === 'withdraw'
        ? Number(account.balance) - Number(amount)
        : Number(account.balance) + Number(amount);

    const transaction = await prisma.transaction.create({
      data: {
        type,
        amount: type === 'withdraw' ? -Number(amount) : Number(amount),
        accountId: account.id,
        balance: newBalance.toString(), 
      },
    });

  
      await prisma.account.update({
        where: { id: 1 },
        data: {
          balance:newBalance.toString(),
        },
      });

      revalidatePath('/'); 
  
      return {
        ...transaction,
        balance: transaction.balance.toString(),
        amount: transaction.amount.toString(), 
      };
    } catch (err) {
      console.error('Error creating transaction:', err);
      return { error: 'Error creating transaction' };
    }
};


function roundToTwoDecimalPlaces(value: number): number {
    return Math.round(value * 100) / 100;
  }



