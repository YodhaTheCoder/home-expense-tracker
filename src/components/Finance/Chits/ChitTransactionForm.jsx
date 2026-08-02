import { useEffect, useState } from 'react';

export default function ChitTransactionForm({
  saveTransaction,

  editingTransaction,

  editingId,

  setEditingId,

  setSelectedChit,
}) {
  const initialForm = {
    amount: '',

    received_amount: '',

    status: 'unpaid',

    description: '',
  };

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (editingTransaction) {
      setForm({
        amount: editingTransaction.amount,

        received_amount: editingTransaction.received_amount || '',

        status: editingTransaction.status,

        description: editingTransaction.description || '',
      });
    }
  }, [editingTransaction]);

  function handleChange(e) {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  }

  function submit(e) {
    e.preventDefault();

    saveTransaction(
      e,

      form,

      editingId
    );

    setForm(initialForm);

    setEditingId(null);
  }

  function cancelEdit() {
    setForm(initialForm);

    setEditingId(null);
  }

  return (
    <div className="finance-card">
      <h3>{editingId ? 'Update Month' : ''}</h3>

      <div className="finance-card-content">
        {editingId && (
          <form
            className="finance-form-grid"

            onSubmit={submit}
          >
            <div className="finance-field">
              <label>Pay Amount</label>

              <input
                type="number"

                name="amount"

                value={form.amount}

                onChange={handleChange}
              />
            </div>

            <div className="finance-field">
              <label>Received Amount</label>

              <input
                type="number"

                name="received_amount"

                value={form.received_amount}

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
                <option value="unpaid">Unpaid</option>

                <option value="paid">Paid</option>
              </select>
            </div>

            <div className="finance-field">
              <label>Description</label>

              <input
                name="description"

                value={form.description}

                onChange={handleChange}
              />
            </div>

            <div className="finance-form-actions">
              <button
                className="save-btn"

                type="submit"
              >
                Update
              </button>

              <button
                type="button"

                className="cancel-btn"

                onClick={() => {
                  if (editingId) {
                    cancelEdit();
                  } else {
                    setSelectedChit(null);
                  }
                }}
              >
                {editingId ? 'Cancel' : 'Close'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
