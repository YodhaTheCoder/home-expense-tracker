import { api } from './api';

/**
 * Get all categories
 */
export async function getCategories() {
  const { data, error } = await api.from('categories').select('*').order('name');

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

/**
 * Create category
 */
export async function createCategory(payload) {
  const {
    data: { user },
    error: userError,
  } = await api.auth.getUser();

  if (userError) {
    throw new Error(userError.message);
  }

  const { data, error } = await api
    .from('categories')
    .insert({
      name: payload.name,
      created_by: user.id,
      is_default: false,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

/**
 * Update category
 */
export async function updateCategory(id, payload) {
  const { data, error } = await api
    .from('categories')
    .update({
      name: payload.name,
    })
    .eq('id', id)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
}

/**
 * Delete category
 */
export async function deleteCategory(id) {
  const { data, error } = await api.from('categories').delete().eq('id', id).select();

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
}
