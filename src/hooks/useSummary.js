import { useState } from 'react';

import { getSummary } from '../services/summaryService';

export function useSummary(username) {
  const [summary, setSummary] = useState(null);

  async function loadSummary() {
    const data = await getSummary(username);

    setSummary(data);
  }

  return {
    summary,

    loadSummary,
  };
}
