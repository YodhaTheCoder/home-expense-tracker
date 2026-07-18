import { api } from './api';

/**
 * Admin: Get all users
 */
export async function getUsers() {
  const { data, error } = await api
    .from('profiles')
    .select(
      `
        id,
        email,
        full_name,
        role,
        created_at
      `
    )
    .order('created_at', {
      ascending: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

/**
 * Admin: Create user
 * Uses Edge Function because auth.admin requires secret key
 */
export async function createUser(payload) {
  const { data, error } = await api.functions.invoke('create-user', {
    body: payload,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

/**
 * Admin: Update user profile
 */
export async function updateUser(id, payload) {
  const { data, error } = await api.from('profiles').update(payload).eq('id', id).select().single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

/**
 * Admin: Delete user
 */
export async function deleteUser(id) {
  const { data, error } = await api.functions.invoke('delete-user', {
    body: {
      id,
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

/**
 * Update current user's profile
 */
export async function updateProfile(id, full_name) {
  const { data, error } = await api
    .from('profiles')
    .update({
      full_name,
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
 * Get current user's profile
 */
export async function getProfile(id) {
  const { data, error } = await api.from('profiles').select('*').eq('id', id).single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
