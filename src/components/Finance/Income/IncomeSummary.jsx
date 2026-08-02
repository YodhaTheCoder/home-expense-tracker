import '../FinanceCommon.css';

export default function IncomeSummary({
  incomeList,

  incomeFilter,

  setIncomeFilter,
}) {
  const filtered = incomeList.filter((item) => {
    const date = new Date(item.income_date);

    return (
      date.getMonth() + 1 === Number(incomeFilter.month) &&
      date.getFullYear() === Number(incomeFilter.year)
    );
  });

  const total = filtered.reduce(
    (total, item) => total + Number(item.amount || 0),

    0
  );

  return (
    <div className="finance-section">
      {/* HEADER */}

      <div className="finance-overview-card">
        <div className="finance-overview-top">
          <h3>Income Summary</h3>

          <div className="finance-overview-period">
            <select
              value={incomeFilter.month}

              onChange={(e) =>
                setIncomeFilter({
                  ...incomeFilter,

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

            <select
              className="finance-year-input"

              value={incomeFilter.year}

              onChange={(e) =>
                setIncomeFilter({
                  ...incomeFilter,

                  year: Number(e.target.value),
                })
              }
            >
              {Array.from({ length: 5 }, (_, i) => {
                const year = new Date().getFullYear() - i;

                return (
                  <option
                    key={year}

                    value={year}
                  >
                    {year}
                  </option>
                );
              })}
            </select>
          </div>

          <span>Total Income</span>

          <h1>₹{Number(total).toLocaleString()}</h1>
        </div>

        {/* SUMMARY CARDS */}
      </div>
    </div>
  );
}
