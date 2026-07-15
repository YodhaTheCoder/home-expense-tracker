import { useState } from 'react';

import {
  getExpenses,
  createExpense,
  updateExpense,
  removeExpense,
} from '../services/expenseService';

export function useExpenses(username) {
  const [expenses, setExpenses] = useState([]);

  const [message, setMessage] = useState('');

  async function loadExpenses() {
    try {
      const data = await getExpenses(username);

      setExpenses(data);
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function saveExpense(event, expenseForm, editingExpenseId) {
    event.preventDefault();

    try {
      if (editingExpenseId) {
        await updateExpense(
          editingExpenseId,

          username,

          {
            amount: Number(expenseForm.amount),

            category: expenseForm.category,

            description: expenseForm.description,

            date: expenseForm.date,
          }
        );

        setMessage('Expense updated.');
      } else {
        await createExpense({
          username,

          amount: Number(expenseForm.amount),

          category: expenseForm.category,

          description: expenseForm.description,

          date: expenseForm.date,
        });

        setMessage('Expense added.');
      }

      await loadExpenses();
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function deleteExpense(id) {
    try {
      await removeExpense(
        id,

        username
      );

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
