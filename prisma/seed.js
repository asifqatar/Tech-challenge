const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const accountsToInsert = [
    { id: 1, balance: 0, createdAt: new Date(), updatedAt: new Date() },
    { id: 2, balance: 0, createdAt: new Date(), updatedAt: new Date() },
  ];

  // Fetch existing account IDs
  const existingAccountIds = await prisma.account.findMany({
    select: { id: true },
  });

  const existingIdsSet = new Set(existingAccountIds.map((account) => account.id));

  // Filter out accounts that already exist
  const newAccounts = accountsToInsert.filter((account) => !existingIdsSet.has(account.id));

  if (newAccounts.length > 0) {
    await prisma.account.createMany({
      data: newAccounts,
    });
    console.log('New accounts created:', newAccounts);
  } else {
    console.log('No new accounts to create.');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
