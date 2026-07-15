import StatsCard from './StatsCard';
import { buildPieStyle, formatCurrency } from '../utils/format';

export default function Stats({
  summary,
  users = [],
  categories = [],
  showUsers = false,
  showUserTotals = false,
}) {

  if (!summary) return null;


  const maxCategory = Math.max(
    ...summary.byCategory.map((x) => x.amount),
    1
  );


  const maxMonth = Math.max(
    ...summary.byMonth.map((x) => x.amount),
    1
  );


  return (
    <>

      <div className="grid stats-grid">

        <StatsCard
          label="Total Spend"
          value={formatCurrency(summary.total)}
        />


        {showUsers && (
          <StatsCard
            label="Users"
            value={users.length}
          />
        )}


        <StatsCard
          label="Categories"
          value={categories.length}
        />

      </div>



      <div className="card">

        <div className="stats-chart-layout">


          <div className="category-bars">

            <h3>
              Spending by Category
            </h3>


            {summary.byCategory.map((item)=>(

              <div
                key={item.name}
                className="chart-row"
              >

                <span className="chart-label">
                  {item.name}
                </span>


                <div className="bar">

                  <span
                    style={{
                      width:`${Math.max(
                        8,
                        (item.amount / maxCategory) * 100
                      )}%`
                    }}
                  />

                </div>


                <strong className="chart-value">
                  {formatCurrency(item.amount)}
                </strong>


              </div>

            ))}

          </div>



          <div className="pie-section">

            <div
              className="pie-chart"
              style={{
                ...buildPieStyle(summary.byCategory)
              }}
            />


            <div className="legend">

              {summary.byCategory.map((item,index)=>(

                <div
                  key={item.name}
                  className="small"
                >
                  {index + 1}. {item.name} —
                  {formatCurrency(item.amount)}
                </div>

              ))}

            </div>


          </div>


        </div>

      </div>




      <div className="card">

        <h3>
          Monthly Trend
        </h3>


        {summary.byMonth.map((item)=>(

          <div
            key={item.month}
            className="chart-row"
          >

            <span className="chart-label">
              {item.month}
            </span>


            <div className="bar">

              <span
                style={{
                  width:`${Math.max(
                    8,
                    (item.amount/maxMonth)*100
                  )}%`
                }}
              />

            </div>


            <strong className="chart-value">
              {formatCurrency(item.amount)}
            </strong>


          </div>

        ))}

      </div>




      {showUserTotals && (

        <div className="card">

          <h3>
            User Totals
          </h3>


          <div className="table-container">

            <table className="table">

              <thead>
                <tr>
                  <th>User</th>
                  <th>Total</th>
                </tr>
              </thead>


              <tbody>

                {summary.byUser.map((item)=>(

                  <tr key={item.username}>

                    <td>
                      {item.username}
                    </td>


                    <td>
                      {formatCurrency(item.amount)}
                    </td>

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