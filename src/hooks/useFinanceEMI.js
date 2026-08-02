import { useState } from 'react';

import { getEMI, createEMI, updateEMI, removeEMI } from '../services/financeEMIService';

export function useFinanceEMI(userId) {
  const [emiList, setEMIList] = useState([]);

  const [message, setMessage] = useState('');

  async function loadEMI() {
    try {
      const data = await getEMI(userId);

      setEMIList(data);
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function saveEMI(event, emiForm, editingEMIId) {
    event.preventDefault();

    try {
      const payload = {
        emi_name: emiForm.emi_name,

        amount: emiForm.amount,

        emi_date: emiForm.emi_date,

        description: emiForm.description,
      };

      if (editingEMIId) {
        await updateEMI(
          editingEMIId,

          payload
        );

        setMessage('EMI updated.');
      } else {
        await createEMI(payload);

        setMessage('EMI added.');
      }

      await loadEMI();
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function deleteEMI(id) {
    try {
      await removeEMI(id);

      setMessage('EMI deleted.');

      await loadEMI();
    } catch (error) {
      setMessage(error.message);
    }
  }

  return {
    emiList,

    message,

    loadEMI,

    saveEMI,

    deleteEMI,
  };
}
