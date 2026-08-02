import '../FinanceCommon.css';

export default function IncomeList({
  incomeList,

  deleteIncome,

  setEditingIncomeId,

  setShowIncomeForm,
}) {
  return (
    <div className="finance-form-card">
      <h3>Income History</h3>

      <div className="finance-list">
        {incomeList.length === 0 && (
          <div className="finance-empty">
            <h3>No Income Found</h3>

            <p>Add income entries to see them here.</p>
          </div>
        )}

        {incomeList.map((item) => (
          <div
            key={item.id}

            className="finance-item"
          >
            <div className="finance-item-header">
              <div>
                <div className="finance-item-title">{item.income_type}</div>

                <div className="finance-item-date">{item.income_date}</div>
              </div>

              <div className="finance-item-amount">₹{Number(item.amount).toLocaleString()}</div>
            </div>

            {item.description && <div className="finance-item-description">{item.description}</div>}

            <div className="finance-item-actions">
              <button
                className="edit-btn"

                onClick={() => {
                  setEditingIncomeId(item.id);
                  setShowIncomeForm(true);
                }}
              >
                Edit
              </button>

              <button
                className="delete-btn"

                onClick={() => deleteIncome(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
