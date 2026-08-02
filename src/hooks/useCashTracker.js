import { useEffect, useState } from 'react';

import {
  getCashLocations,
  createCashLocation,
  updateCashLocation,
  deleteCashLocation,
  createCashTransaction,
  updateCashTransaction,
  deleteCashTransaction,
  getCashSummary,
} from '../services/cashTrackerService';

export function useCashTracker(userId) {
  const [cashLocations, setCashLocations] = useState([]);

  const [summary, setSummary] = useState({
    totalCash: 0,

    totalExpenseCash: 0,

    usagePercentage: 0,

    remainingCash: 0,
  });

  const [message, setMessage] = useState('');

  async function loadCash() {
    const locations = await getCashLocations(userId);

    setCashLocations(locations);

    const summaryData = await getCashSummary(userId);

    setSummary(summaryData);

    return locations;
  }

  useEffect(() => {
    loadCash();
  }, [userId]);

  async function saveCash(e, form, editingId) {
    e.preventDefault();

    try {
      if (editingId) {
        await updateCashLocation(editingId, form);
      } else {
        await createCashLocation({
          ...form,
          user_id: userId,
        });
      }

      await loadCash();
    } catch (error) {
      console.error('SAVE CASH ERROR:', error);

      setMessage(error.message);
    }
  }

  async function deleteCash(id) {
    await deleteCashLocation(id);

    setMessage('Cash location deleted.');

    await loadCash();
  }

  async function saveTransaction(transaction) {
    await createCashTransaction(transaction);

    setMessage('Transaction added.');

    await loadCash();
  }

  async function editTransaction(id, transaction) {
    await updateCashTransaction(id, transaction);

    setMessage('Transaction updated.');

    await loadCash();
  }

  async function deleteTransaction(id) {
    await deleteCashTransaction(id);

    setMessage('Transaction deleted.');

    await loadCash();
  }

  return {
    cashLocations,

    summary,

    message,
    setMessage,

    loadCash,

    saveCash,

    deleteCash,

    saveTransaction,

    editTransaction,

    deleteTransaction,
  };
}
