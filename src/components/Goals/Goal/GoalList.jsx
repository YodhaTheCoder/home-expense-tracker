import { useState } from 'react';

import GoalForm from './GoalForm.jsx';
import GoalCard from './GoalCard.jsx';
import { useGoals } from '../../../hooks/useGoals';

export default function GoalList({ userId }) {
  const [showForm, setShowForm] = useState(false);

  const {
    goals,

    saveGoal,

    addMoney,

    editGoal,

    removeGoal,

    moveToWishlist,

    transactions,

    loadTransactions,

    editTransaction,

    removeTransaction,

    archiveGoal,

    loading,
  } = useGoals(userId);

  if (loading) {
    return <p>Loading goals...</p>;
  }

  async function addGoal(goal) {
    await saveGoal(goal);

    setShowForm(false);
  }

  return (
    <div>
      <button className="primary-btn" onClick={() => setShowForm(true)}>
        + Add Goal
      </button>

      {showForm && (
        <GoalForm
          onSave={addGoal}

          onCancel={() => setShowForm(false)}
        />
      )}

      {goals.length === 0 ? (
        <div className="empty-card">No savings goals yet.</div>
      ) : (
        goals.map((goal) => (
          <GoalCard
            key={goal.id}

            goal={goal}

            addMoney={addMoney}

            editGoal={editGoal}

            removeGoal={removeGoal}

            moveToWishlist={moveToWishlist}

            transactions={transactions?.[goal.id] || []}

            loadTransactions={loadTransactions}

            editTransaction={editTransaction}

            removeTransaction={removeTransaction}

            archiveGoal={archiveGoal}
          />
        ))
      )}
    </div>
  );
}
