import { useState } from 'react';

import { getChits, createChit, updateChit, removeChit } from '../services/financeChitService';

export function useFinanceChits(userId) {
  const [chitList, setChitList] = useState([]);

  const [message, setMessage] = useState('');

  async function loadChits() {
    try {
      const data = await getChits(userId);

      setChitList(data);
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function saveChit(event, chitForm, editingChitId) {
    event.preventDefault();

    try {
      const payload = {
        chit_name: chitForm.chit_name,

        chit_value: chitForm.chit_value,

        monthly_amount: chitForm.monthly_amount,

        monthly_amount_if_taken: chitForm.monthly_amount_if_taken,

        total_months: chitForm.total_months,

        start_date: chitForm.start_date,

        due_date: chitForm.due_date,

        status: chitForm.status,

        description: chitForm.description,
      };

      if (editingChitId) {
        await updateChit(
          editingChitId,

          payload
        );

        setMessage('Chit updated.');
      } else {
        await createChit(payload);

        setMessage('Chit added.');
      }

      await loadChits();
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function deleteChit(id) {
    try {
      await removeChit(id);

      setMessage('Chit deleted.');

      await loadChits();
    } catch (error) {
      setMessage(error.message);
    }
  }

  return {
    chitList,

    message,

    loadChits,

    saveChit,

    deleteChit,
  };
}
