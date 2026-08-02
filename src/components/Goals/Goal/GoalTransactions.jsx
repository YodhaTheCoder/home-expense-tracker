import { useEffect } from 'react';

export default function GoalTransactions({
  goalId,

  transactions,

  loadTransactions,

  setEditingTransaction,

  removeTransaction,
}) {
  useEffect(() => {
    loadTransactions(goalId);
  }, [goalId]);

  return (
    <div className="goal-transactions">
      <h4>Transactions</h4>

      {transactions.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        transactions.map((item) => (
          <div key={item.id} className="transaction-card">
            <p>₹{item.amount}</p>

            <p>{item.note || 'No note'}</p>

            <p>{item.transaction_date}</p>

            <button
              className="small-btn edit-btn"

              onClick={() => {
                setEditingTransaction(item);
              }}
            >
              Edit
            </button>

            <button
              className="small-btn delete-btn"

              onClick={() => {
                removeTransaction(item.id, goalId);
              }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}
