export default function CashSummary({ summary }) {
  return (
    <div className="cash-summary-card">
      <div className="cash-summary-top">
        <h3>Cash Summary</h3>

        <span>Current cash overview</span>

        <h1>₹{Number(summary.totalCash || 0).toLocaleString('en-IN')}</h1>
      </div>

      <div className="cash-summary-content">
        <div className="cash-summary-grid">
          <div className="cash-box cash-available">
            <span>Total Cash</span>

            <strong>₹{Number(summary.totalCash || 0).toLocaleString('en-IN')}</strong>
          </div>

          <div className="cash-box cash-expense">
            <span>Expenses</span>

            <strong>₹{Number(summary.totalExpenseCash || 0).toLocaleString('en-IN')}</strong>
          </div>
        </div>

        <div className="cash-progress-wrapper">
          <div className="cash-progress">
            <div
              className="cash-progress-bar"
              style={{
                width: `${summary.usagePercentage || 0}%`,
              }}
            />
          </div>

          <div className="cash-progress-info">
            <span>Used {summary.usagePercentage || 0}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
