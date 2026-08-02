import { useEffect, useState } from 'react';

import EMISummary from './EMISummary';
import EMIForm from './EMIForm';
import EMIList from './EMIList';

import { useFinanceEMI } from '../../../hooks/useFinanceEMI';
import '../FinanceCommon.css';

export default function EMI({ auth }) {
  const {
    emiList,

    message,

    loadEMI,

    saveEMI,

    deleteEMI,
  } = useFinanceEMI(auth.user.id);

  const [editingEMIId, setEditingEMIId] = useState(null);
  const [showEMIForm, setshowEMIForm] = useState(false);

  const editingEMI = emiList.find((item) => String(item.id) === String(editingEMIId));

  const today = new Date();

  const [emiFilter, setEMIFilter] = useState({
    month: today.getMonth() + 1,

    year: today.getFullYear(),
  });

  const filteredEMI = emiList.filter((item) => {
    const date = new Date(item.emi_date);

    return (
      date.getMonth() + 1 === Number(emiFilter.month) &&
      date.getFullYear() === Number(emiFilter.year)
    );
  });

  useEffect(() => {
    loadEMI();
  }, []);

  return (
    <div>
      {message && <div className="finance-message">{message}</div>}

      <EMISummary
        emiList={emiList}

        emiFilter={emiFilter}

        setEMIFilter={setEMIFilter}
      />

      {!showEMIForm ? (
        <div className="add-income-container">
          <button
            className="finance-btn primary btn-add-income"
            onClick={() => {
              setEditingEMIId(null);
              setshowEMIForm(true);
            }}
          >
            Add EMI
          </button>
        </div>
      ) : (
        <EMIForm
          saveEMI={saveEMI}

          editingEMI={editingEMI}

          editingEMIId={editingEMIId}

          setEditingEMIId={setEditingEMIId}

          setshowEMIForm={setshowEMIForm}
        />
      )}

      <EMIList
        emiList={filteredEMI}

        deleteEMI={deleteEMI}

        setEditingEMIId={setEditingEMIId}

        setshowEMIForm={setshowEMIForm}
      />
    </div>
  );
}
