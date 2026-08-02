import '../FinanceCommon.css';

export default function ChitList({
  chitList,

  deleteChit,

  setEditingChitId,

  setSelectedChit,

  setShowChitForm,
}) {
  return (
    <div className="finance-card">
      <h3>My Chits</h3>

      <div className="finance-card-content">
        <div className="finance-table-wrapper">
          <table className="finance-table">
            <thead>
              <tr>
                <th>Name</th>

                <th>Total Value</th>

                <th>Monthly</th>

                <th>Months</th>

                <th>Start</th>

                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {chitList.map((item) => (
                <tr key={item.id}>
                  <td data-label="Name">{item.chit_name}</td>

                  <td data-label="Total Value">₹{Number(item.chit_value).toLocaleString()}</td>

                  <td data-label="Monthly">₹{Number(item.monthly_amount).toLocaleString()}</td>

                  <td data-label="Months">{item.total_months}</td>

                  <td data-label="Start">{item.start_date}</td>

                  <td className="finance-actions">
                    <button
                      className="transaction-btn"

                      onClick={() => setSelectedChit(item)}
                    >
                      Manage
                    </button>

                    <button
                      className="edit-btn"

                      onClick={() => {
                        setEditingChitId(item.id);
                        setShowChitForm(true);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"

                      onClick={() => deleteChit(item.id)}
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
