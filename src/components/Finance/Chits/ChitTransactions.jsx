import { useEffect, useState } from 'react';

import ChitTransactionForm from './ChitTransactionForm';
import ChitTransactionList from './ChitTransactionList';

import { useChitTransactions } from '../../../hooks/useChitTransactions';

export default function ChitTransactions({
  chit,

  setSelectedChit,
}) {
  const {
    transactions,

    message,

    loadTransactions,

    saveTransaction,
  } = useChitTransactions(chit.id);

  const [editingId, setEditingId] = useState(null);

  const editingTransaction = transactions.find((item) => String(item.id) === String(editingId));

  useEffect(() => {
    loadTransactions();
  }, [chit.id]);

  const totalPaid = transactions.reduce(
    (total, item) => total + (item.status === 'paid' ? Number(item.amount || 0) : 0),

    0
  );

  const paidMonths = transactions.filter((item) => item.status === 'paid').length;

  const remainingMonths = Math.max(0, Number(chit.total_months) - paidMonths);

  const remainingAmount = transactions.reduce(
    (total, item) => (item.status !== 'paid' ? total + Number(item.amount) : total),

    0
  );

  const totalCommitment = transactions.reduce(
    (total, item) => total + Number(item.amount),

    0
  );

  const profitLoss = totalPaid - totalCommitment;

  return (
    <div className="finance-overview-card chit-transactions-card">
      <div className="finance-overview-top">
        <h3>{chit.chit_name}</h3>

        <span>Chit Transaction Management</span>
      </div>

      <div className="finance-overview-content">
        <div className="finance-overview-grid">
          <div className="finance-overview-box">
            <span>Total Value</span>

            <strong>₹{Number(chit.chit_value).toLocaleString()}</strong>
          </div>

          <div className="finance-overview-box">
            <span>Monthly</span>

            <strong>₹{Number(chit.monthly_amount).toLocaleString()}</strong>
          </div>

          <div className="finance-overview-box">
            <span>Paid Amount</span>

            <strong>₹{totalPaid.toLocaleString()}</strong>
          </div>

          <div className="finance-overview-box">
            <span>Paid Months</span>

            <strong>
              {paidMonths} / {chit.total_months}
            </strong>
          </div>

          <div className="finance-overview-box">
            <span>Remaining Months</span>

            <strong>{remainingMonths}</strong>
          </div>

          <div className="finance-overview-box">
            <span>Remaining Amount</span>

            <strong>₹{remainingAmount.toLocaleString()}</strong>
          </div>
        </div>

        {message && <div className="finance-message">{message}</div>}

        <button className="finance-back-btn" onClick={() => setSelectedChit(null)}>
          ← Back
        </button>

        <ChitTransactionForm
          chit={chit}
          saveTransaction={saveTransaction}

          editingTransaction={editingTransaction}

          editingId={editingId}

          setEditingId={setEditingId}

          setSelectedChit={setSelectedChit}
        />

        {!editingId && (
          <ChitTransactionList
            transactions={transactions}

            setEditingId={setEditingId}
          />
        )}
      </div>
    </div>
  );
}
