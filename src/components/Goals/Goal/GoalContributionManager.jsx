import { useState } from 'react';

import GoalContributionForm from './GoalContributionForm';
import GoalTransactions from './GoalTransactions';

export default function GoalContributionManager({
  goal,

  addMoney,

  transactions,

  loadTransactions,

  editTransaction,

  removeTransaction,

  onClose,
}) {
  const [editingTransaction, setEditingTransaction] = useState(null);

  async function saveTransaction(data) {
    if (editingTransaction) {
      await editTransaction(
        editingTransaction.id,

        goal.id,

        data
      );

      setEditingTransaction(null);
    } else {
      await addMoney(
        goal,

        data
      );
    }
  }

  return (
    <div>
      <GoalContributionForm
        onSave={saveTransaction}

        onCancel={() => {
          setEditingTransaction(null);

          onClose();
        }}

        initialData={editingTransaction}

        remainingAmount={Number(goal.target_amount) - Number(goal.saved_amount || 0)}
      />

      <GoalTransactions
        goalId={goal.id}

        transactions={transactions[goal.id] || []}

        loadTransactions={loadTransactions}

        setEditingTransaction={setEditingTransaction}

        removeTransaction={removeTransaction}
      />
    </div>
  );
}
