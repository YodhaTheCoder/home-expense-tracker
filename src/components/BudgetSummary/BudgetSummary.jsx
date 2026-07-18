import './BudgetSummary.css';

function BudgetSummary({ title, budget, expense, remaining, percentage, status,summaryFilter, setSummaryFilter }) {
  
   const today = new Date();

  return (
    <div className="budget-summary-card">
      {/* Purple Header */}

     


      <div className={`budget-top ${status}`}>
        <h3>{title}</h3>
        
<div className="budget-period-wrapper">
        <select
  className="budget-period budget-month"
  value={summaryFilter.month}
  onChange={(e) =>
    setSummaryFilter({
      ...summaryFilter,
      month: Number(e.target.value),
    })
  }
>
    {Array.from({ length: 12 }, (_, i) => (
      <option key={i + 1} value={i + 1}>
        {new Date(0, i).toLocaleString("default", {
          month: "long",
        })}
      </option>
    ))}
  </select>

  <select
  className="budget-period budget-year"
  value={summaryFilter.year}
  onChange={(e) =>
    setSummaryFilter({
      ...summaryFilter,
      year: Number(e.target.value),
    })
  }
>
    {Array.from({ length: 5 }, (_, i) => (
      <option key={i} value={today.getFullYear() - i}>
        {today.getFullYear() - i}
      </option>
    ))}
  </select>
  </div>
        <span>Current Balance</span>

        <h1>
          {remaining >= 0
            ? `₹${Number(remaining).toLocaleString()}`
            : `-₹${Number(Math.abs(remaining)).toLocaleString()}`}
        </h1>

      </div>

      {/* Bottom white section */}

      <div className="budget-content">
        <div className="budget-grid">
          <div className="budget-box budget-card">
            <span>Budget</span>

            <strong>₹{Number(budget).toLocaleString()}</strong>
          </div>

         <div className={`budget-box expense-box ${status}`}>
  <span>Expenses</span>

  <strong>₹{Number(expense).toLocaleString()}</strong>

  <div className="expense-status">
    {status === 'green' && '↓ Within Budget'}
    {status === 'yellow' && '→ Near Budget'}
    {status === 'red' && '↑ Over Budget'}
  </div>
</div>
        </div>

        <div className="budget-progress-wrapper">
  <div className="budget-progress">
    <div
      className={`budget-progress-bar ${status}`}
      style={{
        width: `${Math.min(percentage, 100)}%`,
      }}
    />
  </div>

  <div className={`budget-progress-info ${status}`}>
   
    <span className="budget-percent">
      {percentage}% Used
    </span>
  </div>
</div>
      </div>
    </div>
  );
}

export default BudgetSummary;
