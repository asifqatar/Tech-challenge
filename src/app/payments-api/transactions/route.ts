import { NextResponse } from 'next/server';
import { prisma } from '../../../../prisma/lib/prisma';

export async function POST(request: Request) {
  console.log(request, 'chcking')
  try {
    const { type, amount, iban } = await request.json();
    console.log(type, amount, iban, 'payload ')

    const account = await prisma.account.findUnique({ where: { id: 1 } });
    if (!account) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    if (type === 'withdraw' && account.balance < amount) {
      return NextResponse.json({ error: 'Insufficient funds' }, { status: 400 });
    }

    if (type === 'transfer' && !isValidIBAN(iban)) {
      return NextResponse.json({ error: 'Invalid IBAN' }, { status: 400 });
    }

    const transaction = await prisma.transaction.create({
      data: {
        type,
        amount: type === 'withdraw' ? -amount : amount,
        accountId: account.id,
      },
    });

    await prisma.account.update({
      where: { id: 1 },
      data: { balance: account.balance + " " + transaction.amount },
    });

    return NextResponse.json(transaction, { status: 200 });
  } catch (err) {
    console.error('Error submitting transaction:', err);
    return NextResponse.json({ error: 'Error submitting transaction' }, { status: 500 });
  }
}

function isValidIBAN(iban: string): boolean {
  // Simple IBAN validation
  return iban.length === 22 && iban.startsWith('DE');
}
