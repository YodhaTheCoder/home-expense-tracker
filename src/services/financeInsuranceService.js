import { api } from './api';

export async function getInsurance(userId) {
  let query = api

    .from('finance_insurance')

    .select(
      `
    *,
    goals(
    id,
    title,
    saved_amount,
    target_amount,
    status
)
`
    )

    .eq('user_id', userId)

    .order('due_date', {
      ascending: false,
    });

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function createInsurance(payload) {
  const { data, error } = await api

    .from('finance_insurance')

    .insert({
      user_id: payload.user_id,

      insurance_name: payload.insurance_name,

      insurance_type: payload.insurance_type,

      amount: Number(payload.amount),

      due_date: payload.due_date,

      goal_id: Number(payload.goal_id),

      description: payload.description,
    })

    .select()

    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateInsurance(id, payload) {
  const { data, error } = await api

    .from('finance_insurance')

    .update({
      insurance_name: payload.insurance_name,

      insurance_type: payload.insurance_type,

      amount: Number(payload.amount),

      due_date: payload.due_date,

      goal_id: Number(payload.goal_id),

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

export async function removeInsurance(id) {
  const { data, error } = await api

    .from('finance_insurance')

    .delete()

    .eq('id', id)

    .select()

    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
