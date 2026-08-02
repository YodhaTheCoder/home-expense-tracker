import { useEffect, useState } from 'react';

export default function GoalForm({ onSave, onCancel, initialData }) {
  const [form, setForm] = useState({
    title: '',
    target_amount: '',
    description: '',
    target_date: '',
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || '',

        target_amount: initialData.target_amount || '',

        description: initialData.description || '',

        target_date: initialData.target_date || '',
      });
    }
  }, [initialData]);

  function handleChange(e) {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  }

  function submit(e) {
    e.preventDefault();

    onSave(form);

    setForm({
      title: '',

      target_amount: '',

      description: '',

      target_date: '',
    });
  }

  return (
    <form className="goal-form" onSubmit={submit}>
      <h3>{initialData ? 'Edit Goal' : 'Add Goal'}</h3>

      <input
        name="title"

        placeholder="Goal name"

        value={form.title}

        onChange={handleChange}

        required
      />

      <input
        name="target_amount"

        type="number"

        placeholder="Target amount"

        value={form.target_amount}

        onChange={handleChange}

        required
      />

      <input
        name="target_date"

        type="date"

        value={form.target_date}

        onChange={handleChange}
      />

      <textarea
        name="description"

        placeholder="Description"

        value={form.description}

        onChange={handleChange}
      />

      <div className="form-actions">
        <button type="submit" className="form-primary-btn">
          {initialData ? 'Update Goal' : 'Save Goal'}
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
