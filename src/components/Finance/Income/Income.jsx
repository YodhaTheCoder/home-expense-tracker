import { useState, useEffect } from 'react';

import IncomeSummary from './IncomeSummary';
import IncomeForm from './IncomeForm';
import IncomeList from './IncomeList';
import '../FinanceCommon.css';

import { useFinanceIncome } from '../../../hooks/useFinanceIncome';

export default function Income({ auth }) {
  const { incomeList, message, saveIncome, deleteIncome, loadIncome } = useFinanceIncome(
    auth.user.id
  );

  const [editingIncomeId, setEditingIncomeId] = useState(null);

  const [showIncomeForm, setShowIncomeForm] = useState(false);

  const today = new Date();

  const [incomeFilter, setIncomeFilter] = useState({
    month: today.getMonth() + 1,

    year: today.getFullYear(),
  });
  const editingIncome = incomeList.find((item) => String(item.id) === String(editingIncomeId));

  const filteredIncome = incomeList.filter((item) => {
    const date = new Date(item.income_date);

    return (
      date.getMonth() + 1 === Number(incomeFilter.month) &&
      date.getFullYear() === Number(incomeFilter.year)
    );
  });

  useEffect(() => {
    loadIncome();
  }, []);

  return (
    <div>
      <IncomeSummary
        incomeList={incomeList}

        incomeFilter={incomeFilter}

        setIncomeFilter={setIncomeFilter}
      />

      {message && <div className="finance-message">{message}</div>}

      {!showIncomeForm ? (
        <div className="add-income-container">
          <button
            className="finance-btn primary .btn-add-income"
            onClick={() => {
              setShowIncomeForm(true);
              setEditingIncomeId(null);
            }}
          >
            + Add Income
          </button>
        </div>
      ) : (
        <IncomeForm
          saveIncome={saveIncome}

          editingIncome={editingIncome}

          editingIncomeId={editingIncomeId}

          setEditingIncomeId={setEditingIncomeId}

          setShowIncomeForm={setShowIncomeForm}
        />
      )}

      <IncomeList
        incomeList={filteredIncome}

        deleteIncome={deleteIncome}

        setEditingIncomeId={setEditingIncomeId}

        setShowIncomeForm={setShowIncomeForm}
      />
    </div>
  );
}
