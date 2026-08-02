import '../CashTracker.css';

import { formatCurrency } from '../../../utils/format';

export default function CashList({
  cashLocations = [],

  onEdit,

  onDelete,

  onTransaction,
}) {
  return (
    <div className="card expense-list-card">
      <div className="section-header">
        <h3>Cash Locations</h3>

        <span className="category-count">{cashLocations.length} Locations</span>
      </div>

      {cashLocations.length === 0 ? (
        <p className="muted">No cash locations found.</p>
      ) : (
        <div className="category-grid">
          {cashLocations.map((item) => {
            const transactions = item.cash_transactions || [];

            return (
              <div
                key={item.id}

                className="category-card user-card"
              >
                <div className="category-top">
                  <div className="category-icon">₹</div>

                  <div className="category-details">
                    <h4>{formatCurrency(item.current_amount)}</h4>

                    <p className="username-text">{item.name}</p>

                    <p className="username-text">{transactions.length} Transactions</p>

                    <div className="category-type custom-type">
                      Updated
                      {item.updated_at ? new Date(item.updated_at).toLocaleDateString() : ''}
                    </div>
                  </div>
                </div>

                {item.notes && <p className="expense-description">{item.notes}</p>}

                <div className="category-actions">
                  <button
                    className="category-btn edit"

                    onClick={() => onTransaction(item)}
                  >
                    Add Transaction
                  </button>

                  <button
                    className="category-btn edit"

                    onClick={() => onEdit(item)}
                  >
                    Edit
                  </button>

                  <button
                    className="category-btn delete"

                    onClick={() => onDelete(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
