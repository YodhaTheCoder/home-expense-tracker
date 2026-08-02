import { api } from './api';

/**
 * Get income
 */
export async function getIncome(userId = null) {
  let query = api.from('finance_income').select('*').order('income_date', {
    ascending: false,
  });

  if (userId) {
    query = query.eq('user_id', userId);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return data.map((item) => ({
    ...item,

    date: item.income_date,
  }));
}

/**
 * Create income
 */
export async function createIncome(payload) {
  const {
    data: { user },

    error: userError,
  } = await api.auth.getUser();

  if (userError) {
    throw new Error(userError.message);
  }

  const {
    data,

    error,
  } = await api

    .from('finance_income')

    .insert({
      user_id: user.id,

      income_type: payload.income_type,

      amount: Number(payload.amount),

      income_date: payload.income_date,

      description: payload.description,
    })

    .select()

    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

/**
 * Update income
 */
export async function updateIncome(id, payload) {
  const {
    data,

    error,
  } = await api

    .from('finance_income')

    .update({
      income_type: payload.income_type,

      amount: Number(payload.amount),

      income_date: payload.income_date,

      description: payload.description,
    })

    .eq('id', id)

    .select()

    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

/**
 * Delete income
 */
export async function removeIncome(id) {
  const {
    data,

    error,
  } = await api

    .from('finance_income')

    .delete()

    .eq('id', id)

    .select()

    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
