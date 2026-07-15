import { formatCurrency } from "../utils/format";

function ExpenseList({ expenses, onEdit, onDelete }) {
  return (
    <div className="card expense-list-card">

      <div className="section-header">
        <h3>Recent Entries</h3>
        <span className="category-count">
          {expenses.length} Entries
        </span>
      </div>

      {expenses.length === 0 ? (

        <p className="muted">
          No expenses yet. Add your first entry.
        </p>

      ) : (

        <div className="category-grid">

          {expenses.map((expense) => (

            <div
              key={expense.id}
              className="category-card user-card"
            >

              <div className="category-top">

                <div className="category-icon">
                  ₹
                </div>

                <div className="category-details">

                  <h4>{formatCurrency(expense.amount)}</h4>

                  <p className="username-text">
                    {expense.category}
                  </p>

                  <div className="category-type custom-type">
                    {expense.date}
                  </div>

                </div>

              </div>

              <p
                style={{
                  marginTop: 16,
                  color: "#64748b",
                  fontSize: 14
                }}
              >
                {expense.description}
              </p>

              <div className="category-actions">

                <button
                  className="category-btn edit"
                  onClick={() => onEdit(expense)}
                >
                  Edit
                </button>

                <button
                  className="category-btn delete"
                  onClick={() => onDelete(expense.id)}
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default ExpenseList;