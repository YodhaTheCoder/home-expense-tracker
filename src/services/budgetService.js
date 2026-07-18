import { api } from './api';

export async function getBudgets() {
  const { data, error } = await api
    .from('budgets')
    .select(
      `
        id,
        year,
        month,
        amount,
        user_id
      `
    )
    .order('year', {
      ascending: false,
    })
    .order('month', {
      ascending: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getBudgetUsers() {
  const { data, error } = await api
    .from('profiles')
    .select(
      `
        id,
        full_name,
        email
      `
    )
    .order('created_at');

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function createBudget(payload) {
  const { data, error } = await api.from('budgets').insert(payload).select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateBudget(id, payload) {
  const { data, error } = await api.from('budgets').update(payload).eq('id', id).select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteBudget(id) {
  const { error } = await api.from('budgets').delete().eq('id', id);

  if (error) {
    throw new Error(error.message);
  }
}
