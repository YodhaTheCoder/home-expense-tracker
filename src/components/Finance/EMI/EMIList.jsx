import '../FinanceCommon.css';

export default function EMIsList({
  emiList,

  deleteEMI,

  setEditingEMIId,

  setshowEMIForm,
}) {
  return (
    <div className="finance-card">
      <h3>EMI History</h3>

      <div className="finance-card-content">
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
              {emiList.map((item) => (
                <tr key={item.id}>
                  <td data-label="Date">{item.emi_date}</td>

                  <td data-label="Type">{item.emi_name}</td>

                  <td data-label="Amount">₹{Number(item.amount).toLocaleString()}</td>

                  <td data-label="Description">{item.description || '-'}</td>

                  <td className="finance-actions">
                    <button
                      className="edit-btn"

                      type="button"

                      onClick={() => {
                        setEditingEMIId(item.id);
                        setshowEMIForm(true);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"

                      type="button"

                      onClick={() => deleteEMI(item.id)}
                    >
                      Delete
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
