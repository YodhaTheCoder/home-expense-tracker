import { api } from '../services/api';

// Get all goals
export async function getGoals(userId) {
  const { data, error } = await api
    .from('goals')
    .select('*')
    .eq('user_id', userId)
    .neq('status', 'archived')
    .order('created_at', {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return data;
}

// Create goal
export async function createGoal(goal) {
  const { data, error } = await api.from('goals').insert(goal).select().single();

  if (error) {
    throw error;
  }

  return data;
}

// Update goal
export async function updateGoal(goalId, updates) {
  const { data, error } = await api
    .from('goals')
    .update({
      ...updates,
      updated_at: new Date(),
    })
    .eq('id', goalId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

// Delete goal
export async function deleteGoal(goalId) {
  const { error } = await api.from('goals').delete().eq('id', goalId);

  if (error) {
    throw error;
  }
}

// Add money transaction
export async function addGoalMoney(transaction) {
  const { data, error } = await api.from('goal_transactions').insert(transaction).select().single();

  if (error) {
    throw error;
  }

  return data;
}

// Update saved amount
export async function updateGoalSavedAmount(goalId, newAmount) {
  const { data, error } = await api
    .from('goals')
    .update({
      saved_amount: newAmount,
    })
    .eq('id', goalId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

// Move goal to wishlist
export async function moveGoalToWishlist(goal) {
  const { data: wishlistItem, error: wishlistError } = await api
    .from('wishlist')
    .insert({
      user_id: goal.user_id,

      title: goal.title,

      estimated_price: goal.target_amount,

      notes: goal.description,

      status: 'wishlist',
    })
    .select()
    .single();

  if (wishlistError) {
    throw wishlistError;
  }

  const { error: deleteError } = await api.from('goals').delete().eq('id', goal.id);

  if (deleteError) {
    throw deleteError;
  }

  return wishlistItem;
}

// Get transactions for a goal
export async function getGoalTransactions(goalId) {
  const { data, error } = await api
    .from('goal_transactions')
    .select('*')
    .eq('goal_id', goalId)
    .order('created_at', {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return data;
}

// Update transaction
export async function updateGoalTransaction(transactionId, updates) {
  const { data, error } = await api
    .from('goal_transactions')
    .update(updates)
    .eq('id', transactionId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

// Delete transaction
export async function deleteGoalTransaction(transactionId) {
  const { error } = await api.from('goal_transactions').delete().eq('id', transactionId);

  if (error) {
    throw error;
  }
}

export async function calculateGoalSavedAmount(goalId) {
  const { data, error } = await api
    .from('goal_transactions')
    .select('amount, transaction_type')
    .eq('goal_id', goalId);

  if (error) {
    throw error;
  }

  const total = data.reduce((sum, transaction) => {
    if (transaction.transaction_type === 'deposit') {
      return sum + Number(transaction.amount);
    }

    if (transaction.transaction_type === 'withdraw') {
      return sum - Number(transaction.amount);
    }

    return sum;
  }, 0);

  return total;
}

// Get wishlist items

export async function getWishlist(userId) {
  const { data, error } = await api
    .from('wishlist')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return data;
}

// Create wishlist item

export async function createWishlistItem(item) {
  const { data, error } = await api.from('wishlist').insert(item).select().single();

  if (error) {
    throw error;
  }

  return data;
}

// Update wishlist item

export async function updateWishlistItem(id, updates) {
  const { data, error } = await api.from('wishlist').update(updates).eq('id', id).select().single();

  if (error) {
    throw error;
  }

  return data;
}

// Delete wishlist item

export async function deleteWishlistItem(id) {
  const { error } = await api.from('wishlist').delete().eq('id', id);

  if (error) {
    throw error;
  }
}

export async function convertWishlistToGoal(item) {
  const { data: goal, error: goalError } = await api
    .from('goals')
    .insert({
      user_id: item.user_id,

      title: item.title,

      description: item.notes,

      target_amount: Number(item.estimated_price),

      saved_amount: 0,

      status: 'active',
    })
    .select()
    .single();

  if (goalError) {
    throw goalError;
  }

  const { error: deleteError } = await api.from('wishlist').delete().eq('id', item.id);

  if (deleteError) {
    throw deleteError;
  }

  return goal;
}

export async function archiveGoal(goalId) {
  const { data, error } = await api
    .from('goals')
    .update({
      status: 'archived',
    })
    .eq('id', goalId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function restoreGoal(goalId) {
  const { data, error } = await api
    .from('goals')
    .update({
      status: 'completed',
    })
    .eq('id', goalId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function getArchivedGoals(userId) {
  const { data, error } = await api
    .from('goals')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'archived')
    .order('created_at', {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return data;
}
