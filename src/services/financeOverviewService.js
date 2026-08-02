import { api } from './api';

export async function getFinanceOverview(userId, month, year) {
  const { data, error } = await api

    .from('finance_overview_summary')

    .select('*')

    .eq('user_id', userId)

    .eq('month', month)

    .eq('year', year)

    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
