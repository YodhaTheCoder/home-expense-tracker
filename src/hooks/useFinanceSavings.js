import { useState } from 'react';

import {
  getSavings,
  createSaving,
  updateSaving,
  removeSaving,
} from '../services/financeSavingsService';

export function useFinanceSavings(userId) {
  const [savingsList, setSavingsList] = useState([]);

  const [message, setMessage] = useState('');

  async function loadSavings() {
    try {
      const data = await getSavings(userId);

      setSavingsList(data);
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function saveSaving(event, savingForm, editingSavingId) {
    event.preventDefault();

    try {
      const payload = {
        saving_type: savingForm.saving_type,

        amount: savingForm.amount,

        saving_date: savingForm.saving_date,

        description: savingForm.description,
      };

      if (editingSavingId) {
        await updateSaving(
          editingSavingId,

          payload
        );

        setMessage('Saving updated.');
      } else {
        await createSaving(payload);

        setMessage('Saving added.');
      }

      await loadSavings();
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function deleteSaving(id) {
    try {
      await removeSaving(id);

      setMessage('Saving deleted.');

      await loadSavings();
    } catch (error) {
      setMessage(error.message);
    }
  }

  return {
    savingsList,

    message,

    loadSavings,

    saveSaving,

    deleteSaving,
  };
}
