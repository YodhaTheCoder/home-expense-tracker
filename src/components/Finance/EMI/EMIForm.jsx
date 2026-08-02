import { useEffect, useState } from 'react';
import '../FinanceCommon.css';

export default function EMIForm({
  saveEMI,

  editingEMI,

  editingEMIId,

  setEditingEMIId,

  setshowEMIForm,
}) {
  const initialForm = {
    emi_name: '',

    amount: '',

    emi_date: '',

    description: '',
  };

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (editingEMI) {
      setForm({
        emi_name: editingEMI.emi_name,

        amount: editingEMI.amount,

        emi_date: editingEMI.emi_date,

        description: editingEMI.description || '',
      });
    }
  }, [editingEMI]);

  function handleChange(e) {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  }

  function submit(e) {
    saveEMI(
      e,

      form,

      editingEMIId
    );

    setForm(initialForm);

    setEditingEMIId(null);
    setshowEMIForm(false);
  }

  function cancelEdit() {
    setForm(initialForm);

    setEditingEMIId(null);
    setshowEMIForm(false);
  }

  return (
    <div className="finance-form-card">
      <h3>{editingEMIId ? 'Update EMI' : 'Add EMI'}</h3>

      <form
        className="finance-form"

        onSubmit={submit}
      >
        <div className="finance-field">
          <label>EMI Name</label>

          <input
            name="emi_name"

            placeholder="EMI Type"

            value={form.emi_name}

            onChange={handleChange}
          />
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
          <label>EMI Date</label>

          <input
            name="emi_date"

            type="date"

            value={form.emi_date}

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
            className="save-btn"

            type="submit"
          >
            {editingEMIId ? 'Update EMI' : 'Save EMI'}
          </button>

          {
            <button
              type="button"

              className="finance-btn cancel"

              onClick={cancelEdit}
            >
              Cancel
            </button>
          }
        </div>
      </form>
    </div>
  );
}
