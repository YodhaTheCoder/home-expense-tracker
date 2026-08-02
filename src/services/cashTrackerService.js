import { api } from './api';

/* =========================
   CASH LOCATIONS
========================= */

export async function getCashLocations(userId) {
  let query = api
    .from('cash_locations')
    .select(
      `
            *,
            cash_transactions(*)
        `
    )
    .order('created_at', { ascending: false });

  if (userId) {
    query = query.eq('user_id', userId);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data;
}

export async function createCashLocation(location) {
  const { data, error } = await api.from('cash_locations').insert(location).select().single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateCashLocation(id, location) {
  const { data, error } = await api
    .from('cash_locations')
    .update(location)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteCashLocation(id) {
  const { error } = await api.from('cash_locations').delete().eq('id', id);

  if (error) {
    throw error;
  }
}

/* =========================
   CASH TRANSACTIONS
========================= */

export async function createCashTransaction(transaction) {
  const { data, error } = await api.from('cash_transactions').insert(transaction).select().single();

  if (error) {
    throw error;
  }

  const { data: location, error: locationError } = await api
    .from('cash_locations')
    .select('current_amount')
    .eq('id', transaction.location_id)
    .single();

  if (locationError) {
    throw locationError;
  }

  const newAmount =
    transaction.type === 'ADD'
      ? Number(location.current_amount) + Number(transaction.amount)
      : Number(location.current_amount) - Number(transaction.amount);

  const { error: updateError } = await api
    .from('cash_locations')
    .update({
      current_amount: newAmount,
    })
    .eq('id', transaction.location_id);

  if (updateError) {
    throw updateError;
  }

  return data;
}

export async function updateCashTransaction(id, transaction) {
  const { data: oldTransaction, error } = await api
    .from('cash_transactions')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;

  const oldEffect =
    oldTransaction.type === 'ADD' ? Number(oldTransaction.amount) : -Number(oldTransaction.amount);

  const newEffect =
    transaction.type === 'ADD' ? Number(transaction.amount) : -Number(transaction.amount);

  const difference = newEffect - oldEffect;

  await updateLocationBalance(oldTransaction.location_id, difference);

  const { data, error: updateError } = await api
    .from('cash_transactions')
    .update(transaction)
    .eq('id', id)
    .select()
    .single();

  if (updateError) throw updateError;

  return data;
}

export async function deleteCashTransaction(id) {
  const { data: transaction, error } = await api
    .from('cash_transactions')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;

  const reverseAmount =
    transaction.type === 'ADD' ? -Number(transaction.amount) : Number(transaction.amount);

  await updateLocationBalance(transaction.location_id, reverseAmount);

  const { error: deleteError } = await api.from('cash_transactions').delete().eq('id', id);

  if (deleteError) throw deleteError;
}

/* =========================
   CASH SUMMARY
========================= */

export async function getCashSummary(userId) {
  let locationQuery = api.from('cash_locations').select('current_amount');

  if (userId) {
    locationQuery = locationQuery.eq('user_id', userId);
  }

  const { data: locations, error: locationError } = await locationQuery;

  if (locationError) {
    throw locationError;
  }

  const totalCash = locations.reduce((sum, item) => sum + Number(item.current_amount || 0), 0);

  let transactionQuery = api.from('cash_transactions').select('amount,type');

  const { data: transactions, error: transactionError } = await transactionQuery;

  if (transactionError) {
    throw transactionError;
  }

  const totalExpenseCash = transactions
    .filter((item) => item.type === 'EXPENSE')
    .reduce((sum, item) => sum + Number(item.amount || 0), 0);

  const totalBase = totalCash + totalExpenseCash;

  const usagePercentage = totalBase > 0 ? Math.round((totalExpenseCash / totalBase) * 100) : 0;

  return {
    totalCash,

    totalExpenseCash,

    usagePercentage,

    remainingCash: totalCash,
  };
}

async function updateLocationBalance(locationId, amountChange) {
  const { data: location, error } = await api
    .from('cash_locations')
    .select('current_amount')
    .eq('id', locationId)
    .single();

  if (error) throw error;

  const newAmount = Number(location.current_amount || 0) + amountChange;

  const { error: updateError } = await api
    .from('cash_locations')
    .update({
      current_amount: newAmount,
    })
    .eq('id', locationId);

  if (updateError) throw updateError;
}
