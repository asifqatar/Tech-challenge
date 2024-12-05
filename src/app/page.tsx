
import NewTransaction from './components/NewTransaction';
import AccountDetails from './components/AccountDetails';
import TransactionHistory from './components/TransactionHistory';
import { prisma } from '../../prisma/lib/prisma';
import { listTransactionsByAccount } from '@/actions/listTransactionsByAccount';

const HomePage =  async () => {
 const accountData =  await listTransactionsByAccount(1)
 const account = await prisma.account.findUnique({
  where: { id: 1 },
});

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <NewTransaction />
        <AccountDetails
          balance={Number(account?.balance )}
        />
      </div>
      <div className="mt-8">
        <TransactionHistory transactions={accountData} />
      </div>
    </div>
  );
};

export default HomePage;