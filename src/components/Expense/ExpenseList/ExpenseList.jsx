import { formatCurrency } from '../../../utils/format';
import './ExpenseList.css';

function ExpenseList({ expenses, onEdit, onDelete }) {
    const formatDate = (datetime) => {
    if (!datetime) return '';
    return new Date(datetime).toLocaleDateString(); // Example: 7/18/2026
  };

  return (
    <div className="card expense-list-card">
      <div className="section-header">
        <h3>Recent Entries</h3>
        <span className="category-count">{expenses.length} Entries</span>
      </div>

      {expenses.length === 0 ? (
        <p className="muted">No expenses yet. Add your first entry.</p>
      ) : (
        <div className="category-grid">
          {expenses.map((expense) => (
            <div key={expense.id} className="category-card user-card">
              <div className="category-top">
                <div className="category-icon">₹</div>

                <div className="category-details">
                  <h4>{formatCurrency(expense.amount)}</h4>

                  <p className="username-text">{expense.category}</p>
                <p className="username-text">
   {expense.full_name || 'Unknown'}
</p>
                  <div className="category-type custom-type">
  {new Date(expense.date).toLocaleDateString()}
</div>
                </div>
              </div>

              <p className="expense-description">{expense.description}</p>

              <div className="category-actions">
                <button className="category-btn edit" onClick={() => onEdit(expense)}>
                  Edit
                </button>

                <button className="category-btn delete" onClick={() => onDelete(expense.id)}>
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
