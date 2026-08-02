import '../FinanceCommon.css';

export default function EMISummary({
  emiList,

  emiFilter,

  setEMIFilter,
}) {
  const filteredEMI = emiList.filter((item) => {
    const date = new Date(item.emi_date);

    return (
      date.getMonth() + 1 === Number(emiFilter.month) &&
      date.getFullYear() === Number(emiFilter.year)
    );
  });

  const monthEMI = filteredEMI.reduce(
    (total, item) => total + Number(item.amount),

    0
  );

  const yearEMI = emiList
    .filter((item) => {
      const date = new Date(item.emi_date);

      return date.getFullYear() === Number(emiFilter.year);
    })
    .reduce(
      (total, item) => total + Number(item.amount),

      0
    );

  const breakdown = filteredEMI.reduce((acc, item) => {
    acc[item.emi_name] = (acc[item.emi_name] || 0) + Number(item.amount);

    return acc;
  }, {});

  return (
    <div className="finance-overview-card">
      <div className="finance-overview-top">
        <h3>EMI Summary</h3>

        <div className="finance-overview-period">
          <select
            value={emiFilter.month}

            onChange={(e) =>
              setEMIFilter({
                ...emiFilter,

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

            value={emiFilter.year}

            onChange={(e) =>
              setEMIFilter({
                ...emiFilter,

                year: Number(e.target.value),
              })
            }
          />
        </div>

        <span>This Month</span>

        <h1>₹{monthEMI.toLocaleString()}</h1>
      </div>

      <div className="finance-overview-content">
        <div className="finance-overview-grid">
          <div className="finance-overview-box">
            <span>Year Total</span>

            <strong>₹{yearEMI.toLocaleString()}</strong>
          </div>
        </div>

        <div className="one-time-section">
          <h3>Breakdown</h3>

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
