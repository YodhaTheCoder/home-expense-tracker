export default function CashTransactions({
  transactions,
  onEdit,

  onDelete,
}) {
  return (
    <div className="goal-transactions">
      <h4>Transactions</h4>

      {transactions.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        transactions.map((item) => (
          <div
            key={item.id}

            className="transaction-card"
          >
            <p>
              <span className={item.type === 'ADD' ? 'cash-income' : 'cash-expense'}>
                {item.type === 'ADD' ? '+' : '-'}₹{item.amount}
              </span>
            </p>

            <p>{item.note || 'No note'}</p>

            <p>{item.transaction_date}</p>

            <div className="transaction-actions">
              <button className="category-btn edit" onClick={() => onEdit(item)}>
                Edit
              </button>

              <button className="category-btn delete" onClick={() => onDelete(item.id)}>
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
