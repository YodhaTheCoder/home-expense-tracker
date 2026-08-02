import '../FinanceCommon.css';

export default function SavingsSummary({
  savingsList,

  savingFilter,

  setSavingFilter,
}) {
  const filteredSavings = savingsList.filter((item) => {
    const date = new Date(item.saving_date);

    return (
      date.getMonth() + 1 === Number(savingFilter.month) &&
      date.getFullYear() === Number(savingFilter.year)
    );
  });

  const monthSavings = filteredSavings.reduce(
    (total, item) => total + Number(item.amount),

    0
  );

  const yearSavings = savingsList
    .filter((item) => {
      const date = new Date(item.saving_date);

      return date.getFullYear() === Number(savingFilter.year);
    })
    .reduce(
      (total, item) => total + Number(item.amount),

      0
    );

  const breakdown = filteredSavings.reduce((acc, item) => {
    acc[item.saving_type] = (acc[item.saving_type] || 0) + Number(item.amount);

    return acc;
  }, {});

  return (
    <div className="finance-overview-card">
      <div className="finance-overview-top">
        <h3>Savings Summary</h3>

        <div className="finance-overview-period">
          <select
            value={savingFilter.month}

            onChange={(e) =>
              setSavingFilter({
                ...savingFilter,

                month: Number(e.target.value),
              })
            }
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option
                key={i + 1}

                value={i + 1}
              >
                {new Date(0, i).toLocaleString('default', {
                  month: 'long',
                })}
              </option>
            ))}
          </select>

          <input
            className="finance-year-input"

            type="number"

            value={savingFilter.year}

            onChange={(e) =>
              setSavingFilter({
                ...savingFilter,

                year: Number(e.target.value),
              })
            }
          />
        </div>

        <span>This Month</span>

        <h1>₹{Number(monthSavings).toLocaleString()}</h1>
      </div>

      <div className="finance-overview-content">
        <div className="finance-overview-grid">
          <div className="finance-overview-box">
            <span>Year Total</span>

            <strong>₹{yearSavings.toLocaleString()}</strong>
          </div>
        </div>

        <div className="one-time-section">
          <h3>Breakdown</h3>

          {Object.keys(breakdown).length === 0 && (
            <div className="finance-empty">No savings for this month</div>
          )}

          {Object.entries(breakdown).map(([type, amount]) => (
            <div
              className="one-time-row"

              key={type}
            >
              <span>{type}</span>

              <strong>₹{amount.toLocaleString()}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
