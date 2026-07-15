import { api } from './api';

export function getCategories() {
  return api.request('/categories');
}

export function createCategory(payload) {
  return api.request('/categories', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updateCategory(id, username, payload) {
  return api.request(`/categories/${id}?username=${encodeURIComponent(username)}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export function deleteCategory(id, username) {
  return api.request(`/categories/${id}?username=${encodeURIComponent(username)}`, {
    method: 'DELETE',
  });
}
