import { useState } from 'react';
import './BudgetManagement.css';

function BudgetManagement({
  budgets,

  users,
  message,
  messageType,
  createBudget,
  updateBudget,
  deleteBudget,
}) {
  const [form, setForm] = useState({
    year: new Date().getFullYear(),

    month: new Date().getMonth() + 1,

    amount: '',

    user_id: '',
  });

  const [editingId, setEditingId] = useState(null);

  function submit(e) {
    e.preventDefault();

    const payload = {
      year: Number(form.year),

      month: Number(form.month),

      amount: Number(form.amount),

      user_id: form.user_id || null,
    };

    if (editingId) {
      updateBudget(editingId, payload);
    } else {
      createBudget(payload);
    }

    resetForm();
  }

  function resetForm() {
    setEditingId(null);

    setForm({
      year: new Date().getFullYear(),

      month: new Date().getMonth() + 1,

      amount: '',

      user_id: '',
    });
  }

  return (
    <>
      <div className="card">
        <div className="section-header">
          <div>
            <h3>Create Budget</h3>

            <p className="muted">Leave user empty for Monthly budget</p>
          </div>
        </div>

        <form onSubmit={submit}>
          <div className="user-form-grid">
            <div className="field">
              <label>Year</label>

              <input
                type="number"

                value={form.year}

                onChange={(e) =>
                  setForm({
                    ...form,
                    year: e.target.value,
                  })
                }
              />
            </div>

            <div className="field">
              <label>Month</label>

              <select
                value={form.month}

                onChange={(e) =>
                  setForm({
                    ...form,
                    month: e.target.value,
                  })
                }
              >
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
            </div>

            <div className="field">
              <label>Amount</label>

              <input
                type="number"

                required

                value={form.amount}

                onChange={(e) =>
                  setForm({
                    ...form,
                    amount: e.target.value,
                  })
                }
              />
            </div>

            <div className="field">
              <label>Assign User (optional)</label>

              <select
                value={form.user_id}

                onChange={(e) =>
                  setForm({
                    ...form,
                    user_id: e.target.value,
                  })
                }
              >
                <option value="">Monthly Budget</option>

                {users?.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.full_name || user.email}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button className="category-btn edit" type="submit">
            {editingId ? 'Update Budget' : 'Add Budget'}
          </button>
        </form>
      </div>

      {message && <div className={`budget-message ${messageType}`}>{message}</div>}

      <div className="card">
        <div className="section-header">
          <h3>Existing Budgets</h3>

          <span className="category-count">{budgets.length || 0}</span>
        </div>

        <div className="category-grid">
          {(budgets || []).map((item) => (
            <div
              key={item.id}

              className="category-card"
            >
              <div className="category-details">
                <h4>₹{item.amount}</h4>

                <p className="muted">
                  {item.month}/{item.year}
                </p>

                <span className="category-type">
                  {item.user_id
                    ? users?.find((user) => user.id === item.user_id)?.full_name ||
                      users?.find((user) => user.id === item.user_id)?.email ||
                      'Assigned User'
                    : 'Monthly Budget'}
                </span>
              </div>

              <div className="category-actions">
                <button
                  className="category-btn edit"

                  onClick={() => {
                    setEditingId(item.id);

                    setForm({
                      year: item.year,

                      month: item.month,

                      amount: item.amount,

                      user_id: item.user_id || '',
                    });
                  }}
                >
                  Edit
                </button>

                <button
                  className="category-btn delete"

                  onClick={() => deleteBudget(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default BudgetManagement;
