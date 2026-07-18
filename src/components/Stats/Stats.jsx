import StatsCard from './StatsCard';
import ExpenseDonut from './ExpenseDonut.jsx';

import { buildPieStyle, formatCurrency } from '../../utils/format';
import { categoryColors } from '../../utils/chartColors';

import './Stats.css';

export default function Stats({
  summary,
  users = [],
  categories = [],
  showUsers = false,
  showUserTotals = false,
}) {
  if (!summary) return null;

  const maxCategory = Math.max(...summary.byCategory.map((x) => x.amount), 1);

  const maxMonth = Math.max(...summary.byMonth.map((x) => x.amount), 1);

  return (
    <>
      <div className="card">
        <div className="stats-chart-layout">
          <div className="category-bars">
            <h3>Spending by Category</h3>

            {summary.byCategory.map((item, index) => (
              <div key={item.name} className="chart-row">
                <span className="chart-label">{item.name}</span>

                <div className="bar">
                  <span
                    style={{
                      width: `${Math.max(8, (item.amount / maxCategory) * 100)}%`,
                       background: categoryColors[index % categoryColors.length],
                    }}
                  />
                </div>

                <strong className="chart-value">{formatCurrency(item.amount)}</strong>
              </div>
            ))}
          </div>

          <div className="pie-section">
  <ExpenseDonut data={summary.byCategory} />

 
</div>
        </div>
      </div>

      {showUserTotals && (
        <div className="card">
          <h3>User Totals</h3>

          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Total</th>
                </tr>
              </thead>

              <tbody>
                {summary.byUser.map((item) => (
                  <tr key={item.user_id}>
                    <td>{item.full_name}</td>

                    <td>{formatCurrency(item.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
