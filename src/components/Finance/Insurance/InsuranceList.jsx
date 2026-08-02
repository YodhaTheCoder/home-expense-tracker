import '../FinanceCommon.css';

export default function InsuranceList({
  insuranceList,

  message,

  deleteInsurance,

  setEditingInsuranceId,

  setShowInsuranceForm,

  onManageContributions,
}) {
  return (
    <div className="finance-card">
      <h3>Insurance List</h3>

      <div className="finance-card-content">
        {message && <div className="finance-message">{message}</div>}

        <div className="finance-table-wrapper">
          <table className="finance-table">
            <thead>
              <tr>
                <th>Name</th>

                <th>Type</th>

                <th>Premium</th>

                <th>Due Date</th>

                <th>Goal</th>

                <th>Status</th>

                <th>Progress</th>

                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {insuranceList.map((item) => {
                const premium = Number(item.amount);

                const saved = Number(item.goals?.saved_amount || 0);

                const remaining = Math.max(
                  premium - saved,

                  0
                );

                const progress = premium
                  ? Math.min(
                      (saved / premium) * 100,

                      100
                    )
                  : 0;

                let status = 'Not Started';

                if (saved >= premium) {
                  status = 'Ready';
                } else if (saved > 0) {
                  status = 'In Progress';
                }

                return (
                  <tr key={item.id}>
                    <td data-label="Name">{item.insurance_name}</td>

                    <td data-label="Type">{item.insurance_type}</td>

                    <td data-label="Premium">₹{premium.toLocaleString('en-IN')}</td>

                    <td data-label="Due Date">{item.due_date}</td>

                    <td data-label="Goal">{item.goals?.title || '-'}</td>

                    <td data-label="Status">
                      <span className={`status ${status.toLowerCase().replace(' ', '-')}`}>
                        {status}
                      </span>
                    </td>

                    <td data-label="Progress">
                      <div>
                        <div className="insurance-progress-container">
                          <div
                            className="insurance-progress-bar"

                            style={{
                              width: `${progress}%`,
                            }}
                          ></div>
                        </div>

                        <small>
                          ₹{saved.toLocaleString('en-IN')}/ ₹{premium.toLocaleString('en-IN')}
                        </small>

                        <br />

                        <small>Remaining: ₹{remaining.toLocaleString('en-IN')}</small>
                      </div>
                    </td>

                    <td className="finance-actions">
                      <button
                        className="transaction-btn"

                        type="button"

                        onClick={() => onManageContributions(item)}
                      >
                        Manage
                      </button>

                      <button
                        className="edit-btn"

                        type="button"

                        onClick={() => {
                          setEditingInsuranceId(item.id);
                          setShowInsuranceForm(true);
                        }}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"

                        type="button"

                        onClick={() => deleteInsurance(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
