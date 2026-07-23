import './MoneySummary.css';

function MoneySummary({
  summary,
  summaryFilter,
  setSummaryFilter,
}) {

  const today = new Date();

  const totalGiven = Number(summary.given || 0);

  const totalTaken = Number(summary.taken || 0);

  const balance = totalGiven - totalTaken;


  const paidAmount = Number(summary.paid || 0);

  const pendingAmount = Math.max(
    Math.abs(balance) - paidAmount,
    0
  );


  const percentage = balance !== 0
    ? Math.min(
        Math.round((paidAmount / Math.abs(balance)) * 100),
        100
      )
    : 0;


  const status =
    balance >= 0
      ? 'green'
      : 'red';



  return (

    <div className="money-summary-card">


      <div className={`money-summary-top ${status}`}>

        <h3>
          Money Given / Taken
        </h3>


   <div className="money-summary-period-wrapper">

  <select
  className="money-summary-period money-summary-month"
  value={summaryFilter.month || ""}
  onChange={(e) =>
    setSummaryFilter({
      ...summaryFilter,
      month: e.target.value
        ? Number(e.target.value)
        : null,
    })
  }
>

  <option value="">
    All Months
  </option>

  {Array.from({ length: 12 }, (_, i) => (
    <option
      key={i + 1}
      value={i + 1}
    >
      {new Date(0, i).toLocaleString(
        "default",
        {
          month: "long",
        }
      )}
    </option>
  ))}

</select>


  <select
  className="money-summary-period money-summary-year"
  value={summaryFilter.year || ""}
  onChange={(e) =>
    setSummaryFilter({
      ...summaryFilter,
      year: e.target.value
        ? Number(e.target.value)
        : null,
    })
  }
>

<option value="">
  All Years
</option>


{Array.from({ length: 5 }, (_, i) => {

  const year =
    new Date().getFullYear() - i;


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
        <span>
          Current Balance
        </span>


      <h1
  className={
    balance >= 0
      ? "balance-positive"
      : "balance-negative"
  }
>
  {summary.balance >= 0
    ? `₹${Number(balance).toLocaleString()}`
    : `-₹${Number(Math.abs(balance)).toLocaleString()}`
  }
</h1>



      </div>





      <div className="money-summary-content">


      <div className="money-summary-grid">

  <div className="money-box money-given">

    <span>Given</span>

    <strong>
      ₹{Number(summary.given).toLocaleString()}
    </strong>

  </div>


  <div className="money-box money-taken">

    <span>Taken</span>

    <strong>
      ₹{Number(summary.taken).toLocaleString()}
    </strong>

  </div>

</div>




        <div className="money-progress-wrapper">


          <div className="money-progress">


            <div

              className={`money-progress-bar ${status}`}

              style={{
                width:`${percentage}%`
              }}

            />


          </div>



          <div className="money-progress-info">

            <span>
              {percentage}% Settled
            </span>


            <span>
              Pending ₹{pendingAmount.toLocaleString()}
            </span>


          </div>


        </div>


      </div>


    </div>

  );

}


export default MoneySummary;