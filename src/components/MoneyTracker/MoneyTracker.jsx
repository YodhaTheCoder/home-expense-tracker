import { useState } from 'react';

import MoneySummary from './MoneySummary/MoneySummary.jsx';
import MoneyForm from './MoneyForm/MoneyForm.jsx';
import MoneyList from './MoneyList/MoneyList.jsx';

import MoneyPaymentForm from './MoneyPayment/MoneyPaymentForm.jsx';
import MoneyPaymentList from './MoneyPayment/MoneyPaymentList.jsx';

import './MoneyTracker.css';

function MoneyTracker({
  moneyDues,
  summary,
  saveMoney,
  deleteMoney,
  savePayment,
  editPayment,
  deletePayment,
  message,
  summaryFilter,
  setSummaryFilter,
}) {
  const [moneyForm, setMoneyForm] = useState({
    type: 'GIVEN',
    person_name: '',
    amount: '',
    transaction_date: new Date().toISOString().split('T')[0],
    notes: '',
  });

  const [editingMoneyId, setEditingMoneyId] = useState(null);

  const [selectedMoney, setSelectedMoney] = useState(null);

  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const [editingPaymentId, setEditingPaymentId] = useState(null);

  const [paymentForm, setPaymentForm] = useState({
    amount: '',
    payment_date: new Date().toISOString().split('T')[0],
    notes: '',
  });



  function resetMoneyForm() {
    setEditingMoneyId(null);

    setMoneyForm({
      type: 'GIVEN',
      person_name: '',
      amount: '',
      transaction_date: new Date().toISOString().split('T')[0],
      notes: '',
    });
  }

  function resetPaymentForm() {
    setEditingPaymentId(null);

    setPaymentForm({
      amount: '',
      payment_date: new Date().toISOString().split('T')[0],
      notes: '',
    });
  }

  async function handlePaymentSave() {
    
    if (editingPaymentId) {
      await editPayment(editingPaymentId, paymentForm);
    } else {
      await savePayment({
        ...paymentForm,
        due_id: selectedMoney.id,
      });
    }

    resetPaymentForm();

    setShowPaymentForm(false);

    setSelectedMoney(null);
  }

  return (
    <div>
      {message && <div className="message">{message}</div>}

      {showPaymentForm && selectedMoney ? (
        <>
          <MoneyPaymentForm
            paymentForm={paymentForm}
            setPaymentForm={setPaymentForm}
            selectedMoney={selectedMoney}
            editingPaymentId={editingPaymentId}
            onSave={handlePaymentSave}
            onCancel={() => {
              resetPaymentForm();

              setSelectedMoney(null);

              setShowPaymentForm(false);
            }}
          />

          <MoneyPaymentList
    payments={selectedMoney.money_payments || []}
    onEdit={(payment) => {
        console.log("Editing payment", payment.id);

        setEditingPaymentId(payment.id);

        setPaymentForm({
            amount: payment.amount,
            payment_date: payment.payment_date,
            notes: payment.notes || "",
        });

        setShowPaymentForm(true);
    }}
    onDelete={async (id) => {
        console.log("Deleting payment", id);

        await deletePayment(id);

        setSelectedMoney((prev) => ({
            ...prev,
            money_payments: prev.money_payments.filter(
                (payment) => payment.id !== id
            ),
        }));
    }}
/>
        </>
      ) : (
        <>
          <MoneySummary
  summary={summary}
  summaryFilter={summaryFilter}
  setSummaryFilter={setSummaryFilter}
/>

          <MoneyForm
            moneyForm={moneyForm}
            setMoneyForm={setMoneyForm}
            editingMoneyId={editingMoneyId}
            setEditingMoneyId={setEditingMoneyId}
            saveMoney={saveMoney}
            resetForm={resetMoneyForm}
          />

          <MoneyList
            moneyDues={moneyDues}
            onEdit={(item) => {
              setEditingMoneyId(item.id);

              setMoneyForm({
                type: item.type,
                person_name: item.person_name,
                amount: item.amount,
                transaction_date: item.transaction_date,
                notes: item.notes || '',
              });
            }}
            onDelete={deleteMoney}
            onPayment={(item) => {
              resetPaymentForm();

              setSelectedMoney(item);

              setShowPaymentForm(true);
            }}
          />
        </>
      )}
    </div>
  );
}

export default MoneyTracker;