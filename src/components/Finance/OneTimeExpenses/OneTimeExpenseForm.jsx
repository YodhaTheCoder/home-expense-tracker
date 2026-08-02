import { useEffect, useState } from 'react';
import '../FinanceCommon.css';

export default function OneTimeExpenseForm({
  onSave,

  editingExpense,

  onCancel,
}) {
  const initialForm = {
    title: '',

    amount: '',

    expense_date: '',

    description: '',
  };

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (editingExpense) {
      setForm({
        title: editingExpense.title || '',

        amount: editingExpense.amount || '',

        expense_date: editingExpense.expense_date || '',

        description: editingExpense.description || '',
      });
    } else {
      setForm(initialForm);
    }
  }, [editingExpense]);

  function handleChange(e) {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  }

  function submit(e) {
    e.preventDefault();

    onSave(form);

    if (!editingExpense) {
      setForm(initialForm);
    }
  }

  return (
    <div className="finance-card">
      <h3>{editingExpense ? 'Update Expense' : 'Add One-Time Expense'}</h3>

      <div className="finance-card-content">
        <form
          className="finance-form-grid"

          onSubmit={submit}
        >
          <div className="finance-field">
            <label>Title</label>

            <input
              name="title"

              placeholder="Expense title"

              value={form.title}

              onChange={handleChange}

              required
            />
          </div>

          <div className="finance-field">
            <label>Amount</label>

            <input
              type="number"

              name="amount"

              placeholder="Amount"

              value={form.amount}

              onChange={handleChange}

              required
            />
          </div>

          <div className="finance-field">
            <label>Expense Date</label>

            <input
              type="date"

              name="expense_date"

              value={form.expense_date}

              onChange={handleChange}

              required
            />
          </div>

          <div className="finance-field">
            <label>Description</label>

            <textarea
              name="description"

              placeholder="Description"

              value={form.description}

              onChange={handleChange}
            />
          </div>

          <div className="finance-form-actions">
            <button
              className="save-btn"

              type="submit"
            >
              {editingExpense ? 'Update Expense' : 'Save Expense'}
            </button>

            {
              <button
                className="cancel-btn"

                type="button"

                onClick={onCancel}
              >
                Cancel
              </button>
            }
          </div>
        </form>
      </div>
    </div>
  );
}
