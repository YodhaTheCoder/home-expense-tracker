import { useState } from 'react';

import { useOneTimeExpenses } from '../../../hooks/useOneTimeExpenses';

import OneTimeExpenseForm from './OneTimeExpenseForm';
import OneTimeExpenseList from './OneTimeExpenseList';
import OneTimeExpenseSummary from './OneTimeExpenseSummary';

import '../FinanceCommon.css';

export default function OneTimeExpenses({ auth }) {
  const {
    expenses,

    saveExpense,

    editExpense,

    deleteExpense,
  } = useOneTimeExpenses(auth.user.id);

  const [editingExpense, setEditingExpense] = useState(null);

  const [showExpenseForm, setShowExpenseForm] = useState(false);

  const currentYear = new Date().getFullYear();

  const startYear = 2026;

  const years = [];

  for (let year = currentYear; year >= startYear; year--) {
    years.push(year);
  }

  const [filter, setFilter] = useState({
    month: '',

    year: '',
  });

  const filteredExpenses = expenses.filter((item) => {
    const date = new Date(item.expense_date);

    const month = date.getMonth() + 1;

    const year = date.getFullYear();

    if (filter.month && month !== Number(filter.month)) {
      return false;
    }

    if (filter.year && year !== Number(filter.year)) {
      return false;
    }

    return true;
  });

  function clearFilter() {
    setFilter({
      month: '',

      year: '',
    });
  }

  return (
    <div className="finance-module">
      <OneTimeExpenseSummary
        expenses={filteredExpenses}

        allExpenses={expenses}

        filter={filter}

        setFilter={setFilter}

        years={years}
      />

      {!showExpenseForm ? (
        <div className="add-income-container">
          <button
            className="finance-btn primary btn-add-income"

            onClick={() => {
              setEditingExpense(null);

              setShowExpenseForm(true);
            }}
          >
            + Add Expense
          </button>
        </div>
      ) : (
        <OneTimeExpenseForm
          onSave={(data) => {
            if (editingExpense) {
              editExpense(
                editingExpense.id,

                data
              );

              setEditingExpense(null);
            } else {
              saveExpense(data);
            }

            setShowExpenseForm(false);
          }}

          editingExpense={editingExpense}

          onCancel={() => {
            setEditingExpense(null);

            setShowExpenseForm(false);
          }}
        />
      )}

      <OneTimeExpenseList
        expenses={filteredExpenses}

        onEdit={(expense) => {
          setEditingExpense(expense);
          setShowExpenseForm(true);
        }}

        onDelete={(id) => {
          deleteExpense(id);
        }}
      />
    </div>
  );
}
