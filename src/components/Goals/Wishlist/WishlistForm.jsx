import { useState } from 'react';

export default function WishlistForm({
  onSave,

  onCancel,

  initialData,
}) {
  const [form, setForm] = useState({
    title: initialData?.title || '',

    estimated_price: initialData?.estimated_price || '',

    priority: initialData?.priority || 3,

    notes: initialData?.notes || '',
  });

  function handleChange(e) {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  }

  function submit(e) {
    e.preventDefault();

    onSave({
      ...form,

      estimated_price: Number(form.estimated_price),

      priority: Number(form.priority),
    });
  }

  return (
    <form className="wishlist-form" onSubmit={submit}>
      <h3>{initialData ? 'Edit Wishlist Item' : 'Add Wishlist Item'}</h3>

      <input
        name="title"

        placeholder="Item name"

        value={form.title}

        onChange={handleChange}

        required
      />

      <input
        type="number"

        name="estimated_price"

        placeholder="Estimated price"

        value={form.estimated_price}

        onChange={handleChange}

        required
      />

      <select
        name="priority"

        value={form.priority}

        onChange={handleChange}
      >
        <option value="1">High</option>

        <option value="2">Medium</option>

        <option value="3">Low</option>
      </select>

      <textarea
        name="notes"

        placeholder="Notes"

        value={form.notes}

        onChange={handleChange}
      />

      <button type="submit">Save</button>

      <button
        type="button"

        onClick={onCancel}
      >
        Cancel
      </button>
    </form>
  );
}
