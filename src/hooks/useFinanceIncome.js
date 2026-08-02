import { useState } from 'react';

import {
  getIncome,
  createIncome,
  updateIncome,
  removeIncome,
} from '../services/financeIncomeService';

export function useFinanceIncome(userId = null) {
  const [incomeList, setIncomeList] = useState([]);

  const [message, setMessage] = useState('');

  async function loadIncome() {
    try {
      const data = await getIncome(userId);

      setIncomeList(data);
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function saveIncome(event, incomeForm, editingIncomeId) {
    event.preventDefault();

    try {
      const payload = {
        income_type: incomeForm.income_type,

        amount: Number(incomeForm.amount),

        income_date: incomeForm.income_date,

        description: incomeForm.description,
      };

      if (editingIncomeId) {
        await updateIncome(editingIncomeId, payload);

        setMessage('Income updated.');
      } else {
        await createIncome(payload);

        setMessage('Income added.');
      }

      await loadIncome();
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function deleteIncome(id) {
    try {
      await removeIncome(id);

      setMessage('Income deleted.');

      await loadIncome();
    } catch (error) {
      setMessage(error.message);
    }
  }

  return {
    incomeList,

    message,

    loadIncome,

    saveIncome,

    deleteIncome,
  };
}
