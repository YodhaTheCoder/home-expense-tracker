import { useState } from 'react';
import GoalForm from './GoalForm';
import GoalContributionManager from './GoalContributionManager';
import GoalTransactions from './GoalTransactions';
import ArchivedGoals from './ArchivedGoals';

export default function GoalCard({
  goal,

  addMoney,

  editGoal,

  removeGoal,

  moveToWishlist,

  archiveGoal,

  transactions,

  loadTransactions,

  editTransaction,

  removeTransaction,
}) {
  const [mode, setMode] = useState(null);

  const remaining = Number(goal.target_amount) - Number(goal.saved_amount || 0);

  const percentage = goal.target_amount
    ? Math.round((Number(goal.saved_amount || 0) / Number(goal.target_amount)) * 100)
    : 0;

  const completed = goal.status === 'completed';

  return (
    <div className="goal-card">
      <h3>{goal.title}</h3>

      {goal.description && <p className="goal-description">{goal.description}</p>}

      <p>Target ₹{goal.target_amount}</p>

      <p>Saved ₹{goal.saved_amount}</p>

      <p>Remaining ₹{remaining}</p>

      <div className="progress-container">
        <div
          className="progress-bar"
          style={{
            width: `${Math.min(percentage, 100)}%`,
          }}
        ></div>
      </div>

      <p>{Math.min(percentage, 100)}% completed</p>

      {completed && <p className="completed-badge">🎉 Goal Completed</p>}

      {/* NORMAL MODE BUTTONS */}

      {!completed && mode === null && (
        <div className="goal-actions">
          <button className="add-money-btn" onClick={() => setMode('money')}>
            Add Money
          </button>

          <button className="small-btn edit-btn" onClick={() => setMode('edit')}>
            Edit
          </button>

          {Number(goal.saved_amount) === 0 && (
            <button className="small-btn move-btn" onClick={() => moveToWishlist(goal)}>
              Move
            </button>
          )}

          <button className="small-btn delete-btn" onClick={() => removeGoal(goal.id)}>
            Delete
          </button>
        </div>
      )}

      {completed && mode === null && (
        <div className="goal-actions">
          <button className="small-btn view-btn" onClick={() => setMode('transactions')}>
            View Transactions
          </button>

          <button className="small-btn archive-btn" onClick={() => archiveGoal(goal.id)}>
            Archive
          </button>

          <button className="small-btn delete-btn" onClick={() => removeGoal(goal.id)}>
            Delete
          </button>
        </div>
      )}

      {mode === 'edit' && (
        <GoalForm
          initialData={goal}

          onSave={(data) => {
            editGoal(goal.id, data);

            setMode(null);
          }}

          onCancel={() => setMode(null)}
        />
      )}

      {mode === 'money' && (
        <>
          <GoalContributionManager
            goal={goal}

            addMoney={addMoney}

            transactions={transactions}

            loadTransactions={loadTransactions}

            editTransaction={editTransaction}

            removeTransaction={removeTransaction}

            onClose={() => {
              setMode(null);
            }}
          />
        </>
      )}
    </div>
  );
}
