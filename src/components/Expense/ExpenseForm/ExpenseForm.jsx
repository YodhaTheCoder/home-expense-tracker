import { useState } from 'react'
import Select from "react-select";

import './ExpenseForm.css';

function ExpenseForm({
  expenseForm,
  setExpenseForm,

  editingExpenseId,
  setEditingExpenseId,

  addExpense,
  saveExpense,

  categories,
}) {

 
  function resetForm() {
    setEditingExpenseId(null);

    const groceries = categories.find(
    (category) => category.name === 'Groceries'
  );

    setExpenseForm({
      amount: '',
      category_id: groceries ? groceries.id : '',
      description: '',
      date: new Date().toISOString().split('T')[0],
    });
  }

  return (
    <div className="card">
      <h3 className="form-title">{editingExpenseId ? 'Edit Expense' : 'Add Expense'}</h3>

      <form className="expense-form" onSubmit={editingExpenseId ? saveExpense : addExpense}>
        <div className="form-row">
          <div className="field">
            <label>Amount</label>

            <input
              type="number"
              step="0.01"
              value={expenseForm.amount}

              onChange={(e) =>
                setExpenseForm({
                  ...expenseForm,
                  amount: e.target.value,
                })
              }

              required
            />
          </div>

         <div className="field">
  <label>Category</label>

  <Select
    isClearable
    isSearchable
    placeholder="Type or select category"

    options={categories.map((category) => ({
      value: category.id,
      label: category.name,
    }))}

    value={
      categories
        .filter(
          (category) => category.id === expenseForm.category_id
        )
        .map((category) => ({
          value: category.id,
          label: category.name,
        }))[0] || null
    }

    onChange={(selected) => {
      setExpenseForm({
        ...expenseForm,
        category_id: selected ? selected.value : '',
      });
    }}
  />
</div>

          <div className="field">
            <label>Date</label>

            <input
              type="date"

              value={expenseForm.date}

              onChange={(e) =>
                setExpenseForm({
                  ...expenseForm,
                  date: e.target.value,
                })
              }

              required
            />
          </div>
        </div>

        <div className="field">
          <label>Description</label>

          <textarea
            value={expenseForm.description}

            onChange={(e) =>
              setExpenseForm({
                ...expenseForm,
                description: e.target.value,
              })
            }

            required
          />
        </div>

        <div className="inline-actions">
          <button
            className="btn btn-primary"

            type="submit"
          >
            {editingExpenseId ? 'Save Expense' : 'Add Expense'}
          </button>

          {editingExpenseId && (
            <button
              type="button"

              className="btn btn-secondary"

              onClick={resetForm}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ExpenseForm;
