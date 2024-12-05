import React from 'react';

interface AccountDetailsProps {
  accountType?: string;
  accountStatus?: string;
  balance?: number;
}

const AccountDetails: React.FC<AccountDetailsProps> = ({ accountType, accountStatus, balance }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium mb-4">Account Details</h2>
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium">Account Type:</span>
        <span>{accountType}</span>
      </div>
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium">Account Status:</span>
        <span>{accountStatus}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-medium">Current Balance:</span>
        <span className="text-blue-500 font-medium">€{balance.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default AccountDetails;