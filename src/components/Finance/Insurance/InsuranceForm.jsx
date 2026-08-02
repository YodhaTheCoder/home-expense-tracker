import { useEffect, useState } from 'react';
import '../FinanceCommon.css';

export default function InsuranceForm({
  goals,

  saveInsurance,

  editingInsurance,

  editingInsuranceId,

  setEditingInsuranceId,

  setShowInsuranceForm,
}) {
  const initialForm = {
    insurance_name: '',

    insurance_type: 'Health',

    amount: '',

    due_date: '',

    goal_id: '',

    description: '',
  };

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (editingInsurance) {
      setForm({
        insurance_name: editingInsurance.insurance_name,

        insurance_type: editingInsurance.insurance_type,

        amount: editingInsurance.amount,

        due_date: editingInsurance.due_date,

        goal_id: editingInsurance.goal_id,

        description: editingInsurance.description || '',
      });
    }
  }, [editingInsurance]);

  function handleChange(e) {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  }

  function submit(e) {
    saveInsurance(
      e,

      form,

      editingInsuranceId
    );

    setForm(initialForm);

    setEditingInsuranceId(null);
    setShowInsuranceForm(false);
  }

  function cancelEdit() {
    setForm(initialForm);

    setEditingInsuranceId(null);
    setShowInsuranceForm(false);
  }

  if (!goals?.length) {
    return (
      <div className="finance-card">
        <div className="finance-card-header">
          <h3>Insurance</h3>
        </div>

        <div className="finance-card-content">
          <p>Create a Goal first before adding Insurance.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="finance-card">
      <h3>{editingInsuranceId ? 'Update Insurance' : 'Add Insurance'}</h3>

      <div className="finance-card-content">
        <form
          className="finance-form-grid"

          onSubmit={submit}
        >
          <div className="finance-field">
            <label>Insurance Name</label>

            <input
              name="insurance_name"

              placeholder="Insurance Name"

              value={form.insurance_name}

              onChange={handleChange}

              required
            />
          </div>

          <div className="finance-field">
            <label>Insurance Type</label>

            <select
              name="insurance_type"

              value={form.insurance_type}

              onChange={handleChange}
            >
              <option>Health</option>

              <option>Term</option>

              <option>Vehicle</option>

              <option>Home</option>

              <option>Other</option>
            </select>
          </div>

          <div className="finance-field">
            <label>Annual Amount</label>

            <input
              type="number"

              name="amount"

              placeholder="Annual Amount"

              value={form.amount}

              onChange={handleChange}

              required
            />
          </div>

          <div className="finance-field">
            <label>Due Date</label>

            <input
              type="date"

              name="due_date"

              value={form.due_date}

              onChange={handleChange}

              required
            />
          </div>

          <div className="finance-field">
            <label>Linked Goal</label>

            <select
              name="goal_id"

              value={form.goal_id}

              onChange={handleChange}

              required
            >
              <option value="">Select Goal</option>

              {goals.map((goal) => (
                <option
                  key={goal.id}

                  value={goal.id}
                >
                  {goal.title}
                </option>
              ))}
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
              {editingInsuranceId ? 'Update Insurance' : 'Save Insurance'}
            </button>

            {
              <button
                type="button"

                className="cancel-btn"

                onClick={cancelEdit}
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
