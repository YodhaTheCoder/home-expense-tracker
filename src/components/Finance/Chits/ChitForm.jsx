import { useEffect, useState } from 'react';
import '../FinanceCommon.css';

export default function ChitForm({
  saveChit,

  editingChit,

  editingChitId,

  setEditingChitId,

  setShowChitForm,
}) {
  const [form, setForm] = useState({
    chit_name: '',

    chit_value: '',

    monthly_amount: '',

    monthly_amount_if_taken: '',

    total_months: '',

    start_date: '',

    due_date: '',

    status: 'active',

    description: '',
  });

  useEffect(() => {
    if (editingChit) {
      setForm({
        chit_name: editingChit.chit_name,

        chit_value: editingChit.chit_value,

        monthly_amount: editingChit.monthly_amount,

        monthly_amount_if_taken: editingChit.monthly_amount_if_taken,

        total_months: editingChit.total_months,

        start_date: editingChit.start_date,

        due_date: editingChit.due_date,

         status: editingChit.status || 'active',

        description: editingChit.description || '',
      });
    }
  }, [editingChit]);

  function handleChange(e) {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  }

  function submit(e) {
    saveChit(
      e,

      form,

      editingChitId
    );

    setForm({
      chit_name: '',

      chit_value: '',

      monthly_amount: '',

      monthly_amount_if_taken: '',

      total_months: '',

      start_date: '',

      due_date: '',

      status: 'active',

      description: '',
    });

    setEditingChitId(null);
    setShowChitForm(false);
  }

  return (
    <div className="finance-form-card">
      <h3>{editingChitId ? 'Update Chit' : 'Create Chit'}</h3>

      <div className="finance-card-content">
        <form className="finance-form-grid" onSubmit={submit}>
          <div className="finance-field">
            <label>Chit Name</label>

            <input
              name="chit_name"

              placeholder="Chit Name"

              value={form.chit_name}

              onChange={handleChange}
            />
          </div>

          <div className="finance-field">
            <label>Total Value</label>

            <input
              name="chit_value"

              type="number"

              placeholder="Total Chit Value"

              value={form.chit_value}

              onChange={handleChange}
            />
          </div>

          <div className="finance-field">
            <label>Monthly Amount</label>

            <input
              name="monthly_amount"

              type="number"

              placeholder="Monthly Amount"

              value={form.monthly_amount}

              onChange={handleChange}
            />
          </div>

          <div className="finance-field">
            <label>Monthly Amount If Taken</label>

            <input
              type="number"

              name="monthly_amount_if_taken"

              value={form.monthly_amount_if_taken}

              onChange={handleChange}
            />
          </div>

          <div className="finance-field">
            <label>Duration (Months)</label>

            <input
              name="total_months"

              type="number"

              placeholder="Total Months"

              value={form.total_months}

              onChange={handleChange}
            />
          </div>

          <div className="finance-field">
            <label>Start Date</label>

            <input
              name="start_date"

              type="date"

              value={form.start_date}

              onChange={handleChange}
            />
          </div>

          <div className="finance-field">
            <label>Due Date</label>

            <input
              type="date"

              name="due_date"

              value={form.due_date}

              onChange={handleChange}
            />
          </div>

          <div className="finance-field">
            <label>Status</label>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option value="active">Active</option>
              <option value="taken">Taken</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="finance-field">
            <label>Description</label>

            <input
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
              {editingChitId ? 'Update Chit' : 'Save Chit'}
            </button>

            {
              <button
                type="button"

                className="cancel-btn"

                onClick={() => {
                  setEditingChitId(null);
                  setShowChitForm(false);

                  setForm({
                    chit_name: '',

                    chit_value: '',

                    monthly_amount: '',

                    monthly_amount_if_taken: '',

                    total_months: '',

                    start_date: '',

                    due_date: '',

                    status: 'active',

                    description: '',
                  });
                }}
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
