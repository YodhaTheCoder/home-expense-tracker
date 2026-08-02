import { useEffect, useState } from 'react';

import {
  getGoals,
  createGoal,
  addGoalMoney,
  updateGoalSavedAmount,
  updateGoal,
  deleteGoal,
  moveGoalToWishlist,
  getGoalTransactions,
  updateGoalTransaction,
  deleteGoalTransaction,
  calculateGoalSavedAmount,
  archiveGoal,
  getArchivedGoals,
  restoreGoal as restoreArchivedGoal,
} from '../services/goalService';

export function useGoals(userId) {
  const [goals, setGoals] = useState([]);

  const [loading, setLoading] = useState(false);

  const [transactions, setTransactions] = useState({});

  const [archivedGoals, setArchivedGoals] = useState([]);

  async function loadGoals() {
    if (!userId) return;

    setLoading(true);

    try {
      const data = await getGoals(userId);

      setGoals(data || []);
    } catch (error) {
      console.error('Loading goals failed', error);
    } finally {
      setLoading(false);
    }
  }

  async function saveGoal(form) {
    const goal = {
      user_id: userId,

      title: form.title,

      description: form.description,

      target_amount: Number(form.target_amount),

      saved_amount: 0,

      target_date: form.target_date || null,

      status: 'active',
    };

    const result = await createGoal(goal);

    setGoals((prev) => [result, ...prev]);
  }

  useEffect(() => {
    loadGoals();
  }, [userId]);

  async function addMoney(goal, transaction) {
    const amount = Number(transaction.amount);

    await addGoalMoney({
      goal_id: goal.id,

      user_id: userId,

      amount,

      note: transaction.note,

      transaction_date: transaction.transaction_date,

      transaction_type: 'deposit',
    });

    const updatedSavedAmount = Number(goal.saved_amount || 0) + amount;

    await updateGoalSavedAmount(goal.id, updatedSavedAmount);

    let newStatus = goal.status;

    if (updatedSavedAmount >= Number(goal.target_amount)) {
      newStatus = 'completed';

      await updateGoal(goal.id, {
        status: 'completed',
      });
    }

    setGoals((prev) =>
      prev.map((item) =>
        item.id === goal.id
          ? {
              ...item,
              saved_amount: updatedSavedAmount,
              status: newStatus,
            }
          : item
      )
    );

    await loadTransactions(goal.id);
  }

  async function editGoal(goalId, data) {
    const updated = await updateGoal(goalId, data);

    setGoals((prev) => prev.map((goal) => (goal.id === goalId ? updated : goal)));
  }

  async function removeGoal(goalId) {
    await deleteGoal(goalId);

    setGoals((prev) => prev.filter((goal) => goal.id !== goalId));

    setArchivedGoals((prev) => prev.filter((goal) => goal.id !== goalId));
  }

  async function moveToWishlist(goal) {
    try {
      await moveGoalToWishlist(goal);

      setGoals((prev) => prev.filter((item) => item.id !== goal.id));
    } catch (error) {
      console.error('Move to wishlist failed', error);
    }
  }

  async function loadTransactions(goalId) {
    try {
      const data = await getGoalTransactions(goalId);

      setTransactions((prev) => ({
        ...prev,

        [goalId]: data || [],
      }));
    } catch (error) {
      console.error('Loading transactions failed', error);
    }
  }

  async function removeTransaction(transactionId, goalId) {
    await deleteGoalTransaction(transactionId);

    await refreshGoalAmount(goalId);

    await loadTransactions(goalId);
  }

  async function editTransaction(transactionId, goalId, data) {
    await updateGoalTransaction(transactionId, data);

    await refreshGoalAmount(goalId);

    await loadTransactions(goalId);
  }

  async function refreshGoalAmount(goalId) {
    const amount = await calculateGoalSavedAmount(goalId);

    await updateGoalSavedAmount(goalId, amount);

    setGoals((prev) =>
      prev.map((goal) => {
        if (goal.id !== goalId) return goal;

        return {
          ...goal,

          saved_amount: amount,

          status: amount >= Number(goal.target_amount) ? 'completed' : 'active',
        };
      })
    );
  }

  async function archiveCompletedGoal(goalId) {
    await archiveGoal(goalId);

    await loadGoals();

    await loadArchivedGoals();
  }

  async function loadArchivedGoals() {
    const data = await getArchivedGoals(userId);

    setArchivedGoals(data || []);
  }

  async function restoreGoal(goalId) {
    await restoreArchivedGoal(goalId);

    await loadArchivedGoals();

    await loadGoals();
  }

  return {
    goals,

    loading,

    loadGoals,

    saveGoal,

    addMoney,

    editGoal,

    removeGoal,

    moveToWishlist,

    transactions,

    loadTransactions,

    editTransaction,

    removeTransaction,

    archivedGoals,

    loadArchivedGoals,

    restoreGoal,

    archiveGoal,
  };
}
