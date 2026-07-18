import { useEffect, useState } from 'react';

import {
  getBudgets,
  getBudgetUsers,
  createBudget as createBudgetApi,
  updateBudget as updateBudgetApi,
  deleteBudget as deleteBudgetApi,
} from '../services/budgetService';

export function useBudget(profile) {
  const [budgets, setBudgets] = useState([]);

  const [users, setUsers] = useState([]);

  const [message, setMessage] = useState('');

  const [messageType, setMessageType] = useState('');

  async function loadBudgets() {
    const data = await getBudgets();

    const userData = await getBudgetUsers();

    setBudgets(data);

    setUsers(userData);
  }

  useEffect(() => {
    if (profile?.role === 'super_admin') {
      loadBudgets();
    } else {
      setBudgets([]);
      setUsers([]);
    }
  }, [profile]);

  async function createBudget(payload) {
    try {
      await createBudgetApi(payload);

      await loadBudgets();

      setMessage('Budget created successfully.');
      setMessageType('success');
    } catch (error) {
      if (error.message.includes('duplicate')) {
        setMessage('Budget already exists for this month. Please edit the existing budget.');
      } else {
        setMessage(error.message);
      }

      setMessageType('error');
    }
  }

  async function updateBudget(id, payload) {
    try {
      await updateBudgetApi(id, payload);

      await loadBudgets();
    } catch (error) {
      setMessage(error.message);
      setMessageType('error');
    }
  }

  async function deleteBudget(id) {
    await deleteBudgetApi(id);

    await loadBudgets();
  }

  return {
    budgets,

    users,

    message,
    messageType,
    loadBudgets,

    createBudget,

    updateBudget,

    deleteBudget,
  };
}
