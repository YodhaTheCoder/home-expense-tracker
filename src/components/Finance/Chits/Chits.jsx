import { useEffect, useState } from 'react';

import ChitForm from './ChitForm';
import ChitList from './ChitList';
import ChitTransactions from './ChitTransactions';
import ChitSummary from './ChitSummary';

import { useFinanceChits } from '../../../hooks/useFinanceChits';
import '../FinanceCommon.css';

export default function Chits({ auth }) {
  const {
    chitList,

    message,

    loadChits,

    saveChit,

    deleteChit,
  } = useFinanceChits(auth.user.id);

  const [editingChitId, setEditingChitId] = useState(null);
  const [showChitForm, setShowChitForm] = useState(false);

  const [selectedChit, setSelectedChit] = useState(null);

  const today = new Date();

  const [chitFilter, setChitFilter] = useState({
    month: today.getMonth() + 1,

    year: today.getFullYear(),
  });
  const filteredChits = chitList.filter((item) => {
    const startDate = new Date(item.start_date);

    const endDate = new Date(startDate);

    endDate.setMonth(endDate.getMonth() + Number(item.total_months));

    const selectedDate = new Date(chitFilter.year, chitFilter.month - 1, 1);

    return (
      selectedDate >= new Date(startDate.getFullYear(), startDate.getMonth(), 1) &&
      selectedDate < endDate
    );
  });

  const editingChit = chitList.find((item) => String(item.id) === String(editingChitId));

  useEffect(() => {
    loadChits();
  }, []);

  return (
    <div className="finance-tab-container">
      {selectedChit ? (
        <ChitTransactions
          chit={selectedChit}

          setSelectedChit={setSelectedChit}
        />
      ) : (
        <>
          <ChitSummary
            chitList={chitList}

            chitFilter={chitFilter}

            setChitFilter={setChitFilter}
          />

          {message && <div className="finance-message">{message}</div>}

          {!showChitForm ? (
            <div className="add-income-container">
              <button
                className="finance-btn primary btn-add-income"
                onClick={() => {
                  setEditingChitId(null);
                  setShowChitForm(true);
                }}
              >
                + Add Chit
              </button>
            </div>
          ) : (
            <ChitForm
              saveChit={saveChit}

              editingChit={editingChit}

              editingChitId={editingChitId}

              setEditingChitId={setEditingChitId}

              setShowChitForm={setShowChitForm}
            />
          )}

          <ChitList
            chitList={filteredChits}

            deleteChit={deleteChit}

            setEditingChitId={setEditingChitId}

            setSelectedChit={setSelectedChit}

            setShowChitForm={setShowChitForm}
          />
        </>
      )}
    </div>
  );
}
