import '../FinanceCommon.css';

export default function OneTimeExpenseSummary({
  expenses,

  allExpenses,

  filter,

  setFilter,

  years,
}) {
  const totalSpent = expenses.reduce(
    (sum, item) => sum + Number(item.amount),

    0
  );

  const today = new Date();

  const currentMonth = today.getMonth();

  const currentYear = today.getFullYear();

  const thisMonth = expenses.filter((item) => {
    const date = new Date(item.expense_date);

    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  });

  const monthAmount = thisMonth.reduce(
    (sum, item) => sum + Number(item.amount),

    0
  );

  const thisYear = allExpenses.filter((item) => {
    const date = new Date(item.expense_date);

    return date.getFullYear() === currentYear;
  });

  const yearAmount = thisYear.reduce(
    (sum, item) => sum + Number(item.amount),

    0
  );

  const latest = expenses.length ? expenses[0] : null;

  return (
    <div className="finance-overview-card">
      <div className="finance-overview-top">
        <h3>Expense Summary</h3>

        <div className="finance-overview-period">
          <select
            value={filter.month}

            onChange={(e) =>
              setFilter({
                ...filter,

                month: e.target.value,
              })
            }
          >
            <option value="">All Months</option>

            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>

          <select
            value={filter.year}

            onChange={(e) =>
              setFilter({
                ...filter,

                year: e.target.value,
              })
            }
          >
            <option value="">All Years</option>

            {years.map((year) => (
              <option
                key={year}

                value={year}
              >
                {year}
              </option>
            ))}
          </select>
        </div>

        <span>One Time Expenses</span>

        <h1>₹{totalSpent.toLocaleString('en-IN')}</h1>
      </div>

      <div className="finance-overview-content">
        <div className="finance-overview-grid">
          <div className="finance-overview-box">
            <span>Total Spent</span>

            <strong>₹{totalSpent.toLocaleString('en-IN')}</strong>
          </div>

          <div className="finance-overview-box">
            <span>This Month</span>

            <strong>₹{monthAmount.toLocaleString('en-IN')}</strong>
          </div>

          <div className="finance-overview-box">
            <span>This Year</span>

            <strong>₹{yearAmount.toLocaleString('en-IN')}</strong>
          </div>

          <div className="finance-overview-box">
            <span>Latest Expense</span>

            <strong>{latest ? latest.title : 'No Data'}</strong>

            {latest && <p>₹{Number(latest.amount).toLocaleString('en-IN')}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
