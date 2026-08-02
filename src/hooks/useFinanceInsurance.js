import { useState } from 'react';

import {
  getInsurance,
  createInsurance,
  updateInsurance,
  removeInsurance,
} from '../services/financeInsuranceService';

export function useFinanceInsurance(userId) {
  const [insuranceList, setInsuranceList] = useState([]);

  const [message, setMessage] = useState('');

  async function loadInsurance() {
    try {
      const data = await getInsurance(userId);

      setInsuranceList(data);
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function saveInsurance(event, form, editingId) {
    event.preventDefault();

    try {
      if (!form.goal_id) {
        setMessage('Please select a goal before adding insurance.');

        return;
      }

      const payload = {
        user_id: userId,

        insurance_name: form.insurance_name,

        insurance_type: form.insurance_type,

        amount: form.amount,

        due_date: form.due_date,

        goal_id: form.goal_id,

        description: form.description,
      };

      if (editingId) {
        await updateInsurance(
          editingId,

          payload
        );

        setMessage('Insurance updated.');
      } else {
        await createInsurance(payload);

        setMessage('Insurance added.');
      }

      await loadInsurance();
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function deleteInsurance(id) {
    try {
      await removeInsurance(id);

      setMessage('Insurance deleted.');

      await loadInsurance();
    } catch (error) {
      setMessage(error.message);
    }
  }

  return {
    insuranceList,

    message,

    loadInsurance,

    saveInsurance,

    deleteInsurance,
  };
}
