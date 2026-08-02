export default function ChitTransactionList({
  transactions,

  setEditingId,
}) {
  return (
    <div className="finance-card">
      <h3>Chit Schedule</h3>

      <div className="finance-card-content">
        <div className="finance-table-wrapper">
          <table className="finance-table">
            <thead>
              <tr>
                <th>Month</th>

                <th>Due Date</th>

                <th>Pay Amount</th>

                <th>Received</th>

                <th>Status</th>

                <th>Description</th>

                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((item) => (
                <tr key={item.id}>
                  <td data-label="Month">Month {item.month_number}</td>

                  <td data-label="Due Date">{item.payment_date}</td>

                  <td data-label="Pay Amount">₹{Number(item.amount).toLocaleString('en-IN')}</td>

                  <td data-label="Received">
                    ₹{Number(item.received_amount || 0).toLocaleString('en-IN')}
                  </td>

                  <td data-label="Status">
                    <span className={`status ${item.status}`}>{item.status}</span>
                  </td>

                  <td data-label="Description">{item.description || '-'}</td>

                  <td className="finance-actions">
                    <button
                      className="edit-btn"

                      onClick={() => {
                        setEditingId(item.id);
                        window.scrollTo({
                          top: 0,

                          behavior: 'smooth',
                        });
                      }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
