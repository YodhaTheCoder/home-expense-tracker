import { api } from './api';

export async function getEMI(userId = null) {
  let query = api

    .from('finance_emi')

    .select('*')

    .order('emi_date', {
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

export async function createEMI(payload) {
  const {
    data: { user },

    error: userError,
  } = await api.auth.getUser();

  if (userError) {
    throw new Error(userError.message);
  }

  const { data, error } = await api

    .from('finance_emi')

    .insert({
      user_id: user.id,

      emi_name: payload.emi_name,

      amount: Number(payload.amount),

      emi_date: payload.emi_date,

      description: payload.description,
    })

    .select()

    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateEMI(id, payload) {
  const { data, error } = await api

    .from('finance_emi')

    .update({
      emi_name: payload.emi_name,

      amount: Number(payload.amount),

      emi_date: payload.emi_date,

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

export async function removeEMI(id) {
  const { data, error } = await api

    .from('finance_emi')

    .delete()

    .eq('id', id)

    .select()

    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
