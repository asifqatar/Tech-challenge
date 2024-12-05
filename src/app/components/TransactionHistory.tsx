import React from 'react';
import { Transaction } from '@prisma/client';

interface TransactionHistoryProps {
  transactions: Transaction[];
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium mb-4">Transaction History</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left pb-2 border-b">Date</th>
            <th className="text-left pb-2 border-b">Type</th>
            <th className="text-right pb-2 border-b">Amount</th>
            <th className="text-right pb-2 border-b">Balance</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id} className="border-b">
              <td className="py-2">{tx.createdAt.toLocaleDateString()}</td>
              <td className="py-2">{tx.type}</td>
              <td className="py-2 text-right">
                €{Math.abs(Number(tx.amount)).toFixed(2)}
              </td>
              <td className="py-2 text-right">€{Number(tx.balance).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;