import { useState } from 'react';

import { useFinanceOverview } from '../../../hooks/useFinanceOverview';

import './FinanceOverview.css';

export default function FinanceOverview({ auth }) {
  const today = new Date();

  const years = Array.from(
    {
      length: today.getFullYear() - 2026 + 1,
    },
    (_, index) => 2026 + index
  );

  const [summaryFilter, setSummaryFilter] = useState({
    month: today.getMonth() + 1,

    year: today.getFullYear(),
  });

  const {
    overview,

    loading,
  } = useFinanceOverview(
    auth.user.id,

    summaryFilter.month,

    summaryFilter.year
  );

  const overviewData = overview || {
    income: 0,
    budget: 0,
    savings: 0,
    goal_contributions: 0,
    emi: 0,
    chits: 0,
    one_time_expenses: 0,
    planned_outflow: 0,
    net_balance: 0,
  };

  const plannedOutflow = Number(overviewData.planned_outflow || 0);

  const netBalance = Number(overviewData.net_balance || 0);

  return (
    <div className="finance-overview-card">
      {/* Header */}

      <div className="finance-overview-top">
        <h3>Finance Overview</h3>

        <div className="finance-overview-period">
          <select
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
                {new Date(0, i).toLocaleString('default', {
                  month: 'long',
                })}
              </option>
            ))}
          </select>

          <select
            value={summaryFilter.year}

            onChange={(e) =>
              setSummaryFilter({
                ...summaryFilter,

                year: Number(e.target.value),
              })
            }
          >
            {[...years].reverse().map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <span>Net Balance</span>

        <h1>
          {netBalance >= 0
            ? `₹${netBalance.toLocaleString()}`
            : `-₹${Math.abs(netBalance).toLocaleString()}`}
        </h1>
      </div>

      {/* Content */}

      <div className="finance-overview-content">
        <div className="finance-overview-grid">
          <div className="finance-overview-box">
            <span>Income</span>

            <strong>₹{Number(overviewData.income || 0).toLocaleString()}</strong>
          </div>

          <div className="finance-overview-box expense">
            <span>Planned Outflow</span>

            <strong>₹{plannedOutflow.toLocaleString()}</strong>
          </div>
        </div>

        <div className="finance-savings-box">
          <span>Savings</span>

          <strong>₹{Number(overviewData.savings || 0).toLocaleString()}</strong>
        </div>

        <div className="one-time-section">
          <h3>One-Time Expenses</h3>

          <div className="one-time-row">
            <span>This Month</span>

            <strong>₹{Number(overviewData.one_time_expenses || 0).toLocaleString()}</strong>
          </div>

          <div className="one-time-row">
            <span>This Year</span>

            <strong>Coming next</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
