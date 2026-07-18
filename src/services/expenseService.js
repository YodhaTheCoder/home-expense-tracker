import { api } from './api';

/**
 * Get expenses
 * userId provided  -> only that user's expenses
 * userId null      -> all expenses (admin)
 */
export async function getExpenses(userId = null) {
  let query = api
    .from('expenses')
    .select(
      `
      *,
      categories (
        id,
        name
      )
    `
    )
    .order('expense_date', {
      ascending: false,
    });

  if (userId) {
    query = query.eq('user_id', userId);
  }

  const { data: expenses, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  const userIds = [
    ...new Set(
      expenses
        .filter((item) => item.user_id)
        .map((item) => item.user_id)
    ),
  ];

  let profiles = [];

  if (userIds.length > 0) {
    const { data, error } = await api
      .from('profiles')
      .select(`
        id,
        full_name,
        email
      `)
      .in('id', userIds);

    if (error) {
      throw new Error(error.message);
    }

    profiles = data;
  }

    return expenses.map((expense) => {
    const profile = profiles.find(
      (p) => p.id === expense.user_id
    );

  return {
    ...expense,
    category: expense.categories?.name,
    full_name: profile?.full_name || profile?.email || 'Unknown',
    date: expense.expense_date,
    };
  });
}

/**
 * Create expense
 */ 
export async function createExpense(payload) {
  const {
    data: { user },
    error: userError,
  } = await api.auth.getUser();

  if (userError) {
    throw new Error(userError.message);
  }

  const { data, error } = await api
    .from('expenses')
    .insert({
      user_id: user.id,
      amount: payload.amount,
      category_id: payload.category_id,
      description: payload.description,
      expense_date: payload.date ?? new Date(),
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

/**
 * Update expense
 */
export async function updateExpense(id, payload) {
  const { data, error } = await api
    .from('expenses')
    .update({
      amount: payload.amount,
      category_id: payload.category_id,
      description: payload.description,
      expense_date: payload.date,
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
 * Delete expense
 */
export async function removeExpense(id) {
  const { data, error } = await api.from('expenses').delete().eq('id', id).select().single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
