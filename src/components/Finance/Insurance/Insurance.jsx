import { useEffect, useState } from 'react';

import { useFinanceInsurance } from '../../../hooks/useFinanceInsurance';
import { useGoals } from '../../../hooks/useGoals';

import GoalContributionManager from '../../Goals/Goal/GoalContributionManager.jsx';

import InsuranceForm from './InsuranceForm';
import InsuranceList from './InsuranceList';
import InsuranceSummary from './InsuranceSummary.jsx';

import '../FinanceCommon.css';

export default function Insurance({ auth }) {
  const { insuranceList, message, loadInsurance, saveInsurance, deleteInsurance } =
    useFinanceInsurance(auth.user.id);

  const { goals, addMoney, transactions, loadTransactions, editTransaction, removeTransaction } =
    useGoals(auth.user.id);

  const [editingInsuranceId, setEditingInsuranceId] = useState(null);

  const [selectedInsurance, setSelectedInsurance] = useState(null);
  const [showInsuranceForm, setShowInsuranceForm] = useState(false);

  useEffect(() => {
    loadInsurance();
  }, [auth.user.id]);

  const editingInsurance = insuranceList.find(
    (item) => Number(item.id) === Number(editingInsuranceId)
  );

  const activeGoals = goals.filter((goal) => goal.status === 'active');

  const availableGoals = activeGoals.filter((goal) => {
    if (editingInsurance && Number(editingInsurance.goal_id) === Number(goal.id)) {
      return true;
    }

    return !insuranceList.some((insurance) => Number(insurance.goal_id) === Number(goal.id));
  });

  async function handleManageContributions(insurance) {
    await loadTransactions(insurance.goal_id);

    setSelectedInsurance(insurance);
  }

  return (
    <div className="finance-module">
      {message && <div className="finance-message">{message}</div>}

      <InsuranceSummary insuranceList={insuranceList} />

      {!showInsuranceForm ? (
        <div className="add-income-container">
          <button
            className="finance-btn primary btn-add-income"

            onClick={() => {
              setEditingInsuranceId(null);

              setShowInsuranceForm(true);
            }}
          >
            + Add Insurance
          </button>
        </div>
      ) : (
        <InsuranceForm
          goals={availableGoals}

          saveInsurance={saveInsurance}

          editingInsurance={editingInsurance}

          editingInsuranceId={editingInsuranceId}

          setEditingInsuranceId={setEditingInsuranceId}

          setShowInsuranceForm={setShowInsuranceForm}
        />
      )}

      <InsuranceList
        insuranceList={insuranceList}

        deleteInsurance={deleteInsurance}

        setEditingInsuranceId={setEditingInsuranceId}

        setShowInsuranceForm={setShowInsuranceForm}

        onManageContributions={handleManageContributions}
      />

      {selectedInsurance && (
        <GoalContributionManager
          goal={selectedInsurance.goals}

          addMoney={addMoney}

          transactions={transactions}

          loadTransactions={loadTransactions}

          editTransaction={editTransaction}

          removeTransaction={removeTransaction}

          onClose={() => {
            setSelectedInsurance(null);
          }}
        />
      )}
    </div>
  );
}
