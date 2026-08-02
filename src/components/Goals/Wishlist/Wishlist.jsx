import { useEffect, useState } from 'react';

import WishlistCard from './WishlistCard';
import WishlistForm from './WishlistForm';

import {
  getWishlist,
  createWishlistItem,
  updateWishlistItem,
  deleteWishlistItem,
  convertWishlistToGoal,
} from '../../../services/goalService';

export default function Wishlist({ userId }) {
  const [items, setItems] = useState([]);

  const [showForm, setShowForm] = useState(false);

  async function loadWishlist() {
    const data = await getWishlist(userId);

    setItems(data || []);
  }

  useEffect(() => {
    loadWishlist();
  }, [userId]);

  async function addWishlist(item) {
    const result = await createWishlistItem({
      user_id: userId,

      title: item.title,

      estimated_price: item.estimated_price,

      priority: item.priority,

      notes: item.notes,

      status: 'wishlist',
    });

    setItems((prev) => [result, ...prev]);

    setShowForm(false);
  }

  async function editItem(id, data) {
    const updated = await updateWishlistItem(id, data);

    setItems((prev) => prev.map((item) => (item.id === id ? updated : item)));
  }

  async function removeItem(id) {
    await deleteWishlistItem(id);

    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  async function startSaving(item) {
    try {
      await convertWishlistToGoal(item);

      setItems((prev) => prev.filter((wishlist) => wishlist.id !== item.id));
    } catch (error) {
      console.error('Starting goal failed', error);
    }
  }

  return (
    <div>
      <button
        className="primary-btn"

        onClick={() => setShowForm(true)}
      >
        + Add Wishlist Item
      </button>

      {showForm && (
        <WishlistForm
          onSave={addWishlist}

          onCancel={() => setShowForm(false)}
        />
      )}

      {items.length === 0 ? (
        <div className="empty-card">Your wishlist is empty.</div>
      ) : (
        items.map((item) => (
          <WishlistCard
            key={item.id}

            item={item}

            editItem={editItem}

            removeItem={removeItem}

            convertToGoal={startSaving}
          />
        ))
      )}
    </div>
  );
}
