import { useEffect, useState } from 'react';
import '../FinanceCommon.css';

export default function SavingsForm({
  saveSaving,

  editingSaving,

  editingSavingId,

  setEditingSavingId,

  setShowSavingForm,
}) {
  const [form, setForm] = useState({
    saving_type: '',

    amount: '',

    saving_date: '',

    description: '',
  });

  useEffect(() => {
    if (editingSaving) {
      setForm({
        saving_type: editingSaving.saving_type,

        amount: editingSaving.amount,

        saving_date: editingSaving.saving_date,

        description: editingSaving.description,
      });
    }
  }, [editingSaving]);

  function handleChange(e) {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  }

  function submit(e) {
    saveSaving(
      e,

      form,

      editingSavingId
    );

    setForm({
      saving_type: '',

      amount: '',

      saving_date: '',

      description: '',
    });
    setEditingSavingId(null);
    setShowSavingForm(false);
  }

  return (
    <div className="finance-form-card">
      <h3>{editingSavingId ? 'Update Saving' : 'Add Savings'}</h3>

      <form onSubmit={submit} className="finance-form">
        <div className="finance-field">
          <label>Saving Type</label>

          <select
            name="saving_type"

            value={form.saving_type}

            onChange={handleChange}
          >
            <option value="">Select Type</option>

            <option>Gold SIP</option>

            <option>Child Plan</option>

            <option>Shares</option>

            <option>Mutual Fund</option>

            <option>FD</option>

            <option>PPF</option>

            <option>Other</option>
          </select>
        </div>

        <div className="finance-field">
          <label>Amount</label>

          <input
            name="amount"

            type="number"

            placeholder="Amount"

            value={form.amount}

            onChange={handleChange}
          />
        </div>

        <div className="finance-field">
          <label>Date</label>

          <input
            name="saving_date"

            type="date"

            value={form.saving_date}

            onChange={handleChange}
          />
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

        <div className="finance-actions">
          <button
            className={editingSavingId ? 'finance-btn update' : 'finance-btn primary'}

            type="submit"
          >
            {editingSavingId ? 'Update Saving' : 'Add Saving'}
          </button>

          {
            <button
              type="button"

              className="finance-btn cancel"

              onClick={() => {
                setEditingSavingId(null);
                setShowSavingForm(false);

                setForm({
                  saving_type: '',
                  amount: '',
                  saving_date: '',
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
  );
}
