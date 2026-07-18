import { useState } from 'react';

import { getSummary } from '../services/summaryService';

export function useSummary(userId = null) {
  const [summary, setSummary] = useState(null);

  const [message, setMessage] = useState('');

  async function loadSummary(filters = {}) {
    try {
     
      const data = await getSummary(userId, filters);

      setSummary(data);
    } catch (error) {
      setMessage(error.message);
    }
  }

  return {
    summary,

    message,

    loadSummary,
  };
}
