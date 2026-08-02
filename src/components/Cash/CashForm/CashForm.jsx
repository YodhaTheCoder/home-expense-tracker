import '../CashTracker.css';

export default function CashForm({
  cashForm,

  setCashForm,

  editingCashId,

  saveCash,

  resetForm,
}) {
  return (
    <div className="card">
      <h3 className="form-title">{editingCashId ? 'Edit Cash Location' : 'Add Cash Location'}</h3>

      <form
        className="expense-form"

        onSubmit={(event) => {
          try {
            saveCash(event, cashForm, editingCashId);
          } catch (error) {
            console.error('CashForm error:', error);
          }
        }}
      >
        <div className="form-row">
          <div className="field">
            <label>Location Name</label>

            <input
              type="text"

              placeholder="Wallet / Cupboard"

              value={cashForm.name}

              onChange={(e) =>
                setCashForm({
                  ...cashForm,

                  name: e.target.value,
                })
              }

              required
            />
          </div>

          <div className="field">
            <label>Opening Amount</label>

            <input
              type="number"

              step="0.01"

              placeholder="Amount"

              value={cashForm.current_amount}

              onChange={(e) =>
                setCashForm({
                  ...cashForm,

                  current_amount: e.target.value,
                })
              }

              required
            />
          </div>
        </div>

        <div className="field">
          <label>Notes</label>

          <textarea
            placeholder="Example: Home cupboard cash"

            value={cashForm.notes}

            onChange={(e) =>
              setCashForm({
                ...cashForm,

                notes: e.target.value,
              })
            }
          />
        </div>

        <div className="inline-actions">
          <button
            className="btn btn-primary"

            type="submit"
          >
            {editingCashId ? 'Save Cash' : 'Add Cash'}
          </button>

          {editingCashId && (
            <button
              type="button"

              className="btn btn-secondary"

              onClick={resetForm}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
