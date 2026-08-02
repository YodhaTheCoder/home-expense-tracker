import { useEffect, useState } from 'react';

import {
  getOneTimeExpenses,
  createOneTimeExpense,
  updateOneTimeExpense,
  removeOneTimeExpense,
} from '../services/oneTimeExpenseService';

export function useOneTimeExpenses(userId) {
  const [expenses, setExpenses] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');

  async function loadExpenses() {
    if (!userId) return;

    setLoading(true);

    try {
      const data = await getOneTimeExpenses(userId);

      setExpenses(data || []);
    } catch (err) {
      console.error('Loading one time expenses failed', err);

      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function saveExpense(form) {
    const payload = {
      title: form.title,

      amount: Number(form.amount),

      expense_date: form.expense_date,

      description: form.description,
    };

    const result = await createOneTimeExpense(payload);

    setExpenses((prev) => [result, ...prev]);
  }

  async function editExpense(id, form) {
    const payload = {
      title: form.title,

      amount: Number(form.amount),

      expense_date: form.expense_date,

      description: form.description,
    };

    const updated = await updateOneTimeExpense(
      id,

      payload
    );

    setExpenses((prev) => prev.map((item) => (item.id === id ? updated : item)));
  }

  async function deleteExpense(id) {
    await removeOneTimeExpense(id);

    setExpenses((prev) => prev.filter((item) => item.id !== id));
  }

  useEffect(() => {
    loadExpenses();
  }, [userId]);

  return {
    expenses,

    loading,

    error,

    loadExpenses,

    saveExpense,

    editExpense,

    deleteExpense,
  };
}
