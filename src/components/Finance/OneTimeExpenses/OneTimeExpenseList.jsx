import '../FinanceCommon.css';

export default function OneTimeExpenseList({
  expenses,

  onEdit,

  onDelete,

  setShowExpenseForm,
}) {
  return (
    <div className="finance-card">
      <h3>One-Time Expenses</h3>

      <div className="finance-card-content">
        {expenses.length === 0 ? (
          <div className="finance-empty">No expenses added yet.</div>
        ) : (
          <div className="finance-table-wrapper">
            <table className="finance-table">
              <thead>
                <tr>
                  <th>Title</th>

                  <th>Amount</th>

                  <th>Date</th>

                  <th>Description</th>

                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {expenses.map((item) => (
                  <tr key={item.id}>
                    <td data-label="Title">{item.title}</td>

                    <td data-label="Amount">₹{Number(item.amount).toLocaleString('en-IN')}</td>

                    <td data-label="Date">{item.expense_date}</td>

                    <td data-label="Description">{item.description || '-'}</td>

                    <td className="finance-actions">
                      <button
                        className="edit-btn"

                        type="button"

                        onClick={() => {
                          onEdit(item);
                          setShowExpenseForm(true);
                        }}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"

                        type="button"

                        onClick={() => onDelete(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
