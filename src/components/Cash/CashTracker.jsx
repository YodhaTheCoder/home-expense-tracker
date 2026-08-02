import { useEffect, useState } from 'react';

import CashSummary from './CashSummary/CashSummary';
import CashForm from './CashForm/CashForm';
import CashList from './CashList/CashList';

import CashTransactionForm from './CashTransaction/CashTransactionForm';
import CashTransactionList from './CashTransaction/CashTransactionList';

import './CashTracker.css';

export default function CashTracker({
  cashLocations,

  summary,

  saveCash,

  deleteCash,

  saveTransaction,

  editTransaction,

  deleteTransaction,

  message,

  setMessage,
}) {
  const [cashForm, setCashForm] = useState({
    name: '',

    current_amount: '',

    notes: '',
  });

  const [editingCashId, setEditingCashId] = useState(null);

  const [selectedLocation, setSelectedLocation] = useState(null);

  const [showTransactionForm, setShowTransactionForm] = useState(false);

  const [editingTransactionId, setEditingTransactionId] = useState(null);

  const [transactionForm, setTransactionForm] = useState({
    type: 'ADD',

    amount: '',

    transaction_date: new Date().toISOString().split('T')[0],

    notes: '',
  });

  useEffect(() => {
    if (selectedLocation && cashLocations.length) {
      const updatedLocation = cashLocations.find((item) => item.id === selectedLocation.id);

      if (updatedLocation) {
        setSelectedLocation(updatedLocation);
      }
    }
  }, [cashLocations]);

  function resetCashForm() {
    setEditingCashId(null);

    setCashForm({
      name: '',

      current_amount: '',

      notes: '',
    });
  }

  function resetTransactionForm() {
    setEditingTransactionId(null);

    setTransactionForm({
      type: 'ADD',

      amount: '',

      transaction_date: new Date().toISOString().split('T')[0],

      notes: '',
    });
  }

  async function handleTransactionSave(data) {
    if (editingTransactionId) {
      await editTransaction(
        editingTransactionId,

        transactionForm
      );
    } else {
      await saveTransaction({
        ...data,

        location_id: selectedLocation.id,
      });
    }

    resetTransactionForm();

    setSelectedLocation(null);

    setShowTransactionForm(false);
    setMessage('');
  }

  return (
    <div>
      {message && <div className="message">{message}</div>}

      {showTransactionForm && selectedLocation ? (
        <>
          <CashTransactionForm
            transactionForm={transactionForm}

            setTransactionForm={setTransactionForm}

            selectedLocation={selectedLocation}

            editingTransactionId={editingTransactionId}

            onSave={handleTransactionSave}

            onCancel={() => {
              resetTransactionForm();

              setSelectedLocation(null);

              setShowTransactionForm(false);

              setMessage('');
            }}
          />

          <CashTransactionList
            transactions={selectedLocation.cash_transactions || []}

            onEdit={(transaction) => {
              setEditingTransactionId(transaction.id);

              setTransactionForm({
                type: transaction.type,

                amount: transaction.amount,

                transaction_date: transaction.transaction_date,

                notes: transaction.notes || '',
              });
            }}

            onDelete={deleteTransaction}
          />
        </>
      ) : (
        <>
          <CashSummary summary={summary} />

          <CashForm
            cashForm={cashForm}

            setCashForm={setCashForm}

            editingCashId={editingCashId}

            saveCash={async (event, form, id) => {
              await saveCash(event, form, id);

              resetCashForm();
            }}

            resetForm={resetCashForm}
          />

          <CashList
            cashLocations={cashLocations}

            onEdit={(item) => {
              setEditingCashId(item.id);

              setCashForm({
                name: item.name,

                current_amount: item.current_amount,

                notes: item.notes || '',
              });
            }}

            onDelete={deleteCash}

            onTransaction={(item) => {
              resetTransactionForm();

              setSelectedLocation(item);

              setShowTransactionForm(true);
              setMessage('');
            }}
          />
        </>
      )}
    </div>
  );
}
