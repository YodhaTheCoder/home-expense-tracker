import { useEffect, useState } from 'react';

import SavingsSummary from './SavingsSummary';
import SavingsForm from './SavingsForm';
import SavingsList from './SavingsList';
import { useFinanceSavings } from '../../../hooks/useFinanceSavings';
import '../FinanceCommon.css';

export default function Savings({ auth }) {
  const {
    savingsList,

    message,

    loadSavings,

    saveSaving,

    deleteSaving,
  } = useFinanceSavings(auth.user.id);

  const [editingSavingId, setEditingSavingId] = useState(null);
  const [showSavingForm, setShowSavingForm] = useState(false);

  const editingSaving = savingsList.find((item) => String(item.id) === String(editingSavingId));

  const today = new Date();

  const [savingFilter, setSavingFilter] = useState({
    month: today.getMonth() + 1,
    year: today.getFullYear(),
  });

  const filteredSavings = savingsList.filter((item) => {
    const date = new Date(item.saving_date);

    return (
      date.getMonth() + 1 === Number(savingFilter.month) &&
      date.getFullYear() === Number(savingFilter.year)
    );
  });

  useEffect(() => {
    loadSavings();
  }, []);

  return (
    <div>
      {message && <div className="card">{message}</div>}

      <SavingsSummary
        savingsList={savingsList}

        savingFilter={savingFilter}

        setSavingFilter={setSavingFilter}
      />

      {!showSavingForm ? (
        <div className="add-income-container">
          <button
            className="finance-btn primary btn-add-income"
            onClick={() => {
              setEditingSavingId(null);
              setShowSavingForm(true);
            }}
          >
            + Add Saving
          </button>
        </div>
      ) : (
        <SavingsForm
          saveSaving={saveSaving}

          editingSaving={editingSaving}

          editingSavingId={editingSavingId}

          setEditingSavingId={setEditingSavingId}
          setShowSavingForm={setShowSavingForm}
        />
      )}

      <SavingsList
        savingsList={filteredSavings}

        deleteSaving={deleteSaving}

        setEditingSavingId={setEditingSavingId}

        setShowSavingForm={setShowSavingForm}
      />
    </div>
  );
}
