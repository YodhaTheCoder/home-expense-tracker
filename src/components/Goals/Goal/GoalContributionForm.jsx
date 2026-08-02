import { useEffect, useState } from 'react';

export default function GoalContributionForm({ onSave, onCancel, initialData, remainingAmount }) {
  const [form, setForm] = useState({
    amount: '',
    note: '',
    transaction_date: '',
  });

  const [amountError, setAmountError] = useState('');

  useEffect(() => {
    if (initialData) {
      setForm({
        amount: initialData.amount || '',

        note: initialData.note || '',

        transaction_date: initialData.transaction_date || '',
      });
    } else {
      setForm({
        amount: '',
        note: '',
        transaction_date: '',
      });
    }

    setAmountError('');
  }, [initialData]);

  function handleChange(e) {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });

    if (e.target.name === 'amount') {
      setAmountError('');
    }
  }

  function submit(e) {
    e.preventDefault();

    const amount = Number(form.amount);

    if (amount <= 0) {
      setAmountError('Please enter a valid amount');

      return;
    }

    if (!initialData && amount > remainingAmount) {
      setAmountError(`You can add maximum ₹${remainingAmount} only`);

      return;
    }

    setAmountError('');

    onSave({
      amount,

      note: form.note,

      transaction_date: form.transaction_date,
    });

    if (!initialData) {
      setForm({
        amount: '',
        note: '',
        transaction_date: '',
      });
    }
  }

  return (
    <form className="money-form" onSubmit={submit}>
      <h3>{initialData ? 'Edit Money' : 'Add Money'}</h3>

      <input
        type="number"

        name="amount"

        placeholder="Amount"

        value={form.amount}

        onChange={handleChange}

        required

        min="1"
      />

      {amountError && <p className="form-error">{amountError}</p>}

      <input
        name="note"

        placeholder="Note"

        value={form.note}

        onChange={handleChange}
      />

      <input
        type="date"

        name="transaction_date"

        value={form.transaction_date || ''}

        onChange={handleChange}

        required
      />

      <div className="money-actions">
        <button type="submit" className="form-primary-btn">
          {initialData ? 'Update Money' : 'Add Money'}
        </button>

        <button
          type="button"

          className="form-secondary-btn"

          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
