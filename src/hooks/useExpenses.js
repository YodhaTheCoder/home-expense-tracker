import { useState } from 'react';

import {
  getExpenses,
  createExpense,
  updateExpense,
  removeExpense,
} from '../services/expenseService';

export function useExpenses() {
  const [expenses, setExpenses] = useState([]);

  const [message, setMessage] = useState('');

  async function loadExpenses() {
    try {
      const data = await getExpenses();

      setExpenses(data);
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function saveExpense(event, expenseForm, editingExpenseId) {
    event.preventDefault();

    try {
      const payload = {
        amount: Number(expenseForm.amount),

        category_id: Number(expenseForm.category_id),

        description: expenseForm.description,

        date: expenseForm.date,
      };

      if (editingExpenseId) {
        await updateExpense(
          editingExpenseId,

          payload
        );

        setMessage('Expense updated.');
      } else {
        await createExpense(payload);

        setMessage('Expense added.');
      }

      await loadExpenses();
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function deleteExpense(id) {
    try {
      await removeExpense(id);

      setMessage('Expense deleted.');

      await loadExpenses();
    } catch (error) {
      setMessage(error.message);
    }
  }

  return {
    expenses,

    message,

    loadExpenses,

    saveExpense,

    deleteExpense,
  };
}
