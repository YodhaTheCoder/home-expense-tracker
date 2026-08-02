import { useEffect, useState } from 'react';

import '../FinanceCommon.css';

export default function IncomeForm({
  saveIncome,

  editingIncome,

  editingIncomeId,

  setEditingIncomeId,

  setShowIncomeForm,
}) {
  const [form, setForm] = useState({
    income_type: '',
    amount: '',
    income_date: '',
    description: '',
  });

  useEffect(() => {
    if (editingIncome) {
      setForm({
        income_type: editingIncome.income_type,

        amount: editingIncome.amount,

        income_date: editingIncome.income_date,

        description: editingIncome.description,
      });
    }
  }, [editingIncome]);

  function handleChange(e) {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  }

  function submit(e) {
    saveIncome(e, form, editingIncomeId);

    setForm({
      income_type: '',
      amount: '',
      income_date: '',
      description: '',
    });

    setEditingIncomeId(null);
    setShowIncomeForm(false);
  }

  return (
    <div className="finance-form-card">
      <h3>{editingIncomeId ? 'Update Income' : 'Add Income'}</h3>

      <form onSubmit={submit} className="finance-form">
        <div className="finance-field">
          <label>Income Type</label>

          <select name="income_type" value={form.income_type} onChange={handleChange}>
            <option value="">Select Income Type</option>

            <option>Salary</option>
            <option>Bonus</option>
            <option>Business</option>
            <option>Rental</option>
            <option>Interest</option>
            <option>Dividend</option>
            <option>Chit Received</option>
            <option>Insurance Claim</option>
            <option>Gift</option>
            <option>Refund</option>
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
            name="income_date"

            type="date"

            value={form.income_date}

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
            className={editingIncomeId ? 'finance-btn update' : 'finance-btn primary'}

            type="submit"
          >
            {editingIncomeId ? 'Update Income' : 'Add Income'}
          </button>

          {
            <button
              type="button"

              className="finance-btn cancel"

              onClick={() => {
                setEditingIncomeId(null);

                setForm({
                  income_type: '',
                  amount: '',
                  income_date: '',
                  description: '',
                });

                setShowIncomeForm(false);
              }}
            >
              Cancel
            </button>
          }

          {/* 
<button

type="button"

className="finance-btn clear"

onClick={()=>{

setForm({

income_type:"",
amount:"",
income_date:"",
description:""

});

setShowIncomeForm(false);
}}

>

Clear

</button> */}
        </div>
      </form>
    </div>
  );
}
