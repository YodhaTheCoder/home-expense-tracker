import { useState } from 'react';
import WishlistForm from './WishlistForm';

export default function WishlistCard({
  item,

  editItem,

  removeItem,

  convertToGoal,
}) {
  const [editing, setEditing] = useState(false);

  return (
    <div className="wishlist-card">
      <h3>{item.title}</h3>

      <p>Estimated ₹{item.estimated_price}</p>

      <p>Priority: {item.priority}</p>

      <p>{item.notes}</p>

      {editing && (
        <WishlistForm
          initialData={item}

          onSave={(data) => {
            editItem(item.id, data);

            setEditing(false);
          }}

          onCancel={() => setEditing(false)}
        />
      )}

      {!editing && (
        <div>
          <div className="wishlist-actions">
            <button
              className="secondary-action"

              onClick={() => setEditing(true)}
            >
              Edit
            </button>

            <button
              className="danger-action"

              onClick={() => removeItem(item.id)}
            >
              Delete
            </button>

            <button
              className="primary-action"

              onClick={() => convertToGoal(item)}
            >
              Start Saving
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
