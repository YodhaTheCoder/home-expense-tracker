import '../FinanceCommon.css';

export default function InsuranceSummary({ insuranceList }) {
  const totalPremium = insuranceList.reduce(
    (total, item) => total + Number(item.amount),

    0
  );

  const totalSaved = insuranceList.reduce(
    (total, item) => total + Number(item.goals?.saved_amount || 0),

    0
  );

  const remaining = Math.max(
    totalPremium - totalSaved,

    0
  );

  const readyPolicies = insuranceList.filter(
    (item) => Number(item.goals?.saved_amount || 0) >= Number(item.amount)
  ).length;

  const today = new Date();

  const dueSoon = insuranceList.filter((item) => {
    const due = new Date(item.due_date);

    const diff = Math.ceil((due - today) / (1000 * 60 * 60 * 24));

    return diff >= 0 && diff <= 30;
  }).length;

  return (
    <div className="finance-overview-card">
      <div className="finance-overview-top">
        <h3>Insurance Summary</h3>

        <span>Policy Overview</span>

        <h1>₹{totalPremium.toLocaleString('en-IN')}</h1>
      </div>

      <div className="finance-overview-content">
        <div className="finance-overview-grid">
          <div className="finance-overview-box">
            <span>Total Premium</span>

            <strong>₹{totalPremium.toLocaleString('en-IN')}</strong>
          </div>

          <div className="finance-overview-box">
            <span>Total Saved</span>

            <strong>₹{totalSaved.toLocaleString('en-IN')}</strong>
          </div>

          <div className="finance-overview-box">
            <span>Remaining</span>

            <strong>₹{remaining.toLocaleString('en-IN')}</strong>
          </div>

          <div className="finance-overview-box">
            <span>Ready Policies</span>

            <strong>
              {readyPolicies} / {insuranceList.length}
            </strong>
          </div>

          <div className="finance-overview-box">
            <span>Due in 30 Days</span>

            <strong>{dueSoon}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
