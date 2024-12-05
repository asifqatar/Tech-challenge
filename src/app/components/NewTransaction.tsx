'use client'
import React, { useRef, useState } from 'react';
import { createTransaction } from '@/actions/transactions';

const NewTransaction: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const currentAmount =  formData.get('amount')
    const currentType =  formData.get('type')
    console.log(currentAmount, currentType)
    try {
      const result = await createTransaction(formData);
        console.log(result, 'result')
      if (result?.error) {
        setError(result.error);
        setMessage('')
      } else {
        setMessage('Transaction successful');
        setError('')
        if (formRef.current) {
          formRef.current.reset();
        }
      }
    } catch (err) {
      setError('Error submitting the transaction');
    }
  };

  return (
    <form onSubmit={handleSubmit}  className="space-y-4" ref={formRef}>
      <div>
        <label htmlFor="type" className="block font-medium">
          Transaction Type
        </label>
        <select
          id="type"
          name="type"
          className="border border-gray-300 rounded px-3 py-2 w-full"
        >
          <option value="deposit">Deposit</option>
          <option value="withdraw">Withdraw</option>
          <option value="transfer">Transfer</option>
        </select>
      </div>
      <div>
        <label htmlFor="amount" className="block font-medium">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
      </div>
      <div>
        <label htmlFor="iban" className="block font-medium">
          IBAN
        </label>
        <input
          type="text"
          id="iban"
          name="iban"
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
      >
        Submit Transaction
      </button>

      {message && <div className="text-green-600">{message}</div>}
      {error && <div className="text-red-600">{error}</div>}
    </form>
  );
};

export default NewTransaction;
