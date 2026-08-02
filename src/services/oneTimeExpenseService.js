import { api } from './api';

/**
 * Get one time expenses
 */
export async function getOneTimeExpenses(userId) {
  let query = api

    .from('one_time_expenses')

    .select('*')

    .order('expense_date', {
      ascending: false,
    });

  if (userId) {
    query = query.eq('user_id', userId);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
}

/**
 * Create one time expense
 */
export async function createOneTimeExpense(payload) {
  const {
    data: { user },
    error: userError,
  } = await api.auth.getUser();

  if (userError) {
    throw new Error(userError.message);
  }

  const { data, error } = await api

    .from('one_time_expenses')

    .insert({
      user_id: user.id,

      title: payload.title,

      amount: payload.amount,

      expense_date: payload.expense_date,

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
 * Update one time expense
 */
export async function updateOneTimeExpense(
  id,

  payload
) {
  const { data, error } = await api

    .from('one_time_expenses')

    .update({
      title: payload.title,

      amount: payload.amount,

      expense_date: payload.expense_date,

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
 * Delete one time expense
 */
export async function removeOneTimeExpense(id) {
  const { data, error } = await api

    .from('one_time_expenses')

    .delete()

    .eq('id', id)

    .select()

    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
