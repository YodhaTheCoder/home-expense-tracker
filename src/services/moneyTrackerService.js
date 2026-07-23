import { api } from './api';


// =====================================================
// MONEY DUES
// =====================================================


/**
 * Get money dues
 * userId provided -> only user's data
 * null -> all data (admin future)
 */
export async function getMoneyDues(userId = null) {

  let query = api
    .from('money_dues')
    .select(`
      *,
      money_payments(
        id,
        amount,
        payment_date,
        notes
      )
    `)
    .order('transaction_date', {
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




/**
 * Create money due
 */
export async function createMoneyDue(payload) {


  const {
    data: {
      user
    },
    error: userError

  } = await api.auth.getUser();



  if (userError) {

    throw new Error(userError.message);

  }



  const { data, error } = await api
    .from('money_dues')
    .insert({

      user_id: user.id,

      type: payload.type,

      person_name: payload.person_name,

      amount: Number(payload.amount),

      transaction_date: payload.date,

      notes: payload.notes,

      financial_year: payload.financial_year,

    })
    .select()
    .single();



  if (error) {

    throw new Error(error.message);

  }


  return data;

}





/**
 * Update money due
 */
export async function updateMoneyDue(id, payload) {


  const { data, error } = await api
    .from('money_dues')
    .update({

      type: payload.type,

      person_name: payload.person_name,

      amount: Number(payload.amount),

      transaction_date: payload.date,

      notes: payload.notes,

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
 * Delete money due
 */
export async function removeMoneyDue(id) {


  const { data, error } = await api
    .from('money_dues')
    .delete()
    .eq('id', id)
    .select()
    .single();



  if (error) {

    throw new Error(error.message);

  }


  return data;

}




// =====================================================
// MONEY PAYMENTS
// =====================================================



/**
 * Get payments for a money due
 */
export async function getMoneyPayments(moneyDueId) {


  const { data, error } = await api
    .from('money_payments')
    .select('*')
    .eq('due_id', moneyDueId)
    .order('payment_date', {
      ascending: false,
    });



  if (error) {

    throw new Error(error.message);

  }


  return data;

}





/**
 * Create payment
 */
export async function createMoneyPayment(payload) {


  const { data, error } = await api
    .from('money_payments')
    .insert({

      due_id: payload.due_id,

      amount: Number(payload.amount),

      payment_date: payload.payment_date,

      notes: payload.notes || null,

    })
    .select()
    .single();



  if (error) {

    throw new Error(error.message);

  }


  return data;

}





/**
 * Update payment
 */
export async function updateMoneyPayment(id, payload) {

 console.log("Updating payment ID:", id);
  const { data, error } = await api
    .from('money_payments')
    .update({

      amount: Number(payload.amount),

      payment_date: payload.payment_date,

      notes: payload.notes || null,

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
 * Delete payment
 */
export async function removeMoneyPayment(id) {


  const { data, error } = await api
    .from('money_payments')
    .delete()
    .eq('id', id)
    .select()
    .single();



  if (error) {

    throw new Error(error.message);

  }


  return data;

}