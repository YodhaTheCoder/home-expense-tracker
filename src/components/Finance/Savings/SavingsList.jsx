import '../FinanceCommon.css';

export default function SavingsList({
  savingsList,

  deleteSaving,

  setEditingSavingId,

  setShowSavingForm,
}) {
  return (
    <div className="finance-card">
      <h3>Savings History</h3>

      <div className="finance-card-content">
        {savingsList.length === 0 ? (
          <div className="finance-empty">No savings added yet.</div>
        ) : (
          <div className="finance-table-wrapper">
            <table className="finance-table">
              <thead>
                <tr>
                  <th>Date</th>

                  <th>Type</th>

                  <th>Amount</th>

                  <th>Description</th>

                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {savingsList.map((item) => (
                  <tr key={item.id}>
                    <td data-label="Date">{item.saving_date}</td>

                    <td data-label="Type">{item.saving_type}</td>

                    <td data-label="Amount">₹{Number(item.amount).toLocaleString('en-IN')}</td>

                    <td data-label="Description">{item.description || '-'}</td>

                    <td className="finance-actions">
                      <button
                        className="edit-btn"

                        type="button"

                        onClick={() => {
                          setEditingSavingId(item.id);
                          setShowSavingForm(true);
                        }}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"

                        type="button"

                        onClick={() => deleteSaving(item.id)}
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
