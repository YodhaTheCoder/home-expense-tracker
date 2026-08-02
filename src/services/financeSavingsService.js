import { api } from './api';

export async function getSavings(userId = null) {
  let query = api

    .from('finance_savings')

    .select('*')

    .order('saving_date', {
      ascending: false,
    });

  if (userId) {
    query = query.eq('user_id', userId);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function createSaving(payload) {
  const {
    data: { user },

    error: userError,
  } = await api.auth.getUser();

  if (userError) {
    throw new Error(userError.message);
  }

  const { data, error } = await api

    .from('finance_savings')

    .insert({
      user_id: user.id,

      saving_type: payload.saving_type,

      amount: Number(payload.amount),

      saving_date: payload.saving_date,

      description: payload.description,
    })

    .select()

    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateSaving(id, payload) {
  const { data, error } = await api

    .from('finance_savings')

    .update({
      saving_type: payload.saving_type,

      amount: Number(payload.amount),

      saving_date: payload.saving_date,

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

export async function removeSaving(id) {
  const { data, error } = await api

    .from('finance_savings')

    .delete()

    .eq('id', id)

    .select()

    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
