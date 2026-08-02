import { useState } from 'react';

import { getChitTransactions, updateChitTransaction } from '../services/financeChitService';

export function useChitTransactions(chitId) {
  const [transactions, setTransactions] = useState([]);

  const [message, setMessage] = useState('');

  async function loadTransactions() {
    if (!chitId) return;

    try {
      const data = await getChitTransactions(chitId);

      setTransactions(data);
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function saveTransaction(event, form, editingId) {
    event.preventDefault();

    try {
      await updateChitTransaction(
        editingId,

        form
      );

      setMessage('Payment updated.');

      await loadTransactions();
    } catch (error) {
      setMessage(error.message);
    }
  }

  return {
    transactions,

    message,

    loadTransactions,

    saveTransaction,
  };
}
