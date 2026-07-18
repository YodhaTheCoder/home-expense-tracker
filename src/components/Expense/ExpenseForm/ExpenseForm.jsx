import { useState } from 'react'

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

  const [categoryText, setCategoryText] = useState(
  categories.find((category) => category.name === 'Groceries')?.name || ''
);


  function resetForm() {
    setEditingExpenseId(null);

    setExpenseForm({
      amount: '',
      category_id: categories.find((category) => category.name === 'Groceries')?.id || '',
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

  <input
    list="category-options"
    value={categoryText}
    onChange={(e) => {
      const value = e.target.value;

      setCategoryText(value);

      const selectedCategory = categories.find(
        (category) => category.name === value
      );

      setExpenseForm({
        ...expenseForm,
        category_id: selectedCategory ? selectedCategory.id : '',
      });
    }}
    placeholder="Type or select category"
    required
  />

  <datalist id="category-options">
    {categories.map((category) => (
      <option key={category.id} value={category.name} />
    ))}
  </datalist>
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
