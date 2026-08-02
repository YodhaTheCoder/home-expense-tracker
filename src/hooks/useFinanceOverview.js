import { useEffect, useState } from 'react';

import { getFinanceOverview } from '../services/financeOverviewService';

export function useFinanceOverview(userId, month, year) {
  const [overview, setOverview] = useState(null);

  const [years, setYears] = useState([]);

  const [loading, setLoading] = useState(false);

  async function loadOverview() {
    if (!userId) return;

    setLoading(true);

    try {
      const data = await getFinanceOverview(userId, month, year);

      setOverview(data);
    } catch (error) {
      console.error('Finance overview loading failed', error);

      setOverview(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOverview();
  }, [userId, month, year]);

  return {
    overview,

    loading,

    loadOverview,
  };
}
