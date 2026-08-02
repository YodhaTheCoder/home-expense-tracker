import '../FinanceCommon.css';

export default function ChitSummary({
  chitList,

  chitFilter,

  setChitFilter,
}) {
  const filteredChits = chitList.filter((item) => {
    const startDate = new Date(item.start_date);

    const endDate = new Date(startDate);

    endDate.setMonth(endDate.getMonth() + Number(item.total_months));

    const selectedDate = new Date(chitFilter.year, chitFilter.month - 1, 1);

    return (
      selectedDate >= new Date(startDate.getFullYear(), startDate.getMonth(), 1) &&
      selectedDate < endDate
    );
  });

  const monthChit = filteredChits.reduce(
    (total, item) => total + Number(item.monthly_amount),

    0
  );

  const breakdown = filteredChits.map((item) => {
    const transactions = item.finance_chit_transactions || [];

    const paidTransactions = transactions.filter((t) => t.status === 'paid');

    const paidMonths = paidTransactions.length;

    const paidAmount = paidTransactions.reduce(
      (total, t) => total + Number(t.amount),

      0
    );

    const decisionOptions = transactions

      .filter((t) => t.status === 'unpaid' && Number(t.received_amount) > 0)

      .map((t) => {
        const alreadyPaidAmount = (Number(t.month_number) - 1) * Number(item.monthly_amount);

        const currentMonthPayment = Number(item.monthly_amount);

        const remainingMonthsAfterTake = Number(item.total_months) - Number(t.month_number);

        const futurePayment =
          remainingMonthsAfterTake *
          Number(item.monthly_amount_if_taken || item.monthly_amount || 0);

        const totalPayment = alreadyPaidAmount + currentMonthPayment + futurePayment;

        const profitLoss = Number(t.received_amount) - totalPayment;

        return {
          monthNumber: Number(t.month_number),

          receivedAmount: Number(t.received_amount),

          totalPayment,

          profitLoss,
        };
      });

    const currentOption = decisionOptions[0] || null;

    const bestOption = decisionOptions.find((item) => item.profitLoss > 0) || null;

    const progress = item.total_months
      ? Math.min(
          (paidMonths / item.total_months) * 100,

          100
        )
      : 0;

    return {
      id: item.id,

      name: item.chit_name,

      totalMonths: item.total_months,

      paidMonths,

      paidAmount,

      progress,

      bestOption,

      currentOption,
    };
  });

  return (
    <div className="finance-overview-card">
      <div className="finance-overview-top">
        <h3>Chit Summary</h3>

        <span>This Month</span>

        <h1>₹{monthChit.toLocaleString()}</h1>
      </div>

      <div className="finance-overview-content">
        <h3>Breakdown</h3>

        {breakdown.map((item) => (
          <div
            className="chit-breakdown-card"

            key={item.id}
          >
            <div className="chit-breakdown-header">
              <strong>{item.name}</strong>

              <span>
                {item.paidMonths}/{item.totalMonths} Months
              </span>
            </div>

            <div className="insurance-progress-container">
              <div
                className="insurance-progress-bar"

                style={{
                  width: `${item.progress}%`,
                }}
              ></div>
            </div>

            <div className="chit-breakdown-details">
              <div>
                <small>Paid</small>

                <strong>₹{Number(item.paidAmount || 0).toLocaleString()}</strong>
              </div>

              {item.bestOption && (
                <div>
                  <small>Best Month</small>

                  <strong>Month {item.bestOption.monthNumber}</strong>
                </div>
              )}

              {item.bestOption && (
                <div>
                  <small>Received</small>

                  <strong>₹{Number(item.bestOption.receivedAmount).toLocaleString()}</strong>
                </div>
              )}

              {item.bestOption && (
                <div>
                  <small>Total Pay</small>

                  <strong>₹{Number(item.bestOption.totalPayment).toLocaleString()}</strong>
                </div>
              )}
            </div>

            {item.bestOption && (
              <div className={item.currentOption.profitLoss >= 0 ? 'chit-profit' : 'chit-loss'}>
                {item.bestOption.profitLoss >= 0 ? 'Profit ' : 'Loss '}₹
                {Math.abs(item.bestOption.profitLoss)

                  .toLocaleString()}
              </div>
            )}
          </div>
        ))}

        {breakdown.length === 0 && <div className="finance-empty">No Chits Found</div>}
      </div>
    </div>
  );
}
