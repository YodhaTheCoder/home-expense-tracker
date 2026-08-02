export default function CashTransactionForm({
  transactionForm,

  setTransactionForm,

  selectedLocation,

  onSave,

  onCancel,
}) {
  function handleChange(e) {
    setTransactionForm({
      ...transactionForm,

      [e.target.name]: e.target.value,
    });
  }

  function submit(e) {
    e.preventDefault();

    const amount = Number(transactionForm.amount);

    if (amount <= 0) {
      return;
    }

    onSave({
      ...transactionForm,

      amount,
    });
  }

  return (
    <form
      className="money-form"

      onSubmit={submit}
    >
      <h3>{transactionForm.type === 'ADD' ? 'Add Money' : 'Add Expense'}</h3>

      <p>
        Current Balance: ₹{Number(selectedLocation.current_amount || 0).toLocaleString('en-IN')}
      </p>

      <select
        name="type"

        value={transactionForm.type}

        onChange={handleChange}
      >
        <option value="ADD">Add Money</option>

        <option value="EXPENSE">Add Expense</option>
      </select>

      <input
        type="number"

        name="amount"

        placeholder="Amount"

        value={transactionForm.amount}

        onChange={handleChange}

        required
      />

      <input
        name="notes"

        placeholder="Notes"

        value={transactionForm.notes}

        onChange={handleChange}
      />

      <input
        type="date"

        name="transaction_date"

        value={transactionForm.transaction_date}

        onChange={handleChange}

        required
      />

      <div className="money-actions">
        <button
          type="submit"

          className="form-primary-btn"
        >
          Save
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
