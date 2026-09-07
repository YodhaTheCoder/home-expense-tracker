import { api } from './api';

export async function getChits(userId = null) {
  let query = api

    .from('finance_chits')

    .select(
      `

    *,

    finance_chit_transactions(

        id,

        month_number,

        payment_date,

        amount,

        received_amount,

        status

    )

`
    )

    .order('start_date', {
      ascending: false,
    });

  if (userId) {
    query = query.eq('user_id', userId);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return data.map((chit) => ({
    ...chit,

    paidMonths: chit.finance_chit_transactions.filter((item) => item.status === 'paid').length,

    totalTransactions: chit.finance_chit_transactions.length,
  }));
}

export async function createChit(payload) {
  const {
    data: { user },

    error: userError,
  } = await api.auth.getUser();

  if (userError) {
    throw new Error(userError.message);
  }

  // 1. Create master chit

  const { data: chit, error } = await api

    .from('finance_chits')

    .insert({
      user_id: user.id,

      chit_name: payload.chit_name,

      chit_value: Number(payload.chit_value),

      monthly_amount: Number(payload.monthly_amount),

      monthly_amount_if_taken: payload.monthly_amount_if_taken
        ? Number(payload.monthly_amount_if_taken)
        : null,

      total_months: Number(payload.total_months),

      start_date: payload.start_date,

      due_date: payload.due_date || null,

      status: 'active',

      description: payload.description,
    })

    .select()

    .single();

  if (error) {
    throw new Error(error.message);
  }

  // 2. Generate monthly transactions

  const transactions = [];

  for (let i = 0; i < Number(payload.total_months); i++) {
    const paymentDate = new Date(payload.start_date);

    paymentDate.setMonth(paymentDate.getMonth() + i);

    transactions.push({
      chit_id: chit.id,

      month_number: i + 1,

      payment_date: paymentDate.toISOString().split('T')[0],

      amount: Number(payload.monthly_amount),

      received_amount: null,

      status: 'unpaid',
    });
  }

  const { error: transactionError } = await api

    .from('finance_chit_transactions')

    .insert(transactions);

  if (transactionError) {
    throw new Error(transactionError.message);
  }

  return chit;
}

export async function updateChit(id, payload) {
  // 1. Update master chit

  const { data, error } = await api

    .from('finance_chits')

    .update({
      chit_name: payload.chit_name,

      chit_value: Number(payload.chit_value),

      monthly_amount: Number(payload.monthly_amount),

      monthly_amount_if_taken: payload.monthly_amount_if_taken
        ? Number(payload.monthly_amount_if_taken)
        : null,

      total_months: Number(payload.total_months),

      start_date: payload.start_date,

      status: payload.status,

      description: payload.description,
    })

    .eq('id', id)

    .select()

    .single();

  if (error) {
    throw new Error(error.message);
  }

  // 2. Get existing transactions

  const { data: existingTransactions, error: getError } = await api

    .from('finance_chit_transactions')

    .select('*')

    .eq('chit_id', id);

  if (getError) {
    throw new Error(getError.message);
  }

  const newTotalMonths = Number(payload.total_months);

  const oldTotalMonths = existingTransactions.length;

  // 3. If duration reduced, delete extra months

  if (newTotalMonths < oldTotalMonths) {
    const deleteIds = existingTransactions

      .filter((item) => Number(item.month_number) > newTotalMonths)

      .map((item) => item.id);

    if (deleteIds.length) {
      const { error: deleteError } = await api

        .from('finance_chit_transactions')

        .delete()

        .in('id', deleteIds);

      if (deleteError) {
        throw new Error(deleteError.message);
      }
    }
  }

  // 4. If duration increased, create missing months

  if (newTotalMonths > oldTotalMonths) {
    const newTransactions = [];

    for (let i = oldTotalMonths; i < newTotalMonths; i++) {
      const paymentDate = new Date(payload.start_date);

      paymentDate.setMonth(paymentDate.getMonth() + i);

      newTransactions.push({
        chit_id: id,

        month_number: i + 1,

        payment_date: paymentDate.toISOString().split('T')[0],

        amount: Number(payload.monthly_amount),

        received_amount: null,

        status: 'unpaid',
      });
    }

    if (newTransactions.length) {
      const { error: insertError } = await api

        .from('finance_chit_transactions')

        .insert(newTransactions);

      if (insertError) {
        throw new Error(insertError.message);
      }
    }
  }

  // 5. Update unpaid transaction amounts if monthly amount changed

  const { error: updateError } = await api

    .from('finance_chit_transactions')

    .update({
      amount: Number(payload.monthly_amount),
    })

    .eq('chit_id', id)

    .eq('status', 'unpaid');

  if (updateError) {
    throw new Error(updateError.message);
  }

  return data;
}

export async function removeChit(id) {
  const { data, error } = await api

    .from('finance_chits')

    .delete()

    .eq('id', id)

    .select()

    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getChitTransactions(chitId) {
  const { data, error } = await api

    .from('finance_chit_transactions')

    .select('*')

    .eq('chit_id', chitId)

    .order('month_number', {
      ascending: true,
    });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateChitTransaction(id, payload) {
  const { data, error } = await api

    .from('finance_chit_transactions')

    .update({
      amount: Number(payload.amount),

      received_amount: payload.received_amount ? Number(payload.received_amount) : null,

      status: payload.status,

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
